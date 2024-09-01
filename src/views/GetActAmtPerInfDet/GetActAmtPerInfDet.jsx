import React, { useEffect, useState } from 'react'
import themeColors from '../../configs/theme';
import { Col, Table } from 'antd';
import { Button, ComboBox, Input } from '../../components';
import Validation from '../../utils/Validation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { endpoints } from '../../services/endpoints';
import { handleLoading } from '../../state/action-creators';
import { Link } from "react-router-dom";

const GetActAmtPerInfDet = () => {
    const [filters, setFilters] = useState({});
    const [errors, setErrors] = useState({});
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comboStatus, setComboStatus] = useState([]);
    const [comboSort, setComboSort] = useState([]);
    const [dataSource, setDataSource] = useState(undefined);
    const [appHasMounted, setAppHaMounted] = useState(false);
    const dispatch = useDispatch()
    const { GUid, role, colorMode, theme, } = useSelector(
        (state) => state
    );
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 25,
        },
    });

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
            title: "ارزش پرونده",
            dataIndex: "prfNumberStr",
            align: "center",
        },
        {
            title: "نوع ارز پرونده",
            dataIndex: "prfDate",
            align: "center",

        },
        {
            title: "نرخ ارز بر حسب ریال",
            dataIndex: "prfExpireDate",
            align: "center",
        },
        {
            title: "فروشنده خارجی",
            dataIndex: "prfSellerNameEnStr",
            align: "center",
        },
        {
            title: "تاریخ تبدیل نرخ ارز",
            dataIndex: "prfCountryNameStr",
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
            title: "ارزش دلاری تبدیل شده",
            dataIndex: "prfTotalPriceMny",
            align: "center",
        },
        {
            title: "ارزش ترخیص پرونده در سال های گذشته(دلار)",
            dataIndex: "prfCurrencyTypeStr",
            align: "center",
        },
        {
            title: "ارزش استفاده شده از سهمیه(دلار)",
            dataIndex: "prfIsBankOPStr",
            align: "center",
        },
    ];

    const permitForNextStep = (inputsName = []) => {
        for (var key in errors) {
            if (errors[key]?.length > 0) {
                return false;
            }
        }
        return true;
    };

    const handleChangePageSize = (event, id) => {
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

    const getDataforExcel = (handleDownloadExcel) => {
        const postData = {
            withComboData: true,
            pState: filters?.status || "",
            // pDateF: convert(filters?.DateF),
            // pDateT: convert(filters?.DateT),
            ptxtSearch: filters?.grantor || "",
            pStartIndex: 0,
            pPageSize: 10000,
            pSortBy: filters?.sort || "",
            PrfVCodeInt: 0,
            prfplbVCodeInt: "",
            prfromVCodeInt: "",
            urlVCodeInt: role,
            ssdsshGUID: GUid,
        };
        axios({
            url: endpoints.RestAPIs.Proforma.NTSW_ProformaListforma.url,
            method: endpoints.RestAPIs.Proforma.NTSW_ProformaListforma.method,
            data: postData,
        })
            .then((res) => {
                const bodyData = [];
                res?.data?.Result?.PerformaList.map((itm) =>
                    bodyData.push([
                        itm?.prfVCodeInt,
                        itm?.prfNumberStr,
                        itm?.prfDate,
                        itm?.prfExpireDate,
                        itm?.prfSellerNameEnStr,
                        itm?.prfCountryNameStr,
                        itm?.prfTotalPriceMny,
                        itm?.prfCurrencyTypeStr,
                        itm?.prfIsBankOPStr,
                        itm?.prfStatusStr,
                        itm?.registrant,
                        itm?.prfStatusTny,
                        itm?.romDescritpionStr,
                    ])
                );
                const headerRowData = [
                    "شماره پرونده",
                    "شماره پیش فاکتور",
                    "تاریخ صدور پیش فاکتور",
                    "تاریخ اعتبار پیش فاکتور",
                    "فروشنده خارجی",
                    "کشور ذینفع",
                    "مبلغ کل پیش فاکتور",
                    "نوع ارز",
                    "نوع عملیات ارزی",
                    "وضعیت",
                    "ثبت کننده",
                    "شماره ثبت سفارش",
                    "برچسب پرونده",
                ]
                handleDownloadExcel(headerRowData, bodyData, "NTSW_ExportCurrencyReques");

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getTable = (mode) => {
        dispatch(handleLoading(true));
        const postData = {
            withComboData: true,
            pState: filters?.status || "",
            // pDateF: convert(filters?.DateF),
            // pDateT: convert(filters?.DateT),
            ptxtSearch: filters?.grantor || "",
            pStartIndex: tableParams?.pagination?.current - 1,
            pPageSize: tableParams?.pagination?.pageSize,
            pSortBy: filters?.sort || "",
            PrfVCodeInt: 0,
            prfplbVCodeInt: "",
            prfromVCodeInt: "",
            urlVCodeInt: role,
            ssdsshGUID: GUid,
        };
        setLoading(true);
        dispatch(handleLoading(true));
        axios({
            url: endpoints.RestAPIs.Proforma.NTSW_ProformaListforma.url,
            method: endpoints.RestAPIs.Proforma.NTSW_ProformaListforma.method,
            data: postData,
        })
            .then((res) => {
                if (mode === "FIRST_TIME") {
                    const optionsStatus = [];
                    const sortStatus = [];

                    const optionsTemp = Object.entries(res?.data?.Result?.ProformaStatus);
                    optionsTemp.map((item) =>
                        optionsStatus.push({ id: item[0], name: item[1] })
                    );
                    setComboStatus([{ id: "", name: "همه" }, ...optionsStatus]);

                    const sortTemp = Object.entries(
                        res?.data?.Result?.ProformaActiveStatus
                    );
                    sortTemp.map((itm) => sortStatus?.push({ id: itm[0], name: itm[1] }));
                    setComboSort([{ id: "", name: "همه" }, ...sortStatus]);
                }
                setDataSource(res?.data?.Result?.PerformaList || []);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.Result?.PerformaListCount || 0,
                    },
                });
                setLoading(false);
                dispatch(handleLoading(false));
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                dispatch(handleLoading(false));
            });
    };

    useEffect(() => {
        if (appHasMounted) {
            setDataSource([]);
            getTable();
        }
    }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

    useEffect(() => {
        setAppHaMounted(true);
        setDataSource([]);
        getTable("FIRST_TIME");
    }, []);

    const search = (event) => {
        event.preventDefault();
        if (permitForNextStep(["DateT", "DateF"])) {
            if (tableParams.pagination.current === 1) {
                getTable();
            } else {
                setTableParams({
                    pagination: {
                        current: 1,
                        pageSize: 25,
                    },
                });
            }
        }
    };

    const ItemModalHandler = (event) => {
        event.preventDefault();
        setEnabled(!enabled);
    };


    const handleChangeInputs = (name, value, validationNameList, event) => {
        const temp = [];
        validationNameList &&
            validationNameList.map((item) => {
                if (Validation[item[0]](value, item[1]) === true) {
                } else {
                    temp.push(Validation[item[0]](value, item[1]));
                }
            });
        setErrors((prevstate) => {
            return {
                ...prevstate,
                [name]: [...temp],
            };
        });
        setFilters((prevstate) => {
            return {
                ...prevstate,
                [name]: value,
            };
        });
    };

    return (
        <>
            <Col sm={24} md={12} xl={6} xxl={6}>
                <Input
                    title="شماره پرونده"
                    name="searchText"
                    // onChange={handleChangeInputs}
                    // value={filters?.searchText}
                    width="180px"
                />
            </Col>
            <Col style={{ display: "flex" }} className='' >
                <Button name="getTable">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    جستجو
                </Button>
                <Button
                    backgroundColor={themeColors.btn.purple}
                // onClick={generateExcelFile}
                >
                    <i class="fa fa-table" aria-hidden="true"></i>
                    خروجی اکسل
                </Button>
            </Col>
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
                <Button
                    name="hideModal1"
                    backgroundColor={themeColors.btn.danger}
                    onClick={(event) => {
                    }}
                >
                    بازگشت
                </Button>
            </>
        </>
    )
}

export default GetActAmtPerInfDet