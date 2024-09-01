import { Col, Row, Space, Input as AntdInput, Select } from "antd";
import React from "react";
import {
  Button,
  ComboBox,
  Input,
  SelectMulti,
  TitleBox,
  VerticalSpace,
} from "../../../../components";
import Validation from "../../../../utils/Validation";
import themeColors from "../../../../configs/theme";
import axios from "axios";
import { endpoints } from "../../../../services/endpoints";
import {
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const OtherProperties = ({
  filters,
  prfVCode,
  setFilters,
  setErrors,
  errors,
  measurementUnits,
  goodStatus,
  listCountries,
  insertProformaGoods,
  setIsShowModal,
  editingId,
  inputsData,
  setInputsData,
  modalMode,
  isContinueMode,
  pfgTraceCodeLng,
}) => {
  const dispatch = useDispatch();
  const [goodMeasurement, setGoodMeasurement] = useState({});
  const { questionModal, GUid, role, stepsOfCreatePage, theme } = useSelector(
    (state) => state
  );
  const yearOption = [
    { id: "نامشخص", name: "نامشخص" },
    { id: 1970, name: "1970" },
    { id: 1971, name: "1971" },
    { id: 1972, name: "1972" },
    { id: 1973, name: "1973" },
    { id: 1974, name: "1974" },
    { id: 1975, name: "1975" },
    { id: 1976, name: "1976" },
    { id: 1977, name: "1977" },
    { id: 1978, name: "1978" },
    { id: 1979, name: "1979" },
    { id: 1980, name: "1980" },
    { id: 1981, name: "1981" },
    { id: 1982, name: "1982" },
    { id: 1983, name: "1983" },
    { id: 1984, name: "1984" },
    { id: 1985, name: "1985" },
    { id: 1986, name: "1986" },
    { id: 1987, name: "1987" },
    { id: 1988, name: "1988" },
    { id: 1989, name: "1989" },
    { id: 1990, name: "1990" },
    { id: 1991, name: "1991" },
    { id: 1992, name: "1992" },
    { id: 1993, name: "1993" },
    { id: 1994, name: "1994" },
    { id: 1995, name: "1995" },
    { id: 1996, name: "1996" },
    { id: 1997, name: "1997" },
    { id: 1998, name: "1998" },
    { id: 1999, name: "1999" },
    { id: 2000, name: "2000" },
    { id: 2001, name: "2001" },
    { id: 2002, name: "2002" },
    { id: 2003, name: "2003" },
    { id: 2004, name: "2004" },
    { id: 2005, name: "2005" },
    { id: 2006, name: "2006" },
    { id: 2007, name: "2007" },
    { id: 2008, name: "2008" },
    { id: 2009, name: "2009" },
    { id: 2010, name: "2010" },
    { id: 2011, name: "2011" },
    { id: 2012, name: "2012" },
    { id: 2013, name: "2013" },
    { id: 2014, name: "2014" },
    { id: 2015, name: "2015" },
    { id: 2016, name: "2016" },
    { id: 2017, name: "2017" },
    { id: 2018, name: "2018" },
    { id: 2019, name: "2019" },
    { id: 2020, name: "2020" },
    { id: 2021, name: "2021" },
    { id: 2022, name: "2022" },
    { id: 2023, name: "2023" },
    { id: 2024, name: "2024" },
    { id: 2025, name: "2025" },
    { id: 2026, name: "2026" },
    { id: 2027, name: "2027" },
    { id: 2028, name: "2028" },
    { id: 2029, name: "2029" },
    { id: 2030, name: "2030" },
  ];

  const handleValidation = (inputsName = []) => {
    const err = { ...errors };
    inputsName?.map((item) => {
      if (
        !!inputsName &&
        (filters[item] === undefined ||
          filters[item] === null ||
          JSON.stringify(filters[item])?.trim() === "")
      ) {
        err[item] = ["پرکردن این فیلد الزامی است"];
      }
    });
    setErrors(err);
    return err;
  };

  const permitForNextStep = (inputsName = []) => {
    const error = handleValidation(inputsName);
    for (var key in error) {
      if (!!key && error[key]?.length > 0) {
        if (inputsName.includes(key)) {
          return false;
        }
      }
    }
    return true;
  };

  const handelSubmitModal = (event) => {
    event.preventDefault();
    let checked = filters?.specialPropertiesList?.map((item) =>
    ({
      id: item?.gopIsRequiredTny,
      name: item?.oprVCodeInt
    })
    );
    if (
      permitForNextStep([
        "commercialDescStr",
        "englishDescription",
        "productionYear",
        "measurement",
        "quantity",
        "amount",
        "netWeight",
        "grossWeight",
        "packageType",
        "itemStatus",
        "Countrie",
        !!filters?.standard === false && "technicalSpecifications",
        !!filters?.technicalSpecifications === false && "standard",
        "producersName",
        filters?.specialPropertiesList?.length > 0 ? (checked[0]?.id === 1 && JSON?.stringify(checked[0]?.name)) : ""
      ]) === true
    ) {

      if (!!filters?.pfgVCodeLng) {
        if (inputsData?.status <= 1) {
          insertProformaGoods(filters?.pfgVCodeLng, undefined);
          setIsShowModal(false);
        } else {
          setIsShowModal(false);
          const tempEditRow = [];
          const allGoodsList = [];
          const goodsDataForEditMode = inputsData?.Goods?.map((item) => {
            const temporaryCountries = listCountries.filter((x) =>
              filters?.Countrie?.includes(x?.id)
            );
            const addNewDataTakmili = item?.GoodsOtherPropertiesList?.filter((item => item?.gopHasRule === 1))
            const addNewDataSpecial = item?.GoodsOtherPropertiesList?.filter((item => item?.gopHasRule === 0))
            const temporaryAddnewDataTakmili = addNewDataTakmili?.map(x => { return { ...x, gopValueStr: filters[x?.oprVCodeInt] } })
            const temporaryAddNewDataSpecial = addNewDataSpecial?.map(x => { return { ...x, gopValueStr: filters[x?.oprVCodeInt] } })
            if (item?.pfgVCodeLng === filters?.pfgVCodeLng) {
              return {
                ...item,
                prfVCode: filters?.prfVCodeInt,
                gdsHSCode: filters?.hsCode,
                cmpIRCCodeStr: filters?.cidCode,
                pfgOrgIDCodestr: filters?.OrgIDCode,
                pfgCommercialDescStr: filters?.commercialDescStr,
                pfgCommercialDescEnStr: filters?.englishDescription,
                pfgProductionDate: filters?.productionYear,
                pfgmsuVCodeTny: filters?.measurement,
                pfgFOBPriceMny: filters?.quantity,
                pfgDiscountMny: filters?.Discount,
                pfgCountInt: filters?.amount,
                pfgNetWeightInt: filters?.netWeight,
                pfgGrossWeightInt: filters?.grossWeight,
                pfgpckVCodeInt: Number(filters?.packageType),
                pfgStatusTny: Number(filters?.itemStatus),
                ProformaGoodsCountries: temporaryCountries?.map((item) => {
                  return {
                    cnyVCodeInt: Number(item?.id),
                    cnyNameStr: item?.name,
                  };
                }),
                pfgTechnicalSpecStr: filters?.technicalSpecifications,
                pfgStandardStr: filters?.standard,
                prfManufractureStr: filters?.producersName,
                pfgVCodeLng: filters?.pfgVCodeLng,
                gdsHSDescStr: filters?.gdsHSDescStr,
                gdsPriorityTny: filters?.gdsPriorityTny,
                gdsTariffTny: filters?.gdsTariffTny,
                pfgCIDTypeTny: filters?.pfgCIDTypeTny,
                // pfgTraceCodeLng: filters?.pfgTraceCodeLng,
                GoodsOtherPropertiesList: [...temporaryAddNewDataSpecial, ...temporaryAddnewDataTakmili],
                hasEdited: true,
              };
            } else {
              return { ...item };
            }
          });
          goodsDataForEditMode?.map((item) => {
            if (item?.hasEdited === true) {
              tempEditRow?.push(item?.pfgVCodeLng);
              allGoodsList?.push(item);
            }
          });
          setInputsData({
            ...inputsData,
            Goods: goodsDataForEditMode,
            EditedGoodsLst: tempEditRow,
            allGoods: allGoodsList,
          });
        }
      } else {
        insertProformaGoods(0, pfgTraceCodeLng);
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

  const cancelModal = (event) => {
    event.preventDefault();
    setIsShowModal(false);
  };

  const handleChange = (event) => {
    setFilters({ ...filters, commercialDesc: event?.target?.value });
  };

  const handleChangeMode = (event) => {
    setFilters({ ...filters, commercialDescEnStr: event.target?.value });
  };


  const handleChangeInputs = (name, value, validationNameList, event) => {
    if (name === "netWeight") {
      if (
        Validation.minValue(
          filters.grossWeight || 0,
          value || 0,
          "مقدار مجاز وزن ناخالص بیشتر یا مساوی وزن خالص می باشد"
        ) === true
      ) {
        setErrors((prevstate) => {
          return {
            ...prevstate,
            grossWeight: [],
          };
        });
      } else {
        setErrors((prevstate) => {
          return {
            ...prevstate,
            grossWeight: [
              Validation.minValue(
                filters?.grossWeight || 0,
                value || 0,
                "مقدار مجاز وزن ناخالص بیشتر یا مساوی وزن خالص می باشد"
              ),
            ],
          };
        });
      }
    } else if (name === "grossWeight") {
      if (
        Validation.maxValue(
          filters?.netWeight || 0,
          value || 0,
          "مقدار مجاز وزن خالص بیشتر یا مساوی وزن خالص می باشد"
        ) === true
      ) {
        setErrors((prevstate) => {
          return {
            ...prevstate,
            netWeight: [],
          };
        });
      } else {
        setErrors((prevstate) => {
          return {
            ...prevstate,
            netWeight: [
              Validation.maxValue(
                filters?.netWeight || 0,
                value || 0,
                "مقدار مجاز وزن خالص بیشتر یا مساوی وزن خالص می باشد"
              ),
            ],
          };
        });
      }
    }
    const temp = [];
    validationNameList &&
      validationNameList?.map((item) => {
        if (Validation[item[0]](value, item[1]) === true) {
        } else {
          temp?.push(Validation[item[0]](value, item[1], item[2]));
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });
    setFilters((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };



  useEffect(() => {
    if (
      !!filters?.amount &&
      (filters?.measurement === 1 ||
        filters?.measurement === 2 ||
        filters?.measurement === 20)
    ) {
      setFilters({
        ...filters,

        netWeight:
          filters?.measurement === 1
            ? filters?.amount
            : filters.measurement === 2
              ? (Number(filters?.amount) * 1000).toFixed(3)
              : filters.measurement
                ? (Number(filters?.amount) / 1000).toFixed(3)
                : undefined,
      });
    }
  }, [filters?.amount, filters?.measurement]);


  const getGoodMeasurementUnitList = () => {
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      gdsHSCode: filters?.hsCode,
      prfVCodeInt: editingId || prfVCode,
    };
    axios({
      url: endpoints.RestAPIs.GeneralData.getGoodMeasurementUnitList.url,
      method: endpoints.RestAPIs.GeneralData.getGoodMeasurementUnitList.method,
      data: postData,
    })
      .then((res) => {
        setGoodMeasurement(res?.data);
      })
      .catch((err) => {
        dispatch(handleLoading(false));
      });
  };

  useEffect(() => {
    if (!!filters?.hsCode === true) {
      getGoodMeasurementUnitList();
    }
  }, [filters?.hsCode]);

  return (
    <>
      <>
        <Row>
          <Col sm={24} md={24} xl={24}>
            <TitleBox title="اطلاعات اصلی" />
          </Col>
        </Row>
        <VerticalSpace space="0.5rem" />
        <Row>
          <Col sm={24} md={12} xl={6}>
            <Input
              name="cidCode"
              title="شناسه کالا"
              readOnly={true}
              value={filters?.cidCode}
              onChange={handleChangeInputs}
              validations={[["required"]]}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              name="OrgIDCode"
              title="شناسه سازمان"
              value={filters?.OrgIDCode}
              onChange={handleChangeInputs}
              readOnly={true}
              validations={[["required"]]}
            />
          </Col>
          {filters?.goodsId === 11 ||
            (filters?.pfgCIDTypeTny !== 11 ? (
              <Col sm={24} md={12} xl={6}>
                <Input
                  title="شرح تجاری فارسی"
                  name="commercialDescStr"
                  value={filters?.commercialDescStr}
                  error={errors.commercialDescStr}
                  onChange={handleChangeInputs}
                  readOnly={(!!filters?.OrgIDCode || !!filters?.cidCode) && "readOnly"}
                />
              </Col>
            ) : (
              ""
            ))}
          {filters?.goodsId === 11 || filters?.pfgCIDTypeTny === 11 ? (
            <>
              {/* <Row> */}
              <Col sm={24} md={12} xl={6}>
                <div className="stickedInputs">
                  <Input
                    title="شرح تجاری فارسی"
                    name="commercialDescStr"
                    value={filters?.commercialDescStr}
                    error={errors?.commercialDescStr}
                    onChange={handleChangeInputs}
                    readOnly={(!!filters?.OrgIDCode || !!filters?.cidCode) && "readOnly"}
                    labelWidth="10px"
                    space="0"
                    minWidth="100px"
                  />
                  <AntdInput
                    value={filters?.commercialDesc}
                    onChange={handleChange}
                    name="commercialDesc"
                  />
                </div>
              </Col>
              {/* </Row> */}
              {/* <Col sm={12} md={6} xl={3} style={{ paddingLeft: "30px" }}>
                <AntdInput
                  value={filters?.commercialDesc}
                  onChange={handleChange}
                  name="commercialDesc"
                />
              </Col> */}
            </>
          ) : (
            ""
          )}
          {filters?.goodsId === 11 ||
            (filters?.pfgCIDTypeTny !== 11 && (
              <Col sm={24} md={12} xl={6}>
                <Input
                  title="شرح تجاری لاتین"
                  name="englishDescription"
                  value={filters?.englishDescription}
                  error={errors.englishDescription}
                  onChange={handleChangeInputs}
                  validations={[["required"]]}
                  readOnly={(filters?.hasEnglishCommercialDescription || filters?.hasEnglishDescription) && 'readOnly'}
                />
              </Col>
            ))}

          {filters?.pfgCIDTypeTny === 11 || filters?.goodsId === 11 ? (
            <>
              <Col sm={24} md={12} xl={6}>
                <div className="stickedInputs">
                  <Input
                    title="شرح تجاری لاتین"
                    name="englishDescription"
                    value={filters?.englishDescription}
                    readOnly={(!!filters?.hasEnglishCommercialDescription || !!filters?.hasEnglishDescription) && 'readOnly'}
                    error={errors.englishDescription}
                    onChange={handleChangeInputs}
                    validations={[["required"]]}
                    labelWidth="10px"
                    minWidth="100px"
                  />
                  <AntdInput
                    value={filters?.commercialDescEnStr}
                    onChange={handleChangeMode}
                    name="commercialDescEnStr"
                  />
                </div>
              </Col>
            </>
          ) : (
            ""
          )}
          <Col sm={24} md={12} xl={6}>
            <ComboBox
              title="سال تولید"
              name="productionYear"
              defaultValue={filters?.productionYear}
              error={errors.productionYear}
              onChange={handleChangeInputs}
              options={yearOption}
              validations={[["required"]]}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <ComboBox
              defaultValue={filters?.measurement}
              name="measurement"
              title="واحد اندازه‌گیری"
              onChange={handleChangeInputs}
              options={goodMeasurement}
              error={errors?.measurement}
              validations={[["required"]]}
              optionTitle="msuNameStr"
              optionValue="msuVCodeInt"
              disabled={
                filters?.hasMeasurementFromGoodsIdModal &&
                !!filters?.measurement
              }
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              name="quantity"
              title="مبلغ FOB"
              type="number"
              value={filters?.quantity}
              error={errors.quantity}
              onChange={handleChangeInputs}
              // validations={[["required"], ["decimal", 3]]}
              isCurrency={true}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              title="تخفیف"
              name="Discount"
              type="number"
              value={filters?.Discount}
              onChange={handleChangeInputs}
              error={errors?.Discount}
              // validations={[["required"], ["decimal", 3]]}
              isCurrency={true}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              name="amount"
              title="تعداد/مقدار"
              type="number"
              value={filters?.amount}
              error={errors.amount}
              onChange={handleChangeInputs}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              name="netWeight"
              title="وزن خالص(کیلوگرم)"
              type="number"
              value={filters?.netWeight}
              error={errors.netWeight}
              onChange={handleChangeInputs}
              readOnly={
                (filters?.measurement === 1 ||
                  filters?.measurement === 2 ||
                  filters?.measurement === 20) &&
                "readOnly"
              }
              validations={[
                ["required"],
                ["decimal", 3],
                [
                  "maxValue",
                  filters?.grossWeight || 0,
                  "مقدار مجاز وزن خالص کمتر یا مساوی وزن ناخالص می باشد",
                ],
              ]}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              name="grossWeight"
              title="وزن ناخالص(کیلوگرم)"
              type="number"
              value={filters?.grossWeight}
              onChange={handleChangeInputs}
              error={errors.grossWeight}
              // maxLength={}
              validations={[
                ["required"],
                ["decimal", 3],
                [
                  "minValue",
                  filters?.netWeight || 0,
                  "مقدار مجاز وزن ناخالص بیشتر یا مساوی وزن خالص می باشد",
                ],
              ]}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <ComboBox
              name="packageType"
              title="نوع بسته بندی"
              defaultValue={filters?.packageType}
              options={measurementUnits}
              onChange={handleChangeInputs}
              error={errors.packageType}
              type="number"
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <ComboBox
              name="itemStatus"
              title="وضعیت کالا"
              defaultValue={filters?.itemStatus}
              error={errors.itemStatus}
              options={goodStatus}
              onChange={handleChangeInputs}
              validations={[["required"]]}
            />
          </Col>

          <Col sm={24} md={12} xl={6}>
            <SelectMulti
              title="کشور تولید کننده"
              defaultValue={filters?.Countrie}
              name="Countrie"
              options={listCountries}
              onChange={handleChangeInputs}
              error={errors.Countrie}
              validations={[["required"]]}
              disabled={(!!filters?.hasCountrie || !!filters?.hasProducingCountryMapCode) ? true : false}
            />
          </Col>

          <Col sm={24} md={12} xl={6}>
            <Input
              title="مشخصات فنی"
              value={filters?.technicalSpecifications}
              error={!!filters?.standard === true ? "" : errors.technicalSpecifications}
              name="technicalSpecifications"

              onChange={handleChangeInputs}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              title="استاندارد"
              name="standard"
              value={filters?.standard}
              error={!!filters?.technicalSpecifications === true ? "" : errors.standard}
              onChange={handleChangeInputs}
              validations={[["required"]]}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              name="producersName"
              title="نام تولید کننده"
              value={filters?.producersName}
              error={errors.producersName}
              onChange={handleChangeInputs}
              validations={[["required"]]}
            />
          </Col>
        </Row>
      </>
      {filters?.specialPropertiesList?.length > 0 && (
        <>
          <VerticalSpace space="rem" />
          <Row>
            <Col sm={24} md={24} xl={24}>
              <TitleBox title="اطلاعات ویژگی خاص" />
            </Col>
          </Row>
          <Row>
            <VerticalSpace space="1rem" />
            {filters?.specialPropertiesList?.map((item, index) =>
              item?.oprUIControlerTypeTny === 3 ? (
                <Col sm={24} md={12} xl={12}>
                  <ComboBox
                    name={JSON.stringify(item.oprVCodeInt)}
                    title={`${item?.oprUIDescrptionStr}`}
                    optionTitle="cooNameStr"
                    optionValue="cooNameStr"
                    options={item?.OtherPropertiesContent}
                    onChange={handleChangeInputs}
                    defaultValue={filters[item?.oprVCodeInt]}
                    error={item?.gopIsRequiredTny === 1 ? errors[item?.oprVCodeInt] : []}
                    required={item?.gopIsRequiredTny === 1}
                  // disabled={!!item?.gopValueStr}
                  />
                </Col>
              ) : item?.oprUIControlerTypeTny === 1 ? (
                <Col sm={24} md={12} xl={12}>
                  <Input
                    title={item?.oprUIDescrptionStr}
                    type="text"
                    value={
                      // !!item?.gopValueStr
                      //   ? item?.gopValueStr
                      //   :
                      filters[item?.oprVCodeInt]
                    }
                    name={item?.oprVCodeInt}
                    onChange={handleChangeInputs}
                    error={errors[item?.oprVCodeInt]}
                  // readOnly={!!item?.gopValueStr && "readOnly"}
                  />
                </Col>
              ) : (
                <></>
              )
            )}
          </Row>
        </>
      )}

      <div className="steps-action">
        <Button
          name="register"
          backgroundColor={themeColors.btn.secondary}
          onClick={handelSubmitModal}
        >
          ثبت کالا
        </Button>
        <Button
          name="cancel"
          backgroundColor={themeColors.btn.danger}
          onClick={cancelModal}
        >
          انصراف
        </Button>
      </div>
    </>
  );
};

export default OtherProperties;
