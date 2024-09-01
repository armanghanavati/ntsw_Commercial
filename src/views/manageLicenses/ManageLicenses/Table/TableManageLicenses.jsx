import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";
import Button from "../../../../components/Button";
import { handleGetPageSize, handleLoading, handleMessageModal } from "../../../../state/action-creators/index";
import ManageLicensesDetailsModal from "../Modals/ManageLicensesDetailsModal";
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";

const TableManageLicenses = ({ loading, dataSource, setDataSource, }) => {
    const { theme, colorMode, role, GUid } = useSelector((state) => state);
    const dispatch = useDispatch()
    const [detailData, setDetailData] = useState([])
    const [convertDate, setConvertDate] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 25,
        },
    });

    // -> get talble service
    const getDetail = (pfgVCodeLng, prfVCodeInt) => {
        try {
            const postData = {
                pfgVCodeLng: pfgVCodeLng,
                urlVCodeInt: role,
                ssdsshGUID: GUid,
                prfVCodeInt: prfVCodeInt
            }
            // dispatch(handleLoading(true));
            axios({
                url: endpoints.RestAPIs.permit.getPermitDetailList.url,
                method: endpoints.RestAPIs.permit.getPermitDetailList.method,
                data: postData,
            })
                .then((res) => {
                    if (res.data.Error === 0) {
                        setOpenModal(true)
                        setDetailData(res?.data)
                        // ->get date convert
                        const temp = res?.data?.prfDate.split(" ")[0];
                        const dateTemp = temp.split("/");
                        let day = dateTemp[1];
                        let month = dateTemp[0];
                        let year = dateTemp[2];
                        let datepicker = year + "/" + month + "/" + day;
                        setConvertDate(datepicker)
                        // 

                    } else {
                        dispatch(
                            handleMessageModal({
                                isModalOpen: true,
                                describe: res.data?.ErrorDesc,
                            })
                        );
                        dispatch(handleLoading(false));
                    }
                })
        } catch (error) {
            console.log(error);
        }
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
            title: "کد درخواست سامانه مجوزها",
            dataIndex: "prfVCodeInt",
            align: "center",
        },
        {
            title: "شماره پرونده",
            dataIndex: "prfVCodeInt",
            align: "center",
        },
        {
            title: "شماره پیش فاکتور",
            dataIndex: "prfStatusTny",
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
            title: "فروشنده خارجی",
            dataIndex: "FIDANameStr",
            align: "center",
        },
        {
            title: "شماره تعرفه (HS)",
            dataIndex: "gdsHSCode",
            align: "center",
        },
        {
            title: "شرح تجاری کالا",
            dataIndex: "pfgCommercialDescStr",
            align: "center",
        },
        {
            title: "جزئیات",
            dataIndex: "detaile",
            align: "center",
            render: (_, { pfgVCodeLng, prfVCodeInt }, index) => (
                <div className="flex-order-row">
                    <Button onClick={() => {
                        getDetail(pfgVCodeLng, prfVCodeInt);
                    }}
                        type="secondary">
                        <i className="fa fa-search"></i>
                        جزئیات
                    </Button>
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
            <ManageLicensesDetailsModal convertDate={convertDate} detailData={detailData} openModal={openModal} setOpenModal={setOpenModal} dataSource={dataSource} setDataSource={setDataSource} />
        </>
    );
};

export default TableManageLicenses;