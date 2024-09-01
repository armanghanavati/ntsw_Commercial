import { Col, Row, Tooltip } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Input, DatePicker, Button, } from "../../../../components";
import themeColors from "../../../../configs/theme";

const FilterNewLicenseBackPacker = ({ handleChangeInputs, handlerEnterField, filters, setFilters, errors, setErrors }) => {

    // -> refrences
    const inputFactorFileNumberRef = useRef()
    const inputFactorNumberRef = useRef()
    const inputOutSellerRef = useRef()

    // const enterNexTab = (e) => {
    //     e.which = e.which || e.keyCode;
    //     if (e.which === 13) {
    //         console.log("press enter key");
    //         switch (e.target.name) {
    //             case "factorFileNumber":
    //                 inputFactorNumberRef.current.focus();
    //                 break;

    //             default:
    //                 break;
    //         }
    //     }
    // }

    return (
        <>
            <Row>
                <Col sm={24} md={12} xl={6} xxl={8}>
                    <span>
                        <Input
                            value={filters?.factorFileNumber}
                            onChange={handleChangeInputs}
                            ref={inputFactorFileNumberRef}
                            // onKeyUp={() => console.log(enterNexTab, "Hello enter")}
                            validations={[["minLength", 10]]}
                            error={filters?.factorFileNumber && errors?.factorFileNumber}
                            title="شماره پرونده پیش فاکتور"
                            type="number"
                            name="factorFileNumber"
                            width="180px"
                        />
                    </span>
                </Col>
                <Col sm={24} md={12} xl={6} xxl={8} >
                    <Input
                        value={filters?.factorNumber}
                        onChange={handleChangeInputs}
                        ref={inputFactorNumberRef}
                        validations={[["minimumDate", filters?.factorNumber]]}
                        error={filters?.factorNumber && errors?.factorNumber}
                        title="شماره پیش فاکتور"
                        type="number"
                        name="factorNumber"
                        width="180px"
                    />
                </Col>
                <Col sm={24} md={12} xl={6} xxl={8} >
                    <Input
                        value={filters?.outSeller}
                        onChange={handleChangeInputs}
                        ref={inputOutSellerRef}
                        title="فروشنده خارجی"
                        name="outSeller"
                        width="180px"
                    />
                </Col>
                <Col sm={24} md={12} xl={6} xxl={8}>
                    <DatePicker
                        onChange={handleChangeInputs}
                        value={filters.DateT}
                        validations={[["minimumDate", filters?.DateT]]}
                        error={errors?.DateT}
                        title="تاریخ صدور"
                        type={"en"}
                        name="DateT"

                    />
                </Col>
                <Col sm={24} md={12} xl={6} xxl={8} >
                    <Input
                        value={filters?.country}
                        onChange={handleChangeInputs}
                        title="کشور ذینفع"
                        type="text"
                        name="country"
                        width="180px"
                    />
                </Col>
                <Tooltip title="بازیابی فیلدها" color={themeColors.btn.purple}>
                    <span>
                        <Button
                            onClick={(e) => {
                                setFilters([]);
                                setErrors("")
                                e.preventDefault()
                            }}
                            backgroundColor={themeColors.btn.purple}
                        >
                            <i class="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </span>
                </Tooltip>
            </Row>
        </>
    )
}

export default FilterNewLicenseBackPacker;