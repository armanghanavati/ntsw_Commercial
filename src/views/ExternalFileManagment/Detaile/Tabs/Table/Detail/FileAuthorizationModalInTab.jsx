import { Col, Modal, Row, Table, theme } from "antd";
import React, { useState } from "react";
import themeColors from "../../../../../../configs/theme";
import { handleLoading } from "../../../../../../state/action-creators";
import axios from "axios";
import { useLocation } from "react-router";
import { endpoints } from "../../../../../../services/endpoints"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const FileAuthorizationModalInTab = ({ showModalFileAuthorization, setShowModalFileAuthorization, dataTableModal }) => {
    const dispatch = useDispatch()
    const { search, pathname } = useLocation();
    const { theme, colorMode, GUid, role } = useSelector((state) => state);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 25,
        },
    });


    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };
    //  sdxhbn hj
    // kl,lk,.kl
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
            title: "کد مجازی کالا",
            dataIndex: "pfgVCodeLng",
            align: "center",
        },
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
            title: "شرح تجاری لاتین",
            dataIndex: "pfgCommercialDescEnStr",
            align: "center",
        },

    ];
    return (
        <Modal
            centered
            style={{
                backgroundColor: themeColors[theme]?.menueBg,
                color: themeColors[theme]?.text,
            }}
            title={<div style={{ fontWeight: "bold" }}> جزئیات پرونده</div>}
            open={showModalFileAuthorization}
            width={1000}
            onOk={() => {
                setShowModalFileAuthorization(false);
            }}
            onCancel={() => {
                setShowModalFileAuthorization(false);
            }}
            footer={[]}
        >
            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                <Table
                    id="Table"
                    dataSource={dataTableModal}
                    columns={columns}
                    pagination={tableParams?.pagination}
                    // loading={loading}
                    onChange={handleTableChange}
                    onHeaderRow={() => {
                        return {
                            style: { backgroundColor: colorMode },
                        };
                    }}
                />
            </div>
        </Modal >
    );
};

export default FileAuthorizationModalInTab;
