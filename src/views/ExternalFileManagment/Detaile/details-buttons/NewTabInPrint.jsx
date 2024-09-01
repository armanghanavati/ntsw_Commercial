import { Col, Row, Table } from "antd";
import React, { useRef } from "react";
import { Button, Input, TitleBox, VerticalSpace } from "../../../../components";
import { useReactToPrint } from 'react-to-print';
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";
import {
    handleLoading,
    handleMessageModal,
    handleStepsOfCreatePage,
    handlePrintInfo
} from "../../../../state/action-creators";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import themeColors from "../../../../configs/theme";
import img3 from "../../../../assets/images/logoNTSW.png";
// import convert from "../../../../configs/helpers/convert";
import { utils } from "react-modern-calendar-datepicker";
// import converGregorianDateToJalali from "../../../../configs/helpers/convert-jalali-date-to-gregorian";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import convertJalaliDateToGregorian from "../../../../configs/helpers/convert-jalali-date-to-gregorian copy";
import moment from 'jalali-moment'


const NewTabPrint = ({ store }) => {
    const { GUid, role, detailId, printInfo, theme, colorMode } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { state } = useLocation();
    const [proformaReportInfo, setProformaReportInfo] = useState([])
    const [infoPerson, setInfoPerson] = useState([])
    const [dataSource, setDataSource] = useState(undefined)
    const printRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printRef?.current,
    });
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10000,
        },
    });
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };
    const getUserPrsInfo = () => {
        const postData = {
            PrsVCodeInt: state?.id,
            UrlVCodeInt: role,
            SsdsshGUID: GUid
        }
        axios({
            url: endpoints.RestAPIs.Person.getUserPrsInfo.url,
            method: endpoints.RestAPIs.Person.getUserPrsInfo.method,
            data: postData,
        })
            .then((res) => {
                if (res.data?.UserData?.Error === 0) {
                    setInfoPerson({
                        prsIDStr: res?.data?.UserData?.prsIDStr,
                        nationalCode: res?.data?.UserData?.prsNationalCodeStr
                    })
                } else {
                    dispatch(
                        handleMessageModal({
                            isModalOpen: true,
                            describe: res.UserData?.ErrorDesc,
                        })
                    );
                    dispatch(handleLoading(false));
                }
            })
            .catch((err) => {
                dispatch(handleLoading(false));
            });
    };

    const getPermitDetailList_NIKIAZAR = () => {
        const postData = {
            PrsVCodeInt: state?.id,
            UrlVCodeInt: role,
            SsdsshGUID: GUid
        }
        axios({
            url: endpoints.RestAPIs.Permit.getPermitDetailList_NIKIAZAR.url,
            method: endpoints.RestAPIs.Permit.getPermitDetailList_NIKIAZAR.method,
            data: postData,
        })
            .then((res) => {
                if (res.data?.Error === 0) {
                    // setPermitDetailList(res?.data)
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
            .catch((err) => {
                dispatch(handleLoading(false));
            });
    };

    const proformaReportInformation = () => {
        const postData = {
            urlVCodeInt: role,
            ssdsshGUID: "-1",
            prfVCodeInt: state?.id
        }
        axios({
            url: endpoints.RestAPIs.Proforma.ProformaReportInformation.url,
            method: endpoints.RestAPIs.Proforma.ProformaReportInformation.method,
            data: postData,
        })
            .then((res) => {
                if (res.data?.ErrorCode === 0) {
                    setProformaReportInfo({
                        fileNumber: res?.data?.Result?.proformaStruct?.prfVCodeInt,
                        prfNumberStr: res?.data?.Result?.proformaStruct?.prfNumberStr,
                        registrant: res?.data?.Result?.proformaStruct?.registrant,
                        prfDate: res?.data?.Result?.proformaStruct?.prfDate,
                        prfExpireDate: res?.data?.Result?.proformaStruct?.prfExpireDate,
                        prfCountryNameStr: res?.data?.Result?.proformaStruct?.prfCountryNameStr,
                        FIDAVcode: res?.data?.Result?.proformaStruct?.FIDAVcodeInt,
                        sellerName: res?.data?.Result?.proformaStruct?.prfSellerNameEnStr,
                        sellerTell: res?.data?.Result?.proformaStruct?.prfSellerTellStr,
                        LevelStr: res?.data?.Result?.proformaStruct?.prfLevelStr,
                        ImportGood: res?.data?.Result?.proformaStruct?.prfImportGoodType,
                        typeImport: res?.data?.Result?.proformaStruct?.prfimtVCodeStr,
                        contractType: res?.data?.Result?.proformaStruct?.prfcntVCodeStr,
                        BordersList: res?.data?.Result?.proformaStruct?.prfBordersList?.map(item => { return item?.prfBorderStr }),
                        typeImport: res?.data?.Result?.proformaStruct?.prftptList?.map(item => { return item?.tptNameStr }),
                        SourseList: res?.data?.Result?.proformaStruct?.prfSourseList?.map(item => { return item?.prfSourceStr }),
                        prfctmList: res?.data?.Result?.proformaStruct?.prfctmList?.map(item => { return item?.ctmNameStr }),
                        typeTransfer: res?.data?.Result?.proformaStruct?.prfimtVCodeStr,
                        TransportNation: res?.data?.Result?.proformaStruct?.prfTransportNationTypeStr,
                        TransportCount: res?.data?.Result?.proformaStruct?.prfTransportCountStr,
                        LoadingPlace: res?.data?.Result?.proformaStruct?.prfLoadingPlaceStr,
                        TotalPriceMny: res?.data?.Result?.proformaStruct?.prfTotalPriceMny,
                        IsBankOPStr: res?.data?.Result?.proformaStruct?.prfIsBankOPStr,
                        CurrencyType: res?.data?.Result?.proformaStruct?.prfCurrencyTypeStr,
                        prflctNameStr: res?.data?.Result?.proformaStruct?.prflctNameStr,
                        OtherCostMny: res?.data?.Result?.proformaStruct?.prfOtherCostMny,
                        DiscountMny: res?.data?.Result?.proformaStruct?.prfDiscountFlt,
                        Transport: res?.data?.Result?.proformaStruct?.prfDirectTransportTny,

                    })
                    setDataSource(res?.data?.Result?.proformaGoods)
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
            .catch((err) => {
                dispatch(handleLoading(false));
            });
    };

    useEffect(() => {
        getUserPrsInfo()
        getPermitDetailList_NIKIAZAR()
        proformaReportInformation()
    }, [])

    const columns = [
        {
            title: "ردیف",
            dataIndex: "pfgVCodeLng",
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
            title: "کد تعرفه",
            dataIndex: "gdsHSCode",
            align: "center",
        },

        {
            title: "شرح تجاری",
            dataIndex: "pfgpckVCodeInt",
            align: "center",
        },
        {
            title: "حقوق ورودی",
            dataIndex: "gdsTariffTny",
            align: "center",
        },
        {
            title: "کارخانه سازنده",
            dataIndex: "prfManufractureStr",

            align: "center",
        },
        {
            title: "وضعیت کالا",
            dataIndex: "pfgGoodsStatusStr",
            align: "center",
        },
        {
            title: "سال تولید",
            dataIndex: "pfgProductionDate",
            align: "center",
        },

        {
            title: "وزن خالص",
            dataIndex: "pfgNetWeightInt",
            align: "center",
        },

        {
            title: "وزن ناخالص",
            dataIndex: "pfgGrossWeightInt",
            align: "center",
        },
        {
            title: "تعداد / مقدار	",
            dataIndex: "pfgCountInt",
            align: "center",
        },

        {
            title: "مبلغ FOB",
            dataIndex: "pfgFOBPriceMny",
            align: "center",
        },

    ];
    const time = new Date().toLocaleTimeString()
    const date = moment().format('jYYYY/jMM/jDD')
    return (
        <>
            <div style={{ borderBottom: "1px solid silver", height: "auto", display: "flex", alignItems: "center", justifyContent: "center", justifyItems: "center", paddingTop: "5px" }}>
                <div style={{ display: "flex", paddingLeft: "25px" }}>
                    <Button onClick={handlePrint}>
                        چاپ صفحه
                        <i class="fa fa-print" aria-hidden="true"></i>
                    </Button>
                    <Link to={`/Users/AC/Commercial/ExternalTradeFileManagementDetail?_k=v9ifuf&__key=${state?.id}`}>
                        <Button>
                            بازگشت
                        </Button>
                    </Link>
                </div>
            </div >
            <div style={{ border: "1px solid #ccc", padding: "100px", margin: "100px", height: "auto", boxShadow: "5px 5px 5px 5px #888888" }}>
                <div ref={printRef}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <img src={img3} alt="img" className="img3" />
                        <p style={{ display: "flex", paddingTop: "30px", marginLeft: "50px" }}>
                            زمان چاپ :
                            <span style={{ paddingRight: "10px" }}>{time}</span>
                            <p style={{ paddingRight: "10px" }}>{date}</p>
                        </p>
                    </div>
                    <form className="form">
                        <div style={{ margin: "50px auto", border: "1px solid silver", width: "fitContent", background: "#f6f6f6", paddingRight: "20px" }}>
                            <VerticalSpace space="1rem" />
                            <Row>
                                <Col sm={24} md={24} xl={24}>
                                    <TitleBox title="مشخصات کلی" />
                                </Col>
                            </Row>
                            <hr style={{ border: "1px solid #e5e5e5" }} />
                            <Row>
                                <Col sm={24} md={12} xl={8}>
                                    <p>شماره پرونده : {proformaReportInfo?.fileNumber}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>شماره پیش فاکتور :{proformaReportInfo?.prfNumberStr}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>شماره ثبت نام :{infoPerson?.prsIDStr}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>نام متقاضی : {proformaReportInfo?.registrant}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>کد ملی :{infoPerson?.nationalCode}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>کد اقتصادی :{proformaReportInfo?.prsPostalCodeStr}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>تاریخ صدور :{proformaReportInfo?.prfDate}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>تاریخ اعتبار :{proformaReportInfo?.prfExpireDate}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>کشور ذینفع :{proformaReportInfo?.prfCountryNameStr}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>شناسه فروشنده خارجی :{proformaReportInfo?.FIDAVcode}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>فروشنده خارجی :{proformaReportInfo?.sellerName}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>تلفن فروشنده خارجی : {proformaReportInfo?.sellerTell}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>سطح دسترسی :{proformaReportInfo?.LevelStr}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>نوع کالای وارداتی :{proformaReportInfo?.ImportGood}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={24} md={24} xl={24}>
                                    <TitleBox title="اطلاعات ثبت سفارش" />
                                </Col>
                            </Row>
                            <hr style={{ border: "1px solid #e5e5e5" }} />
                            <VerticalSpace space="1rem" />
                            <Row>
                                <Col sm={24} md={12} xl={8}>
                                    <p>شماره ثبت سفارش :</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>تاریخ صدور ثبت سفارش :</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>تاریخ اعتبار ثبت سفارش :</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>نوع واردات :{proformaReportInfo?.typeTransfer}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={24} md={24} xl={24}>
                                    <TitleBox title="اطلاعات گمرکی و حمل و نقل" />
                                </Col>
                            </Row>
                            <hr style={{ border: "1px solid #e5e5e5" }} />
                            <VerticalSpace space="1rem" />
                            <Row>
                                <Col sm={24} md={12} xl={8}>
                                    <p>نوع قرارداد :{proformaReportInfo?.contractType}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>مرز ورودی :{proformaReportInfo?.BordersList}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>روش حمل :{proformaReportInfo?.typeImport}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>ناوگان حمل و نقل :{proformaReportInfo?.TransportNation}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>حمل به دفعات :{proformaReportInfo?.TransportCount}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>محل بارگیری :{proformaReportInfo?.LoadingPlace}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>کشورهای مبدا حمل :{proformaReportInfo?.SourseList}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>گمرک مقصد :{proformaReportInfo?.prfctmList}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={24} md={24} xl={24}>
                                    <TitleBox title="اطلاعات مالی و بانکی" />
                                </Col>
                            </Row>
                            <hr style={{ border: "1px solid #e5e5e5" }} />
                            <VerticalSpace space="1rem" />
                            <Row>
                                <Col sm={24} md={12} xl={8}>
                                    <p>مبلغ کل پرونده :{proformaReportInfo?.TotalPriceMny}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>نوع عملیات ارزی :{proformaReportInfo?.IsBankOPStr}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>نوع ارز :{proformaReportInfo?.CurrencyType}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={24} md={24} xl={24}>
                                    <p>تامین ارز :{proformaReportInfo?.prflctNameStr}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={24} md={12} xl={8}>
                                    <p>سایر هزینه ها :{proformaReportInfo?.OtherCostMny}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>تخفیف :{proformaReportInfo?.DiscountMny}</p>
                                </Col>
                                <Col sm={24} md={12} xl={8}>
                                    <p>هزینه حمل :{proformaReportInfo?.Transport}</p>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            {/* <VerticalSpace space="1rem" /> */}
                            <Row>
                                <Col sm={24} md={24} xl={24}>
                                    <TitleBox title="مشخصات کالای ثبت شده" />
                                </Col>
                            </Row>
                            {/* <VerticalSpace space="0.5rem" /> */}
                            <Table
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
                        </div>
                    </form >
                </div>
            </div>
        </>
    )
}
export default NewTabPrint
