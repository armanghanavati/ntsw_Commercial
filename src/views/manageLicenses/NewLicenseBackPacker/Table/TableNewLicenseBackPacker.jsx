import { Table } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";
import { Button } from "../../../../components";

const TableNewLicenseBackPacker = ({ loading, dataSource, }) => {
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
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "شناسه کالا",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "کد تعرفه",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "شرح تجاری",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "کشور تولید کننده",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "مقدار/ تعداد",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "واحد اندازه گیری",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "وزن خالص (kg)",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "لیست سازمانهای مجوز دهنده",
            dataIndex: "cdfAppStr",
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

export default TableNewLicenseBackPacker;
