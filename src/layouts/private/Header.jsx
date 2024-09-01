
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from "react-router-dom";
import themeColors from '../../configs/theme.js'
import GetRoles from "./GetRoles";
import CountDown from "./CountDown";
import { Col, Row } from 'antd';
import { handleSidebar } from "../../state/action-creators/index.js";
import BreadCrumbData from "../../utils/BreadCrumbData.js";
import { useState } from "react";
import { useEffect } from "react";

const Header = ({ handleFullScreen }) => {
  const [showCountDown, setShowCountDown] = useState(true)
  const { theme, sidebar, colorMode, detailId } = useSelector(state => state);
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const [breadCrumb, setBreadCrumb] = useState([{ link: "#", name: "" }])
  const handleNavbar = () => {
    if (sidebar === true) {
      dispatch(handleSidebar('closed'))
    } else {
      dispatch(handleSidebar(true))
    }
  }
  useEffect(() => {
    setBreadCrumb(BreadCrumbData[pathname.toLocaleLowerCase()] || [{ link: "#", name: "خانه" }])
    setShowCountDown(false)
    setTimeout(() => {
      setShowCountDown(true)
    }, 200);
  }, [pathname])

  return (
    <div className="user-header">
      <Row className="user-header__row1">
        <Col sm={24} lg={12} >
          <ul className="user-header__row1--breadcrumb">
            <li className="user-header__row1--breadcrumb__icon">
              <i className="fa fa-home"></i>
            </li>
            {breadCrumb !== null &&
              breadCrumb?.map((item, index) => (
                <>
                  <li key={`breadCrumb-${index}`}>
                    {index !== 0 && index !== breadCrumb.length && (
                      <span
                        style={{
                          color: themeColors[theme]?.brdcrumbSlash,
                        }}>
                        /
                      </span>
                    )}
                    <Link
                      className="user-header__row1--breadcrumb__title"
                      to={`${item.link}`}
                      style={{
                        color: theme === 'dark' ? themeColors[theme]?.inputText : colorMode,
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                </>
              ))}
          </ul>
        </Col>
        <Col sm={24} lg={8} >
          <GetRoles />
        </Col>
      </Row>
      <ul className="user-header__row2"
        style={{
          backgroundImage: themeColors[theme]?.userHeader,
        }}
      >
        <div style={{ display: "flex" }}>
          {
            (detailId?.status > 1 && pathname !== "/Users/AC/Commercial/ExternalTradeFileManagement" && breadCrumb[breadCrumb.length - 1].name !== "جزئیات") ? "" :
              <>
                <li className="user-header__row2--right">
                  {breadCrumb[breadCrumb.length - 1].name}
                </li>
              </>
          }
          {
            (detailId?.status > 1 && pathname !== "/Users/AC/Commercial/ExternalTradeFileManagement" && breadCrumb[breadCrumb.length - 1].name !== "جزئیات") &&
            (<>
              <li className="user-header__row2--right">
                <p style={{ paddingLeft: "3px" }}>ویرایش پرونده - شماره پرونده : {detailId?.prfVCode}</p>
              </li>
            </>)
          }
        </div>
        <li className="user-header__row2--left">
          <span>
            {showCountDown && <CountDown />}
          </span>
          <span
            style={{
              color: themeColors[theme]?.icon,
            }}
            onClick={handleFullScreen.active ? handleFullScreen.exit : handleFullScreen.enter}
          >
            <i className="fa fa-arrows-alt" aria-hidden="true" ></i>
          </span>
          <span
            style={{
              color: themeColors[theme]?.icon,
            }}
            onClick={handleNavbar}
          >
            <i
              className="fa fa-arrows-h" aria-hidden="true" ></i>
          </span>
        </li>

      </ul>

    </div>
  );
};

export default Header;
