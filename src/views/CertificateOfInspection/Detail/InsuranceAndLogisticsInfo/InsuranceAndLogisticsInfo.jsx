import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { DatePicker, Input, TitleBox } from '../../../../components'
import Validation from '../../../../utils/Validation'

const InsuranceAndLogisticsInfo = ({ filters, detailMode = false, errors, setErrors, setFilters }) => {
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
        setFilters((prevstate) => {
            return {
                ...prevstate,
                [name]: value,
            };
        });
    };

    return (
        <>
            <Row style={{ margin: "15px 10px 10px 10px" }}>
                <Col sm={24} md={24} lg={24}>
                    <TitleBox title='اطلاعات بیمه و لجستیک' />
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="شماره بارنامه"
                        name="billOfLadingNumber"
                        labelWidth="200px"
                        readOnly={detailMode && "readOnly"}
                        value={filters?.billOfLadingNumber}
                        onChange={handleChangeInputs}
                        type='number'



                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <DatePicker
                        title="تاریخ بارنامه"
                        name="billOfLadingDate"
                        labelWidth="200px"
                        readOnly={detailMode && "readOnly"}
                        value={filters?.billOfLadingDate}
                        onChange={handleChangeInputs}
                        type={"en"}


                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="شماره بیمه نامه"
                        name="insurancePolicyNumber"
                        labelWidth="200px"
                        readOnly={detailMode && "readOnly"}
                        value={filters?.insurancePolicyNumber}
                        onChange={handleChangeInputs}
                        type='number'


                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <DatePicker
                        title="تاریخ بیمه نامه"
                        name="InsuranceDate"
                        labelWidth="200px"
                        readOnly={detailMode && "readOnly"}
                        value={filters?.InsuranceDate}
                        onChange={handleChangeInputs}
                        type={"en"}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="شماره قبض انبار"
                        name="GhabzeNumber"
                        labelWidth="200px"
                        readOnly={detailMode && "readOnly"}
                        value={filters?.GhabzeNumber}
                        onChange={handleChangeInputs}
                        type='number'


                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <DatePicker
                        title="تاریخ قبض انبار"
                        name="GhabzDate"
                        labelWidth="200px"
                        readOnly={detailMode && "readOnly"}
                        value={filters?.GhabzDate}
                        onChange={handleChangeInputs}
                        type={"en"}

                    />
                </Col>
            </Row>
        </>
    )
}

export default InsuranceAndLogisticsInfo