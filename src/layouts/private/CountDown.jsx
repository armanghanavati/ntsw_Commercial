import React, { useState, useEffect, useRef } from "react";
import { Divider, Modal, Statistic } from "antd";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeRole } from "../../state/action-creators";
import themeColors from "../../configs/theme";
import { Button } from "../../components";
import { endpoints } from "../../services/endpoints";
import { getTokenInfo } from "../../configs/validate-JWT";

const { Countdown } = Statistic;

const CountDown = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [counter, setCounter] = useState();
  const [appHasMounted, setAppHasMounted] = useState(false);

  const [showCountDown, setShowCountDown] = useState(false);
  const boxRef = useRef(null);
  const counterRef = useRef(null);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);
  const { pathname } = useLocation();

  const onFinish = () => {
    dispatch(changeRole(null));
    localStorage.removeItem("roleCode");
    window.location.replace(`${endpoints.BaseUrlAddress}/Login.aspx`);
  };

  const onChange = (val) => {
    if (119.95 * 1000 < val && val < 120 * 1000) {
      boxRef.current.style.backgroundColor = "#f2dede";
      boxRef.current.style.color = "#f44336";
      boxRef.current.style.border = "1px solid #f44336";
      setModalOpen(true);
    }
  };

  const resetCounter = () => {
    setCounter(Date.now() + 1800 * 1000);
    boxRef.current.style.backgroundColor = "unset";
    boxRef.current.style.color = "unset";
    boxRef.current.style.border = "1px solid #AEACAC";
    setModalOpen(false);
    setShowCountDown(false);
    setTimeout(() => {
      setShowCountDown(true);
    }, 200);
  };

  useEffect(() => {
    if (appHasMounted) {
      resetCounter();
    }
  }, [pathname, appHasMounted]);

  useEffect(() => {
    setAppHasMounted(true);
  }, []);
  return (
    <>
      {showCountDown ? (
        <div className="count-down">
          <span className="count-down--text">زمان باقیمانده </span>
          <span className="count-down--timerbox" ref={boxRef}>
            <Countdown
              format="mm:ss"
              ref={counterRef}
              value={counter}
              onChange={onChange}
              onFinish={onFinish}
            />
          </span>
        </div>
      ) : (
        <div className="count-down">
          <span className="count-down--text">زمان باقیمانده </span>
          <span className="count-down--timerbox" ref={boxRef}></span>
        </div>
      )}

      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={700}
        footer={[
          <div
            className="colorFooter"
            style={{
              width: "100%",
              fontSize: "12px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              backgroundColor={themeColors.btn.danger}
              onClick={(event) => {
                event.preventDefault();
                setModalOpen(false);
              }}
            >
              انصراف
            </Button>
            ,
            <Button
              backgroundColor={themeColors.btn.secondary}
              onClick={(event) => {
                event.preventDefault();
                // window.location.reload(false);
                getTokenInfo();
                resetCounter();
              }}
            >
              به روز رسانی
            </Button>
          </div>,
        ]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-exclamation-triangle-fill"
          viewBox="0 0 16 16"
          style={{ color: themeColors.btn.warning }}
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <Divider style={{ margin: "10px 0" }} />
        <p className="count-down--modal__title">
          کاربر گرامی زمان نشست شما در سامانه رو به اتمام است.
        </p>
        <Countdown
          className="count-down--modal"
          format="mm:ss"
          value={counter}
        />
        <p className="count-down--modal__content">
          جهت تمدید نشست خود گزینه به‌روزرسانی را انتخاب کنید و در غیر این صورت
          از گزینه انصراف استفاده نمایید.{" "}
        </p>
      </Modal>
    </>
  );
};

export default CountDown;
