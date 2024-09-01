import React, { useEffect, useState } from "react";
import {
  Button,
  QuestionModal,
  Upload,
  VerticalSpace,
} from "../../../components";
import Validation from "../../../utils/Validation";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../../../configs/theme";
import { Modal, Col, Row, Form } from "antd";
import {
  handleMessageModal,
} from "../../../state/action-creators";
import { toBase64 } from "../../../configs/helpers/convert";

const SendDocuments = ({
  setInputsData,
  open,
  setOpen,
  arraySendDoc,
  setArraySendDoc,
  setErrors,
  errors,
  restImageDoc
}) => {
  const [showUploadInputs, setShowUploadInputs] = useState(true);
  const [dataName, setDataName] = useState(["DOCS-1"]);
  const [formValues, setFormValues] = useState([]);
  const {
    theme,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const convertBase64Image = (value) => {
    let formatSplit = value.name?.slice(-4);
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

  const handleChangeInputs = async (name, value, validationNameList = undefined, index) => {
    if (name === dataName[dataName.length - 1]) {
      const temporary = Number(dataName[dataName.length - 1].split("-")[1]);
      setDataName([...dataName, `DOCS-${temporary + 1}`]);
      setFormValues((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
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
    if (dataName.includes(name)) {
      setFormValues((prevstate) => {
        return {
          ...prevstate,
          [name]: value,
        };
      });
      const data = await toBase64(value)
      let formatSplit = value.name?.slice(-4);
      const temp = [...arraySendDoc]
      temp[index] = { fullName: value.name, format: formatSplit, data }
      setArraySendDoc([...temp]);
      return
    }
    convertBase64Image(value);

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
    // form.resetFields()
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
    setOpen(false);

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
      setOpen(false);
    }
  };

  const canceled = () => {
    setOpen(false);
  };

  useEffect(() => {
    resetForm()
  }, [restImageDoc])

  const validType = ["jpg", "jpeg", ".jpg", ".jpeg"]

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        hasVerticalSpace={false}
        id="AddDocuments"
      >
        <i class="fa fa-plus-square" aria-hidden="true"></i>
        انتخاب تصاویر مدرک
      </Button>
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
            backgroundColor={themeColors.btn.secondary}
            onClick={insertPermitDocuments}
          >
            ثبت
          </Button>,
          <Button backgroundColor={themeColors.btn.danger} onClick={canceled}>
            انصراف
          </Button>,
        ]}
        open={open}
        title={"انتخاب تصاویر مدرک"}
      >
        {/* <form className="form"> */}
        <Form form={form} className="form">
          <div className="document-modal--text">
            <p>
              توجه اندازه هریک از مستندات انتخابی بایستی کمتر از 100 کیلوبایت
              باشد.{" "}
            </p>
            <p>فرمت های قابل قبول: jpg , .jpeg.</p>
          </div>
          <VerticalSpace space="1rem" />
          {showUploadInputs &&
            dataName?.map((item, index) => {
              console.log('itteeeeeeeeem', arraySendDoc[index]);
              return (
                <Row key={`documents${index}`} justify="center">
                  <Col sm={20} md={20} xl={20}>
                    <Form.Item name={`DOCS-${index}`}>
                      <Upload
                        name={item}
                        onChange={(name, value, validationNameList) => handleChangeInputs(name, value, validationNameList, index)}
                        error={errors?.[item]}
                        // accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.zip,.rar,.7zip,.pdf,.jpg,.svg,.png,.jpeg,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        accept=".jpg,.jpeg"
                        validations={[
                          [
                            "fileFormat",
                            [
                              // "application/pdf",
                              // "pdf",
                              // "zip",
                              // "rar",
                              // "7zip",
                              // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                              // "application/vnd.ms-excel",
                              // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                              // "application/msword",
                              // "image/png",
                              "image/jpg",
                              // "image/svg",
                              "image/jpeg",
                            ],
                            "jpg,jpeg",
                          ],
                          ["fileSize", 100],
                        ]}
                        title="تصویر مدرک"
                        defaultFile={formValues[item]}
                      />
                    </Form.Item>
                  </Col>
                  <Row>
                    <div className="image-box">
                      {(arraySendDoc?.[index]?.data && validType.includes(arraySendDoc?.[index]?.format?.toLowerCase())) && (
                        <img
                          src={
                            "data:image/png;base64," +
                            arraySendDoc?.[index]?.data
                          }
                          width={"100%"}
                          height={"100%"}
                          alt="preview img"
                        />
                      )}
                    </div>
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
                        title="حذف"
                      />
                    </Button>
                  </Row>
                </Row>
              );
            })}
        </Form>
        {/* </form> */}
      </Modal>
    </>
  );
};

export default SendDocuments;
