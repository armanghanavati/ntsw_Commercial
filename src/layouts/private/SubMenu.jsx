import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import themeColors from "../../configs/theme";
import { endpoints } from "../../services/endpoints";
import useFitText from "use-fit-text";
import axios from "axios";

const SubMenu = ({
  listOfParantActionCodesForOpendItem,
  item,
  items,
  depth,
}) => {
  const { fontSize, ref } = useFitText({ minFontSize: 65, maxFontSize: 100 });
  const { sidebar, theme, GUid, role } = useSelector((state) => state);
  const [depth2, setDepth2] = useState(false);
  const [subnav, setSubnav] = useState(false);
  const [selectedNav, setSelectedNav] = useState([]);
  const [showWithHover, setShowWithHover] = useState(false);
  const [subnavBg, setSubnavBg] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [jumRedirectUrl, setJumRedirectUrl] = useState("");
  const [redirectUrlSamane, setRedirectUrlSamane] = useState("");
  const [redirectEnerjiUrlSamane, setRedirectEnerjiUrlSamane] = useState("");
  const history = useHistory();
  function showSubnav(ActionCode) {
    sidebar && depth !== 0 && setSubnav(!subnav);
    sidebar === false && setSubnav(!subnav);
  }


  function getRedirec() {
    items.map((item) =>
      item.actionName === "مدیریت رتبه بندی" ? history.push(redirectUrl) : "no"
    );
  }
  useEffect(() => {
    const temp = items?.filter((x) => x.parentActionCode === item.actionCode);
    setSelectedNav(temp);
    setDepth2(depth + 1);
  }, [items]);

  useEffect(() => {
    setSubnav(false);
    if (listOfParantActionCodesForOpendItem?.includes(item?.actionCode)) {
      showSubnav();
    }
    setShowWithHover(false);
  }, [sidebar]);

  useEffect(() => {
    depth === 0 && setSubnavBg(themeColors[theme]?.boxBg);
    depth !== 0 && setSubnavBg(themeColors[theme]?.submenuBg);
  }, [theme]);

  const NTSW_GetRankingLoginURL = () => {
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    axios({
      url: endpoints.RestAPIs.user.NTSW_GetRankingLoginURL.url,
      method: endpoints.RestAPIs.user.NTSW_GetRankingLoginURL.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          setRedirectUrl(res?.data?.RankingURL);
        }
      })
      .catch((err) => {
        // dispatch(handleLoading(false));
        console.log("err");
      });
  };

  const NTSW_Sysytem124Login = () => {
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    axios({
      url: endpoints.RestAPIs.user.NTSW_Sysytem124Login.url,
      method: endpoints.RestAPIs.user.NTSW_Sysytem124Login.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          setRedirectUrlSamane(res?.data?.URL);
        }
      })
      .catch((err) => {
        // dispatch(handleLoading(false));
        console.log("err");
      });
  };

  const NTSW_EnergyInquiry = () => {
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    axios({
      url: endpoints.RestAPIs.user.NTSW_Sysytem124Login.url,
      method: endpoints.RestAPIs.user.NTSW_Sysytem124Login.method,
      data: postData,
    })
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          // console.log(res, "ressssssssssssssss");
          setRedirectEnerjiUrlSamane(res?.data?.URL);
        }
      })
      .catch((err) => {
        // dispatch(handleLoading(false));
        console.log("err");
      });
  };

  // useEffect(() => {
  //   NTSW_GetRankingLoginURL();
  // }, []);
  // useEffect(() => {
  //   NTSW_Sysytem124Login();
  // }, []);
  // useEffect(() => {
  //   NTSW_EnergyInquiry();
  // }, []);

  return (
    <>
      {sidebar ? (
        <li
          className={`closedSidebar--item-${depth}`}
          onMouseEnter={() => setShowWithHover(true)}
          onMouseLeave={() => setTimeout(setShowWithHover(false), 200)}
          key={`submenu-${depth}-${item?.actionCode}`}
        >
          <span className={`closedSidebar--item-${depth}--icon1`}>
            {" "}
            <i
              style={{
                color: themeColors[theme]?.text,
              }}
              className={item.icon}
              aria-hidden="true"
            ></i>
          </span>
          {(showWithHover || depth !== 0) && (
            <>
              {item.url === "#" ||
                item.url === null ||
                item.url.includes("Base/") ? (
                <Link
                  className={`closedSidebar--item-${depth}--all `}
                  to={
                    item.url !== "#" && item.url !== null
                      ? item.url.includes("Base/")
                        ? `/Users/${item.url}`
                        : null
                      : null
                  }
                  onClick={
                    items &&
                    (() => {
                      // if (item.url !== '#' && item.url !== null) {
                      //   !(item.url.includes("AC/")) && item.url.includes("/Users/") && window.location.replace(`${endpoints.BaseUrlAddress}${item.url}`)
                      //   !(item.url.includes("AC/")) && !(item.url.includes("/Users/")) && window.location.replace(`${endpoints.BaseUrlAddress}/Users/${item.url}`)
                      // }
                      showSubnav();
                      getRedirec();
                    })
                  }
                  style={{
                    backgroundColor: subnavBg,
                    color: themeColors[theme]?.text,
                  }}
                >
                  <p
                    title={item.actionName}
                    className={`closedSidebar--item-${depth}--title`}
                  >
                    {item.actionName}
                  </p>
                  <>
                    {selectedNav?.length > 0 && subnav && depth !== 0 ? (
                      <span className={`closedSidebar--item-${depth}--icon2`}>
                        <i
                          style={{
                            color: themeColors[theme]?.text,
                          }}
                          className="fa fa-angle-down"
                          aria-hidden="true"
                        ></i>
                      </span>
                    ) : selectedNav?.length > 0 && depth !== 0 ? (
                      <span className={`closedSidebar--item-${depth}--icon2`}>
                        <i
                          style={{
                            color: themeColors[theme]?.text,
                          }}
                          className="fa fa-angle-left"
                          aria-hidden="true"
                        ></i>
                      </span>
                    ) : null}
                  </>
                </Link>
              ) : (
                <a
                  className={`closedSidebar--item-${depth}--all `}
                  href={
                    !item.url.includes("Base/") && item.url.includes("/Users/")
                      ? `${endpoints.BaseUrlAddress}${item.url}`
                      : `${endpoints.BaseUrlAddress}/Users/${item.url}`
                  }
                  onClick={
                    items &&
                    (() => {
                      showSubnav();
                    })
                  }
                  style={{
                    backgroundColor: subnavBg,
                    color: themeColors[theme]?.text,
                  }}
                >
                  <p
                    title={item.actionName}
                    className={`closedSidebar--item-${depth}--title`}
                  >
                    {item.actionName}
                  </p>
                  <>
                    {selectedNav?.length > 0 && subnav && depth !== 0 ? (
                      <span className={`closedSidebar--item-${depth}--icon2`}>
                        <i
                          style={{
                            color: themeColors[theme]?.text,
                          }}
                          className="fa fa-angle-down"
                          aria-hidden="true"
                        ></i>
                      </span>
                    ) : selectedNav?.length > 0 && depth !== 0 ? (
                      <span className={`closedSidebar--item-${depth}--icon2`}>
                        <i
                          style={{
                            color: themeColors[theme]?.text,
                          }}
                          className="fa fa-angle-left"
                          aria-hidden="true"
                        ></i>
                      </span>
                    ) : null}
                  </>
                </a>
              )}
            </>
          )}
          {((showWithHover && depth === 0) || subnav) && (
            <ul
              style={{
                backgroundColor: themeColors[theme]?.submenuBg,
                color: themeColors[theme]?.text,
              }}
              className={`closedSidebar--item-${depth}--submenue`}
            >
              {selectedNav?.map((item, index) => {
                return (
                  <SubMenu
                    item={item}
                    items={items}
                    depth={depth2}
                    key={`submenu0-${depth}-${index}`}
                  />
                );
              })}
            </ul>
          )}
        </li>
      ) : (
        <li
          className={`sidebar--item-${depth}`}
          key={`submenu-${depth}-${item?.actionCode}`}
        >
          {item.url === "#" ||
            item.url === null ||
            item.url.includes("Base/") ? (
            <Link
              className={
                listOfParantActionCodesForOpendItem?.includes(
                  item?.actionCode
                ) && depth === 1
                  ? `sidebar--item-${depth}--all sidebar--item-${depth}--all--focused`
                  : `sidebar--item-${depth}--all`
              }
              to={
                item.url !== "#" && item.url !== null
                  ? item.url.includes("Base/")
                    ? `/Users/${item.url}`
                    : null
                  : null
              }
              onClick={
                items &&
                (() => {
                  showSubnav(item.actionCode);
                })
              }
            >
              <span className={` sidebar--item-${depth}--icon1`}>
                {" "}
                <i
                  style={{
                    color: themeColors[theme]?.text,
                  }}
                  className={item.icon}
                  aria-hidden="true"
                ></i>
              </span>
              <p
                title={item.actionName}
                style={
                  depth === 1
                    ? {
                      color: themeColors[theme]?.text,
                      fontSize,
                      width: "210px",
                      height: 40,
                    }
                    : {
                      color: themeColors[theme]?.text,
                    }
                }
                ref={depth === 1 ? ref : null}
                className={`sidebar--item-${depth}--title`}
              >
                {item.actionName}
              </p>
              <>
                {selectedNav.length > 0 && subnav ? (
                  <span className={`sidebar--item-${depth}--icon2`}>
                    <i
                      style={{
                        color: themeColors[theme]?.text,
                      }}
                      className="fa fa-angle-down"
                      aria-hidden="true"
                    ></i>
                  </span>
                ) : selectedNav.length > 0 ? (
                  <span className={`sidebar--item-${depth}--icon2`}>
                    <i
                      style={{
                        color: themeColors[theme]?.text,
                      }}
                      className="fa fa-angle-left"
                      aria-hidden="true"
                    ></i>
                  </span>
                ) : null}
              </>
            </Link>
          ) : (
            <a
              className={
                listOfParantActionCodesForOpendItem?.includes(
                  item?.actionCode
                  // console.log(item?.actionCode, "item?.actionCode")
                ) && depth === 1
                  ? `sidebar--item-${depth}--all sidebar--item-${depth}--all--focused`
                  : `sidebar--item-${depth}--all`
              }
              href={
                !item.url.includes("Base/") && item.url.includes("/Users/")
                  ? `${endpoints.BaseUrlAddress}${item.url}`
                  : !item.url.includes("Base/") &&
                    item.actionName === "مدیریت رتبه بندی"
                    ? item.url.replace(redirectUrl)
                    : !item.url.includes("Base/") &&
                      item.actionName === "خود اظهاری برق"
                      ? item.url.replace(redirectUrlSamane)
                      : `${endpoints.BaseUrlAddress}/Users/${item.url}`
                // redirectUrlSamane
              }
              onClick={
                items &&
                (() => {
                  showSubnav(item.actionCode);
                  // getRedirec();
                })
              }
            >
              <span className={` sidebar--item-${depth}--icon1`}>
                <i
                  style={{
                    color: themeColors[theme]?.text,
                  }}
                  className={item.icon}
                  aria-hidden="true"
                ></i>
              </span>
              <p
                title={item.actionName}
                style={
                  depth === 1
                    ? {
                      color: themeColors[theme]?.text,
                      fontSize,
                      width: "210px",
                      height: 40,
                    }
                    : {
                      color: themeColors[theme]?.text,
                    }
                }
                ref={depth === 1 ? ref : null}
                className={`sidebar--item-${depth}--title`}
              >
                {item.actionName}
              </p>
              <>
                {selectedNav.length > 0 && subnav ? (
                  <span className={`sidebar--item-${depth}--icon2`}>
                    <i
                      style={{
                        color: themeColors[theme]?.text,
                      }}
                      className="fa fa-angle-down"
                      aria-hidden="true"
                    ></i>
                  </span>
                ) : selectedNav.length > 0 ? (
                  <span className={`sidebar--item-${depth}--icon2`}>
                    <i
                      style={{
                        color: themeColors[theme]?.text,
                      }}
                      className="fa fa-angle-left"
                      aria-hidden="true"
                    ></i>
                  </span>
                ) : null}
              </>
            </a>
          )}
          {subnav && (
            <ul className={`sidebar--item-${depth}--submenue`}>
              {selectedNav.map((item, index) => {
                return (
                  <SubMenu
                    listOfParantActionCodesForOpendItem={
                      listOfParantActionCodesForOpendItem
                    }
                    item={item}
                    items={items}
                    depth={depth2}
                    key={`submenu0-${depth}-${index}`}
                  />
                );
              })}
            </ul>
          )}
        </li>
      )}
    </>
  );
};

export default SubMenu;
