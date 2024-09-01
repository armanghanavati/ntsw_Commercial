import { Col, Row, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { TitleBox, VerticalSpace } from "../../../components";

const BolsStruct = ({ detailExternal }) => {
  const { theme, colorMode } = useSelector((state) => state);

  const columns = [
    {
      title: "شماره بارنامه",
      dataIndex: "pblBOLNoStr",
      align: "center",
    },
    {
      title: "تاریخ بارنامه	",
      dataIndex: "pblBOLDate",
      align: "center",
      render: (_, { pblBOLDate }) => {
        const tempYear = pblBOLDate.split("-")[0];
        const tempMonth = pblBOLDate.split("-")[1];
        const tempDay = pblBOLDate.split("-")[2];
        let resulte = tempYear + "/" + tempMonth + "/" + tempDay;
        let temp = resulte?.split("T")[0];
        return <sapn className="flex-order-row">{temp}</sapn>;
      },
    },
    {
      title: "شرکت حمل",
      dataIndex: "tpcNameStr",
      align: "center",
    },
  ];

  return (
    <div style={{ padding: "10px 15px 0 15px" }}>
      <VerticalSpace space="0.5rem" />
      <Row>
        <Col sm={24} md={24} xl={24}>
          <TitleBox title="اطلاعات بارنامه" />
        </Col>
      </Row>
      <div className="anbarStyle">
        <Col m={24} md={12} xl={12}>
          <div>
            <Table
              id="Table"
              dataSource={detailExternal?.BOLsStruct}
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

export default BolsStruct;
