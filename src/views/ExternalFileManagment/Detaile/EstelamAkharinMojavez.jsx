import { Table } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../../../configs/theme";
import { Button } from "../../../components";
import { useLocation } from 'react-router-dom'
import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import { handleLoading, handleMessageModal } from "../../../state/action-creators";

const EstelamAkharinMojavez = ({ loading, dataSource, handleMessage, setHandleMessage }) => {
    const dispatch = useDispatch()
    const { GUid, role, theme, colorMode } = useSelector((state) => state);
    const { search } = useLocation()
    const [getData, setGetData] = useState([])
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
            title: "کد مجازی کالا",
            dataIndex: "pfgVCodeLng",
            align: "center",
        },
        {
            title: "شماره تعرفه",
            dataIndex: "HSCode",
            align: "center",
        },
        {
            title: "شرح تجاری کالا",
            dataIndex: "pfgCommercialDescStr",
            align: "center",
        },
        {
            title: "سازمان مجوز دهنده",
            dataIndex: "agnNameStr",
            align: "center",
        },
        {
            title: "وضعیت مجوز",
            dataIndex: "Status",
            align: "center",
        },
        {
            title: "نظر سازمان مجوز دهنده",
            dataIndex: "Opinion",
            align: "center",
        },
    ];

    const getTable = () => {
        dispatch(handleLoading(true));
        const postData = {
            originCaller: 0,
            urlVCodeInt: role,
            ssdsshGUID: GUid,
            prfVCodeInt: search.split("=")?.[1]
        }
        try {
            axios({
                url: endpoints.RestAPIs.Proforma.getLatestPermitsStatus.url,
                method: endpoints.RestAPIs.Proforma.getLatestPermitsStatus.method,
                data: postData,
            }).then((res) => {
                if (res?.data?.ErrorCode === 0) {
                    setGetData(res?.data?.Result)
                } else {
                    dispatch(
                        handleMessageModal({
                            isModalOpen: true,
                            describe: res.data?.ErrorDesc,
                        })
                    );
                }
                dispatch(handleLoading(false));
            });
        } catch (error) {
            console.log(error);
            dispatch(handleLoading(false));
        }
    }

    useEffect(() => {
        getTable()
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
            </span >
            <Table
                id="Table"
                dataSource={getData}
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
            <Link to={`/Users/AC/Commercial/ExternalTradeFileManagementDetail?_k=v9ifuf&__key=${search.split("=")?.[1]}`}>
                <Button
                    // style={{ backgroundColor: "red" }}
                    backgroundColor={themeColors.btn.warning}
                >
                    <i className="fa fa-2x fa-undo  icon-flipped" />
                    بازگشت </Button>
            </Link>
        </>
    );
};

export default EstelamAkharinMojavez;
