import { Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";

const PaymentReport = () => {
  const { theme, colorMode } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(undefined);
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
      title: "ردیف",
      align: "center",
      render: (item, record, index) => (
        <>
          {index +
            1 +
            (Number(tableParams?.pagination?.current || 1) - 1) *
            Number(tableParams.pagination.pageSize || 1)}
        </>
      ),
    },
    {
      title: "تاریخ پرداخت",
      dataIndex: "cdfAppStr",
      align: "center",
    },
    {
      title: "نوع پرداخت",
      dataIndex: "cdfAppStr",
      align: "center",
    },
    {
      title: "مبلغ کارمزد(ریال)	",
      dataIndex: "cdfAppStr",
      align: "center",
    },
    {
      title: "ارزش کل ثبت سفارش",
      dataIndex: "cdfAppStr",
      align: "center",
    },
    {
      title: "نوع ارز",
      dataIndex: "cdfAppStr",
      align: "center",
    },
    {
      title: "شناسه پرداخت",
      dataIndex: "cdfAppStr",
      align: "center",
    },
    {
      title: "چاپ",
      dataIndex: "cdfAppStr",
      align: "center",
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
        dataSource={dataSource}
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
    </>
  );
};

export default PaymentReport;
