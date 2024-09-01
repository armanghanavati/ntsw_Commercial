import React, { useState, useEffect } from "react";
import axios from "axios";
import themeColors from "../../../configs/theme";
import { Button, ComboBox, TitleBox, VerticalSpace } from "../../../components";
import { Col, Modal, Row, Tooltip } from "antd";
import Step1 from "./Step1";
import { handleLoading, handleMessageModal, handleStepsOfCreatePage } from "../../../state/action-creators";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { endpoints } from "../../../services/endpoints";
import { useLocation } from 'react-router-dom';
import OrderInfoInCertificateOfInspectionDetails from "../Detail/OrderInfoInCertificateOfInspectionDetails/OrderInfoInCertificateOfInspectionDetails";
import Validation from "../../../utils/Validation";
import { name } from "platform";

// import Ste
const Step0 = ({ errors, setErrors, inputsData, setInputsData }) => {
    const history = useHistory()
    const { search } = useLocation();
    const { stepsOfCreatePage, theme, GUid, role, } = useSelector((state) => state);
    const [showWarningdissuasion, setShowWarningDissuasion] = useState(false)
    const [showNewCertificate, setShowNewCertificaten] = useState(false)
    const [goodsCombo, setGoodsCombo] = useState({})
    const [filters, setFilters] = useState({})
    const dispatch = useDispatch()



    const next = (e) => {
        e?.preventDefault();
        dispatch(
            handleStepsOfCreatePage({ ICO: stepsOfCreatePage?.ICO + 1 })
        );
    }

    const OrderRegistration = [{ id: "true", name: "بله" }, { id: "false", name: "خیر" }]

    const submitHandler = (e) => {
        e.preventDefault();
        setShowWarningDissuasion(false);
        history?.push(`/Users/AC/Commercial/CertificateOfInspection`)
    }


    const dissuasionButton = (e) => {
        e?.preventDefault();
        setShowWarningDissuasion(true)
    }

    const getProformaInfoIC = () => {
        dispatch(handleLoading(true));
        const postData = {
            prfVCodeInt: !!inputsData?.goodsId ? +(inputsData?.goodsId) : 0,
            urlVCodeInt: role,
            ssdsshGUID: GUid
        }
        dispatch(handleLoading(true));
        axios({
            url: endpoints?.RestAPIs.InspectionCartificatelC.getProformaInfoIC.url,
            method: endpoints?.RestAPIs.InspectionCartificatelC.getProformaInfoIC.method,
            data: postData,

        })
            .then((res) => {
                if (res.data.ErrorCode === 0) {
                    setShowNewCertificaten(true)
                    setFilters({
                        iciVCodeInt: res?.data?.Result?.iciVCodeInt,
                        totalAmount: res?.data?.Result?.prfTotalPriceMny,
                        FreightCost: res?.data?.Result?.prfFreightCostMny,
                        OtherCost: res?.data?.Result?.prfOtherCostMny,
                        Borders: res?.data?.Result?.proformaBorders,
                        countryOfOriginOfShipment: res?.data?.Result?.proformaSources,
                        DestinationsCustomes: res?.data?.Result?.proformaDestinations,
                        beneficiaryCountry: res?.data?.Result?.cnyNameStr,
                        contractType: res?.data?.Result?.cntNameStr,
                        shipingMethode: res?.data?.Result?.proformaTransportTypes,
                        currencySupply: res?.data?.Result?.proformaCurrencyTypes,
                        bank: res?.data?.Result?.bnkNameStr,
                    })
                } else {
                    dispatch(
                        handleMessageModal({
                            isModalOpen: true,
                            describe: res.data?.ErrorDesc,
                        })
                    );
                }
                dispatch(handleLoading(false));

            }).catch = (error) => {
                console.log(error);
                dispatch(handleLoading(false));

            }
    }



    const InitializationDataForInspectionCertificateIC = () => {
        dispatch(handleLoading(true));
        const postData = {
            iciVCodeInt: 0,
            urlVCodeInt: role,
            ssdsshGUID: GUid
        }
        dispatch(handleLoading(true));
        axios({
            url: endpoints.RestAPIs.InspectionCartificatelC.InitializationDataForInspectionCertificateIC.url,
            method: endpoints.RestAPIs.InspectionCartificatelC.InitializationDataForInspectionCertificateIC.method,
            data: postData,
        })
            .then((res) => {
                // console.log(res?.data?.Result?.staticInspectionCertificate?.proformaNumbers, "ressssssssss");
                if (res.data.ErrorCode === 0) {
                    const tempGoodsIdHasTrue = res?.data?.Result?.staticInspectionCertificate?.proformaNumbers?.filter(item => { return item?.registered === true })
                    const findDataTrue = tempGoodsIdHasTrue?.map(item => { return item?.prfVCodeInt })
                    const entriesDataTrue = Object.entries(findDataTrue)
                    const goodsComboTrue = entriesDataTrue?.map(item => ({ id: item[1], name: item[1] }))


                    // JSON.stringify

                    const tempGoodsIdHasFalse = res?.data?.Result?.staticInspectionCertificate?.proformaNumbers?.filter(item => { return item?.registered === false })
                    const findDataFalse = tempGoodsIdHasFalse?.map(item => { return item?.prfVCodeInt })
                    const entriesDataFalse = Object.entries(findDataFalse)
                    const goodsComboFalse = entriesDataFalse?.map(item => ({ id: (item[1]), name: (item[1]) }))
                    setGoodsCombo({
                        ...inputsData,
                        ComboGoodsIdYes: goodsComboTrue,
                        ComboGoodsIdNo: goodsComboFalse,
                        inspectionCompanies: res?.data?.Result?.staticInspectionCertificate?.inspectionCompanies

                    }
                    )
                } else {
                    dispatch(
                        handleMessageModal({
                            isModalOpen: true,
                            describe: res.data?.ErrorDesc,
                        })
                    );
                }
                dispatch(handleLoading(false));
            })
            .catch = (error) => {
                console.log(error);
                dispatch(handleLoading(false));
            }
    };


    const newCertificate = (e) => {
        e?.preventDefault();
        getProformaInfoIC()
        setShowNewCertificaten(true)
    }



    useEffect(() => {
        InitializationDataForInspectionCertificateIC()
    }, [])

    const handleChangeInputs = (name, value, validationNameList, event) => {
        if (name === "withOrderRegistration") {
            setFilters({})
            setShowNewCertificaten(false)
            setInputsData({
                ...inputsData,
                goodsId: undefined,
            })
        }
        // else if (name === "DateT") {
        //     if (Validation.maximumDate(filters?.DateF, value) === true) {
        //         setErrors({
        //             ...errors,
        //             DateF: [],
        //         });
        //     } else {
        //         setErrors({
        //             ...errors,
        //             DateF: Validation.maximumDate(filters?.DateF, value),
        //         });
        //     }
        // }
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
        setInputsData((prevstate) => {
            return {
                ...prevstate,
                [name]: value,
            };
        });
    };
    return (
        <>
            {stepsOfCreatePage?.ICO === 0 && (
                <>
                    <form>
                        <Row style={{ margin: "15px 10px 10px 10px" }}>
                            <Col sm={24} md={24} lg={24}>
                                <TitleBox title='گواهی بازرسی' />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={24} md={12} xl={8}>
                                <ComboBox
                                    name="withOrderRegistration"
                                    title="دارای ثبت سفارش"
                                    required="true"
                                    onChange={handleChangeInputs}
                                    defaultValue={inputsData?.withOrderRegistration}
                                    error={errors?.withOrderRegistration}
                                    width="200px"
                                    options={OrderRegistration}
                                />
                            </Col>
                            {
                                (inputsData?.withOrderRegistration?.length > 0) &&
                                <>
                                    <Col sm={24} md={12} xl={8}>
                                        <ComboBox
                                            name="goodsId"
                                            title="شماره پرونده"
                                            required="true"
                                            onChange={handleChangeInputs}
                                            defaultValue={inputsData?.goodsId}
                                            error={errors?.goodsId}
                                            width="200px"
                                            options={(inputsData?.withOrderRegistration === "true" && goodsCombo?.ComboGoodsIdYes) || (inputsData?.withOrderRegistration === "false" && goodsCombo?.ComboGoodsIdNo)}
                                        />
                                    </Col>
                                    <Col sm={24} md={12} xl={8}>
                                        <Button onClick={e => newCertificate(e)}>گواهی جدید</Button>
                                    </Col>
                                </>
                            }
                        </Row>
                        <VerticalSpace space="1rem" />
                        {(showNewCertificate && inputsData?.withOrderRegistration?.length > 0) && (<OrderInfoInCertificateOfInspectionDetails filters={filters} />)}
                    </form>
                    <div className="document-show" style={{ justifyContent: "end" }}>
                        <span className="document-show--container">
                            <span id="Dissuasion">
                                <Button
                                    name="prev"
                                    backgroundColor={themeColors.btn.warningSec}
                                    onClick={e => dissuasionButton(e)}
                                >
                                    انصراف
                                </Button>
                            </span>
                            <span id="Next">
                                <Button
                                    name="next"
                                    type="primary"
                                    className="next-btn-step"
                                    onClick={next}
                                    backgroundColor={themeColors.btn.primary}
                                >
                                    بعدی
                                    <i className="fa fa-step-backward" aria-hidden="true"></i>
                                </Button>
                            </span>
                        </span>
                    </div >
                    {showWarningdissuasion && (<Modal
                        style={{
                            backgroundColor: themeColors[theme]?.menueBg,
                            color: themeColors[theme]?.text,
                        }}
                        onCancel={() => {
                            setShowWarningDissuasion(false);
                        }}
                        footer={[
                            <span
                                style={{ padding: "5px", gap: "5px" }}
                                className="flex-order-row-justify-start"
                            >
                                <Button
                                    onClick={e => submitHandler(e)}
                                >
                                    تایید
                                </Button>
                                <Button
                                    backgroundColor={themeColors.btn.danger}
                                    onClick={() => {
                                        setShowWarningDissuasion(false);
                                    }}
                                >
                                    انصراف
                                </Button>
                            </span>,
                            ,
                        ]}
                        open={showWarningdissuasion}
                        title="هشدار"
                        width={500}
                    >
                        <p>
                            در صورت انصراف دادن ، تمامی تغییرات از بین خواهد رفت ، آیا مطمئن هستید؟
                        </p>
                    </Modal>)}
                </>
            )}

            {
                (stepsOfCreatePage?.ICO > 1 || stepsOfCreatePage?.ICO === 1) && (
                    <Step1
                        errors={errors}
                        setErrors={setErrors}
                        inputsData={inputsData}
                        setInputsData={setInputsData}
                        showWarningdissuasion={showWarningdissuasion}
                        setShowWarningDissuasion={setShowWarningDissuasion}
                        goodsCombo={goodsCombo}

                    />
                )
            }

        </>
    );
};

export default Step0;
