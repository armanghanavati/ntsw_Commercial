import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Input, TitleBox, VerticalSpace } from "../../../components";

const ExTrFields = ({
  borderStr,
  tptList,
  sourseList,
  ctmList,
  detailExternal,
}) => {

  const { importCodeInt } = useSelector((state) => state);


  return (
    <>
      <VerticalSpace space="1rem" />
      <Row>
        <Col sm={24} md={24} xl={24}>
          <TitleBox title="اطلاعات اصلی" />
        </Col>
      </Row>
      <VerticalSpace space="0.5rem" />
      <Row>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="numberFile"
            title="شماره پرونده"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.NumberFile}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="numberInvoice"
            title="شماره پیش فاکتور"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.NumberInvoice}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="TypeImportRegions"
            title="نوع واردات به مناطق"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.ImportGoodType}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="accessLevel"
            title="سطح دسترسی"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.ActiveStatusStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="fdrFIDACodeStr"
            title="شناسه فروشنده خارجی"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.FIDACodeStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="foreignSeller"
            title=" فروشنده خارجی"
            readOnly={"readonly"}
            labelWidth="188px"
            // type="text"
            value={detailExternal?.SellerNameEnStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="numberForeignSeller"
            title="تلفن فروشنده خارجی"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.SellerTellStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="beneficiaryCountry"
            title="کشور ذینفع"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.CountryNameStr}
          />
        </Col>

        <Col sm={24} md={12} xl={8}>
          <Input
            title="تاریخ صدور "
            name="DateF"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.FDate?.split(" ")[0]}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            title="تاریخ اعتبار "
            name="DateT"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.ExpireDate?.split(" ")[0]}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="registrar"
            title="ثبت کننده"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.Registrant}
          />
        </Col>
        <Col Col sm={24} md={12} xl={8}>
          {/* <Input
            name="fileLabel"
            title="برچسب پرونده"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.Descritpion}
          /> */}
        </Col>
      </Row >
      <VerticalSpace space="0.5rem" />
      <Row>
        <Col sm={24} md={24} xl={24}>
          <TitleBox title="اطلاعات گمرکی و حمل و نقل" />
        </Col>
      </Row>
      <VerticalSpace space="0.5rem" />
      <Row>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="contractType"
            title="نوع قرارداد"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.CntVCodeStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="EntranceBorder"
            title="مرز ورودی"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.EntranceBorder}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="shippingMethod"
            title="روش حمل"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.shippingMethod}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="ShippingOriginCountries"
            title="کشورهای مبدا حمل"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.ShippingOriginCountries}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="LoadingPlace"
            title="محل بارگیری"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.LoadingPlace}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="destinationCustoms"
            title="گمرک مقصد"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.destinationCustoms}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="transportFleet"
            title="ناوگان حمل و نقل"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.transportFleet}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="carryOften"
            title="حمل به دفعات"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.carryOften}
          />
        </Col>
      </Row>
      <VerticalSpace space="0.5rem" />
      <Row>
        <Col sm={24} md={24} xl={24}>
          <TitleBox title="اطلاعات مالی و بانکی" />
        </Col>
      </Row>
      <VerticalSpace space="0.5rem" />
      <Row>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="totalAllFile"
            title="مبلغ کل پرونده"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.totalAllFile}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="TypeOfForeignExchangeOperation"
            title="نوع عملیات ارزی"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.IsBankOPStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="currencyType"
            title="نوع ارز"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.CurrencyTypeStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="currencySupply"
            title="تامین ارز"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.LctNameStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="otherCosts"
            title="سایر هزینه ها"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.otherCosts}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="Discount"
            title="تخفیف"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.Discount}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="TransportationCosts"
            title="هزینه حمل"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.TransportationCosts}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="bank"
            title="بانک"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.bank}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="branch"
            title="شعبه"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.branch}
          />
        </Col>
      </Row>
      <VerticalSpace space="0.5rem" />
      <Row>
        <Col sm={24} md={24} xl={24}>
          <TitleBox title={(importCodeInt[0]?.importCodeInt !== 5 && importCodeInt[0]?.importCodeInt !== 6) ? "اطلاعات ثبت آماری" : "اطلاعات ثبت سفارش"} />
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="numberOrder"
            title={(importCodeInt[0]?.importCodeInt !== 5 && importCodeInt[0]?.importCodeInt !== 6) ? "شماره ثبت آماری" : "شماره ثبت سفارش"}
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.OrderNoStr}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            title={(importCodeInt[0]?.importCodeInt !== 5 && importCodeInt[0]?.importCodeInt !== 6) ? "تاریخ صدور ثبت آماری" : "تاریخ صدور ثبت سفارش"}
            name="dateFOrder"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.RegedOrderDate}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            title={(importCodeInt[0]?.importCodeInt !== 5 && importCodeInt[0]?.importCodeInt !== 6) ? "تاریخ اعتبار ثبت آماری" : "تاریخ اعتبار ثبت سفارش"}
            name="dateTOrder"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.RegedOrderExpireDate}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="ProductGroupFile"
            title="گروه کالایی پرونده"
            type="text"
            readOnly={"readonly"}
            labelWidth="188px"
            value={detailExternal?.PriorityTny}

          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Input
            name="typeOfImport"
            title="نوع واردات"
            readOnly={"readonly"}
            labelWidth="188px"
            type="text"
            value={detailExternal?.PrfimtVCodeStr}
          />
        </Col>
        {(importCodeInt[0]?.importCodeInt !== 5 && importCodeInt[0]?.importCodeInt !== 6) ?
          null :
          <Col sm={24} md={12} xl={8}>
            <Input
              name="DescritpionStr"
              title="حالت ثبت سفارش"
              readOnly={"readonly"}
              labelWidth="188px"
              type="text"
              value={detailExternal?.DescritpionStr}
            />
          </Col>}
      </Row>
    </>
  );
};

export default ExTrFields;
