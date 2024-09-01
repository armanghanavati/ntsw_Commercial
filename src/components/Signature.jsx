import { useState, useEffect } from "react";
import Button from "./Button";
import {
  Dastine,
  DastineInstaller,
  BrowserDetector,
} from "../assets/dastine/Dastine";
import themeColors from "../configs/theme";
import DastineConfig from "../assets/dastine/Dastine-Config";
import { handleLoading, handleMessageModal } from "../state/action-creators";
import { useDispatch, useSelector } from "react-redux";
import {
  dastineVisibleMessage,
  handleDastineError,
} from "../assets/dastine/Dastine-Errors";
import { Modal, notification } from "antd";
import { Link } from "react-router-dom";
import { endpoints } from "../services/endpoints";
import { store } from "./../state/store";
const Signature = ({
  backgroundColor = themeColors.btn.primary,
  title,
  base64CertificateInfo = "",
  service = () => { },
  beforeSigning = () => { },
  hasbeforeSigningFunction = false,
  counter = 0,
  beSigned = true,
  children,
}) => {
  const [dastineIsNotInstalled, setDastineIsNotInstalled] = useState(false);
  const [appIsMounted, setAppIsMounted] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);

  const handleSignatureButton = (event) => {
    event?.preventDefault();
    if (Dastine.isInstalled) {
      store.dispatch(handleLoading(true));
      Dastine.Reset(function (event) {
        let errorMessage;
        Dastine.SelectCertificateFromWindowsByUI("", "", (select) => {
          errorMessage = handleDastineError(select.data.Result);
          if (errorMessage !== "SUCCESSFUL") {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: dastineVisibleMessage[select.data.Result],
              })
            );
            store.dispatch(handleLoading(false));
            return;
          }
          Dastine.GetSelectedCertificate((certificateRes) => {
            errorMessage = handleDastineError(certificateRes.data.Result);
            if (errorMessage !== "SUCCESSFUL") {
              dispatch(
                handleMessageModal({
                  isModalOpen: true,
                  describe: dastineVisibleMessage[certificateRes.data.Result],
                })
              );
              store.dispatch(handleLoading(false));
              return;
            }

            Dastine.CmsSign(base64CertificateInfo, "SHA1", (cmsSignRes) => {
              errorMessage = handleDastineError(cmsSignRes.data.Result);
              if (errorMessage !== "SUCCESSFUL") {
                dispatch(
                  handleMessageModal({
                    isModalOpen: true,
                    describe: dastineVisibleMessage[cmsSignRes.data.Result],
                  })
                );
                store.dispatch(handleLoading(false));
                return;
              } else {
                notification.open({
                  message: "گواهی با موفقیت انتخاب شد.",
                  rtl: true,
                  duration: 4,
                  style: {
                    backgroundColor: themeColors.btn.secondary,
                  },
                });
                store.dispatch(handleLoading(false));
              }
              service(certificateRes.data.Result, cmsSignRes.data.Result);
            });
          });
        });
      });
    } else {
      store.dispatch(handleLoading(false));
      if (Dastine.errorMessage === "DASTINE_NOT_INSTALLED") {
        dispatch(
          handleMessageModal({
            type: "praimary",
            isModalOpen: true,
            describe:
              "با کلیک بر روی این گزینه در هر مرحله پرونده ای با وضعیت جدید با اطلاعات یکسان در قسمت مدیریت پرونده ایجاد می شود البته باید دقت داشته باشید که هر پرونده با چهار فیلد شماره پیش فاکتور، تاریخ صدور، کشور ذینفع و شناسه فروشنده خارجی یکتا می شود. اگر قصد دارید پرونده کپی شده را پیش ببرید باید حداقل یکی از فیلدهای ذکر شده را ویرایش کنید و یا پرونده قبلی را ابطال نمایید",
          })
        );
        setDastineIsNotInstalled(true);
      } else {
        dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe:
              Dastine.errorMessage === "WAITING_FOR_DASTINE_SERVICE"
                ? "انتظار برای اتصال به سرویس دستینه!! لطفا صفحه را باز بگذارید و چند ثانیه بعد مجدد امتحان کنید. "
                : Dastine.errorMessage,
          })
        );
        dispatch(
          handleMessageModal({
            type: "praimary",
            isModalOpen: true,
            describe:
              "با کلیک بر روی این گزینه در هر مرحله پرونده ای با وضعیت جدید با اطلاعات یکسان در قسمت مدیریت پرونده ایجاد می شود البته باید دقت داشته باشید که هر پرونده با چهار فیلد شماره پیش فاکتور، تاریخ صدور، کشور ذینفع و شناسه فروشنده خارجی یکتا می شود. اگر قصد دارید پرونده کپی شده را پیش ببرید باید حداقل یکی از فیلدهای ذکر شده را ویرایش کنید و یا پرونده قبلی را ابطال نمایید",
          })
        );
        setDastineIsNotInstalled(true);
        store.dispatch(handleLoading(false));
      }
    }
  };

  useEffect(() => {
    DastineConfig.init();
    BrowserDetector.init();
    // DastineInstaller.init();
    DastineInstaller.createConnection();
    setAppIsMounted(true);
  }, []);

  useEffect(() => {
    if (appIsMounted && hasbeforeSigningFunction && counter !== 0 && beSigned) {
      handleSignatureButton();
    } else if (
      appIsMounted &&
      hasbeforeSigningFunction &&
      counter !== 0 &&
      !beSigned
    ) {
      service();
    }
  }, [counter]);

  return (
    <>
      <Button
        backgroundColor={themeColors.btn.primary}
        onClick={(event) => {
          event?.preventDefault();
          if (
            (beSigned && hasbeforeSigningFunction) ||
            (!beSigned && hasbeforeSigningFunction)
          ) {
            beforeSigning();
          } else if (beSigned) {
            handleSignatureButton();
          } else {
            service();
          }
        }}
        name="signature"
      >
        {title || children}
      </Button>
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        width={700}
        onCancel={() => {
          setDastineIsNotInstalled(false);
        }}
        footer={[
          <Link
            to={{
              pathname: `${endpoints.BaseUrlAddress}/Upload/token_1.1.pdf`,
            }}
            target="_blank"
          >
            <Button
              onClick={() => {
                setDastineIsNotInstalled(false);
              }}
            >
              راهنمای استفاده از گواهی امضای الکرونیک
            </Button>
          </Link>,
          <Link
            to={{
              pathname:
                "https://www.gica.ir/totalCA/index.aspx?portal=MFPortal&Page=79&lang=fa",
            }}
            target="_blank"
          >
            <Button
              backgroundColor={themeColors.btn.secondary}
              onClick={() => {
                setDastineIsNotInstalled(false);
              }}
            >
              ثبت نام و تهیه گواهی امضاء الکترونیکی
            </Button>
          </Link>,
          <Button
            backgroundColor={themeColors.btn.danger}
            onClick={() => {
              setDastineIsNotInstalled(false);
            }}
          >
            لغو
          </Button>,
        ]}
        open={dastineIsNotInstalled}
        title="پیغام سیستم"
      >
        <p className="modal--text" style={{ textAlign: "right" }}>
          کاربر گرامی
          <br />
          برای استفاده از این بخش از سامانه، نیازمند اخذ گواهی امضای الکترونیکی،
          نصب نرم افزار دستینه و اتصال سخت افزار مربوطه (توکن) به رایانه خود
          می‌باشید.
        </p>
      </Modal>
    </>
  );
};

export default Signature;







{/* <Modal
  Modal
  style={{
    backgroundColor: themeColors[theme]?.menueBg,
    color: themeColors[theme]?.text,
  }}
  width={300}
  closable={false}
  footer={null}
  open={messageModal?.isModalOpen || false}
  onCancel={handleClose}
  zIndex="9999999999"
>
  <i
    style={{
      fontSize: "2.5rem",
      color: themeColors.comments.blue,
    }}
    class="fa fa-envelope"
    aria-hidden="true"
  ></i>
  <Divider
    style={{ margin: "10px 0", borderColor: themeColors.comments.blue }}
  />
  {!!messageModal?.title && (
    <h6
      // style={{ margin: "10px 20px", fontSize: "0.9rem" }}
      className="modal--title"
    >
      {" "}
      {messageModal?.title}
    </h6>
  )}
  <p className="modal--text">{messageModal?.describe}</p>
  <Button
    backgroundColor={themeColors.comments.blue}
    onClick={handleClose}
  >
    بستن
  </Button>
</Modal> */}
