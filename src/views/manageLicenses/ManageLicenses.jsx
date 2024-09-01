import { Col, Form, Row, Tooltip } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Validation from "../../utils/Validation";
import { Input, VerticalSpace, DatePicker, ComboBox, Button, } from "../../components";
import { endpoints } from "../../services/endpoints";
import QuickGuide from "../../components/QuickGuide";
import FilterManageLincense from './ManageLicenses/Filter/FilterManageLincense'
import TableManageLicenses from "./ManageLicenses/Table/TableManageLicenses";
import convert from "../../configs/helpers/convert";
import { useSelector } from "react-redux";
import { stepsManageLicenses } from '../../utils/allSteps'

const ManageLicenses = () => {

    const [permitListDetail, setPermitListDetail] = useState([])
    const [filters, setFilters] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [disable, setDisable] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [comboStatus, setComboStatus] = useState([]);
    const { pageSize, GUid, role } = useSelector(state => state)

    const [form] = Form.useForm();

    // -> table state
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    // -> handle inputs : validation inputs manage licenses
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

    // -> service table : gat all info table
    const getTable = (isReset = false) => {
        try {
            const postData = {
                Status: !isReset ? filters?.status : 0,
                SearchText: !isReset ? (filters?.searchText || "") : "",
                Fdate: !isReset ? convert(filters?.DateF) : "",
                Tdate: !isReset ? convert(filters?.DateT) : "",
                StartIndex: 0,
                PageSize: 25,
                WithCombo: true,
                // -> کد نقش کاربر لاگین
                urlVCodeInt: role,
                // -> سشن کاربر لاگین 
                ssdsshGUID: GUid,
            }
            setLoading(true);
            setDisable(true);
            axios({
                url: endpoints.RestAPIs.permit.getAllProformaPermitList.url,
                method: endpoints.RestAPIs.permit.getAllProformaPermitList.method,
                data: postData,
            })

                .then((res) => {

                    form.resetFields();
                    setDataSource(res?.data?.Result?.PermitList || []);
                    // setPfgVCodeLng(res?.data?.Result?.PermitList)

                    const optionsStatus = [];
                    const optionsTemp = Object.entries(res?.data?.Result?.PermitStatus);
                    optionsTemp.map((item) =>
                        optionsStatus.push({ id: item[0], name: item[1] })
                    );
                    setComboStatus([...optionsStatus, { id: "", name: "همه" }]);
                    setTableParams({
                        ...tableParams,

                        pagination: {
                            ...tableParams.pagination, total: res?.data?.Result?.PermitList?.length || 0
                        },
                    });
                    setLoading(false);
                    setDisable(false);
                })
        } catch (error) {
        }
    }

    useEffect(() => {
        setDataSource([]);
        getTable();
    }, [tableParams.pagination.current, tableParams.pagination.pageSize, pageSize]);

    return (
        <>
            <QuickGuide enabled={enabled} setEnabled={setEnabled} steps={stepsManageLicenses}>
                <Form form={form}>
                    <Row >
                        <Col sm={24} md={12} xl={6} xxl={3} >
                            <Link to={`/Users/AC/Commercial/NewLicenseBackPacker`}>
                                <div id="NewFile">
                                    <Button name="getTable" loading={loading}>
                                        <i className="fa fa-send-o" aria-hidden="true"></i>
                                        ارسال درخواست مجوز
                                    </Button>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                    <FilterManageLincense getTable={getTable} loading={loading} setLoading={setLoading} dataSource={dataSource} filters={filters} setFilters={setFilters} handleChangeInputs={handleChangeInputs} errors={errors} setErrors={setErrors} comboStatus={comboStatus} setComboStatus={setComboStatus} enabled={enabled} setEnabled={setEnabled} />
                    <VerticalSpace space="0.5rem" />
                    <TableManageLicenses permitListDetail={permitListDetail} loading={loading} setLoading={setLoading} dataSource={dataSource} setDataSource={setDataSource} />
                </Form>
            </QuickGuide >
        </>
    );
};

export default ManageLicenses;

