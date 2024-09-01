import { Col, Row, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { TitleBox, VerticalSpace } from "../../../components";

const GhabzAnbarStruct = ({ detailExternal }) => {
  const { theme, colorMode } = useSelector((state) => state);

  const columns = [
    {
      title: "شماره قبض انبار",
      dataIndex: "pgaGhabzNoStr",
      align: "center",
    },
    {
      title: "تاریخ قبض انبار	",
      dataIndex: "pgaGhabzDate",
      align: "center",
    }
  ];

  return (
    <div style={{ padding: "10px 15px 0 15px" }}>
      <VerticalSpace space="0.5rem" />
      <Row>
        <Col sm={24} md={24} xl={24}>
          <TitleBox title="اطلاعات  انبار" />
        </Col>
      </Row>
      <div className="anbarStyle">
        <Col m={24} md={12} xl={12}>
          <div>
            <Table
              id="Table"
              dataSource={detailExternal?.GhabzAnbarStruct}
              columns={columns}
              onHeaderRow={() => {
                return {
                  style: { backgroundColor: colorMode },
                };
              }}
            />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default GhabzAnbarStruct;
