import React, { useState, useEffect } from "react";
import {
  Button,
  ComboBox,
  Input,
  SelectMulti,
  TitleBox,
  VerticalSpace,
} from "../../../../components";
import Select from "react-select";
import themeColors from "../../../../configs/theme";
import Validation from "../../../../utils/Validation";
import { endpoints } from "../../../../services/endpoints";
import { useSelector, useDispatch } from "react-redux";
import {
  handleStepsOfCreatePage,
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import { Col, Row } from "antd";
import axios from "axios";
import BillOfLading from "./BillOfLading";
import WarehouseReceiptDate from "./WarehouseReceipt";
import convert from "../../../../configs/helpers/convert";
import Step3 from "../Step3/Step3";
import { useHistory } from "react-router-dom";
import convertFormat from "../../../../configs/helpers/convertFormat"
import converGregorianDateToJalali from "../../../../configs/helpers/convert-jalali-date-to-gregorian";
import convertJalaliDateToGregorian from "../../../../configs/helpers/convert-jalali-date-to-gregorian";
const Step2 = ({
  tempActivityShimaCodeList,
  goodStatus,
  currency,
  currencyType,
  bank,
  filters,
  setFilters,
  errors,
  setErrors,
  shippingCompany,
  prfVCode,
  measurementUnits,
  listCountries,
  editingId,
  continueFile,
  proxcyConfirm,
  setShippingCompany,
  isContinueMode,
}) => {
  const dispatch = useDispatch();
  const [hasSalesService, setHasSalesService] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [wareHouse, setWareHouse] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [currencSupply, setCurrencSupply] = useState([]);
  const [hasProductCertificate, setHasProductCertificate] = useState(false);
  const [isShowWarehouseReceipt, setIsShowWarehouseReceipt] = useState(false);
  const { stepsOfCreatePage, GUid, role, loading, theme } = useSelector(
    (state) => state
  );
  const history = useHistory();
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

  const next = (e) => {
    e?.preventDefault();
    if (
      permitForNextStep([
        hasSalesService === true && "afterSalesService",
        hasProductCertificate === true && "productionCertificate",
        filters?.hasTransportationCosts === true && "transportationCosts",
        filters?.typeOfCurrencyOperation === 1 && "bank",
        filters?.typeOfCurrencyOperation === 1 && "branch",
        "totalAmountInvoice",
        "currencyType",
        "amountOfDiscount",
        "typeOfCurrencyOperation",
        "transportationCosts",
        "currencySupply",
      ]) === true
    ) {
      manageFinancialInformationProforma();
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
  const handleChangeInputs = (name, value, validationNameList, event) => {
    let temoporaryErrors = {};

    if (name === "totalAmountInvoice") {
      let amountOfDiscountError = Validation.maxValue(
        filters.amountOfDiscount || 0,
        value || 0,
        "مقدار مجاز مبلغ تخفیف کمتر از مبلغ کل پیش فاکتور می‌باشد"
      );
      let transportationCostsError = Validation.maxValue(
        filters.transportationCosts || 0,
        value || 0,
        "مقدار مجاز مبلغ هزینه حمل کمتر از مبلغ کل پیش فاکتور می‌باشد"
      );

      let otherCostsError = Validation.maxValue(
        filters.otherCosts || 0,
        value || 0,
        "مقدار مجاز مبلغ سایر هزینه ها کمتر از مبلغ کل پیش فاکتور می‌باشد"
      );

      temoporaryErrors = {
        amountOfDiscount:
          amountOfDiscountError === true ? [] : [amountOfDiscountError],
        transportationCosts:
          transportationCostsError === true ? [] : [transportationCostsError],
        otherCostsError: otherCostsError === true ? [] : [otherCostsError],
      };
      setFilters((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
    } else if (name === "amountOfDiscount") {
      let totalAmountInvoiceError = Validation.minValue(
        filters?.totalAmountInvoice || 0,
        value || 0,
        "مقدار مجاز مبلغ کل پیش فاکتور بیشتر یا مساوی مبلغ تخفیف می‌باشد"
      );

      if (totalAmountInvoiceError === true) {
        temoporaryErrors = {
          ...temoporaryErrors,
          totalAmountInvoice:
            totalAmountInvoiceError === true ? [] : [totalAmountInvoiceError],
        };
      }
      setFilters((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
    } else if (name === "transportationCosts") {
      let totalAmountInvoiceError = Validation.minValue(
        filters?.totalAmountInvoice || 0,
        value + filters?.otherCosts || 0,
        "مقدار مجاز مبلغ کل پیش فاکتور بیشتر یا مساوی مبلغ هزینه حمل می‌باشد"
      );
      let otherCostsError = Validation.maxValue(
        filters?.otherCosts || 0,
        filters?.totalAmountInvoice - value || 0,
        "مقدار مجاز مبلغ کل پیش فاکتور بیشتر یا مساوی مبلغ سایر هزینه ها می‌باشد"
      );
      temoporaryErrors = {
        ...temoporaryErrors,
        totalAmountInvoice:
          totalAmountInvoiceError === true ? [] : [totalAmountInvoiceError],
        otherCosts: otherCostsError === true ? [] : [otherCostsError],
      };

      setFilters((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
    } else if (name === "otherCosts") {
      let totalAmountInvoiceError = Validation.minValue(
        filters?.totalAmountInvoice || 0,
        value + filters?.transportationCosts || 0,
        "مقدار مجاز مبلغ کل پیش فاکتور بیشتر یا مساوی مبلغ سایر هزینه ها می‌باشد"
      );
      let transportationCostsError = Validation.maxValue(
        filters?.transportationCosts || 0,
        filters?.totalAmountInvoice - value || 0,
        "مقدار مجاز مبلغ هزینه حمل کمتر از مبلغ کل پیش فاکتور می‌باشد"
      );
      temoporaryErrors = {
        ...temoporaryErrors,
        totalAmountInvoice:
          totalAmountInvoiceError === true ? [] : [totalAmountInvoiceError],
        transportationCosts:
          transportationCostsError === true ? [] : [transportationCostsError],
      };
      setFilters((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
    } else if (name === "currencySupply") {
      if (value?.length === 0 || !value) {
        setFilters({
          ...filters,
          carry: undefined,
          freightNumber: undefined,
          freightDate: undefined,
          ghabzNumber: undefined,
          ghabzDate: undefined,
          addNewfreight: undefined,
          addNewghabzAnbar: undefined,
          productionCertificate: undefined,
          afterSalesService: undefined,
          [name]: value,
        });
        setIsShow(false);
        setIsShowWarehouseReceipt(false);
        setHasSalesService(false)
        setHasProductCertificate(false)
      } else {
        handleShowFields(value);
      }
    } else if (name === "typeOfCurrencyOperation") {
      setFilters((prev) => ({
        ...prev,
        carry: undefined,
        freightNumber: undefined,
        freightDate: undefined,
        ghabzNumber: undefined,
        ghabzDate: undefined,
        currencySupply: undefined,
        branch: undefined,
        bank: undefined,
        productionCertificate: undefined,
        afterSalesService: undefined,
        [name]: value,
      }));
      setCurrencSupply([]);
      setIsShow(false);
      setHasSalesService(false);
      setIsShowWarehouseReceipt(false);
      setHasProductCertificate(false);
    } else if (name === "bank") {
      setFilters((prev) => ({
        ...prev,
        bank: value,
        branch: undefined,
      }));
      setBranchList([]);
    } else {
      setFilters((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
    }
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1], item[2]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1], item[2]));
        }
      });

    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
        ...temoporaryErrors,
      };
    });
  };

  const getLccurrencyRoleType = () => {
    dispatch(handleLoading(true));
    const postData = {
      BaseInput: {
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
      CurrencyOpTypeTny: filters?.typeOfCurrencyOperation,
      ProformaLCCurrencyRoleType: 1,
      ErrorCode: 0,
      ErrorDesc: "",
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.GeneralData.getLccurrencyRoleType.url,
      method: endpoints.RestAPIs.GeneralData.getLccurrencyRoleType.method,
      data: postData,
    })
      .then((res) => {
        const tempSuply = [];
        res?.data.map((item) => {
          tempSuply.push({
            name: item.lrtlctNameStr,
            id: `${item?.lrtlctVcodeInt}//${item?.lrtlctBOLDate}//${item?.lrtlctGhabzAnbarDate}//${item?.lrtHasProductCertificateNo}`,
          });
        });

        setCurrencSupply(tempSuply);

        const temporary1 = res?.data.filter(
          (item) =>
            item.lrtlctHasBOL === true ||
            item?.lrtlctHasGhabzAnbar === true ||
            item?.lrtlctVcodeInt === 56 ||
            item?.lrtHasProductCertificateNo === true
        );
        let temporaryFilters = {};
        if (!!editingId) {
          let newCurrencySupplyObject = res?.data?.filter((item) =>
            filters?.currencySupplyBackup?.includes(item?.lrtlctVcodeInt)
          );

          let newCurrencySupply = [];
          newCurrencySupplyObject.map((item) => {
            newCurrencySupply.push(
              `${item?.lrtlctVcodeInt}//${item?.lrtlctBOLDate}//${item?.lrtlctGhabzAnbarDate}//${item?.lrtHasProductCertificateNo}`
            );
          });
          temporaryFilters = {
            currencySupply: newCurrencySupply,
          };
        }

        setFilters((prev) => ({
          ...prev,
          ...temporaryFilters,
          temporary: temporary1,
        }));
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        dispatch(handleLoading(false));
      });
  };

  const getBankAddressList = () => {
    const postData = filters?.bank;
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.GeneralData.getBankAddressList.url,
      method: endpoints.RestAPIs.GeneralData.getBankAddressList.method,
      data: postData,
    })
      .then((res) => {
        setBranchList(res.data.BankList);
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };


  filters?.addNewghabzAnbar?.map(item =>

    console.log(convertJalaliDateToGregorian(item?.ghabzDate), "ghabzDate")
  )

  const manageFinancialInformationProforma = () => {
    let tempCurrencySupply = filters?.currencySupply?.map(
      (item) => item?.split("//")[0]
    );
    setFilters({
      ...filters,
      lctVCodeLst: tempCurrencySupply,
      billOfLadingList: filters?.addNewfreight,
      warehouseReceiptList: filters?.addNewghabzAnbar,
    });
    const postData = {
      //بارنامه های پرونده
      ProformaBillOfLoadingList:
        isShow && !!filters?.addNewfreight
          ? filters?.addNewfreight?.map((item) => ({
            //شرکت حمل
            pbltpcVCodeInt: item?.carry,
            //شماره بارنامه
            pblBOLNoStr: item?.freightNumber,
            // تاریخ بارنامه
            pblBOLDate: convert(item?.freightDate),
          }))
          : [],

      // قبض انبارهای پرونده
      ProformaWarehouseList:
        isShowWarehouseReceipt && !!filters?.addNewghabzAnbar
          ? filters?.addNewghabzAnbar?.map((item) => ({
            pgaGhabzNoStr: item?.ghabzNumber,
            pgaGhabzDate: convertJalaliDateToGregorian(item?.ghabzDate),
          }))
          : [],
      //لیست محل تامین ارز
      lctVCodeLst: tempCurrencySupply,
      //شماره پرونده
      prfVCodeInt: prfVCode,
      //	نوع قرار داد,
      prfcntVCodeInt: 0,
      //مبلغ تخفیف
      prfDiscountMny:
        // filters?.amountOfDiscount === undefined ? 0 :
        filters?.amountOfDiscount,
      // سایر هزینه ها
      prfOtherCostMny:
        // filters?.otherCosts === undefined ? 0 : 
        filters?.otherCosts,
      // هزینه حمل
      prfFreightCostMny:
        // filters?.transportationCosts === undefined
        //   ? 0
        //   :
        filters?.transportationCosts,
      // مجموع هزینه ها
      prfTotalPriceMny:
        // filters?.totalAmountInvoice === undefined
        //   ? 0
        //   : 
        filters?.totalAmountInvoice,
      // بانکی یا غیر بانکی
      prfIsBankOPTny: filters?.typeOfCurrencyOperation,
      //نوع ارز
      prfcurVCodeInt: +filters?.currencyType,
      // گواهی تولید  جیسون
      prfproductCertificateNo: !!filters?.productionCertificate
        ? filters?.productionCertificate
        : "",
      //گارانتی
      prfpcaVCodeInt: filters?.afterSalesService,
      //بانک
      bnkVcodeInt: filters?.bank || 0,
      prfimtVCodeInt: 0,
      //شعبه جیسون
      bchbnkCodeStr: !!filters?.branch ? filters?.branch : 0,
      prfpaymentType: 0,
      // شماره ثبت سفارش
      prfReferenceOrderRegistrationStr: "",
      prfReferenceDeclarationSerialStr: "",
      //کد نقش
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.manageFinancialInformationProforma.url,
      method:
        endpoints.RestAPIs.Proforma.manageFinancialInformationProforma.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          dispatch(
            handleStepsOfCreatePage({ NEF: stepsOfCreatePage?.NEF + 1 })
          );
        }

        dispatch(handleLoading(false));
      })
      .catch((err) => {
        dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe: JSON.stringify(err?.data?.ErrorDesc),
          })
        );

        dispatch(handleLoading(false));
      });
  };


  const handleShowFields = (data) => {
    const temp = [];
    const currencySupplyBackup = data.map((item) =>
      Number(item.split("//")[0])
    );
    let tempShow;
    let tempGhabzeAnbar;
    let tempSalesService;
    let tempProductCertificate;
    data?.map((item) => temp?.push(Number(item?.split("//")[0])));

    let hasBOL = filters?.temporary
      ?.map((item) =>
        item.lrtlctHasBOL === true ? item?.lrtlctVcodeInt : null
      )
      ?.filter((item) => item !== null);

    hasBOL?.map((item) => {
      if (temp?.includes(item)) {
        tempShow = true;
      }
    });

    let hasGhabzeAnbar = filters?.temporary
      ?.map((item) =>
        item?.lrtlctHasGhabzAnbar === true ? item?.lrtlctVcodeInt : null
      )
      .filter((item) => item !== null);

    hasGhabzeAnbar?.map((item) => {
      if (temp?.includes(item)) {
        tempGhabzeAnbar = true;
      }
    });

    let hasProductCertificate = filters?.temporary
      ?.map((item) =>
        item?.lrtHasProductCertificateNo === true ? item?.lrtlctVcodeInt : null
      )
      .filter((item) => item !== null);

    hasProductCertificate?.map((item) => {
      if (temp?.includes(item)) {
        tempProductCertificate = true;
      }
    });

    let hasSalesServic = filters?.temporary
      ?.map((item) =>
        item?.lrtlctVcodeInt === 56 ? item?.lrtlctVcodeInt : null
      )
      .filter((item) => item !== null);
    hasSalesServic?.map((item) => {
      if (temp?.includes(item)) {
        tempSalesService = 56;
      }
    });

    let temporaryFilters = {};
    if (tempShow) {
      setIsShow(true);
    } else {
      setIsShow(false);
      temporaryFilters = {
        addNewfreight: [],
      };
    }
    let temporaryGhabzeAnbar = {};
    if (tempGhabzeAnbar) {
      setIsShowWarehouseReceipt(true);

    } else {
      setIsShowWarehouseReceipt(false);
      temporaryGhabzeAnbar = {
        addNewghabzAnbar: [],
      };
    }

    let temporaryProductCertificate = {}
    if (tempProductCertificate) {
      setHasProductCertificate(true);
    } else {
      setHasProductCertificate(false);
      temporaryProductCertificate = {
        productionCertificate: undefined
      }
    }
    let temporaryHasSalesService = {}
    if (tempSalesService === 56) {
      setHasSalesService(true);
    } else {
      setHasSalesService(false);
      temporaryHasSalesService = {
        afterSalesService: undefined
      }
    }
    setFilters({
      ...filters,
      billOfLadingDate: data?.map(
        (item) => item?.split("//")[1]?.split("T")[0]
      ),
      warehouseReceipt: data?.map(
        (item) => item?.split("//")[2]?.split("T")[0]
      ),
      currencySupply: data,
      ...temporaryFilters,
      ...temporaryGhabzeAnbar,
      ...temporaryProductCertificate,
      ...temporaryHasSalesService,
      currencySupplyBackup: currencySupplyBackup,
    });


  };

  useEffect(() => {
    if (!!filters?.bank) {
      getBankAddressList();
    }
  }, [filters?.bank]);

  useEffect(() => {
    if (!!filters?.typeOfCurrencyOperation) {
      getLccurrencyRoleType();
    }
  }, [filters?.typeOfCurrencyOperation]);

  useEffect(() => {
    if (stepsOfCreatePage.NEF === 2 && filters?.currencySupply?.length > 0) {
      handleShowFields(filters?.currencySupply);
    }
  }, [stepsOfCreatePage.NEF, filters?.currencySupply?.length]);

  // useEffect(() => {
  //   setFilters({
  //     ...filters,
  //     otherCosts: 0,
  //     amountOfDiscount: 0,
  //     totalAmountInvoice: 0,
  //     transportationCosts: 0,
  //   });
  // }, []);
  return (
    <>
      {stepsOfCreatePage?.NEF === 2 && (
        <>
          <form className="form">
            <VerticalSpace space="1rem" />
            <Row>
              <Col sm={24} md={12} xl={6}>
                <TitleBox title="اطلاعات مالی و بانکی" />
              </Col>
            </Row>
            <VerticalSpace space="1rem" />
            <Row>
              <Col m={24} md={24} xl={12}>
                <Input
                  name="totalAmountInvoice"
                  title="مبلغ کل پیش فاکتور"
                  onChange={handleChangeInputs}
                  value={filters?.totalAmountInvoice}
                  error={errors?.totalAmountInvoice}
                  labelWidth="165px"
                  type="number"
                  isCurrency={true}
                  validations={[
                    ["required"],
                    ["decimal", 3],
                    [
                      "minValue",
                      filters?.transportationCosts + filters?.otherCosts || 0,
                      "مقدار مجاز مبلغ کل پیش فاکتور بیشتر یا مساوی مجموع هزینه حمل و سایر هزینه‌ها می‌باشد",
                    ],
                    [
                      "minValue",
                      filters?.amountOfDiscount || 0,
                      "مقدار مجاز مبلغ کل پیش فاکتور بیشتر یا مساوی مبلغ تخفیف می‌باشد",
                    ],
                  ]}
                />
              </Col>
              <Col sm={24} md={24} xl={12}>
                <ComboBox
                  title="نوع ارز"
                  name="currencyType"
                  defaultValue={filters?.currencyType}
                  error={errors?.currencyType}
                  onChange={handleChangeInputs}
                  options={currency}
                  required="true"
                  width="165px"
                />
              </Col>
            </Row>
            <Row>
              <Col m={24} md={24} xl={12}>
                <Input
                  name="amountOfDiscount"
                  title="مبلغ تخفیف"
                  onChange={handleChangeInputs}
                  value={filters?.amountOfDiscount}
                  error={errors?.amountOfDiscount}
                  type="number"
                  isCurrency={true}
                  labelWidth="165px"
                  validations={[
                    ["required"],
                    ["decimal", 3],
                    [
                      "maxValue",
                      filters?.totalAmountInvoice || 0,
                      "مقدار مجاز مبلغ تخفیف کمتر از مبلغ کل پیش فاکتور می‌باشد",
                    ],
                  ]}
                />
              </Col>
            </Row>

            <Row>
              <Col sm={24} md={24} xl={12}>
                <ComboBox
                  title="نوع عملیات ارزی"
                  name="typeOfCurrencyOperation"
                  defaultValue={filters?.typeOfCurrencyOperation}
                  error={errors?.typeOfCurrencyOperation}
                  onChange={handleChangeInputs}
                  options={currencyType}
                  optionTitle="cotNameStr"
                  optionValue="cotVCodeInt"
                  required="true"
                  width="165px"
                />
              </Col>
            </Row>
            {filters?.typeOfCurrencyOperation === 1 && (
              <Row>
                <Col sm={24} md={24} xl={12}>
                  <ComboBox
                    title="بانک"
                    name="bank"
                    defaultValue={filters?.bank}
                    error={errors?.bank}
                    onChange={handleChangeInputs}
                    options={bank}
                    required="true"
                    width="165px"
                  />
                </Col>
                <Col sm={24} md={24} xl={12}>
                  <ComboBox
                    title="شعبه"
                    name="branch"
                    defaultValue={filters?.branch}
                    error={errors?.branch}
                    onChange={handleChangeInputs}
                    options={branchList}
                    optionTitle="BankName"
                    optionValue="BankCode"
                    required="true"
                    width="165px"
                  />
                </Col>
              </Row>
            )}
            <Row>
              <Col sm={24} md={24} xl={12}>
                <SelectMulti
                  title="تامین ارز"
                  name={"currencySupply"}
                  defaultValue={filters?.currencySupply}
                  error={errors?.currencySupply}
                  onChange={handleChangeInputs}
                  options={currencSupply}
                  required="true"
                  width="165px"
                />
              </Col>
            </Row>
            <Row>
              {filters?.hasTransportationCosts === true && (
                <Col m={24} md={24} xl={12}>
                  <Input
                    name="transportationCosts"
                    title="هزینه حمل"
                    onChange={handleChangeInputs}
                    value={filters?.transportationCosts}
                    error={errors?.transportationCosts}
                    type="number"
                    labelWidth="165px"
                    isCurrency={true}
                    validations={[
                      ["required"],
                      ["decimal", 3],
                      [
                        "maxValue",
                        filters?.totalAmountInvoice - filters?.otherCosts || 0,
                        "مقدار مجاز مبلغ هزینه حمل کمتر از مبلغ کل پیش فاکتور می‌باشد",
                      ],
                    ]}
                  />
                </Col>
              )}

            </Row>

            <Row>
              {hasProductCertificate && (
                <Col m={24} md={24} xl={12}>
                  <Input
                    name="productionCertificate"
                    title="گواهی تولید"
                    onChange={handleChangeInputs}
                    value={filters?.productionCertificate}
                    error={errors?.productionCertificate}
                    labelWidth="165px"
                    type="number"
                    validations={[["digits", 15]]}
                  />
                </Col>
              )}

              <Col m={24} md={24} xl={12}>
                <Input
                  name="otherCosts"
                  title="سایر هزینه ها"
                  onChange={handleChangeInputs}
                  value={filters?.otherCosts}
                  error={errors?.otherCosts}
                  type="number"
                  labelWidth="165px"
                  isCurrency={true}
                  validations={[
                    ["required"],
                    ["decimal", 3],
                    [
                      "maxValue",
                      filters?.totalAmountInvoice -
                      filters?.transportationCosts || 0,
                      "مقدار مجاز مبلغ سایر هزینه ها کمتر از مبلغ کل پیش فاکتور می‌باشد",
                    ],
                  ]}
                />
              </Col>

              {hasSalesService ? (
                <Col m={24} md={24} xl={12}>
                  <ComboBox
                    title="نام کالا جهت ارائه خدمات پس از فروش"
                    name="afterSalesService"
                    defaultValue={filters?.afterSalesService}
                    error={errors?.afterSalesService}
                    onChange={handleChangeInputs}
                    optionTitle="pcaDescriptionStr"
                    optionValue="pcaVCodetny"
                    options={proxcyConfirm}
                    type="number"
                    width="100px"
                  />
                </Col>
              ) : (
                ""
              )}
            </Row>

            {filters?.currencySupply?.length > 0 && isShowWarehouseReceipt ? (
              <WarehouseReceiptDate filters={filters} setFilters={setFilters} />
            ) : (
              ""
            )}
            <VerticalSpace space="2rem" />

            {filters?.currencySupply?.length > 0 && isShow ? (
              <BillOfLading
                shippingCompany={shippingCompany}
                setShippingCompany={setShippingCompany}
                filters={filters}
                setFilters={setFilters}
              />
            ) : (
              ""
            )}
          </form>
          <div className="document-show ">
            <span className="document-show--container__status ">
              <span className="document-show--container__status-title ">
                وضعیت پرونده:
              </span>
              <span className="document-show--container__status-name ">
                {!!editingId ? filters?.statusName : "پیش نویس"}
              </span>
            </span>
            <span className="document-show--container">
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
                  className="next-btn-step"
                  onClick={next}
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

      {(stepsOfCreatePage?.NEF > 3 || stepsOfCreatePage?.NEF === 3) && (
        <Step3
          isContinueMode={isContinueMode}
          tempActivityShimaCodeList={tempActivityShimaCodeList}
          goodStatus={goodStatus}
          subProcedure={filters?.subProcedure}
          currency={currency}
          currencyType={currencyType}
          bank={bank}
          inputsData={filters}
          setInputsData={setFilters}
          setErrors={setErrors}
          errors={errors}
          shippingCompany={shippingCompany}
          prfVCode={prfVCode}
          measurementUnits={measurementUnits}
          listCountries={listCountries}
          editingId={editingId}
          wareHouse={wareHouse}

        />
      )}
    </>
  );
};

export default Step2;
