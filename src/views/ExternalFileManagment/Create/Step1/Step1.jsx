import React from "react";
import axios from "axios";
import { Col, Row, Checkbox } from "antd";
import {
  TitleBox,
  ComboBox,
  Input,
  VerticalSpace,
  DatePicker,
  Button,
  SelectMulti,
} from "../../../../components";
import themeColors from "../../../../configs/theme";
import {
  handleStepsOfCreatePage,
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import { useState } from "react";
import "antd/dist/antd.css";
import Validation from "../../../../utils/Validation";
import { endpoints } from "../../../../services/endpoints";
import { useSelector, useDispatch } from "react-redux";
import Step2 from "../Step2/Step2";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Step1 = ({
  proxcyConfirm,
  goodStatus,
  filters,
  setFilters,
  setErrors,
  errors,
  listCountries,
  transportFleet,
  contractType,
  shippingMethod = [],
  iranCustoms,
  iranBorder = [],
  contractTypeAndTransportTypes,
  iranBorderTransportTypes,
  prfVCode,
  currency,
  currencyType,
  bank,
  shippingCompany,
  measurementUnits,
  editingId,
  isContinueMode,
  tempActivityShimaCodeList,
  setShippingCompany,
}) => {
  const dispatch = useDispatch();
  const { stepsOfCreatePage, theme, role, GUid } = useSelector(
    (state) => state
  );

  const history = useHistory();
  const [shippingMethodOption, setShippingMethodOption] = useState([]);
  const [EntranceBorderOption, setEntranceBorderOption] = useState([]);
  const handleValidation = (inputsName = []) => {
    const err = { ...errors };
    inputsName.map((item) => {
      if (
        filters[item] === undefined ||
        filters[item] === null ||
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
        "contractType",
        "shippingMethods",
        "EntranceBorder",
        "DestinationCustoms",
        "CountryOfOriginOfShipment",
        "TransportFleet",
      ]) === true
    ) {
      ManageTransportInformationProforma();
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

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setFilters((prvs) => ({
        ...prvs,
        onePieceShipping: 1,
      }));
    } else {
      setFilters((prvs) => ({
        ...prvs,
        onePieceShipping: 0,
      }));
    }
  };

  const handleCheckbox = (e) => {
    if (e.target.checked === true) {
      setFilters((prvs) => ({
        ...prvs,
        carryOften: 1,
        shippingMethods: undefined,
        EntranceBorder: undefined,
        DestinationCustoms: undefined,
        CountryOfOriginOfShipment: undefined,
      }));
    } else {
      setFilters((prvs) => ({
        ...prvs,
        carryOften: 0,
        shippingMethods: undefined,
        EntranceBorder: undefined,
        DestinationCustoms: undefined,
        CountryOfOriginOfShipment: undefined,
      }));
    }
  };

  const contract = (value, data = {}, isInitialMode) => {
    const contractTemp = [];
    let tempOption = [];
    contractTypeAndTransportTypes.map((item) => {
      if (item.ctbcntVCodeInt == value) {
        contractTemp.push(Number(item.ctbtptVCodeInt));
      }
    });
    if (!!shippingMethod && JSON.stringify(shippingMethod).startsWith("[")) {
      tempOption = shippingMethod?.filter((item) =>
        contractTemp.includes(Number(item.id))
      );

      setFilters({
        ...filters,
        shippingMethodOption: tempOption,
        ...data,
      });
    }
    if (isInitialMode) {
      shipping(filters?.shippingMethods, { shippingMethodOption: tempOption });
    }
  };

  const shipping = (value, data = {}) => {
    const shippingMethodTemp = [];
    iranBorderTransportTypes.map((item) => {
      if (value?.includes(JSON.stringify(item?.btttptVCodeInt))) {
        shippingMethodTemp.push(item?.bttbrdVCodeInt);
      }
    });
    if (!!iranBorder && JSON.stringify(iranBorder).startsWith("[")) {
      const borderOption = iranBorder?.filter((item) =>
        shippingMethodTemp?.includes(Number(item.brdVCodeInt))
      );
      setFilters({
        ...filters,
        EntranceBorderOption: borderOption,
        ...data,
      });
    }
  };

  const handleChangeInputs = (name, value, validationNameList, event) => {
    if (name === "contractType") {
      contract(value, {
        [name]: value,
        shippingMethods: undefined,
        EntranceBorder: undefined,
        DestinationCustoms: undefined,
        CountryOfOriginOfShipment: undefined,
      });
      // setFilters({
      //   ...filters,
      //   shippingMethods: undefined,
      //   EntranceBorder: undefined,
      //   DestinationCustoms: undefined,
      //   CountryOfOriginOfShipment: undefined,
      // });
    } else if (name === "shippingMethods") {
      shipping(value, {
        [name]: value,
        EntranceBorder: undefined,
        DestinationCustoms: undefined,
        CountryOfOriginOfShipment: undefined,
      });
      // setFilters({
      //   ...filters,
      //   // ...temporary,
      //   EntranceBorder: undefined,
      //   DestinationCustoms: undefined,
      //   CountryOfOriginOfShipment: undefined,
      // });
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
  };

  const ManageTransportInformationProforma = (data) => {
    const postData = {
      // شماره پرونده
      prfVCodeInt: prfVCode,
      // نوع قرارداد
      prfcntVCodeInt: filters?.contractType,
      // نوع حمل و نقل
      ProformaTransportTypeList: Array.isArray(filters?.shippingMethods)
        ? filters?.shippingMethods
        : [filters?.shippingMethods],
      // مرز ورودی
      ProformaBordersList: Array.isArray(filters?.EntranceBorder)
        ? filters?.EntranceBorder
        : [filters?.EntranceBorder],
      // گمرک مقصد
      ProformaDestinationCustomsList: Array.isArray(filters?.DestinationCustoms)
        ? filters?.DestinationCustoms
        : [filters?.DestinationCustoms],

      //کشور مبدا
      // ProformaSourcesList:
      //   filters?.onePieceShipping === 1 || !!filters?.onePieceShipping
      //     ? filters?.CountryOfOriginOfShipment
      //     : [filters?.CountryOfOriginOfShipment],
      ProformaSourcesList: Array.isArray(filters?.CountryOfOriginOfShipment)
        ? filters?.CountryOfOriginOfShipment
        : [filters?.CountryOfOriginOfShipment],
      // ناوگان حمل و نقل
      prfTransportNationTypeTny: (filters?.TransportFleet),
      // حمل به دفعات
      prfTransportCountTny: filters?.carryOften,
      // محل بارگیری
      prfLoadingPlaceStr: filters?.LoadingPlace,
      // حمل یکسره
      prfDirectTransportTny: filters?.onePieceShipping,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.manageTransportInformationProforma.url,
      method:
        endpoints.RestAPIs.Proforma.manageTransportInformationProforma.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          if (res?.data?.Result?.Result=== true) {
            setFilters({
              ...filters,
              hasTransportationCosts: true,
            });
          } else if (res?.data?.Result?.Result=== false){
            setFilters({
              ...filters,
              transportationCosts: 0,
              hasTransportationCosts:false
            });
          }
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
            describe: err?.response?.data?.title,
          })
        );

        dispatch(handleLoading(false));
      });
  };

  useEffect(() => {
    contract(filters?.contractType, undefined, true);
  }, [filters?.contractType]);

  // useEffect(() => {
  //   shipping(filters?.shippingMethods);
  // }, [filters?.shippingMethods]);
  return (
    <>
      {stepsOfCreatePage?.NEF === 1 && (
        <>
          <form>
            <VerticalSpace space="1rem" />
            <Row>
              <Col sm={24} md={12} xl={6}>
                <TitleBox title="اطلاعات قرارداد" />
              </Col>
            </Row>
            <VerticalSpace space="1rem" />
            <Row>
              <Col sm={24} md={12} xl={6}>
                <ComboBox
                  name="contractType"
                  title="نوع قرارداد"
                  onChange={handleChangeInputs}
                  defaultValue={filters?.contractType}
                  error={errors?.contractType}
                  options={contractType}
                  required="true"
                  width="200px"
                />
              </Col>
              <Col sm={24} md={12} xl={6}>
                <Checkbox
                  value={filters?.carryOften}
                  name={"carryOften"}
                  onChange={handleCheckbox}
                  checked={filters?.carryOften === 1 ? true : false}
                >
                  حمل به دفعات
                </Checkbox>
                <Checkbox
                  name={"onePieceShipping"}
                  onChange={handleCheckboxChange}
                  value={filters?.onePieceShipping}
                  checked={filters?.onePieceShipping === 1 ? true : false}
                >
                  حمل یکسره
                </Checkbox>
              </Col>
            </Row>
            <VerticalSpace space="4rem" />
            <Row>
              <Col sm={24} md={12} xl={6}>
                <TitleBox title="اطلاعات گمرکی" />
              </Col>
            </Row>
            <VerticalSpace space="0.5rem" />
            <Row>
              <Col sm={24} md={24} xl={12}>
                <SelectMulti
                  title="روش های حمل"
                  name="shippingMethods"
                  defaultValue={filters?.shippingMethods}
                  error={errors?.shippingMethods}
                  options={filters?.shippingMethodOption}
                  onChange={handleChangeInputs}
                  width="100px"
                />
              </Col>
            </Row>
            {(filters?.carryOften === 0 ||
              filters?.carryOften === undefined) && (
              <Row>
                <Col sm={24} md={12} xl={6}>
                  <ComboBox
                    title="مرز ورودی"
                    name="EntranceBorder"
                    defaultValue={filters?.EntranceBorder}
                    error={errors?.EntranceBorder}
                    onChange={handleChangeInputs}
                    options={filters?.EntranceBorderOption}
                    optionTitle="brdNameStr"
                    optionValue="brdVCodeInt"
                    required="true"
                    width="165px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <ComboBox
                    title="گمرک مقصد"
                    name="DestinationCustoms"
                    defaultValue={filters?.DestinationCustoms}
                    error={errors?.DestinationCustoms}
                    onChange={handleChangeInputs}
                    options={iranCustoms}
                    optionTitle="ctmNameStr"
                    optionValue="ctmVCodeInt"
                    required="true"
                    width="165px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <ComboBox
                    title="کشور مبدا حمل"
                    name="CountryOfOriginOfShipment"
                    defaultValue={filters?.CountryOfOriginOfShipment}
                    error={errors?.CountryOfOriginOfShipment}
                    onChange={handleChangeInputs}
                    options={listCountries}
                    required="true"
                    width="165px"
                  />
                </Col>
              </Row>
            )}
            {filters?.carryOften === 1 && (
              <>
                <Row>
                  <Col sm={24} md={24} xl={12}>
                    <SelectMulti
                      title="مرز ورودی"
                      name="EntranceBorder"
                      defaultValue={filters?.EntranceBorder}
                      error={errors?.EntranceBorder}
                      onChange={handleChangeInputs}
                      options={filters?.EntranceBorderOption}
                      optionTitle="brdNameStr"
                      optionValue="brdVCodeInt"
                      required="true"
                      width="100px"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={24} md={24} xl={12}>
                    <SelectMulti
                      title="گمرک مقصد"
                      name="DestinationCustoms"
                      defaultValue={filters?.DestinationCustoms}
                      error={errors?.DestinationCustoms}
                      onChange={handleChangeInputs}
                      options={iranCustoms}
                      optionTitle="ctmNameStr"
                      optionValue="ctmVCodeInt"
                      required="true"
                      width="100px"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={24} md={24} xl={12}>
                    <SelectMulti
                      title="کشور مبدا حمل"
                      name="CountryOfOriginOfShipment"
                      defaultValue={filters?.CountryOfOriginOfShipment}
                      error={errors?.CountryOfOriginOfShipment}
                      onChange={handleChangeInputs}
                      options={listCountries}
                      required="true"
                      width="100px"
                    />
                  </Col>
                </Row>
              </>
            )}
            <VerticalSpace space="0.5rem" />
            <Row>
              <Col sm={24} md={24} xl={12}>
                <Input
                  name="LoadingPlace"
                  title="محل بارگیری"
                  onChange={handleChangeInputs}
                  value={filters?.LoadingPlace}
                  error={errors?.LoadingPlace}
                  labelWidth="165px"
                />
              </Col>
              <Col sm={24} md={24} xl={12}>
                <ComboBox
                  title="ناوگان حمل و نقل"
                  name="TransportFleet"
                  defaultValue={filters?.TransportFleet}
                  onChange={handleChangeInputs}
                  options={transportFleet}
                  width="165px"
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
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "rgb(93, 178, 255)",
                    border: "1px solid rgb(93, 178, 255)",
                    color: "white",
                    fontSize: "14px",
                  }}
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
      {(stepsOfCreatePage?.NEF > 2 || stepsOfCreatePage?.NEF === 2) && (
        <Step2
          setShippingCompany={setShippingCompany}
          tempActivityShimaCodeList={tempActivityShimaCodeList}
          subProcedure={filters?.subProcedure}
          currency={currency}
          currencyType={currencyType}
          bank={bank}
          isContinueMode={isContinueMode}
          filters={filters}
          setFilters={setFilters}
          setErrors={setErrors}
          errors={errors}
          shippingCompany={shippingCompany}
          prfVCode={prfVCode}
          measurementUnits={measurementUnits}
          goodStatus={goodStatus}
          editingId={editingId}
          proxcyConfirm={proxcyConfirm}
          listCountries={listCountries}
        />
      )}
    </>
  );
};

export default Step1;
