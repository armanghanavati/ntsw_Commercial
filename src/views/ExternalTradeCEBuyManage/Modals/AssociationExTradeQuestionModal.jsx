import { Modal, Table, theme } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, VerticalSpace } from '../../../components';
import themeColors from '../../../configs/theme';
import AssociationExternalTradeModal from './AssociationExternalTradeModal';

const AssociationExTradeQuestionModal = ({ openAssQuestionModal, setOpenAssQuestionModal }) => {
    const { theme } = useSelector((state) => state);
    const [openAssExTradeModal, setOpenAssExTradeModal] = useState(false)

    return (
        <>
            <Modal
                style={{
                    backgroundColor: themeColors[theme]?.menueBg,
                    color: themeColors[theme]?.text,
                }}
                title={<div style={{ fontWeight: "bold" }} > پیغام سیستم</div>}
                open={openAssQuestionModal}
                onCancel={() => {
                    setOpenAssQuestionModal(false);
                }}
                width={"20%"}
                footer={
                    [
                        <div style={{ display: "flex", justifyContent: "end", width: "100%", padding: "10px", backgroundColor: themeColors.light.bg }} >
                            <Button
                                backgroundColor={themeColors.comments.green}
                                onClick={() => {
                                    setOpenAssExTradeModal(true);
                                    setOpenAssQuestionModal(false);
                                }}
                            >
                                بله
                            </Button>
                            <Button
                                backgroundColor={themeColors.comments.red}
                                onClick={() => {
                                    setOpenAssQuestionModal(false);
                                }}
                            >
                                خیر
                            </Button>
                        </div>
                    ]
                }
            >
                <p className="" style={{ padding: "10px" }}>
                    شما پیش از این برای این قسمت نظر سنجی انجام داده اید در صورت تغییر دیدگاه، امکان ویرایش نظرسنجی وجود دارد. مایل به ویرایش آن هستید؟
                </p>
            </Modal>
            <AssociationExternalTradeModal openAssExTradeModal={openAssExTradeModal} setOpenAssExTradeModal={setOpenAssExTradeModal} />
        </>
    )
}

export default AssociationExTradeQuestionModal;