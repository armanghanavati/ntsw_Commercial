import { Col, Modal, Row, Table, theme } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, TitleBox, VerticalSpace } from '../../../../components';
import themeColors from '../../../../configs/theme';
import { endpoints } from '../../../../services/endpoints';
import { handleLoading, handleMessageModal } from '../../../../state/action-creators';
import DocumentsSentOrganization from './DocumentsSentOrganization';
import { getExtentionType } from '../../../../configs/helpers/get-extension-type'
import DocumentsReciveOrganization from './DocumentsReciveOrganization';


const ManageLicensesDetailsModal = ({ convertDate, detailData, openModal, setOpenModal }) => {

    


    const { theme, colorMode, role, GUid } = useSelector((state) => state);
    const dispatch = useDispatch()

    const [openModalDocsOrg, setOpenModalDocsOrg] = useState(false)
    const [dataDocsSentOrg, setDataDocsSentOrg] = useState([])
    const [dataDocsReciveOrg, setDataDocsReciveOrg] = useState([])
    const [openModalReciveDocs, setOpenModalReciveDocs] = useState(false)
    const [tableParams, setTableParams] = useState({ pagination: { current: 1, pageSize: 10 } });

    // -> handle table : change page
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

    // -> handle service : sent documents organ
    const getDocsSentOrgan = (pgpVCodeLng) => {
        try {
            const postData = {
                pgpVCodeLng: pgpVCodeLng,
                GUID: null,
                urlVCodeInt: role,
                ssdsshGUID: GUid,
                prfVCodeInt: detailData.prfVCodeInt
            }
            axios({
                url: endpoints.RestAPIs.permit.showPermitSendDocumentToOGA.url,
                method: endpoints.RestAPIs.permit.showPermitSendDocumentToOGA.method,
                data: postData,
            })
                .then((res) => {
                    if (res.data.Error === 0) {
                        setOpenModalDocsOrg(true)
                        setDataDocsSentOrg(res.data.DOCs)
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

    // -> handle service : recive documents organ
    const getDocsReciveOrgan = (pgpVCodeLng) => {
        try {
            const postData = {
                pgpVCodeLng: pgpVCodeLng,
                GUID: null,
                urlVCodeInt: role,
                ssdsshGUID: GUid,
                prfVCodeInt: detailData.prfVCodeInt
            }

            axios({
                url: endpoints.RestAPIs.permit.showPermitRecieveDocumentFromOGA.url,
                method: endpoints.RestAPIs.permit.showPermitRecieveDocumentFromOGA.method,
                data: postData,
            })
                .then((res) => {
                    if (res.data.Error === 0) {
                        setOpenModalReciveDocs(true)
                        setDataDocsReciveOrg(res.data.DOCs)
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
    }

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
            title: "کد رهگیری",
            dataIndex: "pmtTraceCodeStr",
            align: "center",
        },
        {
            title: "سازمان مجوز دهنده",
            dataIndex: "agnNameStr",
            align: "center",
        },
        {
            title: "مشمول یارانه دولتی",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "تاریخ ارسال درخواست",
            dataIndex: "pgpSendDate",
            align: "center",
        },
        {
            title: "نوع مجوز",
            dataIndex: "pgpTypeStr",
            align: "center",
        },
        {
            title: "وضعیت درخواست",
            dataIndex: "pmtProfitExcemptionTny",
            align: "center",
        },
        {
            title: "تاریخ دریافت نتیجه",
            dataIndex: "pmtAnswerDate",
            align: "center",
        },
        {
            title: "نتیجه درخواست",
            dataIndex: "pgpSendStatusTny",
            align: "center",
        },
        {
            title: "تاریخ صدور مجوز",
            dataIndex: "pmtResponseDate",
            align: "center",
        },
        {
            title: "تاریخ اعتبار مجوز",
            dataIndex: "pmtValidDate",
            align: "center",
        },
        {
            title: "کد مجوز",
            dataIndex: "pmtCodeStr",
            align: "center",
        },
        {
            title: "توضیحات",
            dataIndex: "pmtDescStr",
            align: "center",
        },
        {
            title: "فیلدهای مهم سازمان",
            dataIndex: "cdfAppStr",
            align: "center",
        },
        {
            title: "مستندات ارسالی به سازمان",
            dataIndex: "cdfAppStr",
            align: "center",
            render: (_, { pgpVCodeLng }, index) => (
                <div onClick={() => {
                    getDocsSentOrgan(pgpVCodeLng);
                }}
                    style={{ color: themeColors.comments.green }}
                    className="flex-order-row ">
                    <i style={{ fontSize: "20px", cursor: "pointer" }} className=" fa fa-bars"></i>
                </div >
            ),
        },
        {
            title: "مستندات دریافتی از سازمان",
            dataIndex: "cdfAppStr",
            align: "center",
            render: (_, { pgpVCodeLng }, index) => (
                <div
                    onClick={() => {
                        getDocsReciveOrgan(pgpVCodeLng)
                    }}
                    style={{ color: themeColors.comments.green }}
                    className="flex-order-row ">
                    <i style={{ fontSize: "20px", cursor: "pointer" }} className="fa fa-bars"></i>
                </div >
            ),
        },
    ];

    return (
        <div>
            <Modal
                centered
                style={{
                    backgroundColor: themeColors[theme]?.menueBg,
                    color: themeColors[theme]?.text,
                }}
                title={`جزئیات مجوز`}
                open={openModal}
                onOk={() => {
                    setOpenModal(false);
                }}
                onCancel={() => {
                    setOpenModal(false);
                }}
                width={"90%"}
                footer={[]}>
                <VerticalSpace space="1rem" />
                <Row style={{ margin: "5px 10px 5px 10px" }} >
                    <Col sm={24} md={24} lg={24}>
                        <TitleBox title="اطلاعات اصلی" />
                    </Col>
                </Row>
                <Row style={{ margin: "10px 15px 20px 10px" }} >
                    <Col sm={24} md={24} xl={12} xxl={8} >
                        <Input
                            title="شماره پرونده"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={detailData?.prfVCodeInt}

                        />
                    </Col>
                    <Col sm={24} md={24} xl={12} xxl={8} >
                        <Input
                            title="شماره پیش فاکتور"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={detailData?.prfTotalPriceMny}
                        />
                    </Col>
                    <Col sm={24} md={24} xl={12} xxl={8} >
                        <Input
                            title="فروشنده خارجی"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={detailData?.prfNumberStr}
                        />
                    </Col>
                    <Col sm={24} md={24} xl={12} xxl={8} >
                        <Input
                            title="تاریخ صدور پیش فاکتور"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={convertDate}
                        />
                    </Col>
                    <Col sm={24} md={24} xl={12} xxl={8} >
                        <Input
                            title="تاریخ اعتبار پیش فاکتور"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={detailData?.prfCreateDate}
                        />
                    </Col>
                    <Col sm={24} md={24} xl={12} xxl={8} >
                        <Input
                            title="کشور ذینفع"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={detailData?.prfcnyVCodeBeneficiary}
                        />
                    </Col>
                    <Col sm={24} md={24} xl={12} xxl={8} >
                        <Input
                            title="مبلغ پیش فاکتور"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={detailData?.gdsHSCodeStr}
                        />
                    </Col>
                </Row>
                <Row style={{ margin: "5px 10px 5px 10px" }} >
                    <Col sm={24} md={24} lg={24}>
                        <TitleBox title="اطلاعات کالا" />
                    </Col>
                </Row>
                <Row style={{ margin: "10px 15px 20px 10px" }}>
                    <Col sm={24} md={24} xl={12} xxl={16} >
                        <Input
                            title="شماره تعرفه"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={detailData?.gdsHSCodeStr}

                        />
                    </Col>
                    <Col sm={24} md={24} xl={12} xxl={16} >
                        <Input
                            title="شرح تجاری"
                            name="factorFileNumber"
                            width="180px"
                            readOnly={"readOnly"}
                            value={detailData?.pfgCommercialDescStr}
                        />
                    </Col>
                </Row>
                <Row style={{ margin: "10px 10px 20px 0 " }} >
                    <Col sm={24} md={24} lg={24}>
                        <TitleBox title="اطلاعات مجوز / مجوز کالا" />
                    </Col>
                </Row>
                <div style={{ margin: "0 10px 0 10px " }} >
                    <Table
                        dataSource={detailData.PermitDetailManagement}
                        columns={columns}
                        onHeaderRow={() => {
                            return {
                                style: { backgroundColor: colorMode },
                            };
                        }}
                    />
                </div>
            </Modal>
            <DocumentsSentOrganization dataDocsSentOrg={dataDocsSentOrg} openModalDocsOrg={openModalDocsOrg} setOpenModalDocsOrg={setOpenModalDocsOrg} />
            <DocumentsReciveOrganization dataDocsReciveOrg={dataDocsReciveOrg} openModalReciveDocs={openModalReciveDocs} setOpenModalReciveDocs={setOpenModalReciveDocs} />
        </div>
    )
}

export default ManageLicensesDetailsModal;