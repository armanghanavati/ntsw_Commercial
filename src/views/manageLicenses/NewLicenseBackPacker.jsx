import { Col, Row, Space, Tooltip } from "antd";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Validation from "../../utils/Validation";
// import StatisticsRegistrationTable from "../../StatisticsRegistrationTable";
import { Button, QuickGuide, } from "../../components";
import themeColors from "../../configs/theme";
import { endpoints } from "../../services/endpoints";
import TableNewLicenseBackPacker from './NewLicenseBackPacker/Table/TableNewLicenseBackPacker'
// NewLicenseBackPacker/Table/TableNewLicenseBackPacker
import ModalNewLisence from './NewLicenseBackPacker/Modal/ModalNewLisence'
import FilterNewLicenseBackPacker from './NewLicenseBackPacker/Filter/FilterNewLicenseBackPacker'
import { steps } from '../../utils/NewLlincenseSteps'
import { useSelector } from "react-redux";

const NewLicenseBackPacker = () => {
    // -> all state
    const { GUid, role } = useSelector(state => state)
    const [filters, setFilters] = useState([]);
    const [errors, setErrors] = useState({});
    const [enabled, setEnabled] = useState(false);
    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const handleChangePageSize = (event) => {
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

    const columns = [
        {
            title: "ردیف",
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
            title: "شماره پرونده پیش فاکتور",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "شماره پیش فاکتور",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "نام فروشنده",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "تاریخ صدور",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "کشور ذینفع",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "انتخاب",
            dataIndex: "cdfAppStr",
            align: "center",
        },
    ];

    // -> validation inputs new license
    const handleChangeInputs = (name, value, validationNameList) => {
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

    // -> servises new license table 
    const getTable = () => {
        try {

            const postData = {
                urlVCodeInt: role,
                ssdsshGUID: GUid,
                prfVCodeInt: 0,
            };
            // setLoading(true);
            // setDisable(true);

            axios({
                url: endpoints.RestAPIs.commercial.nTSW_GetRegedOrderList.url,
                method: endpoints.RestAPIs.commercial.nTSW_GetRegedOrderList.method,
                data: postData,
            })
                .then((res) => {
                    // setDataSource(res?.data?.CardFileLst || []);
                    // setTableParams({
                    //   ...tableParams,
                    //   pagination: {
                    //     ...tableParams.pagination,
                    //     total: res?.data?.pCount || 0,
                    //   },
                    // });
                    // setLoading(false);
                    // setDisable(false);
                })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <QuickGuide enabled={enabled} setEnabled={setEnabled} steps={steps}>
                <form className="form">
                    <Row id="Nav">
                        <Col sm={24} md={12} xl={6} xxl={8}>
                            <span className="flex-order-row-justify-start">
                                <Link to={`/Users/AC/Commercial/NewLicenseBackPacker`}>
                                    <Button
                                        name="getTable"
                                        loading={loading}
                                        onClick={() => setOpen(true)}>
                                        <i className="fa fa-send-o" aria-hidden="true"></i>
                                        انتخاب پیش فاکتور
                                    </Button>
                                </Link>
                                <Tooltip title="راهنمای سریع" color={themeColors.comments.green}>
                                    <span>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setEnabled(!enabled);
                                            }}
                                            backgroundColor={themeColors.comments.green}
                                        >
                                            <i class="fa fa-info" aria-hidden="true"></i>
                                        </Button>
                                    </span>
                                </Tooltip>
                            </span>
                        </Col>
                    </Row>
                    <FilterNewLicenseBackPacker filters={filters} setFilters={setFilters} errors={errors} setErrors={setErrors} handleChangeInputs={handleChangeInputs} />
                </form>
            </QuickGuide>

            <ModalNewLisence open={open} setOpen={setOpen} loading={loading} setLoading={setLoading} dataSource={dataSource} setDataSource={setDataSource} />
            <TableNewLicenseBackPacker loading={loading} setLoading={setLoading} dataSource={dataSource} setDataSource={setDataSource} />
            <Space direction="hori" style={{ width: "100%", justifyContent: "end", marginTop: "10px" }} >
                <Link to="/Users/AC/Commercial/ManageLicenses" >
                    <Button >
                        <i className="fa fa-reply" ></i>
                        بازگشت
                    </Button>
                </Link>
            </Space>
        </>
    );
};
export default NewLicenseBackPacker;
