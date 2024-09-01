import { Col, Row, Tooltip } from "antd";
import * as XLSX from "xlsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Validation from "../../utils/Validation";
import ETFM_Table from "./ETFM_Table";
import {
    Input,
    VerticalSpace,
    DatePicker,
    ComboBox,
    Button,
} from "../../components";
import themeColors from "../../configs/theme";
import { endpoints } from "../../services/endpoints";
import { useDispatch, useSelector } from "react-redux";
import QuickGuide from "../../components/QuickGuide";
import convert from "../../configs/helpers/convert";
// import CreateNewProforma from "./management/CreateNewProforma";
import SelectOptions from "../../components/SelectOptions";
import { handleLoading } from "../../state/action-creators";


const ProductionUnit = () => {


    const dispatch = useDispatch();
    const [filters, setFilters] = useState({});
    const [errors, setErrors] = useState({});
    //  --------------------------------------------start
    const [inputsValue, setInputsValue] = useState(0);
    //  --------------------------------------------end
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comboStatus, setComboStatus] = useState([]);
    const [comboSort, setComboSort] = useState([]);
    const [ali, setAli] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [dataSource, setDataSource] = useState(undefined);
    const [appHasMounted, setAppHaMounted] = useState(false);
    const [hasMode, setHasMode] = useState();
    const { theme, colorMode, GUid, role, personType } = useSelector(
        (state) => state
    );
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 25,
        },
    });
    // const alis;

    // تابعی برای ایجاد فایل اکسل
    //   const generateExcelFile = (data) => {
    //     // ساخت یک workbook جدید
    //     const workbook = XLSX.utils.book_new();
    //     // ساخت یک worksheet جدید
    //     const worksheet = XLSX.utils.aoa_to_sheet([
    //       [
    //         "شماره پرونده",
    //         "شماره پیش فاکتور",
    //         "تاریخ صدور پیش فاکتور",
    //         "تاریخ اعتبار پیش فاکتور",
    //         "فروشنده خارجی",
    //         "کشور ذینفع",
    //         "مبلغ کل پیش فاکتور",
    //         "نوع ارز",
    //         "نوع عملیات ارزی",
    //         "وضعیت",
    //         "ثبت کننده",
    //         "شماره ثبت سفارش",
    //         "برچسب پرونده",
    //       ],
    //       ...data,
    //     ]);

    //     // اضافه کردن worksheet به workbook
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "TRD_Excel_ProformaList");

    //     // ذخیره فایل اکسل
    //     XLSX.writeFile(workbook, "TRD_Excel_ProformaList.xlsx");
    //   };

    const steps = [
        {
            element: "#Table",
            intro:
                "کاربر گرامی پیش فاکتور های موجود به جزئیات لیست شده است، در صورت زدن دکمه جزئیات در هر سطر جزئیات بیشتری از پیش فاکتور همان سطر را مشاهده می کنید، اعمال مربوط به پیش فاکتور نیز در آن صفحه انجام میگیرد.",
            position: "right",
        },
        {
            element: "#Nav",
            intro:
                "در صورتی که پیش فاکتور مد نظر شما در لیست نبود می توانید به صورت اختصاصی با فیلتر های موجود جستجو کنید.",
            position: "right",
        },
        {
            element: "#NewFile",
            intro:
                "در صورت نیاز می توانید با این دکمه به صفحه ایجاد پیش فاکتور جدید منتقل شوید.",
            position: "right",
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

    //   const search = (event) => {
    //     event.preventDefault();
    //     if (permitForNextStep(["DateT", "DateF"])) {
    //       if (tableParams.pagination.current === 1) {
    //         getTable();
    //       } else {
    //         setTableParams({
    //           pagination: {
    //             current: 1,
    //             pageSize: 25,
    //           },
    //         });
    //       }
    //     }
    //   };

    const ItemModalHandler = (event) => {
        event.preventDefault();
        setEnabled(!enabled);
    };

    const handleChangeInputs = (name, value, validationNameList, event) => {
        setInputsValue(value);
        if (name === "DateF") {
            if (Validation.minimumDate(filters?.DateT, value) === true) {
                setErrors({
                    ...errors,
                    DateT: [],
                });
            } else {
                setErrors({
                    ...errors,
                    DateT: Validation.minimumDate(filters?.DateT, value),
                });
            }
        } else if (name === "DateT") {
            if (Validation.maximumDate(filters?.DateF, value) === true) {
                setErrors({
                    ...errors,
                    DateF: [],
                });
            } else {
                setErrors({
                    ...errors,
                    DateF: Validation.maximumDate(filters?.DateF, value),
                });
            }
        }
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



    const getTable = () => {
        const postData = {
            urlVCodeInt: role,
            ssdsshGUID: GUid,
        };
        dispatch(handleLoading(true));

        axios({
            url: endpoints.RestAPIs.StatisticsRegistration.GetProductionUnitContractRequestInfo.url,
            method: endpoints.RestAPIs.StatisticsRegistration.GetProductionUnitContractRequestInfo.method,
            data: postData,
        })
            .then((res) => {

                // }
                setDataSource(res?.data?.Result || []);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.Result?.PerformaListCount || 0,
                    },
                });
                // dispatch(handleLoading(false));
            })
            .catch((err) => {
                console.log(err);
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
        getTable();
    }, []);

    const alis = () => {
        getTable();
    }

    useEffect(() => {
        if (hasMode === "GET_EXCEL") {
        }
    }, []);

    return (
        <QuickGuide enabled={enabled} setEnabled={setEnabled} steps={steps}>
            <form className="form">
                {/* <Row>
                  <CreateNewProforma />
                 </Row> */}
                <VerticalSpace space="0.5rem" />
                {/* <Row id="Nav">
                    <Col sm={24} md={12} xl={6}>
                        <ComboBox
                            title="وضعیت"
                            name="status"
                            value={filters?.status}
                            onChange={handleChangeInputs}
                            options={comboStatus}
                            width="180px"
                            defaultValue={filters?.status ? filters?.status : ""}
                        />
                        <SelectOptions
                            title="وضعیت"
                            name="status"
                            value={filters?.status}
                            onChange={handleChangeInputs}
                            options={comboStatus}
                            width="180px"
                            defaultValue={filters?.status ? filters?.status : ""}
                        />
                    </Col>
                    <Col sm={24} md={12} xl={6}>
                        <ComboBox
                            title="انتخاب پرونده ها"
                            name="sort"
                            value={filters?.sort}
                            onChange={handleChangeInputs}
                            options={comboSort}
                            defaultValue={filters?.sort ? filters?.sort : ""}
                            width="180px"
                        />
                    </Col>
                    <Col sm={24} md={12} xl={6}>
                        <DatePicker
                            title="صدور از تاریخ"
                            name="DateF"
                            onChange={handleChangeInputs}
                            value={filters?.DateF}
                            validations={[["maximumDate", filters?.DateT]]}
                            error={errors?.DateF}
                            type={"en"}
                        />
                    </Col>
                    <Col sm={24} md={12} xl={6}>
                        <DatePicker
                            title="تا تاریخ"
                            name="DateT"
                            onChange={handleChangeInputs}
                            value={filters?.DateT}
                            validations={[["minimumDate", filters?.DateF]]}
                            error={errors?.DateT}
                            type={"en"}
                        />
                    </Col>
                    <Col sm={24} md={12} xl={6}>
                        <Input
                            onChange={handleChangeInputs}
                            title="متن جستجو"
                            type="text"
                            validations={[["maxLength", 54]]}
                            name="grantor"
                            value={filters?.grantor}
                            labelWidth="190px"
                        />
                    </Col>
                    <Col sm={24} md={12} xl={6}>
                        <span className="flex-order-row-justify-start">

                            <Button loading={loading} onClick={(event) => search(event)}>
                                <i className="fa fa-search" aria-hidden="true"></i>
                                جستجو
                            </Button>

                            <Tooltip title="راهنمای سریع" color={themeColors.comments.green}>
                                <span>
                                    <Button
                                        onClick={ItemModalHandler}
                                        backgroundColor={themeColors.comments.green}
                                    >
                                        <i class="fa fa-info" aria-hidden="true"></i>
                                    </Button>
                                </span>
                            </Tooltip>

                            <Button
                                backgroundColor={themeColors.btn.purple}
                                onClick={(e) => getDataforExcel(e)}
                            >
                                <i class="fa fa-table" aria-hidden="true"></i>
                                خروجی اکسل
                            </Button>

                        </span>
                    </Col>
                </Row> */}
            </form>
            <VerticalSpace space="0.5rem" />

            <ETFM_Table
                inputsValue={inputsValue}
                dataSource={dataSource}
                setDataSource={setDataSource}
                handleChangePageSize={handleChangePageSize}
                setTableParams={setTableParams}
                tableParams={tableParams}
                ali={alis}
            />
        </QuickGuide>
    );
};

export default ProductionUnit;
