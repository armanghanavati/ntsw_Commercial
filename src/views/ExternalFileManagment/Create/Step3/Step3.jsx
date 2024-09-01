import axios from "axios";
import Step3Table from "./Step3Table";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import themeColors from "../../../../configs/theme";
import Validation from "../../../../utils/Validation";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "antd";
import { endpoints } from "../../../../services/endpoints";
import {
  handelQuestionModal,
  handleLoading,
  handleMessageModal,
  handleStepsOfCreatePage,
} from "../../../../state/action-creators";
import { Button, QuestionModal, VerticalSpace } from "../../../../components";
import AddingGoodsWithExcel from "./AddingGoodsWithExcel";
import { useOneKeyPress } from "../../../../components/useOneKeyPress";
import Step4 from "../Step4/Step4";
import AddingGoods from "./AddingGoods";
import GoodsID from "./GoodsID";
import OrganizationID from "./OrganizationID";
import { useHistory } from "react-router-dom";

const Step3 = ({
  tempActivityShimaCodeList,
  inputsData,
  setInputsData,
  errors,
  setErrors,
  measurementUnits,
  goodStatus,
  prfVCode,
  listCountries,
  editingId,
  continueFile,
  wareHouse,
  isContinueMode
}) => {
  const dispatch = useDispatch();
  const [showItem, setShowItem] = useState()
  const [open, setOpen] = useState(false);
  const [modalMode, setModalMode] = useState();
  const [filters, setFilters] = useState();
  const [loading, setLoading] = useState(false);
  const [hasGoodsId, setHasGoodsId] = useState(false);
  const [goodsIdModal, setGoodsIdModal] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [addGoodsData, setAddGoodsData] = useState(undefined);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [questionModalMode, setQuestionModalMode] = useState();
  const [organizationIdLis, setorganizationIdLis] = useState([]);
  const [hasOrganization, setHasOrganization] = useState(false);
  const [openOriginOfCurrency, setOpenOriginOfCurrency] = useState(false);
  const [showBasicInformation, setShowBasicInformation] = useState(false);
  const [showSupplementaryInfo, setShowSupplementaryInfo] = useState(false);
  const [excelVcodelng, setExcelVcodelng] = useState([])
  const [showTariffCode, setShowTariffCode] = useState(false)
  const { questionModal, GUid, role, stepsOfCreatePage, theme } = useSelector(
    (state) => state
  );
  const [statusNameStepFive, setStatusNameStepFive] = useState("")
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10000,
    },
  });

  const history = useHistory();
  const next = (e) => {
    e?.preventDefault();
    if ((inputsData?.status <= 1 && addGoodsData.length > 0) || inputsData?.Goods?.length > 0) {
      if (inputsData?.status <= 1) {
        finalizationProforma();
      } else {
        dispatch(handleStepsOfCreatePage({ NEF: stepsOfCreatePage?.NEF + 1 }));
      }
    } else {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: "لطفا تمامی اطلاعات مربوط را با مقادیر مجاز تکمیل فرمایید.",
        })
      );
    }
  };

  const prev = (event) => {
    event?.preventDefault();
    dispatch(
      handleStepsOfCreatePage({
        NEF: stepsOfCreatePage?.NEF - 1,
        hasAccessToStep: true,
      })
    );
  };


  // تابعی برای ایجاد فایل اکسل
  const generateExcelFile = (data) => {
    // ساخت یک workbook جدید
    const workbook = XLSX.utils.book_new();
    // ساخت یک worksheet جدید
    const worksheet = XLSX.utils.aoa_to_sheet([
      [
        "کد مجازی کالا",
        "کد تعرفه",
        "شرح فارسی کالا",
        "شرح لاتین کالا",
        "مجموع وزن خالص در منشا ارزهای مختلف",
        "مجموع وزن ناخالص در منشا ارز های مختلف",
        "مجموع تعداد/مقدار در منشا ارز های مختلف",
        "قیمت واحد",
      ],
      ...data,
    ]);

    // اضافه کردن worksheet به workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "TRD_Excel_ProformaList");

    // ذخیره فایل اکسل
    XLSX.writeFile(workbook, "TRD_Excel_ProformaList.xlsx");
  };




  const getPrecotageDetailsExcel = (e) => {
    const tempPfgCvodelng = addGoodsData?.map(item => item?.pfgVCodeLng)
    e.preventDefault();
    const postData = {
      pfgVCodeLngList: tempPfgCvodelng,
      urlVCodeInt: role,
      ssdsshGUID: GUid
    }
    axios({
      url: endpoints.RestAPIs.Proforma.getPrecotageDetailsExcel.url,
      method: endpoints.RestAPIs.Proforma.getPrecotageDetailsExcel.method,
      data: postData,
    })
      .then((res) => {
        const temp = [];
        res?.data?.PrecotageDetail?.map((itm) =>
          temp.push([
            itm?.PfgVCodeLng,
            itm?.HSCodestr,
            itm?.HSDesc,
            itm?.HSDescStr,
            itm?.NetWeightSum,
            itm?.GrossWeightSum,
            itm?.FobSum,
            itm?.UnitPrice,
          ])
        );
        generateExcelFile([...temp]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Press button with Key
  // useOneKeyPress(handleSearch, "Enter");



  // سرویس otherProperties شماره تعرفه
  const getHSCIDDetail = (hsCode = filters?.goodsList, data = {}, loading = true) => {
    const tempgoodsOtherProperties = [];
    // filters?.specialPropertiesList?.map((item) => {
    //   tempgoodsOtherProperties.push({
    //     OtherPropertiesContent: [],
    //     oprVCodeInt: item.oprVCodeInt,
    //     oprPropertyCodeInt: item?.oprPropertyCodeInt,
    //     oprDescEnStr: item?.oprDescEnStr,
    //     oprPropertyNameStr: item?.oprUIDescrptionStr,
    //     oprStatusTny: item?.oprStatusTny,
    //     gopgdsHSVCodeStr: item?.gopgdsHSVCodeStr,
    //     gopHasRule: item?.gopHasRule,
    //     oprUIControlerTypeDescStr: item?.oprUIControlerTypeDescStr,
    //     oprUIControlerTypeTny: item?.oprUIControlerTypeTny,
    //     oprUIDescrptionStr: item?.oprUIDescrptionStr,
    //     gopogaCodeInt: item?.gopogaCodeInt,
    //     gopVCodeInt: item?.gopVCodeInt,
    //     gopIsRequiredTny: item?.gopIsRequiredTny,
    //     gopValueStr: item?.gopValueStr
    //       ? item?.gopValueStr
    //       : filters[item?.oprVCodeInt],
    //   });
    // });
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
        gopValueStr: filters[item?.oprVCodeInt],
      });
    });

    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      // شماره تعرفه
      gdsHSCode: filters?.hsCode || hsCode,
      // سرچ
      TextSearch: !!filters?.productIDSearchText ? filters?.productIDSearchText : '',
      // سرچ شناسه سازمان
      OrgTextSearch: filters?.organizationIDSearchText,
      StartIndex: 0,
      PageSize: 10,
      OtherPropsList: [...tempgoodsOtherProperties],
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.getHSCIDDetail.url,
      method: endpoints.RestAPIs.Proforma.getHSCIDDetail.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setFilters({
            ...filters,
            cidType: res?.data?.GoodsCommercialDesc?.CommodityType,
            goodsId: res?.data?.sgdCIDType,
            orgInformation: res?.data?.sgdOrgTypeSecondary,
            HasORG: res?.data?.HasORG,
            sgdVCodeInt: res?.data?.sgdVCodeInt,
            isRequiredorganizationId: res?.data?.sgdIsRequiredTnySecondary,
            isRequiredGoodsId: res?.data?.sgdIsRequiredTny,
            hsCode: hsCode || filters?.hsCode,
            ...data,
          });
          setGoodsIdModal(
            res?.data?.GoodsCommercialDesc?.GoodsCommercialDescList
          );


          if (!!res?.data?.sgdWarningContent === true && res?.data?.sgdCIDType !== 7) {
            dispatch(
              handelQuestionModal({
                isModalOpen: true,
                title: "هشدار",
                describe: res?.data?.sgdWarningContent,
              })
            );
            setQuestionModalMode("NEED_SERIAL");
          } else if (!!res?.data?.sgdWarningContent === false && res?.data?.sgdCIDType !== 7) {
            setHasGoodsId(true);
            setQuestionModalMode("NEED_HS")
          }

          if (res?.data?.sgdCIDType === 7 && res?.data?.HasORG === true) {
            getOrganizationIdDetail(undefined, res?.data?.sgdVCodeInt)
            setQuestionModalMode()

          } else if (res?.data?.sgdCIDType === 7 && res?.data?.HasORG === false) {
            setShowBasicInformation(true)
          }
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        if (res?.data?.sgdCIDType !== 7 || res?.data?.HasORG === false) {
          dispatch(handleLoading(false));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));

      });
  };
  // سرویس شناسه سازمان
  const getOrganizationIdDetail = (gcdCIDCodeStr, data) => {
    const postData = {
      CIDcode: !!gcdCIDCodeStr ? gcdCIDCodeStr : "",
      OrgCode: !!filters?.organizationIDSearchText ? filters?.organizationIDSearchText : "",
      StartIndex: 0,
      PageSize: 10,
      sgdVCodeInt: data || filters?.sgdVCodeInt,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };

    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.getOrganizationIdDetail.url,
      method: endpoints.RestAPIs.Proforma.getOrganizationIdDetail.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setHasOrganization(true);
          setorganizationIdLis(res?.data?.OrganizationIdList);
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

  const finalizationProforma = () => {
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCode,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.finalizationProforma.url,
      method: endpoints.RestAPIs.Proforma.finalizationProforma.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.Error === 0) {
          dispatch(
            handleStepsOfCreatePage({ NEF: stepsOfCreatePage?.NEF + 1 })
          );
          setStatusNameStepFive(res?.data?.Result)
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
          dispatch(handleLoading(false));
        }
      })
      .catch((err) => {
        dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe: err?.data?.ErrorDesc,
          })
        );
        dispatch(handleLoading(false));
      });
  };

  const handleChangeInputs = (name, value, validationNameList = [], event) => {
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
    if (name == "hsCode") {
      setFilters({ hsCode: value });
      // filters?.afterSalesService

      setErrors({ hsCode: [...temp] });
      // resetFields();
    } else {
      setFilters((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
    }
  };
  const calculateGoodsSum = () => {
    let total;
    let totalAddGoodsData;
    total = inputsData?.Goods?.reduce(
      (accumulator, record) => accumulator + record.pfgFOBPriceMny,
      0
    );
    totalAddGoodsData = addGoodsData?.reduce(
      (accumulator, record) => accumulator + record.pfgFOBPriceMny,
      0
    );

    if (inputsData?.status > 1) {
      return total?.toLocaleString();
    } else {
      return totalAddGoodsData?.toLocaleString();
    }
  };



  const TotalNetWeight = () => {
    let totalWeight;
    let totalWeightAddGoods;
    totalWeight = inputsData?.Goods?.reduce(
      (accumulator, record) => accumulator + record?.pfgNetWeightInt,
      0
    );

    totalWeightAddGoods = addGoodsData?.reduce(
      (accumulator, record) => accumulator + record?.pfgNetWeightInt,
      0
    );

    if (inputsData?.status > 1) {
      return totalWeight?.toLocaleString();
    } else {
      return totalWeightAddGoods?.toLocaleString();
    }
  };

  const TotalGrossWeight = () => {
    let grossWeight;
    let grossWeightAddGoods;
    grossWeight = inputsData?.Goods?.reduce(
      (accumulator, record) => accumulator + record?.pfgGrossWeightInt,
      0
    );
    grossWeightAddGoods = addGoodsData?.reduce(
      (accumulator, record) => accumulator + record?.pfgGrossWeightInt,
      0
    );

    if (inputsData?.status > 1) {
      return grossWeight?.toLocaleString();
    } else {
      return grossWeightAddGoods?.toLocaleString();
    }
  };

  const resetFields = () => {
    setHasGoodsId(false);
    setErrors({});
    setFilters({});
    setShowSupplementaryInfo(false);
    setShowBasicInformation(false);
    setHasOrganization(false);
    setGoodsIdModal([]);
    setorganizationIdLis([]);
    setModalMode();
    setQuestionModalMode()
  };

  // دکمه حذف کالا
  const deleteCartableRow = (event) => {
    event?.preventDefault();
    setQuestionModalMode("DeleteHSProduct");
    dispatch(
      handelQuestionModal({
        isModalOpen: true,
        title: "حذف",
        describe: <p>آیا قصد دارید این ردیف را حذف کنید؟</p>,
      })
    );
  };

  // سرویس حذف کالا
  const removeProformaGoods = (id) => {
    const postData = {
      PfggdsVCodeInt: Array.isArray(selectedRowKeys)
        ? selectedRowKeys
        : [selectedRowKeys],
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCode,
    };
    setLoading(true);
    axios({
      url: endpoints.RestAPIs.Proforma.removeProformaGoods.url,
      method: endpoints.RestAPIs.Proforma.removeProformaGoods.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.Error === 0) {
          getTable();
          if (!!editingId) {
            setInputsData({
              ...inputsData,
              DeletedRecord: [
                ...(inputsData?.DeletedRecord || []),
                selectedRowKeys,
              ],
            });
          }
          dispatch(
            handleMessageModal({
              type: "success",
              isModalOpen: true,
              describe: "با موفقیت انجام شد.",
            })
          );
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getTable = () => {
    setLoading(true);
    const postData = {
      pState: null,
      pDateF: null,
      pDateT: null,
      ptxtSearch: "",
      pStartIndex: 0,
      pPageSize: 10000,
      pSortBy: null,
      PrfvcCodeInt: editingId || prfVCode,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    setLoading(true);
    axios({
      url: endpoints.RestAPIs.Proforma.getProformaGoodsList.url,
      method: endpoints.RestAPIs.Proforma.getProformaGoodsList.method,
      data: postData,
    })
      .then((res) => {
        setAddGoodsData(res?.data?.GoodsList || []);
        // const tempTraceCode=[]
        // res?.data?.GoodsList?.map(item=>{
        //   tempTraceCode?.push(item?.pfgTraceCodeLng)
        // })
        const newFindSuspendGoods = [];
        res?.data?.GoodsList?.map((item) => {
          if (
            !filters?.EditRecord ||
            !filters?.EditRecord?.includes(item?.pfgVCodeLng)
          ) {
            newFindSuspendGoods?.push(item?.pfgVCodeLng);
          }


        });
        if (!!editingId) {
          if (!!inputsData.Goods) {
            const temp = [];
            inputsData?.Goods?.map((item) => temp?.push(item?.pfgVCodeLng));
          } else {
            setInputsData({
              ...inputsData,
              Goods: res?.data?.GoodsList,
            });
          }
        } else {
          setInputsData({
            ...inputsData,
            findSuspendGoods: newFindSuspendGoods,
          });
        }
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data?.Count || 0,
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };


  useEffect(() => {
    setAddGoodsData([]);
    getTable();
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);


  // سرویس حذف شناسه تعرفه useEffect
  useEffect(() => {
    if (
      questionModal.answer === "yes" &&
      questionModalMode === "DeleteHSProduct"
    ) {
      if (inputsData?.status > 1) {
        const deleteStaticRow = inputsData?.Goods?.filter(
          (item) => !selectedRowKeys?.includes(item?.pfgVCodeLng)
        );


        let deleteIdOnEditedGoodsList = []
        let deleteIdOnSuspendedGoods = []
        let temporaryEditedGoodsList = inputsData?.EditedGoodsLst
        if (inputsData?.EditedGoodsLst?.every(item => selectedRowKeys?.includes(item))) {
          deleteIdOnEditedGoodsList = temporaryEditedGoodsList?.filter(y => {
            selectedRowKeys.includes(y)
          })
        }
        if (inputsData?.SuspendedGoods?.every(item => selectedRowKeys?.includes(item))) {
          deleteIdOnSuspendedGoods = temporaryEditedGoodsList?.filter(itm => {
            selectedRowKeys?.includes(itm)
          })
        }


        setInputsData({
          ...inputsData,
          Goods: deleteStaticRow,
          EditedGoodsLst: deleteIdOnEditedGoodsList,
          SuspendedGoods: deleteIdOnSuspendedGoods,
          DeletedGoods: inputsData?.DeletedGoods
            ? [...inputsData?.DeletedGoods, ...selectedRowKeys]
            : selectedRowKeys,
        });

      } else {
        removeProformaGoods();
      }
    }
  }, [questionModal?.answer]);

  useEffect(() => {
    if (questionModal.answer === "yes" && questionModalMode === "NEED_SERIAL" && filters?.goodsId !== 7) {
      setHasGoodsId(true)
    }
  }, [questionModal.answer])


  return (
    <>
      {stepsOfCreatePage?.NEF === 3 && (
        <>
          {questionModal.isModalOpen && <QuestionModal />}
          <VerticalSpace space="1rem" />
          <Row>
            <Col sm={24} md={24} xl={24}>
              <span
                className="flex-order-row-justify-start"
                style={{ paddingLeft: "30px" }}
              >
                <AddingGoods
                  showItem={showItem}
                  setShowItem={setShowItem}
                  setShowTariffCode={setShowTariffCode}
                  showTariffCode={showTariffCode}
                  setQuestionModalMode={setQuestionModalMode}
                  addGoodsData={addGoodsData}
                  prfVCode={prfVCode}
                  showSupplementaryInfo={showSupplementaryInfo}
                  setShowSupplementaryInfo={setShowSupplementaryInfo}
                  getHSCIDDetail={getHSCIDDetail}
                  editingId={editingId}
                  inputsData={inputsData}
                  errors={errors}
                  setInputsData={setInputsData}
                  filters={filters}
                  setErrors={setErrors}
                  modalMode={modalMode}
                  setFilters={setFilters}
                  isShowModal={isShowModal}
                  resetFields={resetFields}
                  setIsShowModal={setIsShowModal}
                  setOpen={setOpen}
                  open={open}
                  setAddGoodsData={setAddGoodsData}
                  getTable={getTable}
                  goodStatus={goodStatus}
                  measurementUnits={measurementUnits}
                  listCountries={listCountries}
                  setShowBasicInformation={setShowBasicInformation}
                  showBasicInformation={showBasicInformation}
                  questionModalMode={questionModalMode}
                  setModalMode={setModalMode}
                  isContinueMode={isContinueMode}

                />
                <AddingGoodsWithExcel
                  data={inputsData}
                  setData={setInputsData}
                  prfVCodeInt={prfVCode}
                  getTable={getTable}
                  proformaStatus={inputsData?.status} />
                <Button
                  name="getTable"
                  backgroundColor={
                    !selectedRowKeys?.length > 0
                      ? themeColors.btn?.disable
                      : themeColors.btn?.danger
                  }
                  onClick={deleteCartableRow}
                  disabled={!selectedRowKeys?.length > 0 ? true : false}
                >
                  حذف کالا
                </Button>
              </span>
            </Col>
          </Row>
          <Step3Table
            setOpenOriginOfCurrency={setOpenOriginOfCurrency}
            openOriginOfCurrency={openOriginOfCurrency}
            setFilters={setFilters}
            filters={filters}
            addGoodsData={addGoodsData}
            modalMode={modalMode}
            setModalMode={setModalMode}
            setIsShowModal={setIsShowModal}
            selectedRowKeys={selectedRowKeys}
            setShowBasicInformation={setShowBasicInformation}
            setSelectedRowKeys={setSelectedRowKeys}
            setAddGoodsData={setAddGoodsData}
            setTableParams={setTableParams}
            tableParams={tableParams}
            editingId={editingId}
            dataSourceForEditMode={inputsData.Goods}
            inputsData={inputsData}
            showSupplementaryInfo={showSupplementaryInfo}
            setShowSupplementaryInfo={setShowSupplementaryInfo}
            isContinueMode={isContinueMode}
            setQuestionModalMode={setQuestionModalMode}
            showItem={showItem}
            setShowItem={setShowItem}

          />
          {hasGoodsId && (
            <GoodsID
              hasGoodsId={hasGoodsId}
              filters={filters}
              setQuestionModalMode={setQuestionModalMode}
              setShowBasicInformation={setShowBasicInformation}
              setHasGoodsId={setHasGoodsId}
              getOrganizationIdDetail={getOrganizationIdDetail}
              setErrors={setErrors}
              setFilters={setFilters}
              getHSCIDDetail={getHSCIDDetail}
              handleChangeInputs={handleChangeInputs}
              goodsIdModal={goodsIdModal}
              questionModalMode={questionModalMode}
              isContinueMode={isContinueMode}
              editingId={editingId}
              setHasOrganization={setHasOrganization}


            />
          )}
          {hasOrganization && (
            <OrganizationID
              hasOrganization={hasOrganization}
              questionModalMode={questionModalMode}
              filters={filters}
              setQuestionModalMode={setQuestionModalMode}
              setHasOrganization={setHasOrganization}
              setShowBasicInformation={setShowBasicInformation}
              setFilters={setFilters}
              setErrors={setErrors}
              organizationIdLis={organizationIdLis}
              getOrganizationIdDetail={getOrganizationIdDetail}
              isContinueMode={isContinueMode}
              editingId={editingId}


            />
          )}
          <div className="document-show ">
            <span className="document-show--container__status ">
              <span className="document-show--container__status-title ">
                وضعیت پرونده:
              </span>
              <span className="document-show--container__status-name ">
                {!!editingId ? inputsData?.statusName : "پیش نویس"}
              </span>
              <span className="document-show--container__status-title">
                مجموع ارزش کالاها
                <span
                  style={{
                    color: "red",
                    paddingLeft: "20px",
                    paddingRight: "10px",
                  }}
                >
                  : {calculateGoodsSum()}
                </span>
                مجموع وزن خالص کالا ها
                <span
                  style={{
                    color: "red",
                    paddingLeft: "20px",
                    paddingRight: "10px",
                  }}
                >
                  : {TotalNetWeight()} کیلوگرم
                </span>
                مجموع وزن ناخالص کالاها
                <span
                  style={{
                    color: "red",
                    paddingLeft: "20px",
                    paddingRight: "10px",
                  }}
                >
                  : {TotalGrossWeight()} کیلوگرم
                </span>
              </span>
            </span>
            <span className="document-show--container">
              <Button
                type="primary"
                onClick={e => getPrecotageDetailsExcel(e)}
                backgroundColor={themeColors.btn.yellow}
              >
                گزارش گیری از اطلاعات منشا ارز
              </Button>
              <Button
                type="primary"
                onClick={() => history.goBack()}
                backgroundColor={themeColors.btn.yellow}
                hasVerticalSpace={false}
              >
                انصراف
              </Button>
              <span id="Dissuasion">
                <Button
                  type="primary"
                  onClick={prev}
                  backgroundColor={themeColors.btn.yellow}
                >
                  <i className="fa fa-step-forward" aria-hidden="true"></i>
                  قبلی
                </Button>
              </span>
              <span id="Next">
                <Button
                  name="next"
                  type="primary"
                  onClick={next}
                  className="next-btn-step"
                  backgroundColor={themeColors.btn.primary}
                >
                  بعدی
                  <i className="fa fa-step-backward" aria-hidden="true"></i>
                </Button>
              </span>
            </span>
          </div>
        </>
      )}
      {(stepsOfCreatePage?.NEF > 4 || stepsOfCreatePage?.NEF === 4) && (
        <Step4
          tempActivityShimaCodeList={tempActivityShimaCodeList}
          prfVCode={prfVCode}
          editingId={editingId}
          filters={inputsData}
          setFilters={setInputsData}
          continueFile={continueFile}
          setModalMode={setModalMode}
          modalMode={modalMode}
          wareHouse={wareHouse}
          statusNameStepFive={statusNameStepFive}

        />
      )}
    </>
  );
};

export default Step3;
