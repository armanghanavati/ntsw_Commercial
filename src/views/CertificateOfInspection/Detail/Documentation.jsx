import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import { Input } from '../../../components'

const Documentation = ({ filters }) => {
    const { detailCertificate } = useSelector((state) => state);
    // inspectionCertificateDocuments
    return (
        <>
            <Row>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="پیش فاکتور"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                    // value={ }

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="فاکتور"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                    // value={detailCertificate?.prfTotalPriceMny}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="پکینگ لیست"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                    // value={detailCertificate?.prfFreightCostMny}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="گواهی مبدا"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                    // value={detailCertificate?.prfOtherCostMny}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="سند ال سی"
                        name="DocumentName"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.DocumentName}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="قرارداد خرید"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                    // 

                    />
                </Col>
            </Row>
        </>
    )
}

export default Documentation;