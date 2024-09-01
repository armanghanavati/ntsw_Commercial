import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Input, TitleBox } from '../../../../components'

const OrderInfoInCertificateOfInspectionDetails = ({ filters, detailMode = false }) => {

    return (
        <>
            <Row style={{ margin: "15px 10px 10px 10px" }}>
                <Col sm={24} md={24} lg={24}>
                    <TitleBox title='اطلاعات ثبت سفارش' />
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="شماره درخواست"
                        name="iciVCodeInt"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.iciVCodeInt}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="مبلغ کل پرونده"
                        name="totalAmount"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.totalAmount}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="هزینه حمل"
                        name="FreightCost"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.FreightCost}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="سایر هزینه ها"
                        name="OtherCost"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.OtherCost}

                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="مرز ورودی"
                        name="Borders"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.Borders}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="کشور های مبدا حمل"
                        name="countryOfOriginOfShipment"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.countryOfOriginOfShipment}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="گمرک مقصد"
                        name="DestinationsCustomes"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.DestinationsCustomes}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="کشور ذینفع"
                        name="beneficiaryCountry"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.beneficiaryCountry}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="نوع قرارداد"
                        name="contractType"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.contractType}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="روش حمل"
                        name="shipingMethode"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.shipingMethode}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="تامین ارز"
                        name="currencySupply"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.currencySupply}
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={8} >
                    <Input
                        title="بانک"
                        name="bank"
                        width="180px"
                        readOnly={"readOnly"}
                        value={filters?.bank}
                    />
                </Col>
            </Row >
        </>
    )
}

export default OrderInfoInCertificateOfInspectionDetails