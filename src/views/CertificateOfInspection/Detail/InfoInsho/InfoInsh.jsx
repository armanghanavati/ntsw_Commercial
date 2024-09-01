import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Input, TitleBox } from '../../../../components'

const InfoInsh = () => {
    const { detailCertificate } = useSelector((state) => state)

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
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                        value={detailCertificate?.allRes?.originalInspectionCertificate?.inspectionCertificate?.iciBillOfLoadingNoStr}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="تاریخ بارنامه"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                        value={detailCertificate?.allRes?.originalInspectionCertificate?.inspectionCertificate.iciBillOfLoadingDate.split("T")?.[0]}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="شماره بیمه نامه"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                        value={detailCertificate?.allRes?.originalInspectionCertificate?.inspectionCertificate?.iciInsuranceNoStr}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="تاریخ بیمه نامه"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                        value={detailCertificate?.allRes?.originalInspectionCertificate?.inspectionCertificate?.iciInsuranceDate?.split("T")?.[0]}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="شماره قبض انبار"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}

                        value={detailCertificate?.allRes?.originalInspectionCertificate?.inspectionCertificate?.iciGhabzNoStr}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="تاریخ قبض انبار"
                        name="factorFileNumber"
                        width="180px"
                        readOnly={"readOnly"}
                        value={detailCertificate?.allRes?.originalInspectionCertificate?.inspectionCertificate?.iciGhabzDate?.split("T")?.[0]}
                    />
                </Col>
            </Row>
        </>
    )
}

export default InfoInsh