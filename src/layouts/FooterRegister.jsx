import React from "react";
import enamad from "../assets/images/e-namad.png";
import { Col, Row } from "antd";

const Footer = ({ foreign = false }) => {
  return (
    <div
      className={`register-footer ${
        foreign === true ? "register-footer-foreign" : ""
      }`}
    >
      <div className="img-enamad">
        <img src={enamad} alt="enamad" />
      </div>
      <Row
        className={`wrapper-row ${
          foreign === true ? "wrapper-row-foreign" : ""
        }`}
      >
        <Col
          className={`wrapper-info ${
            foreign === true ? "wrapper-info-foreign" : ""
          }`}
          sm={24}
          md={24}
          xl={18}
        >
          <p style={{ lineHeight: "25px", fontSize: "13px" }}>
            <span>تلفن مرکز پشتیبانی :</span>
            &nbsp; 124 &nbsp; &nbsp;
            <span>ساعت پاسخگویی :</span>
            شنبه الی چهارشنبه ساعت ٨ الی ١٦:٣٠ و پنجشنبه ها ساعت ٨ الی ١٤
          </p>
          <p style={{ lineHeight: "40px", fontSize: "13px" }}>
            ارتباط با مدیر سامانه :
            <a
              href="mailto:admin@ntsw.ir"
              target="_blank"
              rel="noreferrer noopener"
            >
              admin@ntsw.ir
            </a>
          </p>
          <p
            style={{
              lineHeight: "25px",
              marginBottom: "50px",
              fontSize: "13px",
            }}
          >
            کلیه حقوق این سامانه برای وزارت صنعت، معدن و تجارت محفوظ است.
          </p>
        </Col>
        <Col sm={24} md={24} xl={6}>
          <a href="VersionChangesList.aspx" target="_blank">
            <span style={{ fontSize: "13px" }}>شماره نسخه :</span>{" "}
            <span id="noskhe"></span>
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
