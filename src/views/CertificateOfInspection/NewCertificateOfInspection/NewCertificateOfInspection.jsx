import { Col, Row, Steps } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StepsNavigationBar from '../../../common/StepsNavigationBar';
import { Button, ComboBox, TitleBox } from '../../../components';
import themeColors from '../../../configs/theme';
import { endpoints } from '../../../services/endpoints';
import { handleLoading, handleMessageModal } from '../../../state/action-creators';
import Validation from "../../../utils/Validation";
import CancelSteps from '../Modals/CancelSteps';

const NewCertificateOfInspection = () => {

    const dispatch = useDispatch()
    const { sidebar, theme, GUid, role } = useSelector((state) => state)
    const Step = Steps.Step;

    const [showFields, setShowFields] = useState(false)
    const [allFileNumb, setAllFileNumb] = useState([])
    const [fileNumbers, setFileNumbers] = useState([])
    const [validFileNumber, setValidFileNumber] = useState([])
    const [orderFalse, setOrderFalse] = useState(false)
    const [errors, setErrors] = useState({})
    const [openCancelSteps, setOpenCancelSteps] = useState(false)
    const [filters, setFilters] = useState({})

    const steps = [
        { title: "اطلاعات ثبت سفارش/ پرونده" },
        { title: "اطلاعات بیمه و لجستیک" },
        { title: "افزودن کالا به لیست" },
        { title: "پیوست ها" },
    ];

    // const test = () => {

    //     if (filters?.order === 2) {
    //         const findTrueFileNumb = fileNumbers.filter((item) => item.registered === true)
    //         const allTrueFileNumb = findTrueFileNumb.map((numb) => {

    //             return setValidFileNumber(validFileNumber.push({
    //                 id: numb.prfVCodeInt,
    //                 name: numb.prfVCodeInt,
    //             })
    //             )
    //         })

    //     } else if (filters?.order === 3) {
    //         const findTrueFileNumb = fileNumbers.filter((item) => item.registered === false)
    //         const allTrueFileNumb = findTrueFileNumb.map((numb) => {

    //             return setValidFileNumber(validFileNumber.push({
    //                 id: numb.prfVCodeInt,
    //                 name: numb.prfVCodeInt,
    //             })
    //             )
    //         })

    //     }
    // }

    // getValidFileNumb.push({
    //     id: item.prfVCodeInt,
    //     name: item.prfVCodeInt,
    // })

    // const allNumbsMap = fileNumbers.map((numb) => {
    //     return getArry.push({
    //         id: numb.prfVCodeInt,
    //         name: numb.prfVCodeInt,
    //     })
    // })

    const order = [
        { id: 1, name: "انتخاب کنید" },
        { id: 2, name: "بله" },
        { id: 3, name: "خیر" },
    ];


    useEffect(() => {
        handleGetNumbFile()
    }, [])

    const handleGetNumbFile = () => {
        try {
            const postData = {
                iciVCodeInt: 0,
                urlVCodeInt: role,
                ssdsshGUID: GUid
            }
            axios({
                url: endpoints.RestAPIs.InspectionCartificatelC.InitializationDataForInspectionCertificateIC.url,
                method: endpoints.RestAPIs.InspectionCartificatelC.InitializationDataForInspectionCertificateIC.method,
                data: postData,
            }).then((res) => {
                if (res.data.ErrorCode === 0) {
                    setAllFileNumb(res?.data?.Result?.staticInspectionCertificate?.proformaNumbers)

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

    // -> validation inputs manage licenses
    const handleChangeInputs = (name, value, validationNameList, event) => {
        if (value === 2) {
            const findTrueFileNumb = allFileNumb.filter((item) => item.registered === true)
            const temp = findTrueFileNumb.map((numb) => {
                return {
                    id: numb.prfVCodeInt,
                    name: numb.prfVCodeInt,
                }
            })
            setValidFileNumber(temp)
        } else if (value === 3) {
            const findFalseFileNumb = allFileNumb.filter((item) => item.registered === false)
            const temp = findFalseFileNumb.map((numb) => {
                return {
                    id: numb.prfVCodeInt,
                    name: numb.prfVCodeInt,
                }
            })
            setValidFileNumber(temp)
        }

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

    return (
        <>
            <StepsNavigationBar steps={steps} declarationType="NEF" />
            <Row style={{ margin: "15px 10px 10px 10px" }} >
                <Col sm={24} md={24} lg={24}>
                    <TitleBox title="گواهی بازرسی" />
                </Col>
            </Row>
            <Row style={{ margin: "5px 10px 5px 10px" }} >
                <Col sm={24} md={10} lg={8}>
                    <ComboBox name="order" value={filters?.order} onChange={handleChangeInputs} options={order} title="دارای ثبت سفارش" />
                </Col>

                {(filters?.order === 2 || filters?.order === 3) &&
                    <>
                        <Col sm={24} md={10} lg={8}>
                            <ComboBox name="docsNumber" options={validFileNumber} value={filters?.docsNumber} onChange={handleChangeInputs} title="شماره پرونده" />
                        </Col>
                        <Col sm={24} md={10} lg={8}>
                            <Button name="getTable" >
                                <i className="fa fa-plus-square" aria-hidden="true"></i>
                                گواهی جدید
                            </Button>
                        </Col>
                    </>
                }
            </Row>
            <Row className='steps-action' >
                <Button onClick={() => setOpenCancelSteps(true)} id='Dissuasion' backgroundColor={themeColors.btn.warning} >
                    انصراف
                </Button>
                <Button id="next" >
                    بعدی
                    <i className="fa fa-backward" aria-hidden="true" />
                </Button>
            </Row>
            <CancelSteps openCancelSteps={openCancelSteps} setOpenCancelSteps={setOpenCancelSteps} />
        </>
    )
}

export default NewCertificateOfInspection;
