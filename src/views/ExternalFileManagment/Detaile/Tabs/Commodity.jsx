import { Table } from "antd";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";
import { Button } from "../../../../components";
import ComDetailModal from '../Tabs/Table/Detail/ComDetailModal'

const Commodity = ({ infoExtTab }) => {
  const { loading, theme, colorMode, } = useSelector((state) => state);

  const [showModal, setShowModal] = useState(false)
  const [getId, setGetId] = useState({})
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  });


  const handleChangePageSize = (event) => {
    event.preventDefault();
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        pageSize: Number(event.target.value) || 0,
        current: 1,
      },
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const columns = [
    {
      title: "کد مجازی کالاها",
      dataIndex: "pfgVCodeLng",
      align: "center",
    },
    {
      title: "کد تعرفه",
      dataIndex: "gdsHSCode",
      align: "center",
    },
    {
      title: "شرح تعرفه",
      dataIndex: "gdsHSDescStr",
      align: "center",
    },
    {
      title: "شرح تجاری",
      dataIndex: "pfgCommercialDescStr",
      align: "center",
    },
    {
      title: "درصد حقوق ورودی",
      dataIndex: "gdsTariffTny",
      align: "center",
    },
    {
      title: "کارخانه سازنده",
      dataIndex: "prfManufractureStr",
      align: "center",
    },
    {
      title: "وضعیت کالا",
      dataIndex: "pfgGoodsStatusStr",
      align: "center",
    },
    {
      title: "سال تولید",
      dataIndex: "pfgProductionDate",
      align: "center",
    },
    {
      title: "وزن خالص",
      dataIndex: "pfgNetWeightInt",
      align: "center",
    },
    {
      title: "وزن ناخالص",
      dataIndex: "pfgGrossWeightInt",
      align: "center",
    },
    {
      title: "تعداد/مقدار",
      dataIndex: "pfgCountInt",
      align: "center",
    },
    {
      title: "مبلغ FOB",
      dataIndex: "pfgFOBPriceMny",
      align: "center",
    },
    {
      title: "وضعیت ترخیص",
      dataIndex: "pfgDepreciated",
      align: "center",
      render: (_, { pfgDepreciated }, index) => {
        if (pfgDepreciated) {
          return <span className="flex-order-row"> ترخیص شده </span>
        } else {
          return <span className="flex-order-row"> ترخیص نشده </span>
        }
      }
    },
    {
      title: "جزئیات",
      dataIndex: "detaile",
      align: "center",
      render: (_, record, index) => (
        <div className="flex-order-row">
          {
            <Button onClick={() => {
              setGetId(record)
              setShowModal(true)
            }} type="secondary">
              <i className="fa fa-search"></i>
              جزئیات
            </Button>
          }
        </div>
      ),
    },
  ];
  return (
    <>
      <span className="page-size-combo">
        <label className="page-size-combo--label" htmlFor="page-size">
          نمایش محتویات
        </label>
        <select
          className="page-size-combo--selector"
          id="page-size"
          value={tableParams.pagination.pageSize}
          onChange={handleChangePageSize}
        >
          <option
            value="10"
            style={{
              backgroundColor: themeColors[theme]?.bg,
            }}
          >
            10
          </option>
          <option
            value="25"
            style={{
              backgroundColor: themeColors[theme]?.bg,
            }}
          >
            25
          </option>
          <option
            value="50"
            style={{
              backgroundColor: themeColors[theme]?.bg,
            }}
          >
            50
          </option>
          <option
            value="100"
            style={{
              backgroundColor: themeColors[theme]?.bg,
            }}
          >
            100
          </option>
        </select>
      </span>
      <Table
        id="Table"
        dataSource={infoExtTab}
        columns={columns}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        onHeaderRow={() => {
          return {
            style: { backgroundColor: colorMode },
          };
        }}
      />
      <ComDetailModal showModal={showModal} setShowModal={setShowModal} getId={getId} />
    </>
  );
};

export default Commodity;
