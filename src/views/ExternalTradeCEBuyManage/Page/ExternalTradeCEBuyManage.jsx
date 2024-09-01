import { Col, Row } from "antd";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ComboBox,
  DatePicker,
  Input,
  Loading,
  VerticalSpace,
} from "../../../components";
import themeColors from "../../../configs/theme";
import TableManageLicenses from "../../manageLicenses/ManageLicenses/Table/TableManageLicenses";
import AssociationExTradeQuestionModal from "../Modals/AssociationExTradeQuestionModal";
import TableTradeCEBuyManage from "../Table/TableTradeCEBuyManage";
import convertJalaliDateToGregorian from "../../../configs/helpers/convert-jalali-date-to-gregorian";

const ExternalTradeCEBuyManage = () => {
  const [openNewReq, setOpenNewReq] = useState(true);
  const [openAssQuestionModal, setOpenAssQuestionModal] = useState(false);
  return (
    <>
      <Row>
        <Link
          to={openNewReq && "/Users/AC/Commercial/ExternalTradeCEBuyNewReq"}
        >
          <Button name="getTable">ایجاد درخواست جدید</Button>
        </Link>
      </Row>
      <Row>
        <Col sm={24} md={12} xl={6} xxl={6}>
          <Input
            // onKeyUp={() => console.log(enterNexTab, "Hello enter")}
            // validations={[["minLength", 10]]}
            // error={filters?.factorFileNumber && errors?.factorFileNumber}
            title="شماره پرونده پیش فاکتور"
            type="number"
            name="factorFileNumber"
            width="180px"
          />
        </Col>
        <Col sm={24} md={12} xl={6} xxl={6}>
          <DatePicker
            title="از تاریخ"
            name="DateF"
            // onChange={handleChangeInputs}
            // value={filters.DateF}
            // validations={[["maximumDate", filters?.DateF]]}
            // error={errors?.DateF}
            type={"en"}
          />
        </Col>
        <Col sm={24} md={12} xl={6} xxl={6}>
          <ComboBox
            title="وضعیت"
            // placeholder="انتخاب کنید"
            name="status"
            // value={filters?.status}
            // onChange={handleChangeInputs}
            // options={comboStatus}
            width="150px"
          />
        </Col>
        <Col sm={24} md={12} xl={6} xxl={6}>
          <Input
            title="متن جستجو"
            name="searchText"
            // onChange={handleChangeInputs}
            // value={filters?.searchText}
            width="180px"
          />
        </Col>
        <Button name="getTable">
          <i className="fa fa-search" aria-hidden="true"></i>
          جستجو
        </Button>
        <Button
          backgroundColor={themeColors.btn.purple}
        // onClick={generateExcelFile}
        >
          <i class="fa fa-table" aria-hidden="true"></i>
          خروجی اکسل
        </Button>
      </Row>
      <hr style={{ margin: "20px 0 20px 0" }} />
      <Row style={{ justifyContent: "center" }}>
        <Button
          onClick={() => setOpenAssQuestionModal(true)}
          backgroundColor={themeColors.comments.green}
        >
          <i className="fa fa-comment" aria-hidden="true"></i>
          مشارکت در بازطراحی و بهبود عملکرد سامانه نیما
        </Button>
        <Button>
          <i className="fa fa-picture-o" aria-hidden="true"></i>
          اینفوگرافی
        </Button>
        <Button>
          <i className="fa fa-film" aria-hidden="true"></i>
          فیلم آموزشی
        </Button>
        <Button>
          <i className="fa fa-file" aria-hidden="true"></i>
          فایل راهنما
        </Button>
      </Row>
      <VerticalSpace space="0.5rem" />
      <TableTradeCEBuyManage />
      <AssociationExTradeQuestionModal
        openAssQuestionModal={openAssQuestionModal}
        setOpenAssQuestionModal={setOpenAssQuestionModal}
      />
      <p
        style={{
          padding: "40px 0 0 10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            border: "1px solid black",
            padding: "10px",
            borderRadius: "10px 10px 0 0",
          }}
        >
          در صورت بروز مشکل در این صفحه با مرکز تماس سامانه نیما به شماره
          <span style={{ color: "red", fontWeight: "bold" }}>
            {""} 27471010-021{" "}
          </span>
          تماس حاصل فرمایید.
        </span>
      </p>
    </>
  );
};

export default ExternalTradeCEBuyManage;
