import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handelQuestionModal } from "../state/action-creators";
import themeColors from "../configs/theme";
import { Modal } from "antd";
import Button from "./Button";

const QuestionModal = () => {
  const dispatch = useDispatch();
  const { theme, questionModal } = useSelector((state) => state);
  const handleClose = (questionAnswer) => {
    dispatch(
      handelQuestionModal({
        isModalOpen: false,
        describe: "",
        answer: questionAnswer,
        name: questionModal.name,
      })
    );
  };

  return (
    <Modal
      className="questionModal"
      style={{
        backgroundColor: themeColors[theme]?.menueBg,
        color: themeColors[theme]?.text,
      }}
      width={500}
      onCancel={() => {
        dispatch(handelQuestionModal({ isModalOpen: false, describe: "" }));
      }}
      footer={[
        <div
          className={
            questionModal?.showColorFooter === true
              ? `colorFooter`
              : "notColorFooter"
          }
        >
          <Button
            backgroundColor={questionModal?.backgroundColorSubmitButton}
            onClick={() => handleClose("yes")}
          >
            {questionModal.titleOfSubmitButton || "بله"}
          </Button>

          <Button
            backgroundColor={themeColors.btn.danger}
            onClick={() => handleClose("no")}
          >
            {questionModal.titleOfCancelButton || "خیر"}
          </Button>
        </div>,
      ]}
      open={questionModal?.isModalOpen || false}
      title={questionModal?.title || "ثبت اطلاعات"}
    >
      <p className="modal--text">{questionModal?.describe}</p>
    </Modal>
  );
};
export default QuestionModal;
