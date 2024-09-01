import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import themeColors from "../../../configs/theme";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";

const MangForenSalerTable = ({ reloadTable }) => {
  const { theme, colorMode, role, GUid } = useSelector((state) => state);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const getTable = () => {
    const postData = {
      session: GUid,
      urlVCodeInt: role,
      FdateSearch: "",
      TdateSearch: "",
      nameSearch: "",
      pStartIndex: tableParams?.pagination?.current - 1,
      pPageSize: tableParams?.pagination?.pageSize,
    };
    setLoading(true);
    // dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.fida.NTSW_GetFIDACodeListByPaging.url,
      method: endpoints.RestAPIs.fida.NTSW_GetFIDACodeListByPaging.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res?.data?.Count || 0,
            },
          });
          setDataSource(res.data?.FIDAListElement);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTable();
  }, [tableParams.pagination.current, tableParams.pagination.pageSize, reloadTable]);

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

  // -> columns for table
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
      title: "شناسه فروشنده خارجی",
      dataIndex: "fdrFIDACodeStr",
      align: "center",
    },
    {
      title: "نام فروشنده خارجی",
      dataIndex: "fdrNameStr",
      align: "center",
    },
    {
      title: "نام لاتین فروشنده خارجی",
      dataIndex: "fdrNameEnStr",
      align: "center",
    },
    {
      title: "کشور محل ثبت/تولد",
      dataIndex: "fdrCountryStr",
      align: "center",
    },
    {
      title: "تاریخ درخواست",
      dataIndex: "fdrDate",
      align: "center",
    },
    {
      title: "وضعیت",
      dataIndex: "fdrStatusStr",
      align: "center",
    },
    {
      title: "توضیحات",
      dataIndex: "fdrErrorDescStr",
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

export default MangForenSalerTable;
