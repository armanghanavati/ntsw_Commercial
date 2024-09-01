import React, { useEffect, useState } from "react";
import moment from "jalali-moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../services/endpoints";
import { useSelector, useDispatch } from "react-redux";
import {
  getGUID,
  changeTheme,
  changeRole,
  handleSidebar,
  getAlternativeToken,
  changeColorMode,
  getJWT,
} from "../../state/action-creators";
import { Divider, Modal, Tooltip } from "antd";
import { Switch } from "antd";
import themeColors from "../../configs/theme";
import { Button } from "../../components";

import img1 from "./../../assets/images/logoWhite.png";
import img2 from "./../../assets/images/note.png";
import img3 from "./../../assets/images/download.png";
import icon1 from "./../../assets/images/Moon.png";
import icon2 from "./../../assets/images/Sun.png";

const date = new Date();
const day = [
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];
const month = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const gDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
const currentJalaliDate = `${day[date.getDay()]} ${moment(gDate)
  .jDate()
  .toLocaleString("ar-EG", { useGrouping: false })} ${
  month[moment(gDate).jMonth()]
} ${moment(gDate).jWeekYear().toLocaleString("ar-EG", { useGrouping: false })}`;

const Navbar = () => {
  const [clientName, setClientName] = useState();
  const [clientEmail, setClientEmail] = useState();
  const [clientPic, setClientPic] = useState();

  const [lightTheme, setLightTheme] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { theme, sidebar, alternativeToken, colorMode } = useSelector(
    (state) => state
  );
  const [showChangeColorModeDisplay, setShowChangeColorModeDisplay] =
    useState(false);

  const dispatch = useDispatch();

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const clickOnThemeButton = () => {
    setLightTheme(!lightTheme);
    if (lightTheme) {
      dispatch(changeTheme("dark"));
    } else {
      dispatch(changeTheme("light"));
    }
  };

  const logOut = () => {
    const postData = {
      token: alternativeToken,
    };
    axios({
      url: endpoints.RestAPIs.user.logout.url,
      method: endpoints.RestAPIs.user.logout.method,
      data: postData,
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserProfiles = () => {
    const postData = {
      token: alternativeToken,
    };
    axios({
      url: endpoints.RestAPIs.user.getUserProfiles.url,
      method: endpoints.RestAPIs.user.getUserProfiles.method,
      data: postData,
    })
      .then((res) => {
        setClientName(
          `${res?.data?.Result?.firstName} ${res?.data?.Result?.lastName}`
        );
        setClientEmail(res?.data?.Result?.email);
        setClientPic(res?.data?.Result?.picture);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
      });
  };

  const exitNTSW = (event) => {
    event?.preventDefault();
    logOut();
    dispatch(getGUID(null));
    dispatch(getAlternativeToken(null));
    dispatch(getJWT(null));
    dispatch(changeRole(null));
    localStorage.removeItem("roleCode");
    window.location.replace(`${endpoints.BaseUrlAddress}`);
  };

  const handelChangeColorMode = (event, color) => {
    event.preventDefault();
    dispatch(changeColorMode(color));
  };

  const sidebarToggleButton = () => {
    dispatch(handleSidebar(!sidebar));
  };

  useEffect(() => {
    getUserProfiles();
    theme === "light" && setLightTheme(true);
    windowSize.innerWidth < "900" && dispatch(handleSidebar(true));
  }, []);

  return (
    <>
      <nav
        className="header"
        style={{
          backgroundColor: colorMode || "#024158 ",
        }}
      >
        <ul className="header__first-child">
          <li className="header__first-child--logo">
            <img src={img1} alt="لوگو سامانه جامع تجارت" />
          </li>
          <li onClick={() => sidebarToggleButton()}>
            <i
              className="fa fa-bars"
              aria-hidden="true"
              style={{ fontSize: "1.25rem" }}
            ></i>
          </li>
          <li>{currentJalaliDate}</li>
          <li>
            <Switch
              checkedChildren={
                <img src={icon2} className="sun-icon" alt="sun icon" />
              }
              unCheckedChildren={<img src={icon1} alt="moon icon" />}
              onChange={() => clickOnThemeButton()}
              className="header__first-child--switch"
              defaultChecked={lightTheme}
            />
          </li>
        </ul>
        <ul className="header__second-child">
          {console.log(endpoints.BaseUrlAddress, "ndpoints.BaseUrlAddress")}
          <li className="header__second-child-1">
            <Link to={"/Users/AC/ProfileSetting"} target="_blank">
              <span
                style={{
                  marginLeft: "5px",
                }}
              >
                <i
                  className="icon fa fa-cogs"
                  style={{
                    display: "inline-block",
                    fontSize: "1.25rem",
                    lineHeight: " 32px",
                  }}
                ></i>
              </span>
              <span className="header__second-child--text">
                مدیریت حساب کاربری
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "https://help.ntsw.ir/TejaratNtsw" }}
              target="_blank"
              className="header__second-child--1"
            >
              <span>
                <img src={img2} alt="ثبت و پیگیری مشکل" />
              </span>
              <span className="header__second-child--text">
                ثبت و پیگیری مشکل
              </span>
            </Link>
          </li>

          <li
            className="header__second-child--2"
            onClick={(event) => {
              event?.preventDefault();
              setShowChangeColorModeDisplay(true);
            }}
          >
            <span>
              <img
                src={!!clientPic ? `data:image/png;base64,${clientPic}` : img3}
                alt="حساب کاربری"
              />
            </span>
            <span className="header__second-child--text">{clientName}</span>
            {showChangeColorModeDisplay && (
              <span
                className="header__second-child--2--drop-down"
                style={{
                  backgroundColor: themeColors[theme]?.inputBg,
                }}
                onMouseLeave={() =>
                  setTimeout(setShowChangeColorModeDisplay(false), 500)
                }
                onMouseEnter={() => setShowChangeColorModeDisplay(true)}
              >
                {clientEmail}
                <Divider style={{ margin: "0px" }} />
                <img
                  src={
                    !!clientPic ? `data:image/png;base64,${clientPic}` : img3
                  }
                  alt="حساب کاربری"
                  className="header__second-child--2--drop-down--img"
                />
                <span
                  onClick={(event) => {
                    event.preventDefault();
                    const win = window.open(
                      `${endpoints.BaseUrlAddress}/Users/AccountManage.aspx`,
                      "_blank"
                    );
                    win.focus();
                  }}
                  target="_blank"
                  className="header__second-child--2--drop-down--img--link"
                >
                  تصویر پرسنلی
                </span>

                <ul className="header__second-child--2--drop-down--colors">
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#474544");
                    }}
                    style={{ backgroundColor: "#474544" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#001940");
                    }}
                    style={{ backgroundColor: "#001940" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#5DB2FF");
                    }}
                    style={{ backgroundColor: "#5DB2FF" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#2dc3e8");
                    }}
                    style={{ backgroundColor: "#2dc3e8" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#03B3B2");
                    }}
                    style={{ backgroundColor: "#03B3B2" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#53a93f");
                    }}
                    style={{ backgroundColor: "#53a93f" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#FF8F32");
                    }}
                    style={{ backgroundColor: "#FF8F32" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#cc324b");
                    }}
                    style={{ backgroundColor: "#cc324b" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#AC193D");
                    }}
                    style={{ backgroundColor: "#AC193D" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#8C0095");
                    }}
                    style={{ backgroundColor: "#8C0095" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#0072C6");
                    }}
                    style={{ backgroundColor: "#0072C6" }}
                  ></li>
                  <li
                    onClick={(event) => {
                      handelChangeColorMode(event, "#585858");
                    }}
                    style={{ backgroundColor: "#585858" }}
                  ></li>
                </ul>
              </span>
            )}
          </li>

          <li>
            <span className="circle">
              <i
                className="fa fa-envelope"
                aria-hidden="true"
                style={{
                  fontSize: "1.25rem",
                  position: "absolute",
                  top: "2px",
                  left: "3px",
                }}
              ></i>
            </span>
          </li>
          <li onClick={() => setModalOpen(true)}>
            <Tooltip placement="bottomLeft" title={<span>خروج</span>}>
              <span>
                <i
                  className="fa fa-power-off"
                  aria-hidden="true"
                  style={{ fontSize: "1.25rem" }}
                ></i>
              </span>
            </Tooltip>
          </li>
        </ul>
      </nav>
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        width={300}
        open={modalOpen}
        title="خروج از سیستم"
        onCancel={() => setModalOpen(false)}
        footer={[
          <div
            className="colorFooter"
            style={{
              width: "100%",
              fontSize: "12px",
              justifyContent: "flex-end",
            }}
          >
            <Button backgroundColor={themeColors.btn.danger} onClick={exitNTSW}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              خروج
            </Button>
            <Button
              backgroundColor={themeColors.btn.content}
              onClick={() => setModalOpen(false)}
            >
              انصراف
            </Button>
          </div>,
        ]}
      >
        <span
          className="flex-order-row-justify-start"
          style={{ gap: "10px", paddingRight: "10px" }}
        >
          <i
            className="fa fa-question-circle"
            aria-hidden="true"
            style={{ color: themeColors.btn.danger }}
          ></i>
          {"  "}
          <p className="count-down--modal__title" style={{ fontSize: "12px" }}>
            آیا قصد دارید از سیستم خارج شوید؟
          </p>
        </span>
      </Modal>
    </>
  );
};

export default Navbar;
