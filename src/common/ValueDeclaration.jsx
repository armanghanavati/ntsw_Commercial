// اظهارنامه ارزش
import React, { useEffect, useState } from "react";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoading,
  handleMessageModal,
  handleStepsOfCreatePage,
} from "../state/action-creators";
import {
  Table,
  Col,
  Row,
  Modal,
  Divider,
  Radio,
  Pagination,
  Checkbox,
} from "antd";
import themeColors from "../configs/theme";
import { VerticalSpace, Button, QuestionModal, Upload } from "../components";
import Validation from "../utils/Validation";
import { declarationTypes } from "../enums";
import { Link } from "react-router-dom";
import sample from "../assets/files/ValueDeclarationSample.xlsx";
// import { saveAs } from 'file-saver';
import { getExtentionType } from "../configs/helpers/get-extension-type";
import { declarationStepTitle } from "../enums";

const ValueDeclaration = ({ declarationId, declarationType }) => {
  const { theme, questionModal, stepsOfCreatePage, colorMode } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState();
  const [hrefForSelectedFile, setHrefForSelectedFile] = useState();
  const [formValues, setFormValues] = useState();
  const [isHaveTrackingIdentifier, setIsHaveTrackingIdentifier] =
    useState(false);
  const [tableData, setTableData] = useState([{}]);
  const [prevDoc, setPrevDoc] = useState();
  const [fileHasUploded, setFileHasUploded] = useState(false);

  const next = (event) => {
    event?.preventDefault();
    valueDeclarationValidation();
    // dispatch(handleStepsOfCreatePage({ ImD: stepsOfCreatePage?.ImD + 1 }))
  };
  const prev = (event) => {
    event?.preventDefault();
    dispatch(
      handleStepsOfCreatePage({
        [declarationStepTitle[declarationType]]:
          stepsOfCreatePage[declarationStepTitle[declarationType]] - 1,
        hasAccessToImD: true,
      })
    );
  };
  console.log(
    "[declarationStepTitle[declarationType]]",
    [declarationStepTitle[declarationType]],
    declarationTypes[declarationType]
  );
  const handleChangeInputs = (name, value, validationNameList = undefined) => {
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

    if (name === "doc") {
      setTableData([
        {
          ...tableData[0],
          [name]: value.name,
        },
      ]);
      handleShowSelectedFile(value);
    }
  };

  const columns = [
    {
      title: "فایل نمونه",
      align: "center",
      render: () => {
        return (
          <div className="flex-order-row">
            <a
              className="btn-download"
              href={sample}
              download="ValueDeclarationSample.xlsx"
            >
              دریافت فایل نمونه
            </a>
          </div>
        );
      },
    },
    {
      title: "عنوان سند بارگذاری شده",
      dataIndex: "doc",
      align: "center",
    },
    {
      title: "عملیات",
      align: "center",
      render: () => {
        return (
          <div className="flex-order-row">
            {!!prevDoc && typeof prevDoc === "object" ? (
              <a
                className="btn-download"
                style={{ backgroundColor: themeColors.btn.secondary }}
                onClick={savePrevDoc}
              >
                مشاهده
              </a>
            ) : !!formValues?.doc ? (
              <a
                className="btn-download"
                style={{ backgroundColor: themeColors.btn.secondary }}
                href={hrefForSelectedFile}
                download={formValues?.doc?.name}
              >
                مشاهده
              </a>
            ) : null}
            <Upload
              error={errors?.doc}
              accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              validations={[
                [
                  "fileFormat",
                  [
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/vnd.ms-excel",
                  ],
                  "xlsx,xls ",
                ],
                ["fileSize", 2000],
              ]}
              title="سند جدید"
              name="doc"
              onChange={handleChangeInputs}
              placeholder="فایل موردنظر را انتخاب کنید..."
              type="secondary"
            />
          </div>
        );
      },
    },
  ];
  const savePrevDoc = (event) => {
    event?.preventDefault();
    // let blob = new Blob([prevDoc.file], { type: prevDoc.extension });
    // const file = new Blob([blob]);
    // saveAs(file, 'fileName');
    const file = new Blob([prevDoc.file], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };
  const handleShowSelectedFile = (file) => {
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      var contents = e.target.result;
      displayContents(contents, file);
    };
    reader.readAsBinaryString(file);
    const displayContents = (binaryString, file) => {
      var extension = file.name.substring(file.name.lastIndexOf("."));
      var len = binaryString.length;
      var arr = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        arr[i] = binaryString.charCodeAt(i);
      }
      var mimetype = getExtentionType(extension);
      var data = new Blob([arr], {
        type: mimetype,
      });
      // var dataURL = window.URL.createObjectURL(data);
      setHrefForSelectedFile(window.URL.createObjectURL(data));
      // var a = document.getElementById('download');
      // a.innerHTML = 'مشاهده ';
      // a.download = file.name;
      // a.href = dataURL;
    };
  };
  const getValueDeclaration = () => {
    dispatch(handleLoading(true));
    const postData = {
      declarationId: declarationId,
      declarationType: declarationTypes[declarationType],
    };
    axios({
      url: endpoints.RestAPIs.valueDeclaration.getValueDeclaration.url,
      method: endpoints.RestAPIs.valueDeclaration.getValueDeclaration.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.code !== 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.message,
            })
          );
        } else {
          setPrevDoc(res?.data?.result?.document);
          setIsHaveTrackingIdentifier(
            res.data.result.isHaveTrackingIdentifier || false
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  const valueDeclaration = () => {
    dispatch(handleLoading(true));
    const formData = new FormData();
    formData.append("valueDeclarationDocument", formValues.doc);
    formData.append("declarationId", declarationId);
    formData.append("declarationType", declarationTypes[declarationType]);
    axios({
      url: endpoints.RestAPIs.valueDeclaration.saveValueDeclaration.url,
      method: endpoints.RestAPIs.valueDeclaration.saveValueDeclaration.method,
      data: formData,
    })
      .then((res) => {
        if (res.data?.code !== 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.message,
            })
          );
        } else {
          dispatch(
            handleMessageModal({
              type: "success",
              isModalOpen: true,
              describe: "با موفقیت بارگذاری شد.",
            })
          );
          setFileHasUploded(true);
          getValueDeclaration();
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  const saveDocument = (evnet) => {
    evnet.preventDefault();
    if (errors?.doc?.length == 0) {
      valueDeclaration();
    } else {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe:
            "لطفا فایل با پسوند xlsx,xls با حداکثر حجم 2 مگابایت انتخاب نمایید. ",
        })
      );
    }
  };

  const valueDeclarationValidation = () => {
    dispatch(handleLoading(true));
    const postData = {
      declarationId: declarationId,
    };
    axios({
      url: endpoints.RestAPIs.valueDeclaration.valueDeclarationValidation.url,
      method:
        endpoints.RestAPIs.valueDeclaration.valueDeclarationValidation.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.code === 0) {
          dispatch(
            handleStepsOfCreatePage({
              [declarationStepTitle[declarationType]]:
                stepsOfCreatePage[declarationStepTitle[declarationType]] + 1,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  const onCancelModal = (event) => {
    event?.preventDefault();
    setShowModal(false);
    if (!fileHasUploded) {
      setTableData([{}]);
      setFormValues({
        ...formValues,
        doc: undefined,
      });
    }
  };

  useEffect(() => {
    getValueDeclaration();
  }, []);

  return (
    <>
      <VerticalSpace space="2.5rem" />
      <Row>
        <Col sm={24} md={24} xl={24}>
          <span className="flex-order-row-justify-start ">
            <Button onClick={() => setShowModal(true)}>
              بارگذاری اظهارنامه ارزش
            </Button>
            {isHaveTrackingIdentifier && (
              <Link
                to={{
                  pathname:
                    "https://lab.ntsw.ir/Users/TrackingInterceptionCode.aspx",
                }}
                target="_blank"
              >
                <Button onClick={() => {}}>اظهار شناسه‌رهگیری</Button>
              </Link>
            )}
          </span>
        </Col>
      </Row>
      <VerticalSpace space="2.5rem" />
      <div className="steps-action">
        <Button
          name="prev"
          onClick={prev}
          backgroundColor={themeColors.btn.danger}
          type="primary"
        >
          <i className="fa fa-step-forward" aria-hidden="true"></i>
          بازگشت
        </Button>
        <Button
          name="next"
          type="primary"
          onClick={next}
          backgroundColor={themeColors.btn.secondary}
        >
          بعدی
          <i className="fa fa-step-backward" aria-hidden="true"></i>
        </Button>
      </div>

      {showModal && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="اظهارنامه ارزش"
          open={showModal}
          onCancel={() => onCancelModal()}
          footer={[
            <Button
              name="handelShowModal2"
              backgroundColor={themeColors.btn.secondary}
              onClick={saveDocument}
            >
              بارگذاری
            </Button>,
            <Button
              name="hideModal1"
              backgroundColor={themeColors.btn.danger}
              onClick={onCancelModal}
            >
              بازگشت
            </Button>,
          ]}
          width={1200}
        >
          <form style={{ padding: "0 20px" }}>
            <p
              className="modal--text"
              style={{ textAlign: "right", padding: 0 }}
            >
              لطفا پس از بارگیری فایل اکسل نسبت به تکمیل اظهارنامه ارزش و
              بارگذاری اقدام نمایید.
            </p>
            <Table
              onHeaderRow={() => {
                return {
                  style: { backgroundColor: colorMode },
                };
              }}
              dataSource={tableData}
              columns={columns}
              pagination={false}
            />
          </form>
        </Modal>
      )}
      {questionModal.isModalOpen && <QuestionModal />}
    </>
  );
};

export default ValueDeclaration;
