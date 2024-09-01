import { Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import themeColors from "../../../../configs/theme";
import { Button } from "../../../../components";
import { handleLoading } from "../../../../state/action-creators";
import { endpoints } from "../../../../services/endpoints";
import { useEffect } from "react";
import { useLocation } from "react-router";
import FileAuthorizationModalInTab from "../Tabs/Table/Detail/FileAuthorizationModalInTab";

const FileAuthorization = () => {
  const dispatch = useDispatch()
  const [showModalFileAuthorization, setShowModalFileAuthorization] = useState(false)
  const { search, pathname } = useLocation();
  const { theme, colorMode, GUid, role } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(undefined);
  const [dataTableModal, setDataTableModal] = useState(undefined);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  });

  const getProformaRequiredPermits = () => {
    const id = search?.split("=")[2];
    const postData = {
      PrfVCodeInt: id,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.getProformaRequiredPermits.url,
      method: endpoints.RestAPIs.Proforma.getProformaRequiredPermits.method,
      data: postData,
    }).then((res) => {
      if (res?.data?.ErrorCode === 0) {
        setDataSource(res?.data?.proformaRequiredPermits)
      }
      dispatch(handleLoading(false));
    })
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };

  const getProformaRequiredPermitDetails = () => {
    const id = search.split("=")[2];
    let tempData = {}
    dataSource?.map(item =>
      tempData = {
        agnNameStr: item?.agnNameStr,
        pgppfgVCodeLngCount: item?.pgppfgVCodeLngCount,
        pgpagnVCodeInt: item?.pgpagnVCodeInt,
        pgpStatusTny: item?.pgpStatusTny,
        pgpSendStatusTny: item?.pgpSendStatusTny,
      }
    )
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: id,
      ...tempData
    }
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.getProformaRequiredPermitDetails.url,
      method: endpoints.RestAPIs.Proforma.getProformaRequiredPermitDetails.method,
      data: postData,
    }).then((res) => {
      if (res?.data?.ErrorCode === 0) {
        setDataTableModal(res?.data?.getGoodsfromPermits);
      }
      dispatch(handleLoading(false));
    })
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };

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
      title: "عنوان مجوزدهنده",
      dataIndex: "agnNameStr",
      align: "center",
    },
    {
      title: "وضعیت",
      dataIndex: "pgpStatusStr",
      align: "center",
    },
    {
      title: "وضعیت ارسال",
      dataIndex: "pgpSendStatusStr",
      align: "center",
    },
    {
      title: "نتیجه مجوز",
      dataIndex: "pmtResultStr",
      align: "center",
    },
    {
      title: "تعداد کالاهایی که نیاز به این مجوز دارند	",
      dataIndex: "pgppfgVCodeLngCount",
      align: "center",
    },
    {
      title: "جزئیات",
      dataIndex: "detaile",
      align: "center",
      render: (_, record, index) => (
        <div className="flex-order-row">
          {
            <Button type="secondary" onClick={() => {
              setShowModalFileAuthorization(true)
              getProformaRequiredPermitDetails()
            }}>
              <i className="fa fa-search"></i>
              جزئیات
            </Button>
          }
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (pathname.toLowerCase().includes("detail")) {
      getProformaRequiredPermits()
    }
  }, [])

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
        pagination={tableParams?.pagination}
        loading={loading}
        onChange={handleTableChange}
        onHeaderRow={() => {
          return {
            style: { backgroundColor: colorMode },
          };
        }}
      />
      <FileAuthorizationModalInTab setShowModalFileAuthorization={setShowModalFileAuthorization} showModalFileAuthorization={showModalFileAuthorization} dataTableModal={dataTableModal} />
    </>
  );
};

export default FileAuthorization;
