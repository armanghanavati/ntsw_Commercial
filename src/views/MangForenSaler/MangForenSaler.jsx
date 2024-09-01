import { Col, Row, Tooltip } from "antd";
import React, { useState } from "react";
import { Button, QuickGuide, VerticalSpace } from "../../components";
import themeColors from "../../configs/theme";
import MangForenSalerModal from "./Modal/foreignSellerInquiryModal";
import MangForenSalerTable from "./Table/MangForenSalerTable";
import SearchForInquiredSellersModal from "./Modal/SearchForInquiredSellersModal";
import { Link } from "react-router-dom";
import HelpFile from "../../assets/files/HelpFile.pdf";

const MangForenSaler = () => {
  const [openForeignSellerInquiryModal, setOpenForeignSellerInquiryModal] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [reloadTable, setReloadTable] = useState(0);
  const [
    openSearchForInquiredSellersModal,
    setOpenSearchForInquiredSellersModal,
  ] = useState(false);

  const steps = [
    {
      element: "#Table",
      intro: "کاربر گرامی فروشنده های استعلام شده به جزئیات لیست شده است.",
      position: "bottom",
    },
    {
      element: "#searchSeller",
      intro:
        "در صورتی که فروشنده مد نظر شما در لیست نبود می توانید به صورت اختصاصی جستجو کنید.",
      position: "left",
    },
    {
      element: "#foreignSellerId",
      intro:
        "در صورتی که فروشنده مد نظر شما در سیستم موجود نباشد می توانید اطلاعات فروشنده خارجی را ثبت و درخواست شناسه نمایید.",
      position: "left",
    },
  ];

  return (
    <>
      <QuickGuide
        enabled={enabled}
        setEnabled={setEnabled}
        steps={steps}
      ></QuickGuide>
      <Row >
        <span className="flex-order-row-justify-start">
          <Button
            name={"foreignSellerId"}
            onClick={() => setOpenForeignSellerInquiryModal(true)}
          >
            <i className="fa fa-eye" aria-hidden="true"></i>
            اخذ شناسه فروشنده خارجی جدید
          </Button>
          <VerticalSpace />
          <Button
            name={"searchSeller"}
            onClick={() => setOpenSearchForInquiredSellersModal(true)}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
            جستجوی فروشندگان استعلام شده
          </Button>
        </span>
        <Tooltip title="راهنمای سریع" color={themeColors.comments.green}>
          <span>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setEnabled(!enabled);
              }}
              backgroundColor={themeColors.comments.green}
            >
              <i class="fa fa-info" aria-hidden="true"></i>
            </Button>
          </span>
        </Tooltip>
      </Row>
      <VerticalSpace />
      <Row justify="center">
        <Link
          to={{ pathname: 'https://www.aparat.com/v/uWU9R' }}
          target="_blank"
        >
          <Button >
            <i className="fa fa-film" aria-hidden="true"></i>
            فیلم آموزشی
          </Button>
        </Link>
        <a
          href={HelpFile}
          target="_self"
          download="HelpFile"
        >
          <Button>
            <i className="fa fa-file" aria-hidden="true"></i>
            فایل راهنما
          </Button>
        </a>
      </Row>
      <VerticalSpace />
      <div id="Table">
        <MangForenSalerTable reloadTable={reloadTable} />
      </div>
      <MangForenSalerModal
        openForeignSellerInquiryModal={openForeignSellerInquiryModal}
        setOpenForeignSellerInquiryModal={setOpenForeignSellerInquiryModal}
        setReloadTable={setReloadTable}
      />
      <SearchForInquiredSellersModal
        openSearchForInquiredSellersModal={openSearchForInquiredSellersModal}
        setOpenSearchForInquiredSellersModal={
          setOpenSearchForInquiredSellersModal
        }
      />
    </>
  );
};

export default MangForenSaler;
