import React from "react";
import { Button, QuestionModal, VerticalSpace } from "../../../../components";
import { Col, Modal, Row } from "antd";
import themeColors from "../../../../configs/theme";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handelQuestionModal,
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import { useEffect } from "react";
import { Upload } from "../../../../components";
import Validation from "../../../../utils/Validation";
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";

const SelectDocumentsModal = ({
  prfVCodeInt,
  editingId,
  showProformaDocument,
  setFilters,
  filters,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [questionModalType, setQuestionModalType] = useState();
  const [base64OfDocumentsList, setBase64OfDocumentsList] = useState();
  const [documentsListForSave, setDocumentsListForSave] = useState({ 1: {} });
  const [errors, setErrors] = useState({});
  const { theme, questionModal, GUid, role } = useSelector((state) => state);
  const dispatch = useDispatch();

  const add = (event) => {
    event?.preventDefault();
    setIsOpenModal(true);
  };

  const handleCancelModal = (event) => {
    event?.preventDefault();
    setQuestionModalType("CANCEL_MODAL");
    dispatch(
      handelQuestionModal({
        isModalOpen: true,
        title: "بستن پنجره",
        describe: "آیا از بستن این پنجره اطمینان دارید؟",
      })
    );
  };

  useEffect(() => {
    if (questionModalType === "CANCEL_MODAL") {
      if (questionModal.answer === "yes") {
        setIsOpenModal(false);
      }
      setQuestionModalType();
      dispatch(
        handelQuestionModal({
          isModalOpen: false,
          title: "",
          describe: "",
        })
      );
    }
  }, [questionModal.answer]);

  const handleChangeInputs = (name, value, validationNameList = undefined) => {
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1], item[2]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1], item[2]));
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });
    getBase64(value, name);
    addSingleDocumentInput({ ...documentsListForSave, [name]: value }, name);
  };

  const addSingleDocumentInput = (data, currentKey) => {
    let temp;
    Object.keys(documentsListForSave).map((key) => {
      if (!!temp) {
        if (temp < key) {
          temp = key;
        }
      } else {
        temp = key;
      }
    });
    if (temp == currentKey) {
      setDocumentsListForSave({ ...data, [Number(temp) + 1]: {} });
    } else {
      setDocumentsListForSave({ ...data });
    }
  };

  const getBase64 = (file, name) => {
    return new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        file = fileLoadedEvent.target.result;
        setBase64OfDocumentsList({
          ...base64OfDocumentsList,
          [name]: fileLoadedEvent.target.result,
        });
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleInsertDocument = (event) => {
    event?.preventDefault();
    const hasError = Object.keys(documentsListForSave).map((key) => {
      if (!!errors[key] && errors[key]?.length > 0) {
        return true;
      }
    });
    if (hasError.includes(true)) {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: "لطفا فایل مجاز بارگذاری نمایید.",
        })
      );
    } else {
      if (filters?.status > 1) {
        const docs = [];
        Object.keys(documentsListForSave).map((key) => {
          if (!!documentsListForSave[key].name) {
            docs.push({
              Caption: documentsListForSave[key].name,
              Format: documentsListForSave[key].name.split(".")[1],
              DOC: base64OfDocumentsList[key].split("base64,")[1],
              GUID: Math.floor(Math.random() * 1000000000000 + key),
            });
          }
        });
        setFilters({
          ...filters,
          InsertedDocument: [
            ...(!!filters.InsertedDocument ? filters.InsertedDocument : []),
            ...docs,
          ],
        });
        dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe: "با موفقیت ثبت شد.",
            type: "success",
          })
        );
        setIsOpenModal(false);
        setBase64OfDocumentsList({});
        setDocumentsListForSave({ 1: {} });
        setErrors({});
      } else {
        insertProformaDocument();
      }
    }
  };

  const insertProformaDocument = () => {
    dispatch(handleLoading(true));
    const docs = [];
    Object.keys(documentsListForSave).map((key) => {
      if (!!documentsListForSave[key].name) {
        docs.push({
          docCaptionStr: documentsListForSave[key].name,
          docFormat: documentsListForSave[key].name.split(".")[1],
          DOCS: base64OfDocumentsList[key].split("base64,")[1],
        });
      }
    });
    const formData = {
      Docs: docs,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: prfVCodeInt,
      docCodeInt: prfVCodeInt,
    };

    axios({
      url: endpoints.RestAPIs.Proforma.insertProformaDocument.url,
      method: endpoints.RestAPIs.Proforma.insertProformaDocument.method,
      data: formData,
    })
      .then((res) => {
        if (res?.data?.Error === 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: "با موفقیت ثبت شد.",
              type: "success",
            })
          );
          setIsOpenModal(false);
          setBase64OfDocumentsList({});
          setDocumentsListForSave({ 1: {} });
          setErrors({});

          showProformaDocument();
          // if (editingId) {
          //   setFilters({
          //     ...filters,
          //     InsertedDocument: filters.InsertedDocument
          //       ? [...filters.InsertedDocument, ...docs]
          //       : docs,
          //   });
          // }
        } else if (res?.data?.Error !== 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
          dispatch(handleLoading(false));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={add}
        backgroundColor={themeColors.btn.danger}
        hasVerticalSpace={false}
        id="AddDocuments"
      >
        <i class="fa fa-plus-square" aria-hidden="true"></i>
        افزودن مستند
      </Button>
      {isOpenModal && <QuestionModal />}
      {
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="انتخاب مستندات پرونده"
          open={isOpenModal}
          width={900}
          footer={false}
          onCancel={handleCancelModal}
        >
          <form className="form">
            <div className="document-modal--text">
              <p>
                توجه اندازه هریک از مستندات انتخابی بایستی کمتر از 400 کیلوبایت
                باشد.{" "}
              </p>
              <p>فرمت های قابل قبول: .pdf , .jpeg , .jpg</p>
            </div>
            <VerticalSpace space="1rem" />
            <Row>
              {Object.keys(documentsListForSave).map((key) => {
                return (
                  <Col sm={24} md={24} xl={24}>
                    <Upload
                      error={errors[key]}
                      accept="image/png image/gif image/jpeg .pdf"
                      validations={[
                        [
                          "fileFormat",
                          ["application/pdf", "image/jpeg"],
                          "pdf,jpeg,jpg",
                        ],
                        ["fileSize", 400],
                      ]}
                      title="مستند"
                      name={key}
                      onChange={handleChangeInputs}
                      placeholder=""
                      defaultFile={documentsListForSave[key]}
                    />
                  </Col>
                );
              })}
            </Row>
            <VerticalSpace space="1rem" />

            <span className="flex-order-row-justify-start">
              <Button
                backgroundColor={themeColors.btn.secondary}
                onClick={handleInsertDocument}
              >
                ثبت مستندات
              </Button>
              <Button
                backgroundColor={themeColors.btn.danger}
                onClick={handleCancelModal}
              >
                انصراف
              </Button>
            </span>
          </form>
        </Modal>
      }
    </>
  );
};

export default SelectDocumentsModal;
