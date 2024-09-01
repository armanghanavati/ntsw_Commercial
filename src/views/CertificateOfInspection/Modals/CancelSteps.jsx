import { Col, Modal, Row, Table, theme } from 'antd';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../components';
import themeColors from '../../../configs/theme';

const CancelSteps = ({ openCancelSteps, setOpenCancelSteps }) => {

    const { theme, colorMode } = useSelector((state) => state);

    return (
        <div>
            <Modal
                style={{
                    backgroundColor: themeColors[theme]?.menueBg,
                    color: themeColors[theme]?.text,
                }}
                title={`هشدار`}
                open={openCancelSteps}
                onOk={() => {
                    setOpenCancelSteps(false);
                }}
                onCancel={() => {
                    setOpenCancelSteps(false);
                }}
                width={"30%"}
                footer={[
                    <>
                        <div style={{ display: "flex", justifyContent: "end", width: "100%", padding: "10px 0 0 10px", backgroundColor: themeColors.light.bg }} >
                            <Link to="/Users/AC/Commercial/CertificateOfInspection" >
                                <Button
                                    backgroundColor={themeColors.btn.warning}>
                                    ادامه</Button>
                            </Link>
                            <Button
                                backgroundColor={themeColors.comments.red}
                                onClick={() => setOpenCancelSteps(false)}
                            >
                                بستن
                            </Button>
                        </div>
                        {/* <Row style={{ justifyContent: "end" }} >
                            <Link to="/Users/AC/Commercial/CertificateOfInspection" >
                                <Button> ادامه  </Button>
                            </Link>
                        </Row> */}
                    </>
                ]}
            >
                <Row style={{ margin: "0 20px 0 0" }}>
                    در صورت انصراف دادن تمامی تغییرات از بین خواهد رفت، آیا مطمئن هستید؟
                </Row>
            </Modal >
        </div >
    )
}
export default CancelSteps;