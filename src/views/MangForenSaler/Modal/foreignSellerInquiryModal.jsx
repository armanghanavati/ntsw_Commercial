import { Col, Form, Modal, Radio, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  ComboBox,
  Input,
  Signature,
  TitleBox,
  VerticalSpace,
} from "../../../components";
import themeColors from "../../../configs/theme";
import Validation from "../../../utils/Validation";
import { Datepicker } from "../../../components/DatePicker";
import UploadImage from "../../../components/AvatarUploder";
import SelectDocumentsModal from "./sendDocModal";
import UserNotfound from "../../../assets/images/person.png";
import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import convert, { toBase64 } from "../../../configs/helpers/convert";
import { accessList } from "../../../enums";
import { getBase64ForSignature } from "../../../configs/signature";
import { handleLoading, handleMessageModal } from "../../../state/action-creators";
import { utils } from "react-modern-calendar-datepicker";

const MangForenSalerModal = ({ openForeignSellerInquiryModal, setOpenForeignSellerInquiryModal, setReloadTable }) => {
  const { theme, colorMode, role, GUid, isCertificateRequiredList } = useSelector((state) => state);
  const [filters, setFilters] = useState({});
  const [errors, setErrors] = useState({});
  const [sendDocModalOpen, setSendDocModalOpen] = useState(false);
  const [arraySendDoc, setArraySendDoc] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [modalErrors, setModalErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [base64ForSignature, setBase64ForSignature] = useState('');
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [restImageDoc, setRestImageDoc] = useState(0);
  const maximumDate = utils()?.getToday();
  const minimumDate = utils()?.getToday();

  const foreignSellerTypeList = [
    { id: 1, name: "شخص حقیقی" },
    { id: 2, name: "شخص حقوقی" },
  ];

  const handleChangeInputs = (name, value, validationNameList, event) => {
    if (name === "foreignSellerType") {
      setModalErrors({});
      setArraySendDoc([]);
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


  // ریست کردن مدال
  const resetFieldsModal = () => {
    setFilters({})
    setErrors({})
    form.resetFields();
    setOpenForeignSellerInquiryModal(false)
  }


  const emptyValues = () => {
    // خالی کردن مقادیر
    form.resetFields(
      Object.keys(filters).filter((name) => name !== "foreignSellerType")
    );
    setFilters((prevstate) => ({
      foreignSellerType: prevstate?.foreignSellerType,
      gender: 1,
      personalPic: undefined
    }));
    setErrors((prevstate) => ({
      foreignSellerType: prevstate?.foreignSellerType,
    }));
    setRestImageDoc((pre) => pre + 1)
  };

  const handelGenderStatus = (e) => {
    setFilters((prevstate) => ({
      ...prevstate,
      gender: e.target.value,
    }));
  };

  const getImageData = async (info) => {
    const pic = await toBase64(info?.[0]?.originFileObj)
    setFilters((prevstate) => {
      return {
        ...prevstate,
        personalPic: pic,
      };
    });
  };

  const cancelModal = () => {
    resetFieldsModal()
  };

  const handleValidation = (inputsName = []) => {
    const err = { ...errors };
    inputsName.map((item) => {
      if (!!!filters[item] || JSON.stringify(filters[item])?.trim() === "") {
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

  const submitModalHandler = () => {
    if (
      permitForNextStep(filters?.foreignSellerType === 1 ? [
        "firstName",
        "lastName",
        "fatherName",
        "birthCountry",
        "birthDate",
        "nationality",
        "maritalStatus",
        'IdentificationDocumentTypeId',
        "IdNumber",
        "IssueDate",
        "expirationDate",
      ] : ["persianName",
        "latinName",
        "registerNumber",
        "organizationType",
        "registrationCountry",
        "registerDate",
        "nationality",
        "ownerType",
        "activityType",
        "country",
        "city",
        "address",
        "phoneNumber",
      ]) === true
    ) {
      // getBase64ForSignature(setBase64ForSignature, counter, setCounter)
      if (filters?.personalPic === undefined && filters?.foreignSellerType === 1) {
        dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe: 'انتخاب تصویر پرسنلی الزامی می باشد.',
          })
        );
      } else if (arraySendDoc?.length === 0) {
        dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe: 'انتخاب تصاویر مدرک الزامی می باشد.',
          })
        );
      } else if (Object.values(modalErrors).some(e => e?.length > 0)) {
        dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe: ' هریک از مستندات انتخابی بایستی کمتر از 100 کیلوبایت باشد و فرمت های قابل قبول: jpg و jpeg می باشد.',
          })
        );
      } else {
        // setCounter(counter + 1)
        getBase64ForSignature(setBase64ForSignature, counter, setCounter);
      }
    } else {
      return;
    }
  };

  const service = (certificate, sign) => {
    if (filters?.foreignSellerType === 1) { //شخص حقیقی 
      insertPersonForFIDAInquiry(certificate, sign)
    } else if (filters?.foreignSellerType === 2) { // شخص حقوقی
      sendCompanyForFIDAInquiry(certificate, sign)
    }
  }

  useEffect(() => {
    getInitializeFidaStaticData()
  }, [])

  const getInitializeFidaStaticData = () => {// گرفتن مقادیر کمبوباکس ها 
    const postData = {
      "ssdsshGUID": GUid,
      "urlVCodeInt": role
    }
    setLoading(true);
    axios({
      url: endpoints.RestAPIs.fida.InitializeFidaStaticData.url,
      method: endpoints.RestAPIs.fida.InitializeFidaStaticData.method,
      data: postData,
    })
      .then((res) => {
        setDataList(res.data)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };


  const insertPersonForFIDAInquiry = (certificate, sign) => {//استعلام شخص حقیقی 
    const postData = {
      "PersonInfo": {
        "IdentificationDocumentInfo": {
          "IdentificationDocumentTypeId": filters?.IdentificationDocumentTypeId || 0,
          "Number": filters?.IdNumber,
          "IssueDate": convert(filters?.IssueDate),
          "ExpirationDate": convert(filters?.expirationDate),
          "Photos": arraySendDoc.map(p => p?.data),
          "Description": ""
        },
        "FirstName": filters?.firstName,
        "LastName": filters?.lastName,
        "FatherName": filters?.fatherName,
        "MotherName": filters?.motherName,
        "AncestorName": filters?.AncestorName,
        "GenderId": filters?.gender || 1,
        "BirthDate": convert(filters?.birthDate),
        "BirthPlaceCountryId": filters?.birthCountry || 0,
        "CityOfBirth": filters?.birthCity,
        "NationalityId": filters?.nationality || 0,
        "NationalityName": "string",
        "MaritalStatusId": filters?.maritalStatus || 0,
        "Photo": filters?.personalPic || "",
        "TraceCode": 0,
        "DigitalSignature": {
          "ActionCode": 0,
          "Random": base64ForSignature,
          "CmsSignature": sign || "",
          "LoginProfile": "",
          "Certificate": certificate || "",
          "HashAlgorithm": 0,
          "urlVCodeInt": role,
          "ssdsshGUID": GUid
        }
      },
      "ssdsshGUID": GUid,
      "urlVCodeInt": role
    }
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.fida.InsertPersonForFIDAInquiry.url,
      method: endpoints.RestAPIs.fida.InsertPersonForFIDAInquiry.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: 'success'
            })
          );
          resetFieldsModal()
          setReloadTable((pre) => pre + 1)
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
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };
  const sendCompanyForFIDAInquiry = (certificate, sign) => {//استعلام شخص حقوقی 
    const postData = {
      "companyInfo": {
        "Attachments": arraySendDoc.map(p => ({ Attachment: p?.data, AttacheName: p?.fullName })),
        "PersianName": filters?.persianName,
        "LatinName": filters?.latinName,
        "RegisterNumber": filters?.registerNumber,
        "RegisterDate": convert(filters?.registerDate),
        "RegistrationCountryId": filters?.registrationCountry || 0,
        "RegistrationCountryName": "string",
        "NationalityId": filters?.nationality || 0,
        "NationalityName": "string",
        "OrganizationTypeId": filters?.organizationType || 0,
        "OrganizationTypeName": "string",
        "ActivityTypeId": filters?.activityType || 0,
        "ActivityTypeName": "string",
        "OwnerTypeId": filters?.ownerType || 0,
        "OwnerTypeName": "string",
        "AddressDescription": filters?.address,
        "PostalCode": filters?.postalCode,
        "City": filters?.city,
        "AddressCountryId": filters?.country || 0,
        "AddressCountryName": "string",
        "PhoneNumber": filters?.phoneNumber,
        "TraceCode": "",
        "DigitalSignature": {
          "ActionCode": 0,
          "Random": base64ForSignature,
          "CmsSignature": sign,
          "LoginProfile": "",
          "Certificate": certificate,
          "HashAlgorithm": 0,
          "urlVCodeInt": role,
          "ssdsshGUID": GUid
        }
      },
      "ssdsshGUID": GUid,
      "urlVCodeInt": role
    }
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.fida.SendCompanyForFIDAInquiry.url,
      method: endpoints.RestAPIs.fida.SendCompanyForFIDAInquiry.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: 'success'
            })

          );
          resetFieldsModal()
          setReloadTable((pre) => pre + 1)
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
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };


  return (
    <div>
      <Modal
        centered
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        title={`استعلام شناسه فروشنده خارجی - این بخش، نیازمند استفاده از امضای الکترونیکی (توکن) است`}
        open={openForeignSellerInquiryModal}
        onOk={() => {
          setOpenForeignSellerInquiryModal(false);
        }}
        onCancel={() => {
          cancelModal();
        }}
        width={800}
        footer={[
          filters?.foreignSellerType && (
            <div
              className="flex-order-row"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <div className="flex-order-row">
                <Signature
                  base64CertificateInfo={base64ForSignature}
                  beSigned={isCertificateRequiredList.includes(
                    accessList.getNewForeignSellerID
                  )}
                  hasbeforeSigningFunction counter={counter} service={service} beforeSigning={submitModalHandler} title={'ثبت اطلاعات'} />
                <Button onClick={emptyValues}>خالی کردن مقادیر</Button>
              </div>
              <div className="flex-order-row">
                <Button
                  backgroundColor={themeColors.btn.danger}
                  onClick={() => {
                    cancelModal();
                  }}
                >
                  بستن
                </Button>
              </div>
            </div>
          ),
        ]}
      >
        <div style={{ margin: "0 40px 0 10px" }}>
          <Form form={form}>
            <Row>
              <Col sm={24} md={24}>
                <Form.Item
                  style={{ margin: "0" }}
                  name={`foreignSellerType`}
                  initialValue={filters?.foreignSellerType}
                >
                  <ComboBox
                    name="foreignSellerType"
                    onChange={handleChangeInputs}
                    options={foreignSellerTypeList}
                    error={errors?.foreignSellerType}
                    title="انتخاب نوع فروشنده خارجی"
                    validations={[["required"]]}
                    width="260px"
                  />
                </Form.Item>
              </Col>
            </Row>

            {filters?.foreignSellerType === 1 && (
              <Row>
                <Col sm={24} xl={12}>
                  <Row>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="firstName"
                        title=" نام / First Name"
                        onChange={handleChangeInputs}
                        value={filters?.firstName}
                        error={errors?.firstName}
                        labelWidth="260px"
                        validations={[["required"]]}
                        maxLength={50}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="lastName"
                        title="نام خانوادگی/Last Name"
                        onChange={handleChangeInputs}
                        value={filters?.lastName}
                        error={errors?.lastName}
                        labelWidth="260px"
                        validations={[["required"]]}
                        maxLength={50}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="fatherName"
                        title="نام پدر"
                        onChange={handleChangeInputs}
                        value={filters?.fatherName}
                        error={errors?.fatherName}
                        labelWidth="260px"
                        validations={[["required"]]}
                        maxLength={50}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        name="motherName"
                        title="نام مادر"
                        onChange={handleChangeInputs}
                        value={filters?.motherName}
                        error={errors?.motherName}
                        labelWidth="260px"
                        validations={[]}
                        maxLength={50}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        name="AncestorName"
                        title="نام جد"
                        onChange={handleChangeInputs}
                        value={filters?.AncestorName}
                        error={errors?.AncestorName}
                        labelWidth="260px"
                        validations={[]}
                        maxLength={50}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        style={{ margin: "0" }}
                        name={`birthCountry`}
                        initialValue={filters?.birthCountry}
                      >
                        <ComboBox
                          required
                          name="birthCountry"
                          onChange={handleChangeInputs}
                          options={dataList?.Contries}
                          optionTitle="PersionName"
                          optionValue="Id"
                          error={errors?.birthCountry}
                          title=" کشور محل تولد"
                          validations={[["required"]]}
                          width="255px"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        name="birthCity"
                        title="شهر محل تولد"
                        onChange={handleChangeInputs}
                        value={filters?.birthCity}
                        error={errors?.birthCity}
                        labelWidth="260px"
                        validations={[]}
                        maxLength={50}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <div className="flex-order-row">
                        <label htmlFor="">
                          <span className="input--main--label__required-sign">
                            *
                          </span>
                          جنسیت
                        </label>
                        <Radio.Group
                          onChange={handelGenderStatus}
                          value={filters?.gender}
                          defaultValue={1}
                        >
                          <Radio value={1}>مرد </Radio>
                          <Radio value={2}>زن</Radio>
                        </Radio.Group>
                      </div>
                      <VerticalSpace space="10px" />
                    </Col>
                    <Col sm={24} md={24}>
                      <Datepicker
                        title=" تاریخ تولد"
                        name="birthDate"
                        onChange={handleChangeInputs}
                        value={filters?.birthDate}
                        error={errors?.birthDate}
                        required="true"
                        labelWidth="260px"
                        type={"en"}
                        maximumDate={maximumDate}
                        minDay
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        style={{ margin: "0" }}
                        name={`nationality`}
                        initialValue={filters?.nationality}
                      >
                        <ComboBox
                          required
                          name="nationality"
                          onChange={handleChangeInputs}
                          error={errors?.nationality}
                          title="ملیت"
                          validations={[["required"]]}
                          width="255px"
                          options={dataList?.Contries}
                          optionTitle="PersionName"
                          optionValue="Id"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        style={{ margin: "0" }}
                        name={`maritalStatus`}
                        initialValue={filters?.maritalStatus}
                      >
                        <ComboBox
                          required
                          name="maritalStatus"
                          onChange={handleChangeInputs}
                          error={errors?.maritalStatus}
                          title="وضعیت تاهل"
                          validations={[["required"]]}
                          width="255px"
                          options={dataList?.MaritalStatusType}
                          optionTitle="Title"
                          optionValue="Id"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col sm={24} xl={12}>
                  <Row>
                    <Col sm={24} md={24}>
                      <UploadImage
                        inputsData={
                          filters?.personalPic || UserNotfound?.split('base64,')[1]
                        }
                        description="* اندازه ی تصویر انتخابی بایستی کمتر از 100 کیلوبایت باشد"
                        getImageData={getImageData}
                        errors={errors}
                        setErrors={setErrors}
                        fileList={fileList}
                        setFileList={setFileList}
                        validations={["required"]}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <VerticalSpace />
                      <TitleBox width="270px" title="اطلاعات مدرک شناسایی" />
                      <VerticalSpace />
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        name={`IdentificationDocumentTypeId`}
                        style={{ margin: "0" }}
                        initialValue={filters?.IdentificationDocumentTypeId}
                      >
                        <ComboBox
                          required
                          name="IdentificationDocumentTypeId"
                          onChange={handleChangeInputs}
                          options={dataList?.IdentificationDocumentType}
                          error={errors?.IdentificationDocumentTypeId}
                          title="نوع مدرک شناسایی"
                          validations={[["required"]]}
                          width="255px"
                          optionTitle="Title"
                          optionValue="Id"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="IdNumber"
                        title="شماره مدرک شناسایی"
                        onChange={handleChangeInputs}
                        value={filters?.IdNumber}
                        error={errors?.IdNumber}
                        labelWidth="260px"
                        validations={[["required"]]}
                        maxLength={20}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Datepicker
                        title=" تاریخ صدور"
                        name="IssueDate"
                        onChange={handleChangeInputs}
                        value={filters?.IssueDate}
                        error={errors?.IssueDate}
                        required="true"
                        labelWidth="260px"
                        type={"en"}
                        maximumDate={maximumDate}
                        minDay
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Datepicker
                        title="تاریخ انقضاء"
                        name="expirationDate"
                        onChange={handleChangeInputs}
                        value={filters?.expirationDate}
                        error={errors?.expirationDate}
                        required="true"
                        labelWidth="260px"
                        type={"en"}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <SelectDocumentsModal
                        open={sendDocModalOpen}
                        setOpen={setSendDocModalOpen}
                        setInputsData={setFilters}
                        arraySendDoc={arraySendDoc}
                        setArraySendDoc={setArraySendDoc}
                        errors={modalErrors}
                        setErrors={setModalErrors}
                        restImageDoc={restImageDoc}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            {filters?.foreignSellerType === 2 && (
              <Row>
                <Col sm={24} md={12}>
                  <Row>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="persianName"
                        title=" نام فارسی شرکت خارجی"
                        onChange={handleChangeInputs}
                        value={filters?.persianName}
                        error={errors?.persianName}
                        labelWidth="260px"
                        validations={[["required"], ["lettersPersian"]]}
                        maxLength={50}

                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="latinName"
                        title="نام لاتین شرکت خارجی"
                        onChange={handleChangeInputs}
                        value={filters?.latinName}
                        error={errors?.latinName}
                        labelWidth="260px"
                        validations={[["required"], ["lettersLatin"]]}
                        maxLength={50}

                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="registerNumber"
                        title="شماره ثبت"
                        onChange={handleChangeInputs}
                        value={filters?.registerNumber}
                        error={errors?.registerNumber}
                        labelWidth="260px"
                        validations={[["required"]]}
                        maxLength={50}


                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        style={{ margin: "0" }}
                        name={`organizationType`}
                        initialValue={filters?.organizationType}
                      >
                        <ComboBox
                          required
                          name="organizationType"
                          onChange={handleChangeInputs}
                          options={dataList?.OrganizationType}
                          error={errors?.organizationType}
                          title="نوع شرکت"
                          validations={[["required"]]}
                          width="255px"
                          optionTitle="Title"
                          optionValue="Id"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        style={{ margin: "0" }}
                        name={`registrationCountry`}
                        initialValue={filters?.registrationCountry}
                      >
                        <ComboBox
                          required
                          name="registrationCountry"
                          onChange={handleChangeInputs}
                          options={dataList?.Contries}
                          optionTitle="PersionName"
                          optionValue="Id"
                          error={errors?.registrationCountry}
                          title="کشور محل ثبت"
                          validations={[["required"]]}
                          width="255px"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24}>
                      <Datepicker
                        title="تاریخ ثبت"
                        name="registerDate"
                        onChange={handleChangeInputs}
                        value={filters?.registerDate}
                        error={errors?.registerDate}
                        required="true"
                        labelWidth="260px"
                        type={"en"}
                        maximumDate={maximumDate}

                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        name={`nationality`}
                        style={{ margin: "0" }}
                        initialValue={filters?.nationality}
                      >
                        <ComboBox
                          required
                          name="nationality"
                          onChange={handleChangeInputs}
                          options={dataList?.Contries}
                          optionTitle="PersionName"
                          optionValue="Id"
                          error={errors?.nationality}
                          title="تابعیت ثبتی شرکت"
                          validations={[["required"]]}
                          width="255px"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        name={`ownerType`}
                        initialValue={filters?.ownerType}
                      >
                        <ComboBox
                          name="ownerType"
                          onChange={handleChangeInputs}
                          options={dataList?.OwnerType}
                          optionTitle="Title"
                          optionValue="Id"
                          error={errors?.ownerType}
                          title="نوع مالکیت"
                          validations={[]}
                          width="255px"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col sm={24} md={12}>
                  <Row>
                    <Col sm={24} md={24}>
                      <Form.Item
                        name={`activityType`}
                        initialValue={filters?.activityType}
                        style={{ margin: "0" }}
                      >
                        <ComboBox
                          required
                          name="activityType"
                          onChange={handleChangeInputs}
                          options={dataList?.ActivityType}
                          error={errors?.activityType}
                          title="موضوع فعالیت شرکت"
                          validations={[["required"]]}
                          optionTitle='Title'
                          optionValue="Id"
                          width="255px"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24}>
                      <TitleBox width="270px" title="آدرس" />
                      <VerticalSpace space=".4rem" />
                    </Col>
                    <Col sm={24} md={24}>
                      <Form.Item
                        name={`country`}
                        style={{ margin: "0" }}
                        initialValue={filters?.country}
                      >
                        <ComboBox
                          required
                          name="country"
                          onChange={handleChangeInputs}
                          options={dataList?.Contries}
                          optionTitle="PersionName"
                          optionValue="Id"
                          error={errors?.country}
                          title="کشور"
                          validations={[["required"]]}
                          width="255px"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="city"
                        title="شهر"
                        maxLength={30}
                        onChange={handleChangeInputs}
                        value={filters?.city}
                        error={errors?.city}
                        labelWidth="260px"
                        validations={[["required"]]}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        name="address"
                        title="آدرس"
                        onChange={handleChangeInputs}
                        value={filters?.address}
                        error={errors?.address}
                        labelWidth="260px"
                        validations={[["required"]]}
                        type="textarea"
                        maxLength={800}
                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        name="postalCode"
                        title="کد پستی"
                        onChange={handleChangeInputs}
                        value={filters?.postalCode}
                        error={errors?.postalCode}
                        labelWidth="260px"
                        validations={[]}
                        maxLength={20}
                        type="number"

                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <Input
                        required
                        type="number"
                        maxLength={20}
                        name="phoneNumber"
                        title="تلفن"
                        onChange={handleChangeInputs}
                        value={filters?.phoneNumber}
                        error={errors?.phoneNumber}
                        labelWidth="260px"
                        validations={[["required"]]}

                      />
                    </Col>
                    <Col sm={24} md={24}>
                      <SelectDocumentsModal
                        open={sendDocModalOpen}
                        setOpen={setSendDocModalOpen}
                        setInputsData={setFilters}
                        arraySendDoc={arraySendDoc}
                        setArraySendDoc={setArraySendDoc}
                        errors={modalErrors}
                        setErrors={setModalErrors}
                        restImageDoc={restImageDoc}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default MangForenSalerModal;




















