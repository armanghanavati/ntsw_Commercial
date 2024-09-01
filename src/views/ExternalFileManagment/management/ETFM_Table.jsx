import { Table } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import themeColors from "../../../configs/theme";
import { Button } from "../../../components";

const ETFM_Table = ({
  dataSource,
  handleChangePageSize,
  setTableParams,
  tableParams,
}) => {
  const { theme, colorMode, importCodeInt } = useSelector((state) => state);

  const oparationDetails = (prfActiveStatusTny, prfVCodeInt) => {
    if (prfActiveStatusTny === 2) {
      return (
        <>
          <Button
            onClick={() =>
              localStorage.setItem("fileNumbExt", prfVCodeInt)
            }
            width="100px"
            backgroundColor={themeColors.comments.red}
            type="secondary"
          >
            ابطال
          </Button>
        </>
      )
    } else if (prfActiveStatusTny === 4) {
      return (
        <>
          <Button
            onClick={() =>
              localStorage.setItem("fileNumbExt", prfVCodeInt)
            }
            width="100px"
            backgroundColor={themeColors.btn.purple}
            type="secondary"
          >
            <i className="fa fa-search" />
            در حال ویرایش
          </Button>
        </>)
    } else if (prfActiveStatusTny === 6) {
      return (
        <>
          <Button
            onClick={() =>
              localStorage.setItem("fileNumbExt", prfVCodeInt)
            }
            width="100px"
            backgroundColor={themeColors.btn.purple}
            type="secondary"
          >
            <i className="fa fa-search" />
            در حال تمدید
          </Button>
        </>)
    } else {
      return (
        <>
          <Button
            onClick={() =>
              localStorage.setItem("fileNumbExt", prfVCodeInt)
            }
            width="100px"
            backgroundColor={themeColors.comments.blue}
            type="secondary"
          >
            <i className="fa fa-search" />
            جزئیات
          </Button>
        </>
      )
    }
  }

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
      title: "شماره پرونده",
      dataIndex: "prfVCodeInt",
      align: "center",
    },
    {
      title: "شماره پیش فاکتور",
      dataIndex: "prfNumberStr",
      align: "center",
    },
    {
      title: "تاریخ صدور پیش فاکتور",
      dataIndex: "prfDate",
      align: "center",
      render: (_, { prfDate }, index) => {
        const temp = prfDate.split(" ")[0];
        const date = temp.split("/");
        let day = date[1];
        let month = date[0];
        let year = date[2];
        let datepicker = year + "/" + month + "/" + day;
        return <sapn className="flex-order-row">{datepicker}</sapn>;
      },
    },
    {
      title: "تاریخ اعتبار پیش فاکتور",
      dataIndex: "prfExpireDate",
      align: "center",
      render: (_, { prfExpireDate }, index) => {
        const temp = prfExpireDate.split(" ")[0];
        const date = temp.split("/");
        let day = date[1];
        let month = date[0];
        let year = date[2];
        let datepicker = year + "/" + month + "/" + day;
        return <sapn className="flex-order-row">{datepicker}</sapn>;
      },
    },
    {
      title: "فروشنده خارجی",
      dataIndex: "prfSellerNameEnStr",
      align: "center",
    },
    {
      title: "کشور ذینفع",
      dataIndex: "prfCountryNameStr",
      align: "center",
    },
    {
      title: "مبلغ کل پیش فاکتور",
      dataIndex: "prfTotalPriceMny",
      align: "center",
    },
    {
      title: "نوع ارز",
      dataIndex: "prfCurrencyTypeStr",
      align: "center",
    },
    {
      title: "نوع عملیات ارزی",
      dataIndex: "prfIsBankOPStr",
      align: "center",
    },
    {
      title: "وضعیت",
      dataIndex: "prfStatusStr",
      align: "center",
    },
    {
      title: "ثبت کننده",
      dataIndex: "registrant",
      align: "center",
    },
    {
      title: (importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6) ? "شماره ثبت سفارش" : "شماره ثبت آماری",
      dataIndex: "prfOrderNoStr",
      align: "center",
    },
    {
      title: "برچسب پرونده",
      dataIndex: "plbDescritpionStr",
      align: "center",
      hidden: true
    },
    {
      title: "جزئیات",
      dataIndex: "detaile",
      align: "center",
      render: (_, { prfActiveStatusTny, prfVCodeInt },) => (
        <div className="flex-order-row">
          {
            <Link
              to={`/Users/AC/Commercial/ExternalTradeFileManagementDetail?_k=v9ifuf&__key=${prfVCodeInt}`}
            >
              {oparationDetails(prfActiveStatusTny, prfVCodeInt)}
            </Link>
          }
        </div >
      ),
    },
  ];

  if (importCodeInt[0]?.importCodeInt === 5 || importCodeInt[0]?.importCodeInt === 6) {

    const columnNameToRemove = "plbDescritpionStr";

    const columnIndexToRemove = columns.findIndex(column => column.dataIndex === columnNameToRemove);

    if (columnIndexToRemove !== -1) {
      columns.splice(columnIndexToRemove, 1);
    }
  }

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

export default ETFM_Table;
