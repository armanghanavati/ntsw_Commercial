// قبض انبار
import React, { useEffect, useState } from "react";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handelQuestionModal,
  handleLoading,
  handleMessageModal,
  handleStepsOfCreatePage,
} from "../state/action-creators";
import {
  Form,
  InputNumber,
  Tag,
  Table,
  Col,
  Row,
  Modal,
  Divider,
  Radio,
  Pagination,
  Checkbox,
} from "antd";
import themeColors from "../configs/theme";
import {
  Input,
  VerticalSpace,
  Button,
  TitleBox,
  QuestionModal,
  Signature,
  ComboBox,
} from "../components";
import Validation from "../utils/Validation";
import { accessList, declarationTypes } from "../enums";
import { useCallback } from "react";

const WarehouseReceiptModal = ({
  selectedRowKeys = [],
  declarationType,
  declarationId,
  mode,
  getTable = () => {},
  warehouseReceiptIdentifier,
}) => {
  const {
    theme,
    questionModal,
    stepsOfCreatePage,
    colorMode,
    isCertificateRequiredList,
  } = useSelector((state) => state);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [radioGroupValue, setRadioGroupValue] = useState(undefined);
  const [hsCodeForSearch, setHsCodeForSearch] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [typeOfQuestionModal, setTypeOfQuestionModal] = useState("");
  const [goNextWithoutSave, setGoNextWithoutSave] = useState(false);
  const [TableHasChanges, setTableHasChanges] = useState(false);
  const [hasAccessToTable, setHasAccessToTable] = useState(false);

  const [errors, setErrors] = useState({});
  const [inputsData, setInputsData] = useState({});
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
  const [isPrevButtonPressed, setIsPrevButtonPressed] = useState(false);
  const [indexOfRowForDelete, setIndexOfRowForDelete] = useState();
  const [indexOfsubRowForDelete, setIndexOfsubRowForDelete] = useState();
  const [isShowModeForModal2, setIsShowModeForModal2] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [temporaryDataForTablePagination, setTemporaryDataForTablePagination] =
    useState({});
  const [warehouseReceiptData, setWarehouseReceiptData] = useState({});
  // چک کن
  const [
    detailInWarehouseReceiptGoodsTable,
    setDetailInWarehouseReceiptGoodsTable,
  ] = useState({});

  const showDetailOfWarehouseReciept = (event, id) => {
    event.preventDefault();
    setIsShowModeForModal2(true);
    setWarehouseReceiptData({});
    getWarehoseReceipt(id);
    setShowModal2(true);
  };
  const getWarehoseReceipt = (id) => {
    const postData = {
      warehouseReceiptIdentifier: id,
    };
    axios({
      url: endpoints.RestAPIs.WarehouseReceipt.GetWarehoseReceipt.url,
      method: endpoints.RestAPIs.WarehouseReceipt.GetWarehoseReceipt.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.code !== 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        } else {
          setWarehouseReceiptData(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalColumns1 = [
    {
      title: "نوع سند مرجع",
      dataIndex: "conTypetainerId",
      align: "center",
    },
    {
      title: "شماره سند مرجع",
      dataIndex: "number",
      align: "center",
    },
    {
      title: "کدرهگیری سند مرجع",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "تاریخ صدور",
      dataIndex: "issueDate",
      align: "center",
    },
  ];
  const modalColumns2 = [
    {
      title: "ردیف",
      align: "center",
      render: (item, record, index) => (
        <>
          {index +
            1 +
            (Number(tableParams?.pagination?.current || 1) - 1) *
              Number(tableParams.pagination.pageSize || 1)}
        </>
      ),
    },
    {
      title: "شماره کانتینر",
      dataIndex: "containerId",
      align: "center",
    },
    {
      title: "تعداد بسته",
      dataIndex: "packageCount",
      align: "center",
    },
    {
      title: "نوع کانتینر",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "شاخص حجم بارگیری شده کانتینر",
      dataIndex: "loadVolume",
      align: "center",
    },
    {
      title: "وزن کانتینر خالی (کیلوگرم)",
      dataIndex: "emptyWeight",
      align: "center",
    },
    {
      title: "وزن ناخالض محموله (کیلوگرم)",
      dataIndex: "grossWeight",
      align: "center",
    },
    {
      title: "کمینه دما",
      dataIndex: "minTemp",
      align: "center",
    },
    {
      title: "بیشینه دما",
      dataIndex: "maxTemp",
      align: "center",
    },
    {
      title: "واحد دما",
      dataIndex: "unitTemp",
      align: "center",
    },
    {
      title: "سطح رطوبت",
      dataIndex: "humidity",
      align: "center",
    },
  ];
  const modalColumns3 = [
    {
      title: "ردیف",
      align: "center",
      render: (item, record, index) => (
        <>
          {index +
            1 +
            (Number(tableParams?.pagination?.current || 1) - 1) *
              Number(tableParams.pagination.pageSize || 1)}
        </>
      ),
    },
    {
      title: "شماره کانتینر حاوی",
      dataIndex: "containerId",
      align: "center",
    },
    {
      title: "شماره بسته",
      dataIndex: "packageId",
      align: "center",
    },
    {
      title: "علائم و نشانه‌های شناسایی",
      dataIndex: "marks",
      align: "center",
    },
    {
      title: "نوع بسته",
      dataIndex: "type",
      align: "center",
    },
  ];
  const modalColumns4 = [
    {
      title: "ردیف",
      align: "center",
      render: (item, record, index) => (
        <>
          {index +
            1 +
            (Number(tableParams?.pagination?.current || 1) - 1) *
              Number(tableParams.pagination.pageSize || 1)}
        </>
      ),
    },
    {
      title: "کد تعرفه",
      // doubt
      dataIndex: "HsCode",
      align: "center",
    },
    {
      title: "شرح کالا",
      dataIndex: "goodsDescription",
      align: "center",
    },
    {
      title: "مقدار",
      dataIndex: "amount",
      align: "center",
    },
    {
      title: "وزن خالص (کیلوگرم)",
      dataIndex: "netWeight",
      align: "center",
    },
    {
      title: "وزن ناخالص (کیلوگرم)",
      dataIndex: "grossWeight",
      align: "center",
    },
    {
      title: "تعداد بسته",
      dataIndex: "packageCount",
      align: "center",
    },
    {
      title: "نوع بسته‌بندی",
      dataIndex: "packageType",
      align: "center",
    },
    {
      title: "جزئیات",
      dataIndex: "id",
      align: "center",
      render: (_, { Id }, index) => {
        return (
          <Button
            name="detailInWarehouseReceiptGoodsTable"
            type="secondary"
            backgroundColor={themeColors.btn.primary}
            onClick={(event) => {
              event?.preventDefault();
              setShowModal3(true);
              setDetailInWarehouseReceiptGoodsTable(
                warehouseReceiptData?.warehouseReceiptGoods[index]
              );
            }}
          >
            جزئیات
          </Button>
        );
      },
    },
  ];
  const columnsGoodsPackageInDetail = [
    {
      title: "شماره بسته",
      dataIndex: "packageId",
      align: "center",
    },
  ];
  const columnsGoodsContainerInDetail = [
    {
      title: "شماره کانتینر",
      dataIndex: "containerId",
      align: "center",
    },
  ];

  const inquiryWarehouseReceipt = (id) => {
    dispatch(handleLoading(true));

    const postData = {
      warehouseReceiptIdentifier: id,
      declarationId: declarationId,
      declarationType: declarationTypes[declarationType],
    };
    axios({
      url: endpoints.RestAPIs.WarehouseReceipt.InquiryWarehouseReceipt.url,
      method:
        endpoints.RestAPIs.WarehouseReceipt.InquiryWarehouseReceipt.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.code === 0) {
          setShowModal2(true);
          setWarehouseReceiptData(res?.data?.result);
          setInputsData({
            ...inputsData,
            // warehouseReceiptId: undefined
          });
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.message,
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

  const saveWarehouseReceiptForGoods = (certificate, sign) => {
    dispatch(handleLoading(true));
    const temp = selectedRowKeys.map((item) => {
      return {
        goodsId: item,
        declarationType: declarationTypes[declarationType],
        warehouseReceiptIdentifier: inputsData?.warehouseReceiptId,
        numberOfUsedPackageInWarehouseReciept: 0,
        numberOfUsedQuantityInWarehouseReciept: 0,
      };
    });
    const postData = {
      warehouseReceiptUsedValue: [...temp],
      fullDigitalSignature_VM: {
        signData: certificate,
        signature: sign,
      },
    };

    axios({
      url: endpoints.RestAPIs.WarehouseReceipt.SaveWarehouseReceiptForGoods.url,
      method:
        endpoints.RestAPIs.WarehouseReceipt.SaveWarehouseReceiptForGoods.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.code === 0) {
          // setTableData([])
          // form.resetFields();
          getTable();
          setShowModal2(false);
          setShowModal1(false);
          dispatch(
            handleMessageModal({
              type: "success",
              isModalOpen: true,
              describe: "عملیات با موفقیت انجام شد.",
            })
          );
          setInputsData({
            ...inputsData,
            warehouseReceiptId: undefined,
          });
          setTableHasChanges(true);
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.message,
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

  const handleChangeInputs = (name, value, validationNameList) => {
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
    setInputsData((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };

  const AddingANewWarehouseReceiptRow = (event) => {
    event.preventDefault();

    if (selectedRowKeys.length > 0) {
      setShowModal1(true);
      setIsShowModeForModal2(false);
    } else {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe:
            "حداقل یک ردیف از جدول زیر را در حالت انتخاب قرار دهید، سپس نسبت به افزودن ردیف جدید قبض انبار اقدام نمایید.",
        })
      );
    }
  };
  const handleValidation = (inputsName = []) => {
    const err = { ...errors };
    inputsName.map((item) => {
      if (
        !!!inputsData[item] ||
        JSON.stringify(inputsData[item])?.trim() === ""
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
  const handelShowModal2 = (event) => {
    event.preventDefault();
    setWarehouseReceiptData({});
    if (permitForNextStep(["warehouseReceiptId"]) === true) {
      inquiryWarehouseReceipt(inputsData.warehouseReceiptId);
    } else {
      return;
    }
  };

  return (
    <>
      {mode === "Add" ? (
        <Button
          name="AddingANewWarehouseReceiptRow"
          onClick={AddingANewWarehouseReceiptRow}
        >
          افزودن ردیف جدید قبض انبار
        </Button>
      ) : (
        <Button
          name="showDetailOfWarehouseReciept"
          type="secondary"
          backgroundColor={themeColors.btn.primary}
          onClick={(event) =>
            showDetailOfWarehouseReciept(event, warehouseReceiptIdentifier)
          }
        >
          مشاهده
        </Button>
      )}
      {showModal1 && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="قبض انبار"
          open={showModal1}
          onOk={() => setShowModal1(false)}
          onCancel={() => setShowModal1(false)}
          footer={[
            <Button
              name="handelShowModal2"
              backgroundColor={themeColors.btn.secondary}
              onClick={handelShowModal2}
            >
              ثبت
            </Button>,
            <Button
              name="hideModal1"
              backgroundColor={themeColors.btn.danger}
              onClick={(event) => {
                event.preventDefault();
                setShowModal1(false);
              }}
            >
              بازگشت
            </Button>,
          ]}
        >
          <form style={{ padding: "0 20px" }}>
            <Row>
              <Col sm={24} md={24} xl={18}>
                <Input
                  title="شناسه قبض انبار"
                  name="warehouseReceiptId"
                  value={inputsData.warehouseReceiptId}
                  type="number"
                  labelWidth="320px"
                  onChange={handleChangeInputs}
                  error={errors?.warehouseReceiptId}
                  validations={[["required"], ["decimal", 0]]}
                />
              </Col>
            </Row>
          </form>
        </Modal>
      )}
      {showModal2 && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="جزئیات قبض انبار"
          open={showModal2}
          onCancel={() => setShowModal2(false)}
          // closable={false}
          width={1500}
          footer={
            isShowModeForModal2
              ? [
                  <Button
                    backgroundColor={themeColors.btn.danger}
                    name="hideModal2"
                    onClick={(event) => {
                      event.preventDefault();
                      setShowModal2(false);
                    }}
                  >
                    بازگشت
                  </Button>,
                ]
              : [
                  <Button
                    backgroundColor={themeColors.btn.danger}
                    name="hideModal2"
                    onClick={(event) => {
                      event.preventDefault();
                      setShowModal2(false);
                    }}
                  >
                    بازگشت
                  </Button>,
                  <Signature
                    base64CertificateInfo={warehouseReceiptData?.signData}
                    title="ذخیره"
                    backgroundColor={themeColors.btn.secondary}
                    service={saveWarehouseReceiptForGoods}
                    beSigned={isCertificateRequiredList.includes(
                      accessList.saveWarehouseReceiptRegistration
                    )}
                  />,
                ]
          }
        >
          {warehouseReceiptData && warehouseReceiptData !== {} && (
            <form style={{ padding: "0 20px" }}>
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="اطلاعات اصلی قبض انبار" />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Row>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="تاریخ رسید"
                    value={warehouseReceiptData?.receiptDate}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="کدملی ثبت‌ کننده"
                    value={warehouseReceiptData?.creator}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شماره رسید"
                    value={warehouseReceiptData?.number}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شماره رسید در دستگاه"
                    value={warehouseReceiptData?.governmentNumber}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شناسه یکتای رسید"
                    value={warehouseReceiptData?.id}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="نام و نام خانوادگی مالک"
                    value={warehouseReceiptData?.ownerName}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="کد/شناسه‌ملی یا شناسه فیدا مالک"
                    value={warehouseReceiptData?.owner}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="تحویل‌دهنده"
                    value={warehouseReceiptData?.delivererNationalId}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شناسه واحد"
                    value={warehouseReceiptData?.warehouseId}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="نام واحد"
                    value={warehouseReceiptData?.warehouseName}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="کدپستی واحد"
                    value={warehouseReceiptData?.postalCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="کد/شناسه‌ملی بهره‌بردار"
                    type="text"
                    value={warehouseReceiptData?.contractor}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="استان"
                    type="text"
                    value={warehouseReceiptData?.province}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شهرستان"
                    type="text"
                    value={warehouseReceiptData?.township}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شهر"
                    type="text"
                    value={warehouseReceiptData?.city}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="تاریخ تخلیه"
                    type="text"
                    value={warehouseReceiptData?.dischargeDate}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شماره قرارداد بیمه"
                    type="text"
                    value={warehouseReceiptData?.insuranceDocumentNumber}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="کد شرکت بیمه"
                    type="text"
                    value={warehouseReceiptData?.insuranceCompanyCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شناسه شرکت حمل"
                    type="text"
                    value={warehouseReceiptData?.carrierNationalId}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="نام شرکت حمل"
                    type="text"
                    value={warehouseReceiptData?.carrierName}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="وضعیت رسید"
                    type="text"
                    value={warehouseReceiptData?.status}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="تاریخ ویرایش"
                    type="text"
                    value={warehouseReceiptData?.modifyDate}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="کدملی ویرایش‌کننده"
                    type="text"
                    value={warehouseReceiptData?.modifier}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="وسیله حمل"
                    type="text"
                    value={warehouseReceiptData?.vehicleName}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="نوع وسیله حمل"
                    type="text"
                    value={warehouseReceiptData?.vehicleType}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="کدملی راننده"
                    type="text"
                    value={warehouseReceiptData?.driverNationalId}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="وزن خالص (کیلوگرم)"
                    type="text"
                    value={warehouseReceiptData?.netWeight}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="وزن ناخالص (کیلوگرم)"
                    type="text"
                    value={warehouseReceiptData?.grossWeight}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="نام دستگاه ثبت‌کننده رسید"
                    type="text"
                    value={warehouseReceiptData?.organizationCreatorName}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شرح سند"
                    type="text"
                    value={warehouseReceiptData?.description}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={6}>
                  <Input
                    title="شرح محل نگهداری"
                    type="text"
                    value={warehouseReceiptData?.placeDescription}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
              </Row>
              <VerticalSpace space="1.5rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="سند مرجع" />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Table
                onHeaderRow={() => {
                  return {
                    style: { backgroundColor: colorMode },
                  };
                }}
                dataSource={
                  warehouseReceiptData?.warehouseReceiptReferenceDocuments
                }
                columns={modalColumns1}
                pagination={false}
              />

              <VerticalSpace space="1.5rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="اطلاعات کانتینر" />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Table
                onHeaderRow={() => {
                  return {
                    style: { backgroundColor: colorMode },
                  };
                }}
                dataSource={warehouseReceiptData?.warehouseReceiptContainer}
                columns={modalColumns2}
                pagination={false}
              />
              <VerticalSpace space="1.5rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="اطلاعات بسته‌ها" />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Table
                onHeaderRow={() => {
                  return {
                    style: { backgroundColor: colorMode },
                  };
                }}
                dataSource={warehouseReceiptData?.warehouseReceiptPackage}
                columns={modalColumns3}
                pagination={false}
              />
              <VerticalSpace space="1.5rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="اطلاعات کالایی" />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Table
                onHeaderRow={() => {
                  return {
                    style: { backgroundColor: colorMode },
                  };
                }}
                dataSource={warehouseReceiptData?.warehouseReceiptGoods}
                columns={modalColumns4}
                pagination={false}
              />
            </form>
          )}
        </Modal>
      )}
      {showModal3 && detailInWarehouseReceiptGoodsTable && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="جزئیات کالای قبض انبار"
          open={showModal3}
          // onOk={() => setShowModal2(false)}
          onCancel={() => setShowModal3(false)}
          // closable={false}
          width={1000}
          footer={[
            <Button
              name="showModal3"
              backgroundColor={themeColors.btn.danger}
              onClick={(event) => {
                event.preventDefault();
                setShowModal3(false);
              }}
            >
              بازگشت
            </Button>,
          ]}
        >
          <form style={{ padding: "0 20px" }}>
            <Row>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="کد کالا"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.goodsId}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="شناسه کالا"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.cidCode}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="شناسه عمومی"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.generalGoodsId}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="شناسه رهگیری"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.trackingCode}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="نام کالا"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.goodsName}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="کد کالای خطرناک"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.dangerousGoodsCode}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="وزن حجمی (CBM)"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.volume}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="نوع تولید"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.productionType}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="شناسه قلم کالایی"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.id}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={8}>
                <Input
                  title="توضیحات"
                  type="text"
                  value={detailInWarehouseReceiptGoodsTable?.comments}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
            </Row>
            <Row>
              <Col sm={24} md={12} xl={12}>
                <Table
                  onHeaderRow={() => {
                    return {
                      style: { backgroundColor: colorMode },
                    };
                  }}
                  dataSource={
                    detailInWarehouseReceiptGoodsTable?.warehouseReceiptGoodsPackage ||
                    []
                  }
                  columns={columnsGoodsPackageInDetail}
                  pagination={false}
                  loading={loading}
                />
              </Col>
              <Col sm={24} md={12} xl={11}>
                <Table
                  onHeaderRow={() => {
                    return {
                      style: { backgroundColor: colorMode },
                    };
                  }}
                  dataSource={
                    detailInWarehouseReceiptGoodsTable?.warehouseReceiptGoodsContainer ||
                    []
                  }
                  columns={columnsGoodsContainerInDetail}
                  pagination={false}
                  loading={loading}
                />
              </Col>
            </Row>
          </form>
        </Modal>
      )}
    </>
  );
};

export default WarehouseReceiptModal;
