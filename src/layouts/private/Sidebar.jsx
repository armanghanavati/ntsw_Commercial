import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { endpoints } from "../../services/endpoints";
import { useSelector, useDispatch } from "react-redux";
import {
  handleLoading,
  handleIsCertificateRequiredList,
} from "../../state/action-creators";
import axios from "axios";
import { Layout } from "antd";
import SubMenu from "./SubMenu";
import themeColors from "../../configs/theme.js";
import { memo } from "react";

const { Sider } = Layout;

const Sidebar = ({ children }) => {
  const { sidebar, theme, alternativeToken, GUid, role } = useSelector(
    (state) => state
  );
  const [userMenu, setUserMenu] = useState([]);
  const [backupUserMenu, setBackupUserMenu] = useState([]);
  const [userMenuLevel1, setUserMenuLevel1] = useState([]);
  const [userMenuLevel2, setUserMenuLevel2] = useState([]);
  const [appIsMounted, setAppIsMounted] = useState(false);
  const [openMenuList, setOpenMenuList] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [location, setLocation] = useState();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const getUserAccessList = () => {
    const postData = {
      token: alternativeToken,
    };

    dispatch(handleLoading(true));

    axios({
      url: endpoints.RestAPIs.user.getUserAccessList.url,
      method: endpoints.RestAPIs.user.getUserAccessList.method,
      data: postData,
    })
      .then((res) => {
        setUserMenu(
          (res?.data?.Result).sort(
            (a, b) => parseFloat(a.priority) - parseFloat(b.priority)
          )
        );
        setBackupUserMenu(
          res?.data?.Result.sort(
            (a, b) => parseFloat(a.priority) - parseFloat(b.priority)
          )
        );
        setUserMenuLevel1(
          res?.data?.Result?.filter(
            (x) => x.parentActionCode === 0 && x.isMenuItem === true
          ).sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority))
        );
        setUserMenuLevel2(
          res?.data?.Result?.filter(
            (x) => x.parentActionCode !== 0 && x.isMenuItem === true
          ).sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority))
        );
        dispatch(handleLoading(false));
        setHasAccess(true);

        const temp = [];
        res.data.Result.map(
          (item) => item.IsCertificateRequired && temp.push(item.actionCode)
        );
        dispatch(handleIsCertificateRequiredList(temp));
      })
      .catch((err) => {
        dispatch(handleLoading(false));
      });
  };

  useEffect(() => {
    setAppIsMounted(false);
    setUserMenu([]);
    setOpenMenuList([]);
    if (pathname.toLowerCase().includes("export")) {
      setLocation("AC/ExportDeclaration");
    } else if (pathname.toLowerCase().includes("import")) {
      setLocation("AC/ImportDeclaration");
    } else if (pathname.toLowerCase().includes("transit")) {
      setLocation("AC/TransitDeclaration");
    } else if (pathname.toLowerCase().includes("temporaryentry")) {
      setLocation("AC/TemporaryEntryDeclaration");
    } else {
      const temp = pathname.split("/");
      setLocation(`${temp[2]}/${temp[3]}`);
    }
    setTimeout(() => {
      setAppIsMounted(true);
      setUserMenu([...backupUserMenu]);
      setUserMenuLevel1(
        backupUserMenu?.filter(
          (x) => x.parentActionCode === 0 && x.isMenuItem === true
        )
      );
      setUserMenuLevel2(
        backupUserMenu?.filter(
          (x) => x.parentActionCode !== 0 && x.isMenuItem === true
        )
      );
    }, 200);
  }, [pathname]);

  useEffect(() => {
    getUserAccessList();
  }, []);

  const findParentActionCodes = (list) => {
    if (list[0]?.parentActionCode !== 0) {
      openMenuList.push(list[0]?.parentActionCode);
      const temp = userMenu?.filter(
        (x) => x?.actionCode === list[0]?.parentActionCode
      );
      findParentActionCodes(temp);
    }
  };

  useEffect(() => {
    if (appIsMounted) {
      const temp = userMenu?.filter(
        (x) => x?.url?.toUpperCase() === location?.toUpperCase()
      );
      temp.length > 0 && findParentActionCodes(temp);
    }
  }, [userMenu, location]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: themeColors[theme]?.boxBg,
        color: themeColors[theme]?.text,
      }}
    >
      {sidebar === false || sidebar === true ? (
        <Sider
          className="sidebar"
          width="219px"
          collapsed={sidebar}
          collapsedWidth="42px"
          style={{
            backgroundColor: themeColors[theme]?.boxBg,
            color: themeColors[theme]?.text,
          }}
        >
          {
            <ul className="sidebar--items">
              {userMenuLevel1?.map((item, index) => {
                const depth = 0;
                return (
                  <SubMenu
                    listOfParantActionCodesForOpendItem={openMenuList}
                    item={item}
                    items={userMenuLevel2}
                    depth={depth}
                    key={`submenu-${depth}-${item?.ActionCode}-${index}`}
                  />
                );
              })}
            </ul>
          }
        </Sider>
      ) : (
        <Sider style={{ display: "none" }}></Sider>
      )}
      <Layout
        className="layout"
        style={{
          backgroundColor: themeColors[theme]?.bg,
          color: themeColors[theme]?.text,
        }}
      >
        {children}
      </Layout>
    </Layout>
  );
};

export default memo(Sidebar);
