import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import themeColors from "../../configs/theme.js";
import { MessageModal } from "../../components";
import JumpToTopButton from "./JumpToTopButton";
import { ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";

const PrivateLayaout = ({ children }) => {
  const dispatch = useDispatch();
  const { theme, loading, colorMode } = useSelector((state) => state);

  const handle = useFullScreenHandle();

  ConfigProvider.config({
    theme: {
      primaryColor: colorMode,
      disabledColor: themeColors[theme]?.colorTextDisabled,
    },
  });

  return (
    <FullScreen handle={handle}>
      <>
        <JumpToTopButton />
        {loading === false && <MessageModal />}
        <Navbar />
        <Sidebar>
          <Header handleFullScreen={handle} />
          <section
            className="admin-layout"
            style={{
              backgroundColor: themeColors[theme]?.submenuBg,
              color: themeColors[theme]?.text,
            }}
          >
            <ConfigProvider locale={fa_IR}>{children}</ConfigProvider>
          </section>
        </Sidebar>
      </>
    </FullScreen>
  );
};

export default PrivateLayaout;
