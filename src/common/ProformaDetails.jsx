import React, { useState } from "react";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { handleLoading, handleMessageModal } from "../state/action-creators";
import { Col, Modal, Row, Table } from "antd";
import themeColors from "../configs/theme";
import { TitleBox, Input, VerticalSpace, Button } from "../components";
import { Signature } from "../components";
import { accessList } from "../enums";

const ProformaDetails = ({
  // قبلا detailId بود
  editingId,
  orderRegistrationNumber,
  submitPerformaInfoFn,
}) => {
  const { theme, colorMode, isCertificateRequiredList } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [InquiryData, setInquiryData] = useState();
  const [InquiryDataGoodsTable, setInquiryDataGoodsTable] = useState({});
  const [detailOfInquiryDataGoodsTable, setDetailOfInquiryDataGoodsTable] =
    useState([]);


  const modalColumns = [
    {
      title: "ردیف",
      align: "center",
      render: (item, record, index) => <>{index + 1}</>,
    },
    {
      title: " کد مجازی کالا",
      dataIndex: "profomaGoodsId",
      align: "center",
    },

    {
      title: "کد تعرفه",
      dataIndex: "hsCode",
      align: "center",
    },
    {
      title: "شرح تعرفه",
      dataIndex: "goodsTitle",
      align: "center",
    },
    {
      title: "شرح تجاری",
      dataIndex: "commercialDescription",
      align: "center",
    },
    {
      title: "درصد حقوق ورودی",
      dataIndex: "count",
      align: "center",
    },

    {
      title: "کارخانه سازنده",
      dataIndex: "packageId",
      align: "center",
    },
    {
      title: "وضعیت کالا",
      dataIndex: "goodsStatusType",
      align: "center",
    },
    {
      title: "سال تولید",
      dataIndex: "grosssWeight",
      align: "center",
    },
    {
      title: "وزن خالص ",
      dataIndex: "netWeight",
      align: "center",
    },
    {
      title: "وزن ناخالص",
      dataIndex: "grossWeight",
      align: "center",
    },
    {
      title: "تعداد / مقدار",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "مبلغ FOB",
      dataIndex: "fobAmount",
      align: "center",
    },
    {
      title: "جزئیات",
      dataIndex: "dutyDiscountsTotal",
      align: "center",
      render: (_, { key }, index) => {
        return (
          <span className="flex-order-row">
            <Button
              type="secondary"
              backgroundColor={themeColors.btn.primary}
              onClick={(event) => {
                event?.preventDefault();
                setShowModal2(true);
                setInquiryDataGoodsTable(InquiryData.proformaGoods[index]);
              }}
            >
              جزئیات
            </Button>
          </span>
        );
      },
    },
  ];

  const manageInsertProfoermaInfo = () => {
    const postData = {
      orderRegistrationNumber: orderRegistrationNumber,
      declarationId: editingId,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.ManageInsertProfoermaInfo.url,
      method: endpoints.RestAPIs.Proforma.ManageInsertProfoermaInfo.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.code === 0) {
          setInquiryData(res.data?.result);
          setShowModal1(true);
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
        dispatch(handleLoading(false));
      });
  };
  const docInquiry = (e) => {
    e.preventDefault();
    manageInsertProfoermaInfo();
  };
  const submitSignatureOnPerformaInfo = () => {
    submitPerformaInfoFn();
    setShowModal1(false);
  };
  return (
    <>
      <Button
        name="next"
        onClick={docInquiry}
        className="btn-glowing--blue btn"
      >
        استعلام پرونده
      </Button>
      {showModal1 && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="استعلام پرونده"
          open={showModal1}
          onCancel={() => setShowModal1(false)}
          width={1500}
          footer={[
            <Button
              backgroundColor={themeColors.btn.danger}
              onClick={(event) => {
                event.preventDefault();
                setShowModal1(false);
              }}
            >
              بازگشت
            </Button>,
            <Signature
              // base64CertificateInfo={warehouseReceiptData?.signData}
              beSigned={isCertificateRequiredList.includes(
                accessList.saveWarehouseReceiptRegistration
              )}
              title="ثبت"
              backgroundColor={themeColors.btn.secondary}
              service={submitSignatureOnPerformaInfo}
            />,

            // <Button type="primary" loading={loading} onClick={(e) => { submitInquiry(e) }}
            //   backgroundColor={themeColors.btn.secondary} >
            //   تایید
            // </Button>
          ]}
        >
          {
            <form style={{ padding: "0 20px" }}>
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="اطلاعات اصلی " />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Row>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="شماره پرونده"
                    value={InquiryData?.performaId}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="شماره پیش فاکتور"
                    value={InquiryData?.orderRegistrationNumber}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title=" سطح دسترسی"
                    value={InquiryData?.versionNumber}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="شناسه فروشنده خارجی"
                    value={InquiryData?.sellerPublicNumber}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="فروشنده خارجی"
                    value={InquiryData?.sellerLatinName}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title=" تلفن فروشنده خارجی"
                    value={InquiryData?.sellerTel}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="کشور ذینفع"
                    value={InquiryData?.beneficiaryCountryName}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="تاریخ صدور"
                    value={InquiryData?.proformaDate}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="تاریخ اعتبار"
                    value={InquiryData?.proformaExpDate}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="شناسه کسب و کار"
                    value={InquiryData?.number}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="ثبت کننده"
                    value={InquiryData?.number}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="برچسب پرونده"
                    value={InquiryData?.number}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
              </Row>
              <VerticalSpace space="1rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="اطلاعات گمرکی و حمل و نقل" />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Row>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="نوع قرارداد"
                    value={InquiryData?.shipperName}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="مرز ورودی"
                    value={InquiryData?.shipperNationalCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="روش حمل"
                    value={InquiryData?.shiperAddress}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="کشورهای مبدا حمل"
                    value={InquiryData?.shipperPostalCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="محل بارگیری"
                    value={InquiryData?.shipperPostalCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="گمرک مقصد"
                    value={InquiryData?.shipperPostalCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="ناوگان حمل و نقل"
                    value={InquiryData?.transportNavy}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="حمل به دفعات"
                    value={InquiryData?.multipleTransport}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
              </Row>
              <VerticalSpace space="1rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="اطلاعات مالی و بانکی" />
                </Col>
              </Row>

              <VerticalSpace space="0.5rem" />
              <Row>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="مبلغ کل پرونده"
                    value={InquiryData?.consigneePostalCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="نوع عملیات ارزی"
                    value={InquiryData?.arzOperation}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="نوع ارز "
                    value={InquiryData?.currencyNameStr}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="تامین ارز"
                    value={InquiryData?.currencyAllocations}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="سایر هزینه ها"
                    value={InquiryData?.otherCosts}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="تخفیف"
                    value={InquiryData?.discount}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="هزینه حمل"
                    value={InquiryData?.transportCost}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="بانک"
                    value={InquiryData?.bankAuthorithyCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="شعبه"
                    value={InquiryData?.establishBranchCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
              </Row>
              <VerticalSpace space="1rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title="اطلاعات ثبت سفارش" />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Row>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="شماره ثبت سفارش"
                    value={InquiryData?.orderRegistrationNumber}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="تاریخ صدور ثبت سفارش"
                    value={InquiryData?.bankAuthorithyDate}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="تاریخ اعتبار ثبت سفارش"
                    value={InquiryData?.bankAuthorithyExpDate}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="گروه کالایی پرونده"
                    value={InquiryData?.consigneePostalCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="نوع واردات"
                    value={InquiryData?.importTypeCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="حمل یکسره"
                    value={InquiryData?.transportAcrossTypeCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
                <Col sm={24} md={12} xl={8}>
                  <Input
                    title="حالت ثبت سفارش"
                    value={InquiryData?.moodCode}
                    readOnly="readOnly"
                    labelWidth="320px"
                  />
                </Col>
              </Row>
              <VerticalSpace space="1rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <TitleBox title=" کالا ها" />
                </Col>
              </Row>
              <VerticalSpace space="0.5rem" />
              <Table
                onHeaderRow={() => {
                  return {
                    style: { backgroundColor: colorMode },
                  };
                }}
                dataSource={InquiryData?.proformaGoods}
                columns={modalColumns}
                pagination={false}
              />
            </form>
          }
        </Modal>
      )}
      {showModal2 && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="جزئیات کالا"
          open={showModal2}
          onCancel={() => setShowModal2(false)}
          width={1000}
          footer={[
            <Button
              backgroundColor={themeColors.btn.danger}
              onClick={(event) => {
                event.preventDefault();
                setShowModal2(false);
              }}
            >
              بازگشت
            </Button>,
          ]}
        >
          <form style={{ padding: "0 20px" }}>
            <Row>
              <Col sm={24} md={24} xl={24}>
                <Input
                  title="شناسه تعرفه"
                  type="text"
                  value={InquiryDataGoodsTable?.stuffCode}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={24} xl={24}>
                <Input
                  title="شرح تعرفه"
                  type="text"
                  value={InquiryDataGoodsTable?.goodsTitle}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={24} xl={24}>
                <Input
                  title="شناسه کالا"
                  type="text"
                  value={InquiryDataGoodsTable?.ProfomaGoodsId}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={24} xl={24}>
                <Input
                  title="شناسه سازمان"
                  type="text"
                  value={InquiryDataGoodsTable?.dangerousCode}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={24} xl={24}>
                <Input
                  title="شرح تجاری فارسی"
                  type="text"
                  value={InquiryDataGoodsTable?.goodsTitle}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={24} xl={24}>
                <Input
                  title="شرح تجاری لاتین"
                  type="text"
                  value={InquiryDataGoodsTable?.goodsLatinTitle}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="درصد حقوق ورودی"
                  type="text"
                  value={InquiryDataGoodsTable?.comments}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="اولویت کالایی"
                  type="text"
                  value={InquiryDataGoodsTable?.comments}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="نام تولید کننده"
                  type="text"
                  value={InquiryDataGoodsTable?.goodsOwnerName}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="کشور تولید کننده"
                  type="text"
                  value={InquiryDataGoodsTable?.manifactureCountryId}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="مشخصات فنی"
                  type="text"
                  value={InquiryDataGoodsTable?.technicalProperty}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="استاندارد"
                  type="text"
                  value={InquiryDataGoodsTable?.standard}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="سال تولید"
                  type="text"
                  value={InquiryDataGoodsTable?.constractYear}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="ملبغ FOB"
                  type="text"
                  value={InquiryDataGoodsTable?.fobAmount}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="مقدار / تعداد"
                  type="text"
                  value={InquiryDataGoodsTable?.quantity}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="واحد اندازه گیری"
                  type="text"
                  value={InquiryDataGoodsTable?.goodUnitTypeName}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="وزن خالص (KG)"
                  type="text"
                  value={InquiryDataGoodsTable?.netWeight}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="وزن ناخالص (KG)"
                  type="text"
                  value={InquiryDataGoodsTable?.grossWeight}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="وضعیت کالا"
                  type="text"
                  value={InquiryDataGoodsTable?.goodsStatusType}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
              <Col sm={24} md={12} xl={12}>
                <Input
                  title="نوع بسته بندی"
                  type="text"
                  value={InquiryDataGoodsTable?.goodPackingTypeName}
                  readOnly="readOnly"
                  labelWidth="320px"
                />
              </Col>
            </Row>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProformaDetails;
