import { Table, Modal } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";
import { Button } from "../../../../components";

const ShowLastStatus = ({ latestRequests }) => {
  const { theme, colorMode } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemModal, setItemModal] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  })

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


  const ItemDetailsHandler = (item) => {
    setItemModal(item);
    setOpen(true);
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
      title: "شماره مجازی کالا",
      dataIndex: "pfgVCodeLng",
      align: "center",
    },
    {
      title: "شماره تعرفه",
      dataIndex: "gdsHSCode",
      align: "center",
    },
    {
      title: "شرح تجاری",
      dataIndex: "pfgCommercialDescStr",
      align: "center",
    },
    {
      title: "نتیجه استعلام ضوابط",
      dataIndex: "pfgStatusCriteriaInquiry",
      align: "center",
    },
    {
      title: "سازمان مجوزدهنده",
      dataIndex: "agnNameStr",
      align: "center",
    },
    {
      title: "توضیحات سازمان مجوزدهنده",
      dataIndex: "pgpDescriptionStr",
      align: "center",
    },
    {
      title: "فیلدهای مهم مجوز دهنده",
      dataIndex: "FldDescStr",
      align: "center",
      render: (item, record, index) => (
        <div className="flex-order-row">
          {item.length === 0 ? (
            <div
              style={{
                background: "#a2a0a0",
                borderRadius: "1px",
                color: "#fff",
                padding: "3px",
              }}
            >
              فیلد مهمی برای این ردیف مشخص نشده است
            </div>
          ) : (
            <Button
              name="detail"
              type="secondary"
              backgroundColor={themeColors.comments.green}
              onClick={() => ItemDetailsHandler(item)}
            >
              مشاهده
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "وضعیت درخواست مجوز",
      dataIndex: "pgpSendStatusTny",
      align: "center",
    },

    {
      title: "نتتیجه اولیه درخواست ثبت سفارش",
      dataIndex: "pfgStatusResultRequestSabtaresh",
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
        dataSource={latestRequests}
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
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        title={"فیلدهای مهم سازمان مجوزدهنده"}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        width={"30%"}
        footer={
          [
            // <Button
            //   name="close"
            //   backgroundColor={themeColors.btn.danger}
            //   onClick={() => {
            //     setOpen(false);
            //   }}
            // >
            //   بستن
            // </Button>,
          ]
        }
      >
        {itemModal.map((itm) => {
          return (
            <div
              style={{
                color: "#8a6d3b",
                display: "flex",
                marginRight: "15px",
              }}
            >
              <p style={{ paddingLeft: "5px" }}>
                <i class="fa fa-stop"></i>
              </p>
              <p>{itm}</p>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default ShowLastStatus;
