import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";



const Commodities = ({ filters }) => {
  const { colorMode } = useSelector((state) => state);
  const columns = [
    {
      title: "کد تعرفه",
      dataIndex: "gdsHSCode",
      align: "center",
    },
    {
      title: "شرح تجاری فارسی",
      dataIndex: "pfgCommercialDescStr",
      align: "center",
    },
    {
      title: "شناسه کالا",
      dataIndex: "pfggcdNameStr",
      align: "center",
    },
    {
      title: "وزن خالص",
      dataIndex: "pfgGrossWeightAsKGDbl",
      align: "center",
    },
    {
      title: "وزن ناخالص",
      dataIndex: "pfgNetWeightAsKGDbl",
      align: "center",
    },
    {
      title: "مقدار/ تعداد در پرونده",
      dataIndex: "pfgCountInt",
      align: "center",
    },
    {
      title: "مبلغ فوب پرونده",
      dataIndex: "pfgFOBPriceMny",
      align: "center",
    },
    {
      title: "مقدار تعداد در گواهی",
      dataIndex: "icgCount",
      align: "center",
    },
    {
      title: "مبلغ فوب کالا در گواهی",
      dataIndex: "icgFOBPrice",
      align: "center",
    },
  ];



  return (
    <div style={{ margin: "0 10px 0 10px " }}>
      <Table
        dataSource={filters?.goodsDataSource}
        columns={columns}
        onHeaderRow={() => {
          return {
            style: { backgroundColor: colorMode },
          };
        }}
      />
    </div>
  );
};

export default Commodities;
