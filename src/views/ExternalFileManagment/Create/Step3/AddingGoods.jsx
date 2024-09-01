import axios from "axios";
import SelectHSCode from "./SelectHSCode";
import OtherProperties from "./OtherProperties";
import React, { useEffect, useState } from "react";
import themeColors from "../../../../configs/theme";
import Validation from "../../../../utils/Validation";
import { useSelector, useDispatch } from "react-redux";
import { Col, Divider, Modal, Row, Table } from "antd";
import { endpoints } from "../../../../services/endpoints";
import {
  handelQuestionModal,
  handleLoading,
  handleMessageModal,
  handleStepsOfCreatePage,
} from "../../../../state/action-creators";
import {
  Button,
  ComboBox,
  Input,
  QuestionModal,
  TitleBox,
  VerticalSpace,
} from "../../../../components";

const AddingGoods = ({
  getTable,
  editingId,
  measurementUnits,
  isShowModal,
  setIsShowModal,
  goodStatus,
  setFilters,
  setErrors,
  resetFields,
  modalMode,
  filters,
  errors,
  setOpen,
  open,
  listCountries,
  showBasicInformation,
  setShowBasicInformation,
  prfVCode,
  getHSCIDDetail,
  setInputsData,
  inputsData,
  showSupplementaryInfo,
  setShowSupplementaryInfo,
  setQuestionModalMode,
  isContinueMode,
  questionModalMode,
  showItem,
  setShowItem
}) => {
  const dispatch = useDispatch();
  const { theme, GUid, role } = useSelector((state) => state);






  const handleChangeInputs = (name, value, validationNameList = [], event) => {
    let findIdOfSupplementaryPropertiesList = {};
    let findIdOfSpecialPropertiesList = {};
    filters?.goodsOtherProperties?.map((item) =>
      findIdOfSupplementaryPropertiesList[item?.oprVCodeInt] = undefined
    );
    filters?.specialPropertiesList?.map((item) => {
      findIdOfSpecialPropertiesList[item?.oprVCodeInt] = undefined

    });
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1]));
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });

    if (name === "hsCode") {
      if (inputsData?.status > 1 && modalMode === "mode") {
        setShowBasicInformation(false);
        setShowSupplementaryInfo(false);
        setFilters({
          ...filters,
          pfgVCodeLng: undefined,
          cidCode: undefined,
          OrgIDCode: undefined,
          commercialDescStr: undefined,
          commercialDesc: undefined,
          englishDescription: undefined,
          commercialDescEnStr: undefined,
          measurement: undefined,
          packageType: undefined,
          Countrie: undefined,
          producersName: undefined,
          hasCommercialDescStr: false,
          hasCountrie: false,
          hasEnglishDescription: false,
          hasPersianCommercialDescription: false,
          hasEnglishCommercialDescription: false,
          hasProducingCountryMapCode: false,
          [name]: value,
          ...findIdOfSupplementaryPropertiesList,
          ...findIdOfSpecialPropertiesList,

        });
        setErrors([])
      } else {
        setShowBasicInformation(false);
        setShowSupplementaryInfo(false);
        setFilters({
          // ...filters,
          cidCode: undefined,
          OrgIDCode: undefined,
          commercialDescStr: undefined,
          commercialDesc: undefined,
          englishDescription: undefined,
          commercialDescEnStr: undefined,
          productionYear: undefined,
          measurement: undefined,
          quantity: undefined,
          Discount: undefined,
          amount: undefined,
          netWeight: undefined,
          grossWeight: undefined,
          packageType: undefined,
          itemStatus: undefined,
          Countrie: undefined,
          technicalSpecifications: undefined,
          standard: undefined,
          producersName: undefined,
          ...findIdOfSpecialPropertiesList,
          [name]: value,
          hsCode: value,
          pfgTraceCodeLng: filters?.pfgTraceCodeLng,
          // pfgTraceCodeLng:undefined
        });
        setErrors({ hsCode: [...temp] });
      }
    } else if (Object.keys(findIdOfSupplementaryPropertiesList).includes(name)) {
      setShowBasicInformation(false);
      setFilters({
        ...filters,
        cidCode: undefined,
        OrgIDCode: undefined,
        commercialDescStr: undefined,
        commercialDesc: undefined,
        englishDescription: undefined,
        commercialDescEnStr: undefined,
        measurement: undefined,
        packageType: undefined,
        Countrie: undefined,
        producersName: undefined,
        hasCommercialDescStr: false,
        hasCountrie: false,
        hasEnglishDescription: false,
        hasPersianCommercialDescription: false,
        hasEnglishCommercialDescription: false,
        hasProducingCountryMapCode: false,
        [name]: value,
      });
      setErrors([])
    } else {
      setFilters((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
    }
  };
  // سرویس جستجوی شماره تعرفه
  const getHSGoodsDetail = (id, filtersData = {}) => {
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      HSCode: filters?.hsCode || filtersData?.hsCode,
      gcdVCodeInt: 0,
      Method: id,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints?.RestAPIs.Proforma.getHSGoodsDetail.url,
      method: endpoints?.RestAPIs.Proforma.getHSGoodsDetail.method,
      data: postData,
    })
      .then((res) => {
        let temporaryDataFilters = {};
        if (res?.data?.ErrorCode === 0) {
          setShowSupplementaryInfo(true);
          if (id === 1) {
            temporaryDataFilters = {
              gdsTariffTny: res?.data?.gdsTariffTny,
              gdsPriorityTny: res?.data?.gdsPriorityTny,
              hSNameStr: res?.data?.gdsHSNameStr,
              goodsOtherProperties: res?.data?.GoodsOtherPropertiesList,
              hsCode: filtersData?.hsCode || filters?.hsCode,
            };
            getHSGoodsDetail(2, temporaryDataFilters);
            if (res?.data?.GoodsOtherPropertiesList?.length === 0) {
              checkBasicGoodsInformations(undefined, temporaryDataFilters);
            }
          } else if (id === 2) {
            setFilters({
              ...filters,
              specialPropertiesList: res?.data?.GoodsOtherPropertiesList,
              ...filtersData,
              gdsTariffTny: res?.data?.gdsTariffTny,
              gdsPriorityTny: res?.data?.gdsPriorityTny,
              hSNameStr: res?.data?.gdsHSNameStr,
            });
          }
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };


  // سرویس ثبت کالا
  const insertProformaGoods = (id, pfgTraceCodeLng) => {
    setFilters({ ...filters, id: id });
    dispatch(handleLoading(true));
    const tempgoodsOtherProperties = [];
    filters?.specialPropertiesList?.map((item, index) => {
      tempgoodsOtherProperties.push({
        OtherPropertiesContent: [],
        oprVCodeInt: item?.oprVCodeInt,
        oprPropertyCodeInt: item?.oprPropertyCodeInt,
        oprDescEnStr: item?.oprDescEnStr,
        oprPropertyNameStr: item?.oprPropertyNameStr,
        oprStatusTny: item?.oprStatusTny,
        gopgdsHSVCodeStr: item?.gopgdsHSVCodeStr,
        gopHasRule: item?.gopHasRule,
        oprUIControlerTypeDescStr: item?.oprUIControlerTypeDescStr,
        oprUIControlerTypeTny: item?.oprUIControlerTypeTny,
        oprUIDescrptionStr: item?.oprUIDescrptionStr,
        gopogaCodeInt: item?.gopogaCodeInt,
        gopVCodeInt: item?.gopVCodeInt,
        gopIsRequiredTny: item?.gopIsRequiredTny,
        gopValueStr:
          //  item?.gopValueStr
          //   ? item?.gopValueStr
          // : 
          filters[item?.oprVCodeInt],
      });
    });
    filters?.goodsOtherProperties?.map((item) => {
      tempgoodsOtherProperties.push({
        OtherPropertiesContent: [],
        oprVCodeInt: item?.oprVCodeInt,
        oprPropertyCodeInt: item?.oprPropertyCodeInt,
        oprDescEnStr: item?.oprDescEnStr,
        oprPropertyNameStr: item?.oprPropertyNameStr,
        oprStatusTny: item?.oprStatusTny,
        gopgdsHSVCodeStr: item?.gopgdsHSVCodeStr,
        gopHasRule: item?.gopHasRule,
        oprUIControlerTypeDescStr: item?.oprUIControlerTypeDescStr,
        oprUIControlerTypeTny: item?.oprUIControlerTypeTny,
        oprUIDescrptionStr: item?.oprUIDescrptionStr,
        gopogaCodeInt: item?.gopogaCodeInt,
        gopVCodeInt: item?.gopVCodeInt,
        gopIsRequiredTny: item?.gopIsRequiredTny,
        gopValueStr: item?.gopValueStr
          ? item?.gopValueStr
          : filters[item?.oprVCodeInt],
      });
    });

    const postData = {
      prfVCodeInt: editingId || prfVCode,
      Good: {
        prfVCodeInt: prfVCode,
        pfgprfVCodeInt: 0,
        // شماره تعرفه
        gdsHSCode: filters?.hsCode,
        // شرح تجاری فارسی
        pfgCommercialDescStr:
          filters?.goodsId === 11 || filters?.pfgCIDTypeTny === 11
            ? filters?.commercialDesc
            : filters?.commercialDescStr,
        //شرح تجاری لاتین
        pfgCommercialDescEnStr:
          filters?.goodsId === 11 || filters?.pfgCIDTypeTny === 11
            ? filters?.commercialDescEnStr
            : filters?.englishDescription,
        // شرح ثابت فارسی
        pfgStaticCommercialDescStr:
          filters?.goodsId === 11 || filters?.pfgCIDTypeTny === 11
            ? filters?.commercialDescStr
            : filters?.commercialDesc,
        //شرح ثابت لاتین
        pfgStaticCommercialDescEnStr:
          filters?.goodsId === 11 || filters?.pfgCIDTypeTny === 11
            ? filters?.englishDescription
            : filters?.commercialDescEnStr,
        //شماره فنی
        pfgTechnicalSpecStr: !!filters?.technicalSpecifications ? filters?.technicalSpecifications : "",
        // تولید کننده
        pfgManufractureStr: filters?.producersName,
        // باید 0 بمونه
        pfgManufractureCode: 0,
        // شماره استاندارد
        pfgStandardStr: filters?.standard,
        // کد واحد اندازه گیری
        pfgmsuVCodeTny: !!filters?.gcdmsuVCodeInt
          ? filters?.gcdmsuVCodeInt
          : (filters?.measurement),
        // -تعداد/ مقدار
        pfgCountInt: filters?.amount,
        // سال تولید
        pfgProductionDate: filters?.productionYear,
        // مبلغ
        pfgFOBPriceMny: filters?.quantity,
        // کد وضعیت کالا
        pfgGoodsStatusTny: filters?.itemStatus,
        // وزن خالص
        pfgNetWeightInt: filters?.netWeight,
        // وزن ناخالص
        pfgGrossWeightInt: filters?.grossWeight,
        // کد بسته بندی
        pfgpckVCodeInt: filters?.packageType,
        pfgVCodeLng: id,
        gcdVCodeInt: 0,
        sgdVCodeInt: !!editingId ? 0 : filters?.sgdVCodeInt,
        pfggdsVCodeInt: 0,
        pfgStatusStr: null,
        //شناسه کالا
        cmpIRCCodeStr: filters?.cidCode,
        // تخفیف
        pfgDiscountMny: filters?.Discount,
        // نوع شناسه کالا
        pfgCIDTypeTny: filters?.pfgCIDTypeTny || filters?.goodsId,
        // توضیحات
        pfgDescriptionStr: null,
        // شناسه سازمان
        OrgCode: !!filters?.OrgIDCode ? filters?.OrgIDCode : "",
        // نوع شناسه سازمان
        pfggcdOrgIDInt: filters?.orgInformation,
        // -نوع شناسه سازمان
        pfgCIDTypeOrgTny: filters?.orgInformation,
        //صفر
        pfgIsCandleOnTny: 0,
        // صفر
        EdditingStatus: 0,
        // شرح تعرفه
        gdsHSDescStr: !!editingId
          ? ""
          : filters?.gdsHSDescStr || filters?.hSNameStr,
        gdsPriorityTny: filters?.gdsPriorityTny,
        gdsTariffTny: filters?.gdsTariffTny,
        // وقتی کالا جدید وارد میشه برابر صفر
        pfgVersionTny: 0,
        // نال
        pfgProductionYear: null,
        //  صفر
        pfgConsumeTypeTny: 0,
        // تاریخ درج
        pfgInsertDate: null,
        // صفر
        pfgdescStrCount: 0,
        // صفر
        pfgdescENStrCount: 0,
        // رهگیری
        pfgTraceCodeLng: pfgTraceCodeLng,
        // کشور تولید کننده
        ProformaGoodsCountries: filters?.Countrie,
        // وضعیت ترخیص
        pfgDepreciated: false,
        GoodsOtherPropertiesList: [...tempgoodsOtherProperties],
      },
      ExcelGoods: null,
      FuncType: !!editingId ? 1 : 2,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    dispatch(handleLoading(true));

    axios({
      url: endpoints.RestAPIs.Proforma.insertProformaGoods.url,
      method: endpoints.RestAPIs.Proforma.insertProformaGoods.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setIsShowModal(false);
          const temp = [];
          res?.data?.ProformaGoodWrapper?.goods?.map((item) => temp?.push(item));
          if (inputsData?.status > 1) {
            if (!!res?.data?.ProformaGoodWrapper?.goods[0]?.pfgTraceCodeLng && inputsData?.Goods?.filter((item) => item?.pfgTraceCodeLng === res?.data?.ProformaGoodWrapper?.goods[0]?.pfgTraceCodeLng)?.length > 0 && showItem !== "ADDING-GOODS") {
              const goodsTabaleData = inputsData.Goods?.map(goods => {
                if (goods?.pfgTraceCodeLng === res?.data?.ProformaGoodWrapper?.goods[0]?.pfgTraceCodeLng && showItem !== "ADDING-GOODS") {
                  return (
                    {
                      ...goods,
                      ...res?.data?.ProformaGoodWrapper?.goods[0],
                      SuspendedGoods: true,
                    }
                  )
                } else {
                  return ({
                    ...goods,
                  })
                }
              })
              const tempPfgVCodeLng = inputsData?.Goods?.filter((item) => item?.pfgTraceCodeLng === res?.data?.ProformaGoodWrapper?.goods[0]?.pfgTraceCodeLng)
              setInputsData({
                ...inputsData,
                Goods: goodsTabaleData,
                findSuspendGoods: inputsData?.findSuspendGoods
                  ? [
                    ...inputsData.findSuspendGoods,
                    res?.data?.ProformaGoodWrapper?.goods[0].pfgVCodeLng,
                  ]
                  : [res?.data?.ProformaGoodWrapper?.goods[0].pfgVCodeLng],
                DeletedGoods: inputsData?.DeletedGoods
                  ? [
                    ...inputsData.DeletedGoods,
                    tempPfgVCodeLng[0]?.pfgVCodeLng
                  ]
                  : [tempPfgVCodeLng[0]?.pfgVCodeLng],
                // res?.data?.ProformaGoodWrapper?.goods[0]?.pfgTraceCodeLng: undefined

              });
            } else {
              // setQuestionModalMode()
              setInputsData({
                ...inputsData,
                Goods: [
                  {
                    ...res?.data?.ProformaGoodWrapper?.goods[0],
                    SuspendedGoods: true,
                  },
                  ...inputsData?.Goods,

                ],
                findSuspendGoods: inputsData?.findSuspendGoods
                  ? [
                    ...inputsData.findSuspendGoods,
                    res?.data?.ProformaGoodWrapper?.goods[0].pfgVCodeLng,
                  ]
                  : [res?.data?.ProformaGoodWrapper?.goods[0].pfgVCodeLng],

              });
            }
          } else {
            getTable();
            resetFields();
          }
          dispatch(
            handleMessageModal({
              type: "success",
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        } else {
          setIsShowModal(true);
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })

      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  // دکمه جستجو شماره تعرفه
  const handleSearch = (event) => {
    event?.preventDefault();
    if (!!filters?.hsCode === false) {
      setOpen(true);
    } else if (!!filters?.hsCode === true) {
      getHSGoodsDetail(1);
    }
  };

  // اطلاعات تکمیلی
  const checkBasicGoodsInformations = (event, data) => {
    event?.preventDefault();
    getHSCIDDetail(undefined, data);
  };

  // دکمه افزودن کالا
  const handleShowModal = (event) => {
    event.preventDefault();
    setIsShowModal(true);
    resetFields();
    setShowItem("ADDING-GOODS")
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Button onClick={handleShowModal}>
          <i className="fa fa-plus" aria-hidden="true"></i>
          افزودن کالا
        </Button>
      </div>
      {isShowModal && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          onCancel={() => {
            setIsShowModal(false);
            resetFields();
          }}
          footer={[]}
          open={isShowModal}
          title={modalMode === "mode" ? "ویرایش کالا" : "ثبت کالا"}
          width={1500}
        >
          <form className="form">
            <Row>
              <Col sm={24} md={24} xl={24}>
                <TitleBox title="اطلاعات پایه" />
              </Col>
            </Row>
            <VerticalSpace space="0.5rem" />
            <Row>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="شماره تعرفه"
                  type="number"
                  name="hsCode"
                  value={filters?.hsCode}
                  labelWidth="165px"
                  onChange={handleChangeInputs}
                  validations={[["digits", 8]]}
                  error={errors?.hsCode}
                  // readOnly={modalMode === "mode"  && "readOnly"}
                  readOnly={(showItem !== "ADDING-GOODS" && inputsData?.status <= 1) && "readOnly"}
                />
              </Col>
              <Button
                name="handleSearchGoods"
                type="primary"
                onClick={(event) => handleSearch(event)}
                // disabled={modalMode === "mode" && true}
                disabled={(showItem !== "ADDING-GOODS" && inputsData?.status <= 1) && true}

              >
                جستجو
              </Button>
              <SelectHSCode
                setOpen={setOpen}
                open={open}
                filters={filters}
                errors={errors}
                setErrors={setErrors}
                setFilters={setFilters}
                handleSearch={handleSearch}
                prfVCode={prfVCode}
                modalMode={modalMode}
                getHSGoodsDetail={getHSGoodsDetail}
              />
            </Row>
            <VerticalSpace space="1rem" />

            {(showSupplementaryInfo
            ) && (
                <>
                  <Row>
                    <Col sm={24} md={12} xl={12}>
                      <TitleBox title="اطلاعات تکمیلی" />
                    </Col>
                  </Row>
                </>
              )
            }
            {(showSupplementaryInfo
            ) &&
              <>
                <VerticalSpace space="0.5rem" />
                {filters?.goodsOtherProperties?.map((item, index) =>
                  item?.oprUIControlerTypeTny === 3 ? (
                    <Row>
                      <Col sm={24} md={12} xl={12}>
                        <ComboBox
                          name={JSON.stringify(item?.oprVCodeInt)}
                          title={`${item?.oprUIDescrptionStr}`}
                          optionTitle="cooNameStr"
                          optionValue="cooNameStr"
                          options={item?.OtherPropertiesContent}
                          onChange={handleChangeInputs}
                          // onChange={handleChangeSupplementry}
                          defaultValue={filters[item?.oprVCodeInt]}
                          error={errors[item.oprVCodeInt]}
                          width="200px"
                        />
                      </Col>
                    </Row>
                  ) : item?.oprUIControlerTypeTny === 1 ? (
                    <Row>
                      <Col sm={24} md={12} xl={12}>
                        <Input
                          title={item?.oprUIDescrptionStr}
                          type="text"
                          value={
                            // !!item?.gopValueStr
                            //   ? item.gopValueStr
                            //   : 
                            filters[item?.oprVCodeInt]
                          }
                          name={item?.oprVCodeInt}
                          onChange={handleChangeInputs}
                          error={errors[item?.oprVCodeInt]}
                          width="200px"
                        />
                      </Col>
                    </Row>
                  ) : (
                    <></>))
                }
              </>
            }

            {(showSupplementaryInfo || modalMode === "mode") && <div className="document-show ">
              <span className="document-show--container__status ">
                <span className="title-Step-four">
                  شرح تعرفه :
                  <span className="title-Sub-Step-four">
                    {filters?.hSNameStr}
                  </span>
                </span>
                <span className="title-Step-four">
                  درصد حقوق ورودی :
                  <span className="title-Sub-Step-four">
                    {filters?.gdsTariffTny}
                  </span>
                </span>
                <span className="title-Step-four">
                  اولویت کالایی :
                  <span className="title-Sub-Step-four">
                    {filters?.gdsPriorityTny}
                  </span>
                </span>
              </span>
              {
                filters?.goodsOtherProperties?.length > 0 && (
                  <span className="document-show--container">
                    <Button
                      name="checkBasicGoods"
                      type="primary"
                      onClick={checkBasicGoodsInformations}
                      hasVerticalSpace={false}
                    >
                      بررسی اطلاعات پایه کالا
                    </Button>
                  </span>
                )}
            </div>}
            {showBasicInformation && (
              <>
                <VerticalSpace space="2rem" />
                <OtherProperties
                  isContinueMode={isContinueMode}
                  setShowBasicInformation={setShowBasicInformation}
                  errors={errors}
                  filters={filters}
                  prfVCode={prfVCode}
                  setErrors={setErrors}
                  setFilters={setFilters}
                  goodStatus={goodStatus}
                  listCountries={listCountries}
                  setIsShowModal={setIsShowModal}
                  measurementUnits={measurementUnits}
                  insertProformaGoods={insertProformaGoods}
                  editingId={editingId}
                  inputsData={inputsData}
                  setInputsData={setInputsData}
                  modalMode={modalMode}
                  pfgTraceCodeLng={filters?.pfgTraceCodeLng}
                />
              </>
            )}
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddingGoods;
