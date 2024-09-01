import { Col, Modal, Row, Table, theme } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Input, ComboGroup } from '../../../components';
import themeColors from '../../../configs/theme';

const AssociationExternalTradeModal = ({ openAssExTradeModal, setOpenAssExTradeModal }) => {
    const { theme } = useSelector((state) => state);

    return (
        <Modal
            centered
            style={{
                backgroundColor: themeColors[theme]?.menueBg,
                color: themeColors[theme]?.text,
            }}
            title={<div style={{ fontWeight: "bold" }} > مشارکت در بازطراحي و بهبود عملکرد سامانه نيما
            </div>}
            open={openAssExTradeModal}
            width={"50%"}
            footer={
                [
                    <div style={{ display: "flex", justifyContent: "end", width: "100%", padding: "10px", backgroundColor: themeColors.light.bg }} >
                        <Button
                            backgroundColor={themeColors.comments.green}
                        // onClick={() => {
                        // setOpen(false);
                        // }}
                        >
                            ثبت نظرات
                        </Button>
                        <Button
                            backgroundColor={themeColors.comments.red}
                            onClick={() => {
                                setOpenAssExTradeModal(false);
                            }}
                        >
                            بستن
                        </Button>
                    </div>
                ]
            }
        >
            <Row>
                <p style={{ padding: "10px" }}>
                    این نظرسنجی با هدف دریافت نظرات و پیشنهادات بازرگانان در جهت بازطراحی، بهبود عملکرد و رفع نواقص سامانه نیما تهیه شده است.
                </p>
                <p style={{ padding: "10px" }}>
                    از کلیه بازرگانان محترم دعوت می شود که با ارسال نظرات خود، ما را در پیشبرد این هدف یاری نمایند.
                </p>
            </Row>
            <hr style={{ margin: "20px 10px 20px 10px" }} />
            <Row style={{ margin: "20px 30px 20px 10px" }} >
                <Col sm={24} md={24} xl={12} xxl={12} >
                    <Input
                        // onKeyUp={() => console.log(enterNexTab, "Hello enter")}
                        // validations={[["minLength", 10]]}
                        // error={filters?.factorFileNumber && errors?.factorFileNumber}
                        title="نام و نام خانوادگي (اختیاری)"
                        type="number"
                        name="factorFileNumber"
                        width="180px"
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={12} >
                    <Input
                        // onKeyUp={() => console.log(enterNexTab, "Hello enter")}
                        // validations={[["minLength", 10]]}
                        // error={filters?.factorFileNumber && errors?.factorFileNumber}
                        title="شماره تماس (اختیاری)"
                        type="number"
                        name="factorFileNumber"
                        width="180px"
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={12} >
                    <Input
                        // onKeyUp={() => console.log(enterNexTab, "Hello enter")}
                        // validations={[["minLength", 10]]}
                        // error={filters?.factorFileNumber && errors?.factorFileNumber}
                        title="ايميل (اختیاری)"
                        type="number"
                        name="factorFileNumber"
                        width="180px"
                    />
                </Col>
                <Col sm={24} md={24} xl={12} xxl={12} >
                    <Input
                        // onKeyUp={() => console.log(enterNexTab, "Hello enter")}
                        // validations={[["minLength", 10]]}
                        // error={filters?.factorFileNumber && errors?.factorFileNumber}
                        title="انتخاب فایل"
                        type="number"
                        name="factorFileNumber"
                        width="180px"
                    />
                </Col>
            </Row>
            <Row>
                <p style={{ margin: "20px 10px 20px 10px" }}>
                    <span style={{ color: "red", fontWeight: "bold" }} >
                        توجه: {" "}
                    </span>
                    امکان بارگذاری فایل تا 3 مگابایت و با فرمت های (zip, pdf, rar, 7z, doc, docx, jpeg, jpg, gif, bmp, tif, xls, xlsx)
                </p>
            </Row>
            {/* <textarea /> */}
        </Modal>
    )
}

export default AssociationExternalTradeModal;
