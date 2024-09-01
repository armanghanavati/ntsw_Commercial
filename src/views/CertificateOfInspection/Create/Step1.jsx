import React, { useState } from "react";
import themeColors from "../../../configs/theme";
import { Button, ComboBox } from "../../../components";
import { Link } from "react-router-dom";
import { handleLoading, handleMessageModal, handleStepsOfCreatePage } from "../../../state/action-creators";
import { useDispatch, useSelector } from "react-redux";
import InsuranceAndLogisticsInfo from "../Detail/InsuranceAndLogisticsInfo/InsuranceAndLogisticsInfo";
import { useHistory, useLocation } from "react-router-dom";
import { Col, Modal, Row } from "antd";
import { endpoints } from "../../../services/endpoints";
import axios from "axios"
import Validation from "../../../utils/Validation";
import convert from "../../../configs/helpers/convert";
import Step2 from "./Step2/Step2";
const Step1 = ({ goodsCombo, setErrors, errors, inputsData, setInputsData, showWarningdissuasion, setShowWarningDissuasion }) => {
    const { stepsOfCreatePage, theme, GUid, role, } = useSelector((state) => state);
    const { search, pathname, state } = useLocation();
    const [filters, setFilters] = useState({})

    const dispatch = useDispatch()
    const history = useHistory()
    const prev = (event) => {
        event?.preventDefault();
        dispatch(
            handleStepsOfCreatePage({
                ICO: stepsOfCreatePage?.ICO - 1,
                hasAccessToStep: true,
            })
        );
    };

    const next = (e) => {
        e.preventDefault()
        manageInspectionCertificateIC()
        // dispatch(
        //     handleStepsOfCreatePage({ ICO: stepsOfCreatePage?.ICO + 1 })
        // );
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setShowWarningDissuasion(false);
        history?.push(`/Users/AC/Commercial/CertificateOfInspection`)
    }


    const dissuasionButton = (e) => {
        e?.preventDefault();
        setShowWarningDissuasion(true)
    }



    const handleChangeInputs = (name, value, validationNameList, event) => {
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
        setInputsData((prevstate) => {
            return {
                ...prevstate,
                [name]: value,
            };
        });
    };


    const manageInspectionCertificateIC = () => {
        const postData = {
            iciVCodeInt: 0,
            iciprfVCodeInt: inputsData?.goodsId,
            iciInsertDate: "",
            iciEditDate: "",
            iciStatusTny: 0,
            iciBillOfLoadingNoStr: inputsData?.billOfLadingNumber,
            iciBillOfLoadingDate: convert(inputsData?.billOfLadingDate),
            iciInsuranceNoStr: inputsData?.insurancePolicyNumber,
            iciInsuranceDate: convert(inputsData?.InsuranceDate),
            iciGhabzNoStr: inputsData?.GhabzeNumber,
            iciGhabzDate: convert(inputsData?.GhabzDate),
            iciInspectionCompanyInt: inputsData?.inspectionCompaniesName,
            iciUrlVCodeint: 0,
            iciVersionTny: 0,
            urlVCodeInt: role,
            ssdsshGUID: GUid
        }
        axios({
            url: endpoints.RestAPIs.InspectionCartificatelC.manageInspectionCertificateIC.url,
            method: endpoints.RestAPIs.InspectionCartificatelC.manageInspectionCertificateIC.method,
            data: postData,
        })
            .then((res) => {
                if (res.data.ErrorCode === 0) {
                    setInputsData({
                        ...inputsData,
                        iciVCodeInt: res?.data?.Result
                    })
                    dispatch(
                        handleStepsOfCreatePage({ ICO: stepsOfCreatePage?.ICO + 1 })
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
            })
            .catch = (error) => {
                console.log(error);
            }
    };

    return (
        <>
            {stepsOfCreatePage?.ICO === 1 &&
                <>
                    <form>
                        <InsuranceAndLogisticsInfo setFilters={setInputsData} filters={inputsData} errors={errors} setErrors={setErrors} />
                        <Row>
                            <Col sm={24} md={24} xl={12}>
                                <ComboBox
                                    title="شرکت های بازرسی"
                                    name="inspectionCompaniesName"
                                    defaultValue={inputsData?.inspectionCompaniesName}
                                    onChange={handleChangeInputs}
                                    options={goodsCombo?.inspectionCompanies}
                                    optionTitle="incCompanyNameStr"
                                    optionValue="incVCodeInt"
                                    error={errors?.inspectionCompaniesName}
                                    required="true"
                                    width="200px"
                                />
                            </Col>
                        </Row>
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
                            <span id="Dissuasion">
                                <Button
                                    type="primary"
                                    onClick={prev}
                                    backgroundColor={themeColors.btn.yellow}
                                    style={{
                                        padding: "8px 12px",
                                        backgroundColor: "rgb(93, 178, 255)",
                                        border: "1px solid rgb(93, 178, 255)",
                                        color: "white",
                                        fontSize: "14px",
                                    }}
                                >
                                    <i className="fa fa-step-forward" aria-hidden="true"></i>
                                    قبلی
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
            }
            {(stepsOfCreatePage?.ICO > 2 || stepsOfCreatePage?.ICO === 2) && (<Step2
                errors={errors}
                setErrors={setErrors}
                inputsData={inputsData}
                setInputsData={setInputsData}
                showWarningdissuasion={showWarningdissuasion}
                setShowWarningDissuasion={setShowWarningDissuasion}
                goodsCombo={goodsCombo} />)}
        </>
    )
}
export default Step1