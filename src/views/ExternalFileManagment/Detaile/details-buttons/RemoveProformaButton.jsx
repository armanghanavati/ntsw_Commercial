import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import themeColors from "../../../../configs/theme";
import {
  handelQuestionModal,
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import {
  Button,
  Input,
  Signature,
  VerticalSpace,
} from "../../../../components";
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";
import { accessList } from "../../../../enums";
import { getBase64ForSignature } from "../../../../configs/signature";
import { Col, Modal, Row } from "antd";
import Countdown from "antd/lib/statistic/Countdown";

const RemoveProformaButton = ({
  PrfVcode,
  handleRefresh,
  filters,
  errors,
  handleChangeInputs,
}) => {
  const dispatch = useDispatch();
  const { role, GUid, isCertificateRequiredList, questionModal, theme } =
    useSelector((state) => state);
  const [counter, setCounter] = useState(0);
  const [counterMinute, setCounterMinute] = useState(0);
  const [base64ForSignature, setBase64ForSignature] = useState("");
  const [getErroreDesc, setGetErroreDesc] = useState("");
  const [questionModalMode, setQuestionModalMode] = useState();
  const [isShowModal, setIsShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isCancellationCase, setIsCancellationCase] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    removeProformaThirdStep();
  };

  const removeProformaFirstStep = (certificate, sign) => {
    dispatch(handleLoading(true));
    const postData = {
      PrfVcode: PrfVcode,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      DigitalSignature: {
        Random: base64ForSignature,
        CmsSignature: sign,
        Certificate: certificate,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
    };
    axios({
      url: endpoints.RestAPIs.Proforma.removeProformaFirstStep.url,
      method: endpoints.RestAPIs.Proforma.removeProformaFirstStep.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: "success",
            })
          );
          handleRefresh();
        } else if (res?.data?.ErrorCode === 2) {
          setQuestionModalMode("RemoveProformaSecStep");
          dispatch(
            handelQuestionModal({
              isModalOpen: true,
              title: "پیغام سیستم",
              describe: res.data?.ErrorDesc,
            })
          );
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };

  const removeProformaSecondStep = (certificate, sign) => {
    dispatch(handleLoading(true));
    const postData = {
      PrfVcode: PrfVcode,
      validationCode: 0,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      actionAccsess: 1,
      DigitalSignature: {
        ActionCode: 0,
        Random: base64ForSignature,
        CmsSignature: sign,
        LoginProfile: "",
        Certificate: certificate,
        HashAlgorithm: 0,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
      RecordID: 0,
      TableID: 0,
    };

    axios({
      url: endpoints.RestAPIs.Proforma.removeProformaSecondStep.url,
      method: endpoints.RestAPIs.Proforma.removeProformaSecondStep.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setIsShowModal(true);
          setCounterMinute(Date.now() + 120 * 1000);
          setGetErroreDesc(res.data?.ErrorDesc);
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: "success",
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };

  const onFinish = () => {
    setShowButton(true);
  };

  const removeProformaThirdStep = (certificate, sign) => {
    dispatch(handleLoading(true));
    const postData = {
      PrfVcode: PrfVcode,
      validationCode: filters?.validationCode,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      actionAccsess: 1,
      DigitalSignature: {
        ActionCode: 0,
        Random: base64ForSignature,
        CmsSignature: sign,
        LoginProfile: "",
        Certificate: certificate,
        HashAlgorithm: 0,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
      RecordID: 0,
      TableID: 0,
    };

    axios({
      url: endpoints.RestAPIs.Proforma.removeProformaThirdStep.url,
      method: endpoints.RestAPIs.Proforma.removeProformaThirdStep.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setQuestionModalMode("RemoveProformaThirdStep");
          dispatch(
            handelQuestionModal({
              isModalOpen: true,
              title: "پیغام سیستم",
              describe: res.data?.ErrorDesc,
            })
          );
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };

  const removeProformaFourthStep = (certificate, sign) => {
    dispatch(handleLoading(true));
    const postData = {
      PrfVcode: PrfVcode,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      DigitalSignature: {
        Random: base64ForSignature,
        CmsSignature: sign,
        Certificate: certificate,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
    };
    axios({
      url: endpoints.RestAPIs.Proforma.removeProformaFourthStep.url,
      method: endpoints.RestAPIs.Proforma.removeProformaFourthStep.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          handleRefresh();
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: "success",
            })
          );
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };

 

  useEffect(() => {
    if (
      questionModal.answer === "yes" &&
      questionModalMode === "RemoveProformaSecStep"
    ) {
      removeProformaSecondStep();
    } else if (
      questionModal.answer === "yes" &&
      questionModalMode === "RemoveProformaThirdStep"
    ) {
      removeProformaFourthStep();
      setIsShowModal(false);
    }
  }, [questionModal?.answer]);

  const ButtonValidationCode = (e) => {
    e.preventDefault();
    if (questionModalMode === "RemoveProformaSecStep") {
      removeProformaSecondStep();
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();
    setIsShowModal(false);
  };

  const CancellationCase = (e) => {
    e.preventDefault();
    setIsCancellationCase(true);
  };

  const submitHandler =(e)=>{
    e.preventDefault();
    removeProformaFirstStep();
    setIsCancellationCase(false)
  }

  return (
    <>
      <Button
        backgroundColor={themeColors.btn.primary}
        onClick={(e) => {
          CancellationCase(e);
        }}
      >
        <i class="fa fa-eraser" aria-hidden="true"></i>
        ابطال پرونده
      </Button>
      {isShowModal && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          onCancel={() => {
            setIsShowModal(false);
          }}
          footer={[
            <Button
              name="submit"
              type="primary"
              onClick={(e) => submit(e)}
              backgroundColor={themeColors.btn.secondary}
            >
              تایید
            </Button>,
            <Button
              name="close"
              backgroundColor={themeColors.btn.danger}
              onClick={(e) => closeHandler(e)}
            >
              بستن
            </Button>,
          ]}
          open={isShowModal}
          title="ابطال پرونده"
          width={1000}
        >
          <form className="form">
            <Row>
              <Col sm={24} md={12} xl={12}>
                <div
                  style={{
                    background: "#fffbea",
                    borderColor: "#f9e975",
                    marginBottom: "6px",
                    borderRight: "3px solid #f9e975",
                    padding: "9px",
                  }}
                >
                  <p>{getErroreDesc}</p>
                </div>
              </Col>
            </Row>
            <VerticalSpace space="0.5rem" />
            <Row>
              <Col sm={24} md={12} xl={10}>
                <Input
                  title="کد اعتبارسنجی"
                  type="number"
                  name="validationCode"
                  value={filters?.validationCode}
                  onChange={handleChangeInputs}
                  validations={[["digits", 4]]}
                  error={errors?.validationCode}
                />
              </Col>
              <Col sm={24} md={12} xl={6}>
                <div style={{ display: "flex", paddingLeft: "10px" }}>
                  <Countdown
                    format="mm:ss"
                    value={counterMinute}
                    onFinish={onFinish}
                  />
                  {showButton === true && (
                    <Button
                      name="getTable"
                      backgroundColor={themeColors.btn?.danger}
                      onClick={(e) => ButtonValidationCode(e)}
                    >
                      ارسال مجدد کد اعتبارسنجی
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
            <VerticalSpace space="1rem" />
            <Row>
              <Col sm={24} md={12} xl={12}>
                <div
                  style={{
                    background: "#fffbea",
                    borderColor: "#f9e975",
                    marginBottom: "6px",
                    borderRight: "3px solid #f9e975",
                    padding: "5px",
                    display: "flex",
                  }}
                >
                  <p>لطفا به صورت مختصر علت ابطال پرونده خود را توضیح دهید</p>
                </div>
              </Col>
            </Row>
            <VerticalSpace space="0.5rem" />
            <Row>
              <Col sm={24} md={12} xl={10}>
                <Input
                  title="دلیل ابطال"
                  type="textarea"
                  name="ReasonCancellation"
                  value={filters?.ReasonCancellation}
                  onChange={handleChangeInputs}
                  error={errors?.ReasonCancellation}
                />
              </Col>
            </Row>
          </form>
        </Modal>
      )}

      {isCancellationCase && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          onCancel={() => {
            setIsCancellationCase(false);
          }}
          footer={[
            <span
              style={{ padding: "5px", gap: "5px" }}
              className="flex-order-row-justify-start"
            >
              <Button
                onClick={(e) => {
                  submitHandler(e);
                }}
              >
                تایید
              </Button>
              <Button
                backgroundColor={themeColors.btn.danger}
                onClick={() => {
                  setIsCancellationCase(false);
                }}
              >
                انصراف
              </Button>
            </span>,
            ,
          ]}
          open={isCancellationCase}
          title="پیغام سیستم"
          width={1000}
        >
          <p>
            در صورت ابطال پرونده، انجام هیچ گونه عملیات دیگری بر روی آن امکان
            پذیر نخواهد بود و این فرآیند نیازمند امضا می باشد.
          </p>
        </Modal>
      )}
    </>
  );
};

export default RemoveProformaButton;
