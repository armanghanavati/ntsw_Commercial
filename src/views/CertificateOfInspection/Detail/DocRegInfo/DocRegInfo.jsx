import { Col } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Input } from '../../../../components'

const DocRegInfo = () => {
    const { detailCertificate } = useSelector((state) => state)

    console.log(detailCertificate);

    return (
        <>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="شماره درخواست"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.iciVCodeInt}
                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="مبلغ کل پرونده"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.prfTotalPriceMny}

                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="هزینه حمل"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.prfFreightCostMny}

                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="سایر هزینه ها"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.prfOtherCostMny}

                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="مرز ورودی"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.proformaBorders?.[0]}
                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="کشور های مبدا حمل"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.proformaSources?.[0]}
                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="گمرک مقصد"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.proformaDestinations?.[0]}
                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="کشور ذینفع"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.cnyNameStr}
                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="نوع قرارداد"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.cntNameStr}
                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="روش حمل"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.proformaTransportTypes?.[0]}
                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="تامین ارز"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}

                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.proformaCurrencyTypes?.[0]}
                />
            </Col>
            <Col sm={24} md={24} xl={12} xxl={8} >
                <Input
                    title="بانک"
                    name="factorFileNumber"
                    width="180px"
                    readOnly={"readOnly"}
                    value={detailCertificate?.allRes?.originalInspectionCertificate.proformaInfo.bnkNameStr}
                />
            </Col>
        </>
    )
}

export default DocRegInfo