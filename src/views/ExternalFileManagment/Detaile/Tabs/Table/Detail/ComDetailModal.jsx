import { Col, Modal, Row, Table, theme } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, ComboGroup } from "../../../../../../components";
import themeColors from "../../../../../../configs/theme";

const ComDetailModal = ({ showModal, setShowModal, getId }) => {
  const { theme } = useSelector((state) => state);

  return (
    <Modal
      centered
      style={{
        backgroundColor: themeColors[theme]?.menueBg,
        color: themeColors[theme]?.text,
      }}
      title={<div style={{ fontWeight: "bold" }}> جزئیات کالا</div>}
      open={showModal}
      width={"50%"}
      onOk={() => {
        setShowModal(false);
      }}
      onCancel={() => {
        setShowModal(false);
      }}
      footer={[]}
    >
      <Row style={{ margin: "20px 30px 20px 10px" }}>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            readOnly={"readOnly"}
            title="شماره تعرفه"
            width="180px"
            value={getId?.gdsHSCode}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            title="شرح تعرفه"
            width="180px"
            value={getId?.gdsHSDescStr}
            readOnly={"readOnly"}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            title="شناسه کالا"
            width="180px"
            value={getId?.pfggdsVCodeInt}
            readOnly={"readOnly"}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            title="شناسه سازمان"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfggcdOrgIDInt}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            title="شرح تجاری فارسی"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgCommercialDescStr}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="شرح تجاری لاتین"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgCommercialDescEnStr}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="درصد حقوق ورودی"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.gdsTariffTny}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="اولویت کالایی"
            width="180px"
            value={getId?.gdsPriorityTny}
            readOnly={"readOnly"}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="کشور تولیدکننده"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.ProformaGoodsCountries?.[0]}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            title="مشخصات فنی"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgTechnicalSpecStr}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="استاندارد"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgStandardStr}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="سال تولید"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgProductionDate}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="مبلغ FOB"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgFOBPriceMny}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="مقدار / تعداد"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgCountInt}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="وزن خالص (KG)"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgNetWeightInt}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="وزن ناخالص (KG)"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgGrossWeightInt}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="وضعیت کالا"
            width="180px"
            readOnly={"readOnly"}
            value={getId?.pfgStatusStr}
          />
        </Col>
        <Col sm={24} md={24} xl={12} xxl={12}>
          <Input
            // validations={[["minLength", 10]]}
            title="نوع بسته بندی"
            width="180px"
            value={getId?.pfgpckNameStr}
            readOnly={"readOnly"}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ComDetailModal;
