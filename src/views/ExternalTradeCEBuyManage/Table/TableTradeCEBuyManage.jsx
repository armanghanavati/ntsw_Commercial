import { Table } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../../../configs/theme";
import Button from "../../../components/Button";
import { handleGetPageSize } from "../../../state/action-creators/index";

const TableTradeCEBuyManage = ({ }) => {
    const dispatch = useDispatch()
    const { theme, colorMode } = useSelector((state) => state);
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
        dispatch(handleGetPageSize({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                pageSize: Number(event.target.value) || 0,
                current: 1,
            },
        }))
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
            title: "کد درخواست",
            dataIndex: "prfVCodeInt",
            align: "center",
        },
        {
            title: "ثبت سفارش های مرتبط",
            dataIndex: "prfVCodeInt",
            align: "center",
        },
        {
            title: "مبلغ",
            dataIndex: "prfStatusTny",
            align: "center",
        },
        {
            title: "نوع ارز",
            dataIndex: "prfDate",
            align: "center",
        },
        {
            title: "بانک و شعبه",
            dataIndex: "FIDANameStr",
            align: "center",
        },
        {
            title: "وضعیت",
            dataIndex: "gdsHSCode",
            align: "center",
        },
        {
            title: "تاریخ اعتبار درخواست",
            dataIndex: "pfgCommercialDescStr",
            align: "center",
        },
        {
            title: "جزئیات",
            dataIndex: "detaile",
            align: "center",
            render: (_, record, index) => (
                <div className="flex-order-row">
                    {
                        <Link to={`/Users/AC/Commercial/ExternalTradeFileManagementDetail`}>
                            <Button type="secondary">
                                <i className="fa fa-search"></i>
                                جزئیات
                            </Button>
                        </Link>
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
                // dataSource={dataSource}
                columns={columns}
                pagination={tableParams.pagination}
                // loading={loading}
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

export default TableTradeCEBuyManage;

