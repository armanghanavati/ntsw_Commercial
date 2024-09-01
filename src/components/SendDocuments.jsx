import React, { useEffect, useState } from "react";
import { Button, QuestionModal, Upload, Input } from "../components";
import Validation from "../utils/Validation";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../configs/theme";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import { Modal, Col, Row, Form } from "antd";
import {
  handleLoading,
  handleMessageModal,
  handelRefreshRole,
} from "../state/action-creators";

const SendDocuments = ({
  inputsData,
  modaleTypeError5,
  onChange,
  modaleTypeError10,
  errors,
  setErrors,
  setInputsData,
  docCodeInt,
  open,
  setOpen,
}) => {
  // const [showModale, setShowModale] = useState(false);
  const [showUploadInputs, setShowUploadInputs] = useState(true);
  const [dataName, setDataName] = useState(["DOCS-1"]);
  const [arraySendDoc, setArraySendDoc] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const {
    theme,
    questionModal,
    GUid,
    role,
    mainId,
    refreshRole,
    messageModal,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const alternativeCompany = () => {
  //   const postData = {
  //     cmpNationalCodeStr: inputsData?.nationalID,
  //     cmpPhoneStr: inputsData?.landLinePhone,
  //     cmpFaxStr: inputsData?.characterProfile,
  //     cmpEmailStr: inputsData?.email,
  //     cmpWebsiteStr: inputsData?.webSite,
  //     cmpOfficialNewspaperTrackingCodeStr:
  //       inputsData?.cmpOfficialNewspaperTrackingCodeStr,
  //     CompanyOwnerShipTypeCode: inputsData?.CompanyOwnerShipTypeCode,
  //     urlVCodeInt: role,
  //     cmpPostalCodeStr: "",
  //     ssdsshGUID: GUid,
  //     prsVCodeInt: mainId,
  //     IsToChangeCompany: true,
  //   };
  //   setLoading(true);
  //   dispatch(handleLoading(true));
  //   axios({
  //     url: endpoints.RestAPIs.basicOperation.alternativeCompanyIntroduction.url,
  //     method:
  //       endpoints.RestAPIs.basicOperation.alternativeCompanyIntroduction.method,
  //     data: postData,
  //   })
  //     .then((res) => {
  //       if (res.data?.ErrorCode === 0) {
  //         dispatch(
  //           handleMessageModal({
  //             isModalOpen: true,
  //             describe: res.data?.ErrorDesc,
  //             type: "sucsses",
  //           })
  //         );
  //         dispatch(handelRefreshRole(!refreshRole));
  //       } else if (
  //         res.data?.ErrorCode === 10 ||
  //         (res.data?.ErrorCode === 11 && modaleTypeError10 !== "ErrorCode10")
  //       ) {
  //         dispatch(
  //           handleMessageModal({
  //             isModalOpen: true,
  //             describe: res.data?.ErrorDesc,
  //           })
  //         );
  //         // setOpen(false);
  //         // setShowModale(true);
  //       } else if (
  //         res.data?.ErrorCode === 10 ||
  //         (res.data?.ErrorCode === 11 && modaleTypeError10 === "ErrorCode10")
  //       ) {
  //         // setOpen(true);
  //         // setShowModale(true);
  //       } else {
  //         dispatch(
  //           handleMessageModal({
  //             isModalOpen: true,
  //             describe: res.data?.ErrorDesc,
  //           })
  //         );
  //       }
  //       dispatch(handleLoading(false));
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       dispatch(handleLoading(false));
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    if (messageModal?.isModalOpen === false && counter === 2) {
      // setOpen(true);
    }
  }, [messageModal?.isModalOpen]);

  useEffect(() => {
    if (questionModal.answer === "yes" && modaleTypeError5 === "ErrorCode5") {
      // alternativeCompany();
    } else if (
      questionModal.answer === "yes" &&
      modaleTypeError10 === "ErrorCode10"
    ) {
      // setShowModale(true);
      // setOpen(true);
    }
  }, [questionModal.answer]);

  const convertBase64Image = (value) => {
    let formatSplit = value.name.slice(-4);
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    async function Main() {
      const file = value;
      let basenew = await toBase64(file);
      const words = basenew.split(",");
      return words[1];
    }
    Main()
      .then((data) => {
        setArraySendDoc((prvs) => [
          ...prvs,
          { fullName: value.name, format: formatSplit, data },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeInputs = (name, value, validationNameList = undefined) => {
    convertBase64Image(value);
    if (name === dataName[dataName.length - 1]) {
      const temporary = Number(dataName[dataName.length - 1].split("-")[1]);
      setDataName([...dataName, `DOCS-${temporary + 1}`]);
    }
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1], item[2]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1], item[2]));
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: Validation[item[0]](value, item[1], item[2]),
            })
          );
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });

    setFormValues((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };

  const removeUpload = (event, name) => {
    event?.preventDefault();
    const index = dataName.indexOf(name);

    if (index >= 0) {
      if (index == dataName.length - 1) {
        setFormValues({
          ...formValues,
          [name]: undefined,
        });
      } else {
        dataName.splice(index, 1);
        setErrors({
          ...errors,
          [name]: [],
        });
      }
    }

    setShowUploadInputs(false);
    setTimeout(() => {
      setShowUploadInputs(true);
    }, 200);

    let temp = arraySendDoc.filter((item, indx) => indx !== index);
    setArraySendDoc(temp);
  };

  const resetForm = () => {
    setArraySendDoc([]);
    setFormValues([]);
    setDataName(["DOCS-1"]);
    dataName.forEach((itm) => {
      delete errors?.[itm];
    });
    setInputsData((prvs) => ({
      ...prvs,
      cmpOfficialNewspaperTrackingCodeStr: "",
    }));
    delete errors.cmpOfficialNewspaperTrackingCodeStr;
  };


  const permit = () => {
    for (var key in errors) {
      if (errors[key]?.length > 0) {
        return false;
      }
    }
  };

  const insertPermitDocuments = () => {
    if (permit() !== false) {
      let elementInfo = arraySendDoc?.map((item) => ({
        docCaptionStr: item.fullName,
        docFormat: item.format,
        DOCS: item.data,
      }));

      const postData = {
        Docs: elementInfo,
        docCodeInt: docCodeInt,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        prfVCodeInt: 0,
      };
      dispatch(handleLoading(true));
      setLoading(true);
      axios({
        url: endpoints.RestAPIs.permit.insertPermitDocuments.url,
        method: endpoints.RestAPIs.permit.insertPermitDocuments.method,
        data: postData,
      })
        .then((res) => {
          if (res.data?.Error === 0) {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
                type: "success",
              })
            );
            setOpen(false);
          } else {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
              })
            );
          }
          // setShowModale(false);
          // setOpen(false);
          dispatch(handleLoading(false));
          setLoading(false);
          resetForm();
        })
        .catch((err) => {
          dispatch(handleLoading(false));
          setLoading(false);
        });
    }
  };

  const canceled = () => {
    // setShowModale(false);
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <QuestionModal />
      <Modal
        className="questionModal"
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        onCancel={canceled}
        footer={[
          <Button
            loading={loading}
            backgroundColor={themeColors.btn.secondary}
            onClick={insertPermitDocuments}
          >
            ثبت مستندات
          </Button>,
          <Button backgroundColor={themeColors.btn.danger} onClick={canceled}>
            انصراف
          </Button>,
          // </div>
        ]}
        open={open}
        title={"انتخاب مستتندات"}
      >
        {showUploadInputs &&
          dataName?.map((item, index) => {
            return (
              <Row key={`documents${index}`}>
                <Col sm={20} md={20} xl={20}>
                  <Form.Item name={`DOCS-${index}`}>
                    <Upload
                      disabled={errors?.length > 0 && true}
                      name={item}
                      onChange={handleChangeInputs}
                      error={errors?.[item]}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.zip,.rar,.7zip,.pdf,.jpg,.svg,.png,.jpeg,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      validations={[
                        [
                          "fileFormat",
                          [
                            "application/pdf",
                            "pdf",
                            "zip",
                            "rar",
                            "7zip",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            "application/vnd.ms-excel",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            "application/msword",
                            "image/png",
                            "image/jpg",
                            "image/svg",
                            "image/jpeg",
                          ],
                          "xlsx,xls,pdf,jpg,svg,png,jpeg",
                        ],
                        ["fileSize", 2000],
                      ]}
                      title="مستند"
                      defaultFile={formValues[item]}
                    />
                  </Form.Item>
                </Col>
                <Button
                  style={{
                    border: "none",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    borderBottomLeftRadius: "4px",
                    borderTopLeftRadius: "4px",
                    backgroundColor: "rgb(237, 78, 42)",
                    minWidth: "40px",
                    marginRight: "-20px",
                  }}
                  backgroundColor={themeColors.btn.danger}
                  onClick={(e) => removeUpload(e, item)}
                >
                  <i
                    class="fa fa-times"
                    style={{ fontSize: "18px", color: "#fff" }}
                  />
                </Button>
              </Row>
            );
          })}
      </Modal>
    </>
  );
};

export default SendDocuments;
