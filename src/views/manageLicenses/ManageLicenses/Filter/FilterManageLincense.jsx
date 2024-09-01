import { Col, Form, Row, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { Input, DatePicker, ComboBox, Button, } from "../../../../components";
import themeColors from "../../../../configs/theme";
import Validation from "../../../../utils/Validation";

const FilterManageLincense = ({ getTable, filters, setFilters, errors, setErrors, comboStatus, setComboStatus, enabled, setEnabled, dataSource, loading }) => {

    // const { register, handleSubmit, reset } = useForm()

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const permitForNextStep = (inputsName = []) => {
        for (var key in errors) {
            if (errors[key]?.length > 0) {
                return false;
            }
        }
        return true;
    };

    const handleSearch = (event) => {
        event?.preventDefault();
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

    // -> validation inputs manage licenses
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

    // !filters && getTable();

    return (
        <>
            <Form >
                <Row id="Nav" style={{ marginBottom: "10px", marginTop: "10px" }} >
                    <Col sm={24} md={12} xl={6} xxl={6}>
                        <ComboBox
                            title="وضعیت"
                            name="status"
                            value={filters?.status}
                            onChange={handleChangeInputs}
                            options={comboStatus}
                            width="150px"
                        />
                    </Col>
                    <Col sm={24} md={12} xl={6} xxl={6}>
                        <DatePicker
                            title="از تاریخ"
                            name="DateF"
                            onChange={handleChangeInputs}
                            value={filters.DateF}
                            validations={[["maximumDate", filters?.DateF]]}
                            error={errors?.DateF}
                            type={"en"}
                        />
                    </Col>
                    <Col sm={24} md={12} xl={6} xxl={6}>
                        <DatePicker
                            type={"en"}
                            title="تا تاریخ"
                            name="DateT"
                            onChange={handleChangeInputs}
                            value={filters.DateT}
                            validations={[["minimumDate", filters?.DateT]]}
                            error={errors?.DateT}
                        />
                    </Col>
                    <Col sm={24} md={12} xl={6} xxl={6} >
                        <Input
                            title="متن جستجو"
                            name="searchText"
                            onChange={handleChangeInputs}
                            value={filters?.searchText}
                            width="180px"
                        />
                    </Col>
                </Row>
                <Row>
                    <Button name="getTable" loading={loading} onClick={handleSearch}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        جستجو
                    </Button>

                    <Button backgroundColor={themeColors.comments.green}
                        onClick={(e) => {
                            e.preventDefault();
                            setFilters([]);
                            getTable(true);
                        }}
                    >

                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        همه اطلاعات
                    </Button>
                    <span className="flex-order-row-justify-start">

                        <Tooltip title="راهنمای سریع" color={themeColors.comments.green}>
                            <span>
                                <Button
                                    onClick={(e) => {
                                        setEnabled(!enabled);
                                        e.preventDefault();
                                    }
                                    }
                                    backgroundColor={themeColors.comments.green}
                                >
                                    <i class="fa fa-info" aria-hidden="true"></i>
                                </Button>
                            </span>
                        </Tooltip>
                    </span>
                    <Tooltip title="بازیابی فیلدها" color={themeColors.btn.purple}>
                        <span>
                            <Button
                                onClick={(e) => {
                                    setFilters([]);
                                    setErrors("")
                                    setComboStatus([])
                                    e.preventDefault()
                                }}
                                backgroundColor={themeColors.btn.purple}
                            >
                                <i class="fa fa-refresh" aria-hidden="true"></i>
                            </Button>
                        </span>
                    </Tooltip>
                </Row>
            </Form>
        </>
    )
}

export default FilterManageLincense;