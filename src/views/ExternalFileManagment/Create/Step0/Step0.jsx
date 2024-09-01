import axios from "axios";
import Step1 from "../Step1/Step1";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Tooltip, Col, Row } from "antd";
import themeColors from "../../../../configs/theme";
import React, { useState, useEffect } from "react";
import Validation from "../../../../utils/Validation";
import { useSelector, useDispatch } from "react-redux";
import QuickGuide from "../../../../components/QuickGuide";
import { endpoints } from "../../../../services/endpoints";
import convert from "../../../../configs/helpers/convert";
import {
  TitleBox,
  ComboBox,
  Input,
  VerticalSpace,
  DatePicker,
  Button,
  SelectMulti,
} from "../../../../components";
import {
  handleLoading,
  handleMessageModal,
  handleStepsOfCreatePage,
  HandleDetailId
} from "../../../../state/action-creators";
import { utils } from "react-modern-calendar-datepicker";
import TwoInputs from "../../../../components/TwoInputs";

const Step0 = ({ editingId, isContinueMode }) => {
  const dispatch = useDispatch();
  const [bank, setBank] = useState();
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({ totalAmountInvoice: 0, amountOfDiscount: 0, transportationCosts: 0, otherCosts: 0, status: 0 });
  const [currency, setCurrency] = useState({});
  const [typeFida, setTypeFida] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [shimaCode, setShimaCode] = useState({});
  const [goodStatus, setGoodStatus] = useState({});
  const [iranBorder, setIranBorder] = useState({});
  const [iranCustoms, setIranCustoms] = useState({});
  const [productType, setProductType] = useState({});
  const [currencyType, setCurrencyType] = useState({});
  const [contractType, setContractTypes] = useState({});
  const [listCountries, setListCountries] = useState({});
  const [transportFleet, setTransportFleet] = useState({});
  const [shippingMethod, setShippingMethod] = useState({});
  const [shippingCompany, setShippingCompany] = useState([]);
  const [measurementUnits, setMeasurementUnits] = useState({});
  const [proxcyConfirm, setProxcyConfirm] = useState([]);
  const [contractTypeAndTransportTypes, setContractTypeAndTransportTypes] =
    useState([]);
  const [iranBorderTransportTypes, setIranBorderTransportTypes] = useState([]);
  const { stepsOfCreatePage, GUid, role, detailId } = useSelector((state) => state);
  const [prfVCode, setPrfVCode] = useState();

  const steps = [
    {
      element: "#Table",
      intro:
        "کاربر گرامی این فرم برای افزودن و یا ویرایش پرونده طراحی شده است.شامل 5 مرحله می باشد و شما نیز می بایست فیلدهای ضروری را تکمیل نمایید.",
      position: "right",
    },
    {
      element: "#typeOfForeignSeller",
      intro:
        "کاربر گرامی ابتدا نوع فروشنده خارجی را انتخاب کرده، سپس از فیلد های نمایان شده با جستجوی شناسه فروشنده خارجی و انتخاب فروشنده بقیه فیلدهای نمایان شده را پر میکنید.",
      position: "right",
    },
    {
      element: "#FileInformation",
      intro:
        "این فیلد ها را نیز مطابق برچسب پر نمایید.پر کردن فیلدها الزامی هست.",

      position: "right",
    },
    {
      element: "#Next",
      intro:
        "پس از اتمام این مرحله و پر کردن فیلدها، برای رفتن به مرحله بعد این دکمه را کلیک نمایید.",
      position: "right",
    },
    {
      element: "#Dissuasion",
      intro: "با زدن این دکمه به صفحه ای که از آن آمدید، ارجاع داده می شوید.",
      position: "right",
    },
  ];

  const maximumDate = utils()?.getToday();
  const minimumDate = utils()?.getToday();

  const ItemModalHandler = (event) => {
    event.preventDefault();
    setEnabled(!enabled);
  };

  const handleChangeInputs = (name, value, validationNameList, event) => {
    if (name === "DateF") {
      if (Validation.minimumDateEn(filters?.DateT, value) === true) {
        setErrors({
          ...errors,
          DateT: [],
        });
      } else {
        setErrors({
          ...errors,
          DateT: Validation.minimumDateEn(filters?.DateT, value),
        });
      }
    } else if (name === "DateT") {
      if (Validation.maximumDateEn(filters?.DateF, value) === true) {
        setErrors({
          ...errors,
          DateF: [],
        });
      } else {
        setErrors({
          ...errors,
          DateF: Validation.maximumDateEn(filters?.DateF, value),
        });
      }
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
      };
    });
    setFilters((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };

  const handleValidation = (inputsName = []) => {
    const err = { ...errors };
    inputsName.map((item) => {
      if (
        filters[item] === undefined ||
        filters[item] === null |
        JSON.stringify(filters[item])?.trim() === ""
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
      if (error[key]?.length > 0) {
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
        filters?.activityId === undefined ? "activityId" : [],
        "TypeOfImportedGoods",
        "numberInvoice",
        "beneficiaryCountry",
        "DateF",
        "DateT",
        "typeOfForeignSeller",
        "nameSeller",
        "phoneNumber",
        "address",
      ]) === true
    ) {
      insertFreezonesFIDA();
    } else {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: "لطفا تمامی اطلاعات مربوط را با مقادیر مجاز تکمیل فرمایید.",
        })
      );
    }
  };

  const InitializeProformaStaticData = () => {
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.initializeProformaStaticData.url,
      method: endpoints.RestAPIs.Proforma.initializeProformaStaticData.method,
      data: postData,
    })
      .then((res) => {
        const optionsStatus = [];
        const optionTypeFida = [];
        const optioncontractType = [];
        const optionTransportFleet = [];
        const optionShippingMethods = [];
        const currencyOption = [];
        const bankOptions = [];
        const measurementUnits = [];
        const goodsStatus = [];
        if (res.data?.ErrorCode === 0) {
          const goodsTemp = Object.entries(res?.data?.Result?.goodsStatus);
          goodsTemp.map((item) =>
            goodsStatus.push({ id: item[0], name: item[1] })
          );
          const bankTemp = Object.entries(res?.data?.Result?.banks);
          bankTemp.map((item) =>
            bankOptions.push({ id: item[0], name: item[1] })
          );
          const currencyTemp = Object.entries(res?.data?.Result?.currencies);
          currencyTemp.map((item) =>
            currencyOption.push({ id: item[0], name: item[1] })
          );
          const optionTemp = Object.entries(res?.data?.Result?.countries);
          optionTemp.map((item) =>
            optionsStatus.push({ id: item[0], name: item[1] })
          );
          const optionFida = Object.entries(res?.data?.Result?.fidaType);
          optionFida.map((item) =>
            optionTypeFida.push({ id: item[0], name: item[1] })
          );
          const optionTransport = Object.entries(
            res?.data?.Result?.transportFleet
          );
          optionTransport.map((item) =>
            optionTransportFleet.push({ id: item[0], name: item[1] })
          );
          const contract = Object.entries(res?.data?.Result?.contractTypes);
          contract.map((item) =>
            optioncontractType.push({ id: item[0], name: item[1] })
          );
          const shippingMethods = Object.entries(
            res?.data?.Result?.transportTypes
          );
          shippingMethods.map((item) =>
            optionShippingMethods.push({ id: item[0], name: item[1] })
          );
          setContractTypeAndTransportTypes(
            res?.data?.Result?.contractTypes_transportTypes
          );
          setIranBorderTransportTypes(
            res?.data?.Result?.iranBorderTransportTypes
          );
          const measurementOption = Object.entries(
            res?.data?.Result.measurementUnits
          );
          measurementOption.map((item) =>
            measurementUnits.push({ id: item[0], name: item[1] })
          );

          setGoodStatus(goodsStatus);
          setMeasurementUnits(measurementUnits);
          setShippingCompany(
            res?.data?.Result?.transportationCompanies.map((item) => ({
              tpcNameStr: item?.tpcNameStr,
              tpcVCodeInt: item?.tpcVCodeInt,
            }))
          );
          setBank(bankOptions);
          setIranBorder(res?.data?.Result?.iranBorder);
          setIranCustoms(res?.data?.Result?.iranCustoms);
          setCurrencyType(res?.data?.Result?.currencyOperationTypes);
          setCurrency(currencyOption);
          setShippingMethod(optionShippingMethods);
          setContractTypes(optioncontractType);
          setTransportFleet(optionTransportFleet);
          setTypeFida(optionTypeFida);
          setListCountries(optionsStatus);
          setProductType(res?.data?.Result?.importGoodsType);
          setShimaCode(res?.data?.Result?.activityShimaCode);
          setProxcyConfirm(res?.data?.Result?.ProxyConfirmerAgent);
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
          dispatch(handleLoading(false));
        }
      })
      .catch((err) => {
        dispatch(handleLoading(false));
      });
  };

  const insertFreezonesFIDA = () => {
    dispatch(handleLoading(true));

    const postData = {
      FIDADetail: {
        FIDACodeStr: "",
        FName: "",
        LName: filters?.nameSeller,
        Address: filters.address,
        RegisterNumber: "",
        AddressTel: filters?.phoneNumber,
        Country: "",
        FidaType: filters?.typeOfForeignSeller,
        ErrorCode: 0,
        ErrorDesc: "",
      },
      urlVCodeInt: role,
      session: GUid,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.insertFreezonesFIDA.url,
      method: endpoints.RestAPIs.Proforma.insertFreezonesFIDA.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.ErrorCode === 0) {
          manageBaseInformationProforma(res?.data?.Result);
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
          dispatch(handleLoading(false));
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        dispatch(handleLoading(false));
      });
  };

  const manageBaseInformationProforma = (data) => {
    dispatch(handleLoading(true));
    const tempActivityShimaCodeList = [];
    shimaCode?.map((item) => {
      if (filters?.activityId.includes(item?.ZoneCode)) {
        tempActivityShimaCodeList.push({
          ActivityGroupCode: item.ActivityGroupCode,
          ActivityGroupName: item.ActivityGroupName,
          BusinessActivity: item.BusinessActivity,
          Code: item?.Code,
          ZoneCode: item?.ZoneCode,
          ZoneName: item?.ZoneName,
        });
      }
    });
    setFilters({
      ...filters,
      FidaVCodeIntCode: data,
      ActivityShimaCodeListCode: tempActivityShimaCodeList,
    });
    const postData = {
      // شماره پرونده
      prfVCodeInt: !!editingId ? editingId : prfVCode || 0,
      // شماره پیش فاکتور
      ProformaNumberStr: filters?.numberInvoice,
      //کشور ذینفع int
      BeneficiaryCountryProformaInt: filters?.beneficiaryCountry,
      //تاریخ صدور
      IssueDateProformaStr: convert(filters?.DateF),
      // تاریخ انقضا
      ExpiriationDateProformaStr: convert(filters?.DateT),
      FidaVCodeInt: data || filters?.FidaVCodeIntCode,
      //شناسه کسب و کار
      BusinessIDStr: "",
      //کد نوع ثبت سفارش
      prfromVCodeInt: 0,
      // نوع کالای وارداتی
      prfImportGoodsType: filters?.TypeOfImportedGoods,
      prfProvinceCodeInt: null,
      // نوع واحد فعالیت
      prfProvinceTypeInt: 0,
      ProformaActivityUnitVM: {},
      // کد شیما
      ActivityShimaCodeList: tempActivityShimaCodeList,
      EnegyLicensesList: {},
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.manageBaseInformationProforma.url,
      method: endpoints.RestAPIs.Proforma.manageBaseInformationProforma.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setPrfVCode(res?.data?.Result);
          dispatch(
            handleStepsOfCreatePage({ NEF: stepsOfCreatePage?.NEF + 1 })
          );
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe: JSON.stringify(err?.response?.data?.title),
          })
        );

        dispatch(handleLoading(false));
      });
  };

  const getRegedOrderDetail = () => {
    dispatch(handleLoading(true));
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: editingId,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.getRegedOrderDetail.url,
      method: endpoints.RestAPIs.Proforma.getRegedOrderDetail.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          const newCurrencySupply =
            res?.data?.Result?.proformaStruct?.PrfCurrencyTypeList?.map(
              (item) => {
                return item?.lctVCodeInt;
              }
            );
          const Shipment = res?.data?.Result?.proformaStruct?.prftptList?.map(
            (item) => {
              return JSON.stringify(item?.tptVCodeInt);
            }
          );
          const Country = res?.data?.Result?.proformaStruct?.prfSourseList?.map(
            (item) => {
              return JSON.stringify(item?.prfSourceInt);
            }
          );
          const destination =
            res?.data?.Result?.proformaStruct?.prfctmList?.map((item) => {
              return item?.ctmVCodeInt;
            });
          const entrance =
            res?.data?.Result?.proformaStruct?.prfBordersList?.map((item) => {
              return item?.prfBorderInt;
            });
          const newShimaCode =
            res?.data?.Result?.proformaStruct?.ActivityShimaCodeList.map(
              (item) => {
                return item.ZoneCode;
              }
            );
          const dataDateF = res?.data?.Result?.proformaStruct?.prfDate;
          const dataDateT = res?.data?.Result?.proformaStruct?.prfExpireDate;
          const tempF = dataDateF?.split(" ")[0];
          const date = tempF.split("/");
          let datepickerF = {
            year: Number(date[2]),
            month: Number(date[0]),
            day: Number(date[1]),
          };
          const tempT = dataDateT.split(" ")[0];
          const dateT = tempT.split("/");
          let datepickerT = {
            year: Number(dateT[2]),
            month: Number(dateT[0]),
            day: Number(dateT[1]),
          };
          const tempDate = res?.data?.Result?.proformaStruct?.profGhabzAnbarStruct?.map(item => { return item?.pgaGhabzDate });
          const tempDataMap = tempDate?.map(item => { return item })
          // const splitDateOfWarehouseReceipt = tempDataMap?.split("/");
          // const dateWarehouseReceipt= {
          //   year: Number(splitDateOfWarehouseReceipt[2]),
          //   month: Number(splitDateOfWarehouseReceipt[0]),
          //   day: Number(splitDateOfWarehouseReceipt[1]),
          // }

          res?.data?.Result?.proformaStruct?.profBOLsStruct?.map(item => {
            // billOfLading = item?.pblBOLDate
          })
          setFilters({
            branch: Number(
              res?.data?.Result?.proformaStruct?.prfbchBranchCodeStr
            ),
            currencyType: JSON.stringify(
              res?.data?.Result?.proformaStruct?.prfCurrencyTypeTny
            ),
            totalAmountInvoice:
              res?.data?.Result?.proformaStruct?.prfTotalPriceMny,
            amountOfDiscount: res?.data?.Result?.proformaStruct?.prfDiscountFlt,
            typeOfCurrencyOperation:
              res?.data?.Result?.proformaStruct?.prfIsBankOPTny,
            TypeOfImportedGoods: JSON.stringify(
              res?.data?.Result?.proformaStruct?.importGoodsTypeId
            ),
            phoneNumber: res?.data?.Result?.proformaStruct?.fdrPhoneStr,
            currencySupplyBackup: newCurrencySupply,
            transportationCosts:
              res?.data?.Result?.proformaStruct?.prfFreightCostMny,
            otherCosts: res?.data?.Result?.proformaStruct?.prfOtherCostMny,
            nameSeller: res?.data?.Result?.proformaStruct?.FIDANameEnStr,
            numberInvoice: res?.data?.Result?.proformaStruct?.prfNumberStr,
            typeOfForeignSeller: JSON.stringify(
              res?.data?.Result?.proformaStruct?.FIDAType
            ),
            beneficiaryCountry: (
              JSON?.stringify(res?.data?.Result?.proformaStruct?.prfcnyVCodeTnyBeneficiary)
            ),
            // prfCountryNameStr:
            address: res?.data?.Result?.proformaStruct?.fidaAddress,
            activityId: newShimaCode,
            DateF: datepickerF,
            DateT: datepickerT,
            bank: JSON.stringify(
              res?.data?.Result?.proformaStruct?.prfbnkVCodeInt
            ),
            contractType: JSON.stringify(
              res?.data?.Result?.proformaStruct?.prfcntVCodeTny
            ),
            shippingMethods: Shipment,
            carryOften: res?.data?.Result?.proformaStruct?.prfTransportCountTny,
            onePieceShipping:
              res?.data?.Result?.proformaStruct?.prfDirectTransportTny,
            EntranceBorder: entrance,
            DestinationCustoms: destination,
            CountryOfOriginOfShipment: Country,
            LoadingPlace: res?.data?.Result?.proformaStruct?.prfLoadingPlaceStr,
            TransportFleet: JSON.stringify(
              res?.data?.Result?.proformaStruct?.prfTransportNationTypeTny
            ),
            productionCertificate: res?.data?.Result?.proformaStruct?.prfProductCertificateNo,
            status: res?.data?.Result?.proformaStruct?.prfStatusTny,
            level: res?.data?.Result?.proformaStruct?.prfLevelStr,
            statusName: res?.data?.Result?.proformaStruct?.prfStatusStr,
            addNewfreight: res?.data?.Result?.proformaStruct?.profBOLsStruct?.map(
              item => {
                const temporaryDateaddNewfreight = item?.pblBOLDate?.split('T');
                const splitDate = temporaryDateaddNewfreight[0]?.split('-')
                return {
                  freightDate: {
                    year: Number(splitDate[0]),
                    month: Number(splitDate[1]),
                    day: Number(splitDate[2]),
                  }, carry: item?.tpcVCodeInt, freightNumber: item?.pblBOLNoStr
                }
              }),
            addNewghabzAnbar: res?.data?.Result?.proformaStruct?.profGhabzAnbarStruct?.map(item => {
              const temporaryDate = item?.pgaGhabzDate?.split('/')
              return {
                ghabzDate: {
                  year: Number(temporaryDate[0]),
                  month: Number(temporaryDate[1]),
                  day: Number(temporaryDate[2]),
                }, ghabzNumber: item?.pgaGhabzNoStr
              }
            }),
            afterSalesService: res?.data?.Result?.proformaStruct?.prfpcaVCodeInt,


          });
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
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
  useEffect(() => {
    InitializeProformaStaticData();
  }, []);

  useEffect(() => {
    if (!!editingId) {
      getRegedOrderDetail();
    }
  }, [!!editingId]);
  return (
    <>
      {stepsOfCreatePage?.NEF === 0 && (
        <QuickGuide enabled={enabled} setEnabled={setEnabled} steps={steps}>
          <form className="form">
            <VerticalSpace space="0.5rem" />
            <Row>
              <Col sm={24} md={12} xl={6}>
                <Input
                  title="سطح دسترسی"
                  readOnly={"readonly"}
                  value={!!editingId ? filters?.level : "کامل"}
                />
              </Col>
            </Row>
            <VerticalSpace space="1rem" />
            <Row>
              <Col sm={24} md={24} xl={24}>
                <TitleBox title="اطلاعات پرونده" />
              </Col>
            </Row>
            <VerticalSpace space="0.5rem" />
            <div id="FileInformation">
              <Row>
                <Col sm={24} md={24} xl={12}>
                  <ComboBox
                    name="TypeOfImportedGoods"
                    title="نوع کالای وارداتی"
                    required="true"
                    onChange={handleChangeInputs}
                    defaultValue={filters?.TypeOfImportedGoods}
                    error={errors?.TypeOfImportedGoods}
                    width="200px"
                    optionTitle="IgtNameStr"
                    optionValue="IgtCodeStr"
                    options={productType}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={24} md={24} xl={12}>
                  <Input
                    name="numberInvoice"
                    title="شماره پیش فاکتور"
                    onChange={handleChangeInputs}
                    value={filters?.numberInvoice}
                    error={errors.numberInvoice}
                    required="true"
                  />
                </Col>
                <Col sm={24} md={24} xl={12}>
                  <ComboBox
                    title="کشور ذینفع"
                    name="beneficiaryCountry"
                    defaultValue={filters?.beneficiaryCountry}
                    onChange={handleChangeInputs}
                    options={listCountries}
                    error={errors?.beneficiaryCountry}
                    required="true"
                    width="200px"
                  />
                </Col>
                <Col sm={24} md={24} xl={12}>
                  <DatePicker
                    title="تاریخ صدور پیش فاکتور"
                    name="DateF"
                    onChange={handleChangeInputs}
                    value={filters?.DateF}
                    error={errors?.DateF}
                    required="true"
                    labelWidth="200px"
                    type={"en"}
                    maximumDate={maximumDate}
                    minDay
                  />
                </Col>
                <Col sm={24} md={24} xl={12}>
                  <DatePicker
                    title="تاریخ اعتبار پیش فاکتور"
                    name="DateT"
                    onChange={handleChangeInputs}
                    value={filters.DateT}
                    error={errors?.DateT}
                    required="true"
                    labelWidth="200px"
                    type={"en"}
                    minimumDate={minimumDate}
                  />
                </Col>
              </Row>
            </div>
            <VerticalSpace space="1rem" />
            <Row>
              <Col sm={24} md={24} xl={24}>
                <TitleBox title="اطلاعات فروشنده خارجی" />
              </Col>
            </Row>
            <VerticalSpace space="0.5rem" />
            <Row>
              <Col sm={24} md={24} xl={12} id="typeOfForeignSeller">
                <ComboBox
                  title="نوع فروشنده خارجی"
                  name="typeOfForeignSeller"
                  defaultValue={filters?.typeOfForeignSeller}
                  error={errors?.typeOfForeignSeller}
                  onChange={handleChangeInputs}
                  options={typeFida}
                  required="true"
                  width="200px"
                />
              </Col>
            </Row>
            <>
              <Row>
                <Col sm={24} md={24} xl={12}>
                  <Input
                    name="nameSeller"
                    title="نام فروشنده"
                    onChange={handleChangeInputs}
                    value={filters?.nameSeller}
                    validations={[["maxLength", 100]]}
                    error={errors?.nameSeller}
                    required="true"
                  />
                </Col>
                <Col sm={24} md={24} xl={12}>
                  <Input
                    name="phoneNumber"
                    title="شماره تماس"
                    type="number"
                    onChange={handleChangeInputs}
                    value={filters?.phoneNumber}
                    validations={[["maxLength", 16]]}
                    error={errors?.phoneNumber}
                    required="true"
                  // space="0"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={24} md={24} xl={12}>
                  <Input
                    name="address"
                    title="آدرس"
                    required="true"
                    onChange={handleChangeInputs}
                    value={filters?.address}
                    error={errors?.address}
                  />
                </Col>
              </Row>
            </>
            <VerticalSpace space="1rem" />
            <Row>
              <Col sm={24} md={24} xl={24}>
                <TitleBox title="اطلاعات فعالیت" />
              </Col>
            </Row>
            <VerticalSpace space="0.5rem" />
            <Row>
              <Col sm={24} md={24} xl={12}>
                <SelectMulti
                  name="activityId"
                  title="شناسه فعالیت (شیما)"
                  required="true"
                  onChange={handleChangeInputs}
                  defaultValue={filters?.activityId}
                  error={errors?.activityId}
                  width="200px"
                  optionTitle="ZoneName"
                  optionValue="ZoneCode"
                  options={shimaCode}
                />
              </Col>
            </Row>
          </form>
          <div className="document-show">
            <span className="document-show--container__status ">
              <span className="document-show--container__status-title ">
                وضعیت پرونده:
              </span>
              <span className="document-show--container__status-name ">
                {!!editingId ? filters?.statusName : "پیش نویس"}
              </span>
            </span>
            <span className="document-show--container">
              <Tooltip title="راهنمای سریع" color={themeColors.comments.green}>
                <span>
                  <Button
                    type="primary"
                    onClick={ItemModalHandler}
                    backgroundColor={themeColors.comments.green}
                  >
                    <i class="fa fa-info" aria-hidden="true"></i>
                  </Button>
                </span>
              </Tooltip>
              <span id="Dissuasion">
                <Link to={"/Users/AC/Commercial/ExternalTradeFileManagement"}>
                  <Button
                    name="prev"
                    backgroundColor={themeColors.btn.primary}
                    type="primary"
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "rgb(93, 178, 255)",
                      border: "1px solid rgb(93, 178, 255)",
                      color: "white",
                    }}
                  >
                    انصراف
                  </Button>
                </Link>
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
        </QuickGuide>
      )}
      {(stepsOfCreatePage?.NEF > 1 || stepsOfCreatePage?.NEF === 1) && (
        <Step1
          editingId={editingId}
          setShippingCompany={setShippingCompany}
          subProcedure={filters?.subProcedure}
          goodStatus={goodStatus}
          filters={filters}
          setFilters={setFilters}
          errors={errors}
          iranCustoms={iranCustoms}
          setErrors={setErrors}
          listCountries={listCountries}
          transportFleet={transportFleet}
          contractType={contractType}
          iranBorder={iranBorder}
          shippingMethod={shippingMethod}
          iranBorderTransportTypes={iranBorderTransportTypes}
          setContractTypeAndTransportTypes={setContractTypeAndTransportTypes}
          contractTypeAndTransportTypes={contractTypeAndTransportTypes}
          prfVCode={editingId || prfVCode}
          currency={currency}
          currencyType={currencyType}
          bank={bank}
          shippingCompany={shippingCompany}
          measurementUnits={measurementUnits}
          proxcyConfirm={proxcyConfirm}
          isContinueMode={isContinueMode}
        />
      )}
    </>
  );
};

export default Step0;

// <div className="steps-action">
//       <Button
//         name="prev"
//         onClick={prev}
//         backgroundColor={themeColors.btn.danger}
//         type="primary"
//       >
//         <i className="fa fa-step-forward" aria-hidden="true"></i>
//         بازگشت
//       </Button>
//       <Button
//         name="next"
//         type="primary"
//         onClick={next}
//         backgroundColor={themeColors.btn.secondary}
//       >
//         بعدی
//         <i className="fa fa-step-backward" aria-hidden="true"></i>
//       </Button>
//     </div>
