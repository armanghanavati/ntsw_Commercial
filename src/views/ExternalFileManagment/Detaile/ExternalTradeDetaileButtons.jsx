import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Modal, Row, Steps } from "antd";
import themeColors from "../../../configs/theme";
import {
    handelQuestionModal,
    handleLoading,
    handleMessageModal,
} from "../../../state/action-creators";
import { Button, ComboBox, Signature, QuickGuide } from "../../../components";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import { getExtentionType } from "../../../configs/helpers/get-extension-type";
import Validation from "../../../utils/Validation";
import { useHistory } from "react-router-dom";
import RemoveProformaButton from "./details-buttons/RemoveProformaButton";
import CopyProformaButton from "./details-buttons/CopyProformaButton";
import { Link } from 'react-router-dom'

const ExternalTradeDetaileButtons = ({
    detailExternal,
    getCommodityTab,
    getRegedOrderDetail,
    editingId,
    editHSProduct,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const { role, GUid, theme, messageModal } = useSelector((state) => state);
    const status = detailExternal.prfStatusTny;
    const activeStatus = detailExternal.prfActiveStatusTny;
    const subStatus = detailExternal.prfSubStatusInt;
    const subActiveStatus = detailExternal.prfSubActiveStatus;


    const [handleMessage, setHandleMessage] = useState();
    const [filters, setFilters] = useState({});
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [proformaDocuments, setProformaDocuments] = useState([]);
    const [enabled, setEnabled] = useState(false);

    const AccessDocuments = [
        { id: 1, name: "خیلی محدود" },
        { id: 2, name: "محدود" },
        { id: 3, name: "متوسط" },
        { id: 4, name: "کامل" },
    ];

    const handleRefresh = () => {
        getCommodityTab();
        getRegedOrderDetail();
    };

    const EditFilled = (event) => {
        event?.preventDefault();
        dispatch(
            handleMessageModal({
                type: "warning",
                isModalOpen: true,
                describe:
                    "در صورتی که هر یک از فیلدهایی که توسط سازمان مجوز دهنده مهم اعلام شده اند، ویرایش شوند، پرونده نیاز به مجوز جدید از سازمان مربوطه خواهد داشت. برای مشاهده فیلدهای مهم پرونده به کاربرگ مدیریت مجوزها مراجعه شود",
            })
        );
        setHandleMessage("FORWARD_EDIT");
    };

    const handleChangeInputs = (name, value, validationNameList = undefined) => {
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

    const handleValidation = (inputsName = []) => {
        const err = { ...errors };
        inputsName.map((item) => {
            if (
                filters[item] === undefined ||
                filters[item] === null ||
                JSON.stringify(filters[item])?.trim() === ""
            ) {
                err[item] = ["پرکردن این فیلد الزامی است"];
            }
        });
        setErrors(err);
        return err;
    };
    const permitForSkip = (inputsName = []) => {
        const error = handleValidation(inputsName);
        for (var key in error) {
            if (error[key]?.length > 0) {
                if (inputsName.includes(key)) {
                    return false;
                }
            }
        }
        return true;
    };

    useEffect(() => {
        if (
            handleMessage === "FORWARD_EDIT" &&
            messageModal?.isModalOpen === false
        ) {
            history.push({
                pathname: "/Users/AC/Commercial/Proforma",
                state: { from: { editingId: 45, editing: 55 } },
            });
        }
    }, [messageModal?.isModalOpen === false]);
    useEffect(() => {
        if (handleMessage === "CONTINUE_FILE_REGISTRATION") {
            history.push({
                pathname: "/Users/AC/Commercial/Proforma",
                state: { from: "Has-Continue-File-Registration" },
                continue: "CONTINUE_FILE_REGISTRATION",
            });
        }
    }, [[messageModal?.isModalOpen === false]]);

    const Btn1 = () => {
        return (
            <Button
                name="viewDocumentation"
                onClick={(e) => {
                    e.preventDefault();
                    setShowModal1(true);
                }}
            >
                <i class="fa fa-eye" aria-hidden="true"></i>
                تغییر سطح دسترسی
            </Button>
        );
    };

    const Btn4 = () => {
        return (
            <Button name="getTable" onClick={EditFilled}>
                ویرایش پرونده
            </Button>
        );
    };
    const Btn5 = () => {
        return <Button onClick={() => { }}
            name="getTable">انصراف از ویرایش</Button>;
    };
    const Btn6 = () => {
        return <Button name="getTable"> انصراف از تمدید </Button>;
    };

    const Btn7 = ({ title = "ادامه ثبت پرونده" }) => {
        return (
            <Button
                onClick={(e) => {
                    btn7ServiceHandler(e);
                }}
                name="getTable"
                backgroundColor={themeColors.btn.purple}
            >
                <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                {title}
            </Button>
        );
    };

    const Btn8 = () => {
        return (
            <Button
                name="getTable"
                backgroundColor={themeColors.btn.warning}
                onClick={(e) => showProformaDocument(e)}
            >
                <i class="fa fa-file-text-o" aria-hidden="true"></i>
                مشاهده مستندات
            </Button>
        );
    };
    const Btn9 = () => {
        return <Button name="getTable">بایگانی</Button>;
    };
    const Btn10 = () => {
        return <Button name="getTable">تمدید ثبت سفارش</Button>;
    };
    const Btn11 = () => {
        return <Button name="getTable">چاپ اطلاعات ثبت سفارش</Button>;
    };
    const Btn12 = () => {
        return (
            <Button name="getTable" onClick={(e) => getLatestPermitsStatus(e)}>
                <i class="fa fa-database"></i>
                استعلام آخرین وضعیت مجوز
            </Button>
        );
    };

    const Btn13 = () => {
        return (
            <Button name="getTable" onClick={(e) => showProformaDocument(e)}>
                <i class="fa fa-database"></i>
                استعلام اولویت ثبت سفارش
            </Button>
        );
    };

    const Btn14 = () => {
        return (
            <Button name="getTable" onClick={(e) => permitRejectionRequest(e)}>
                <i class="fa fa-database"></i>
                ارسال درخواست رد مجوزها
            </Button>
        );
    };

    const btn7ServiceHandler = (e) => {
        e.preventDefault();
        setHandleMessage("CONTINUE_FILE_REGISTRATION");
        if (status === 1 && (activeStatus === 1 || 4 || 6)) {
            // استعلام ضوابط
            sendProformaToProducrInquiry17();
        }
        if (status === 3 && (activeStatus === 1 || 4 || 6)) {
            // درخواست مجوز
            // history.push("/Users/AC/Commercial/RequestPermission");
            history.push({
                pathname: "/Users/AC/Commercial/RequestPermission",
                state: { prfVCodeInt: editingId },
            });
        }
    };

    const sendProformaToProducrInquiry17 = () => {
        try {
            dispatch(handleLoading(true));
            const postData = {
                CallStatus: 1,
                originCaller: 0,
                urlVCodeInt: role,
                ssdsshGUID: GUid,
                prfVCodeInt: editingId,
            };

            axios({
                url: endpoints.RestAPIs.Proforma.SendProformaToProductInquiry17.url,
                method:
                    endpoints.RestAPIs.Proforma.SendProformaToProductInquiry17.method,
                data: postData,
            }).then((res) => {
                if (res?.data?.ErrorCode === 0) {
                    dispatch(
                        handleMessageModal({
                            isModalOpen: true,
                            describe: res.data?.ErrorDesc,
                            type: "success",
                        })
                    );
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
    };

    const getLatestPermitsStatus = (e) => {
        e.preventDefault();
        try {
            dispatch(handleLoading(true));
            const postData = {
                originCaller: 0,
                urlVCodeInt: role,
                ssdsshGUID: GUid,
                prfVCodeInt: editingId,
            };
            axios({
                url: endpoints.RestAPIs.Proforma.getLatestPermitsStatus.url,
                method: endpoints.RestAPIs.Proforma.getLatestPermitsStatus.method,
                data: postData,
            }).then((res) => {
                if (res?.data?.ErrorCode === 0) {
                    dispatch(
                        handleMessageModal({
                            isModalOpen: true,
                            describe: res.data?.ErrorDesc,
                            type: "success",
                        })
                    );
                    // <Link to="/Users/AC/Commercial/EstelamAkharinMojavez" >
                    // </ Link>

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
    };

    const permitRejectionRequest = (e) => {
        e.preventDefault();
        try {
            dispatch(handleLoading(true));
            const postData = {
                urlVCodeInt: role,
                ssdsshGUID: GUid,
                PrfVcodeInt: editingId,
            };
            axios({
                url: endpoints.RestAPIs.permit.permitRejectionRequest.url,
                method: endpoints.RestAPIs.permit.permitRejectionRequest.method,
                data: postData,
            }).then((res) => {
                if (res?.data?.Error === 0) {
                    dispatch(
                        handleMessageModal({
                            isModalOpen: true,
                            describe: res.data?.ErrorDesc,
                            type: "success",
                        })
                    );
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
    };

    const showProformaDocument = (e) => {
        e.preventDefault();
        try {
            dispatch(handleLoading(true));
            const postData = {
                urlVCodeInt: role,
                ssdsshGUID: GUid,
                PrfVcodeInt: editingId,
            };
            axios({
                url: endpoints.RestAPIs.Proforma.showProformaDocument.url,
                method: endpoints.RestAPIs.Proforma.showProformaDocument.method,
                data: postData,
            }).then((res) => {
                if (res?.data?.Error === 0) {
                    setProformaDocuments(res?.data?.DOCs);
                    setShowModal(true);
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
    };

    const changeProformaLevel = (e) => {
        e.preventDefault();
        if (permitForSkip(["AccessDocuments"]) === true) {
            dispatch(handleLoading(true));
            try {
                const postData = {
                    PrfLevelTny: filters?.AccessDocuments,
                    urlVCodeInt: role,
                    ssdsshGUID: GUid,
                    PrfVcodeInt: editingId,
                };
                axios({
                    url: endpoints.RestAPIs.Proforma.changeProformaLevel.url,
                    method: endpoints.RestAPIs.Proforma.changeProformaLevel.method,
                    data: postData,
                }).then((res) => {
                    if (res?.data?.ErrorCode === 0) {
                        setShowModal1(false);
                        handleRefresh();
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
    };

    const downloadFile = ({ DOC, Caption, Format }) => {
        const raw = window.atob(DOC);
        const rawLength = raw.length;
        let array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        const file = new Blob([array], {
            type: getExtentionType(`.${Format.toLowerCase()}`),
        });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    };

    const handlerCloseChangeProformaLevel = () => {
        setShowModal1(false);
        form.resetFields();
        setFilters((prev) => ({
            ...prev,
            AccessDocuments: detailExternal?.prfLevelTny,
        }));
        setErrors((prev) => ({ ...prev, AccessDocuments: [] }));
    };
    const steps = [
        {
            element: "#hhha",
            intro:
                "کاربر گرامی این فرم جهت برخی اقدامات و مشاهده جزئیات پرونده طراحی شده است.",
            position: "right",
        },
        {
            element: "#operationButtons",
            intro: "دراین قسمت اقدامات موجود لیست شده است .",
            position: "right",
        },
    ];

    const ItemModalHandler = (event) => {
        event.preventDefault();
        setEnabled(!enabled);
    };

    return (
        <>
            <QuickGuide enabled={enabled} setEnabled={setEnabled} steps={steps}>
                <div id="operationButtons" className="btnDiv">
                    <Button
                        onClick={(e) => ItemModalHandler(e)}
                        backgroundColor={themeColors.comments.green}
                    >
                        <i class="fa fa-info" aria-hidden="true"></i>
                    </Button>
                    <Button
                        id="hhha"
                        onClick={handleRefresh}
                        backgroundColor={themeColors.btn.danger}
                    >
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </Button>

                    {subActiveStatus === 10 ? (
                        <>
                            <CopyProformaButton
                                PrfVcode={editingId}
                                handleRefresh={handleRefresh}
                            />
                            <Btn8 />
                        </>
                    ) : (
                        <>
                            {status === 0 && activeStatus === 1 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn7 /> <Btn8 />{" "}
                                </>
                            ) : status === 0 && activeStatus === 2 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn8 />{" "}
                                </>
                            ) : null}

                            {status === 1 && activeStatus === 1 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn4 /> <Btn7 title="استعلام ضوابط" /> <Btn8 />{" "}
                                </>
                            ) : status === 1 && activeStatus === 2 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn8 />{" "}
                                </>
                            ) : status === 1 && activeStatus === 4 ? (
                                <>
                                    {" "}
                                    <Btn5 />
                                    <Btn7 title="استعلام ضوابط" />{" "}
                                </>
                            ) : status === 1 && activeStatus === 6 ? (
                                <>
                                    {" "}
                                    <Btn6 />
                                    <Btn7 title="استعلام ضوابط" />{" "}
                                </>
                            ) : null}

                            {status === 2 && (activeStatus === 1 || 2 || 4 || 6) ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : null}

                            {status === 3 && activeStatus === 1 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn4 /> <Btn7 title="درخواست مجوز" /> <Btn8 />{" "}
                                </>
                            ) : status === 3 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 3 && activeStatus === 4 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn5 /> <Btn7 title="درخواست مجوز" /> <Btn8 />{" "}
                                </>
                            ) : status === 3 && activeStatus === 6 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn6 /> <Btn7 title="درخواست مجوز" /> <Btn8 />{" "}
                                </>
                            ) : null}

                            {status === 4 && activeStatus === 1 ? (
                                <>
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn4 /> <Btn8 />{" "}
                                </>
                            ) : status === 4 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 4 && activeStatus === 4 ? (
                                <>
                                    {" "}
                                    <Btn1 /> <CopyProformaButton
                                        PrfVcode={editingId}
                                    /> <Btn5 /> <Btn8 />{" "}
                                </>
                            ) : status === 4 && activeStatus === 6 ? (
                                <>
                                    {" "}
                                    <Btn1 /> <CopyProformaButton
                                        PrfVcode={editingId}
                                    /> <Btn6 /> <Btn8 />{" "}
                                </>
                            ) : null}
                            {status === 5 && activeStatus === 1 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 /> <Btn12 />{" "}
                                </>
                            ) : status === 5 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 5 && activeStatus === 4 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 /> <Btn12 />{" "}
                                </>
                            ) : status === 5 && activeStatus === 6 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 /> <Btn12 />{" "}
                                </>
                            ) : null}
                            {status === 5 && subStatus === 550 && <Btn14 />}

                            {status === 6 && activeStatus === 1 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn4 /> <Btn7 title="درخواست ثبت سفارش" /> <Btn8 />{" "}
                                </>
                            ) : status === 6 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 6 && activeStatus === 4 ? (
                                <>
                                    {" "}
                                    <Btn1 /> <CopyProformaButton
                                        PrfVcode={editingId}
                                    /> <Btn5 /> <Btn7 title="درخواست ثبت سفارش" /> <Btn8 />{" "}
                                </>
                            ) : status === 6 && activeStatus === 6 ? (
                                <>
                                    {" "}
                                    <Btn1 /> <CopyProformaButton
                                        PrfVcode={editingId}
                                    /> <Btn6 /> <Btn7 title="درخواست ثبت سفارش" /> <Btn8 />{" "}
                                </>
                            ) : null}

                            {status === 7 && activeStatus === 1 ? (
                                <>
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />
                                </>
                            ) : status === 7 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 7 && activeStatus === 4 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 7 && activeStatus === 6 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : null}

                            {status === 8 && activeStatus === 1 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn4 /> <Btn7 title="پرداخت کارمزد" /> <Btn8 />{" "}
                                </>
                            ) : status === 8 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 8 && activeStatus === 4 ? (
                                <>
                                    {" "}
                                    <Btn1 /> <CopyProformaButton
                                        PrfVcode={editingId}
                                    /> <Btn5 /> <Btn7 title="پرداخت کارمزد" /> <Btn8 />{" "}
                                </>
                            ) : status === 8 && activeStatus === 6 ? (
                                <>
                                    {" "}
                                    <Btn1 /> <CopyProformaButton
                                        PrfVcode={editingId}
                                    /> <Btn6 /> <Btn7 title="پرداخت کارمزد" /> <Btn8 />{" "}
                                </>
                            ) : null}
                            {status === 9 && activeStatus === 1 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn4 /> <Btn8 /> <Btn10 /> <Btn11 /> <Btn13 />{" "}
                                </>
                            ) : status === 9 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : null}
                            {status === 10 && activeStatus === 1 ? (
                                <>
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn4 /> <Btn8 />{" "}
                                </>
                            ) : status === 10 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 10 && activeStatus === 4 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn5 />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 10 && activeStatus === 6 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn6 />
                                    <Btn8 />{" "}
                                </>
                            ) : null}
                            {status === 11 && activeStatus === 1 ? (
                                <>
                                    <Btn1 />{" "}
                                    <RemoveProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn4 /> <Btn8 />{" "}
                                </>
                            ) : status === 11 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 11 && activeStatus === 4 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn5 /> <Btn8 />{" "}
                                </>
                            ) : status === 11 && activeStatus === 6 ? (
                                <>
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn6 /> <Btn8 />{" "}
                                </>
                            ) : null}
                            {status === 12 && (activeStatus === 1 || 2 || 4 || 6) ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : null}
                            {status === 13 && (activeStatus === 1 || 2 || 4 || 6) ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : null}
                            {status === 20 && (activeStatus === 1 || 2 || 4 || 6) ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : null}
                            {status === 21 && activeStatus === 1 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 21 && activeStatus === 2 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 21 && activeStatus === 4 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn5 />
                                    <Btn8 />{" "}
                                </>
                            ) : status === 21 && activeStatus === 6 ? (
                                <>
                                    {" "}
                                    <Btn1 />{" "}
                                    <CopyProformaButton
                                        PrfVcode={editingId}
                                        handleRefresh={handleRefresh}
                                    />{" "}
                                    <Btn6 />
                                    <Btn8 />{" "}
                                </>
                            ) : null}
                        </>
                    )}
                </div>
            </QuickGuide>
            <Modal
                style={{
                    backgroundColor: themeColors[theme]?.menueBg,
                    color: themeColors[theme]?.text,
                }}
                centered
                title=" تغییر کارشناس اظهارنامه"
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={[
                    <Button
                        name="hideModal1"
                        backgroundColor={themeColors.btn.danger}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowModal(false);
                        }}
                    >
                        بستن
                    </Button>,
                ]}
                width={1200}
            >
                <form style={{ padding: "0 20px" }}>
                    <div className="flex-order-row" >
                        {proformaDocuments.map((doc) => (
                            <img
                                className="showDocs"
                                onClick={() =>
                                    downloadFile({
                                        DOC: doc.DOC,
                                        Caption: doc.Caption,
                                        Format: doc.Format,
                                    })
                                }
                                src={`data:${doc.Caption};base64, ${doc.DOC}`}
                                alt={doc?.Caption}
                            />
                        ))}
                    </div>
                </form>
            </Modal>
            <Modal
                style={{
                    backgroundColor: themeColors[theme]?.menueBg,
                    color: themeColors[theme]?.text,
                }}
                centered
                title="تغییر سطح دسترسی اسنادی"
                open={showModal1}
                onCancel={() => {
                    handlerCloseChangeProformaLevel();
                }}
                footer={[
                    <Button
                        name="hideModal2"
                        backgroundColor={themeColors.btn.secondary}
                        onClick={(e) => {
                            changeProformaLevel(e);
                        }}
                    >
                        تایید
                    </Button>,
                    <Button
                        name="hideModal1"
                        backgroundColor={themeColors.btn.danger}
                        onClick={(e) => {
                            e.preventDefault();
                            handlerCloseChangeProformaLevel();
                        }}
                    >
                        انصراف
                    </Button>,
                ]}
                width={600}
            >
                <form className="form">
                    <Col sm={24} md={24} xl={24}>
                        <Form form={form}>
                            <Form.Item name={"AccessDocuments"}>
                                <ComboBox
                                    name="AccessDocuments"
                                    title="سطح دسترسی اسنادی"
                                    labelWidth="188px"
                                    validations={[["required"]]}
                                    onChange={handleChangeInputs}
                                    options={AccessDocuments}
                                    error={errors?.AccessDocuments}
                                    defaultValue={detailExternal?.prfLevelTny}
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                </form>
            </Modal>
        </>
    );
};

export default ExternalTradeDetaileButtons;
