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
import Validation from "../../../../utils/Validation";


const RemoveProformaForStatisticalRegistraion = ({ PrfVcode,
  handleRefresh,
  detailExternal,
  status,
  activeStatus }) => {
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
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({})
  const submit = (e) => {
    e.preventDefault();
    // removeProformaThirdStep();
  };

  const handleChangeInputs = (name, value, validationNameList = []) => {
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1]));
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });
    setFilters((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });

  };

  const manageCancelRegedOrder = (certificate, sign, id) => {
    dispatch(handleLoading(true));
    const postData = {
      PrfOrderNoStr: detailExternal?.prfOrderNoStr,
      CancelReason: !!filters?.ReasonCancellation ? filters?.ReasonCancellation : "",
      VerificationCode: 0,
      CancelRegedOrder: !!id ? id : 3,
      urlVCodeInt: role,
      actionAccsess: 0,
      RecordID: 0,
      TableID: 0,
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
      url: endpoints.RestAPIs.Proforma.manageCancelRegedOrder.url,
      method: endpoints.RestAPIs.Proforma.manageCancelRegedOrder.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setIsShowModal(true)
          setGetErroreDesc(res?.data?.ErrorDesc)
          setCounterMinute(Date.now() + 120 * 1000);
        } else if (res?.data?.ErrorCode === 2) {
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



  const onFinish = () => {
    setShowButton(true);
  };


  const handleSignature = (cert, sign) => {
    manageCancelRegedOrder(cert, sign, 3);
  }


  const closeHandler = (e) => {
    e.preventDefault();
    setIsShowModal(false);
  };

  const CancellationCase = (e) => {
    e.preventDefault();
    setIsCancellationCase(true);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    manageCancelRegedOrder(undefined, undefined, 1);
    setIsCancellationCase(false);
  }

  const ButtonValidationCode = (e) => {
    e.preventDefault();
    manageCancelRegedOrder(undefined, undefined, 1);
  };


  const handleValidation = (inputsName = []) => {
    const err = { ...errors };
    inputsName.map((item) => {
      if (
        filters[item] === undefined ||
        filters[item] === null ||
        JSON.stringify(filters[item])?.trim() === ""
      ) {
        err[item] = ["پرکردن این فیلد الزامی است"];
      }
    });
    setErrors(err);
    return err;
  };

  const permitForNextStep = (inputsName = []) => {
    const error = handleValidation(inputsName);
    for (var key in error) {
      if (error[key]?.length > 0) {
        if (inputsName.includes(key)) {
          return false;
        }
      }
    }
    return true;
  };

  const beforeSigning = () => {
    if (isCertificateRequiredList.includes(accessList.removeProforma) && permitForNextStep(["validationCode", "ReasonCancellation"]) === true) {
      getBase64ForSignature(setBase64ForSignature, counter, setCounter);
    } else {
      manageCancelRegedOrder(undefined, undefined, 3);
    }
  };


  return (
    <>
      <Button
        backgroundColor={themeColors.btn.primary}
        onClick={(e) => {
          CancellationCase(e);
        }}
      >
        <i class="fa fa-eraser" aria-hidden="true"></i>
        ابطال پرونده آماری
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
            <span
              style={{ padding: "5px", gap: "5px" }}
              className="flex-order-row-justify-start"
            >
              <Signature
                counter={counter}
                beforeSigning={beforeSigning}
                hasbeforeSigningFunction={true}
                base64CertificateInfo={base64ForSignature}
                backgroundColor={themeColors.btn.secondary}
                questionModalMode={questionModalMode}
                setQuestionModalMode={setQuestionModalMode}
                service={handleSignature}
                beSigned={isCertificateRequiredList.includes(
                  accessList.removeProforma
                )}
              // beSigned={true}
              >
                تایید
              </Signature>
              <Button
                name="close"
                backgroundColor={themeColors.btn.danger}
                onClick={(e) => closeHandler(e)}
              >
                بستن
              </Button>
            </span>,
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
                  // type="textarea"
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
                onClick={e => submitHandler(e)}
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
}
export default RemoveProformaForStatisticalRegistraion;
