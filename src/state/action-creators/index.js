import Cookies from "js-cookie";

export const changeRole = (code) => {
  localStorage.setItem("personCode", code);
  return (dispatch) => {
    dispatch({
      type: "role",
      payload: code,
    });
  };
};

export const mainUserId = (id) => {
  return (dispatch) => {
    dispatch({
      type: "mainId",
      payload: id,
    });
  };
};

export const nationalId = (id) => {
  return (dispatch) => {
    dispatch({
      type: "nationalId",
      payload: id,
    });
  };
};

export const getPersonType = (type) => {
  return (dispatch) => {
    dispatch({
      type: "personType",
      payload: type,
    });
  };
};

export const getJWT = (id) => {
  if (id !== null) {
    Cookies.set("JWT", id);
  } else {
    Cookies.remove("JWT");
  }
  return (dispatch) => {
    dispatch({
      type: "JWT",
      payload: id,
    });
  };
};

export const getGUID = (id) => {
  if (id !== null) {
    Cookies.set("ssdssh", `ssdsshGuid=${id}`);
  } else {
    Cookies.remove("ssdssh");
  }
  return (dispatch) => {
    dispatch({
      type: "GUid",
      payload: id,
    });
  };
};

export const getAlternativeToken = (id) => {
  if (id !== null) {
    Cookies.set("AlternativeToken", id);
  } else {
    Cookies.remove("AlternativeToken");
  }
  return (dispatch) => {
    dispatch({
      type: "AlternativeToken",
      payload: id,
    });
  };
};

export const handleSidebar = (isOpen) => {
  return (dispatch) => {
    dispatch({
      type: "sidebar",
      payload: isOpen,
    });
  };
};

export const handleMessageModal = (isOpen) => {
  return (dispatch) => {
    dispatch({
      type: "messageModal",
      payload: isOpen,
    });
  };
};

export const handleEditData = (editGoods) => {
  return (dispatch) => {
    dispatch({
      type: "editGoods",
      payload: editGoods,
    });
  };
};

export const handelQuestionModal = (isOpen) => {
  return (dispatch) => {
    dispatch({
      type: "questionModal",
      payload: isOpen,
    });
  };
};

export const changeTheme = (theme) => {
  localStorage.setItem("theme", theme);
  return (dispatch) => {
    dispatch({
      type: "theme",
      payload: theme,
    });
  };
};

export const changeColorMode = (colorMode) => {
  localStorage.setItem("colorMode", colorMode);
  return (dispatch) => {
    dispatch({
      type: "colorMode",
      payload: colorMode,
    });
  };
};

export const handleLoading = (loading) => {
  return (dispatch) => {
    dispatch({
      type: "loading",
      payload: loading,
    });
  };
};

export const handleStepsOfCreatePage = (step) => {
  return (dispatch) => {
    dispatch({
      type: "stepsOfCreatePage",
      payload: step,
    });
  };
};

export const handleIsCertificateRequiredList = (list) => {
  return (dispatch) => {
    dispatch({
      type: "isCertificateRequiredList",
      payload: list,
    });
  };
};

export const handelRefreshRole = (isRefresh) => {
  return (dispatch) => {
    dispatch({
      type: "refreshRole",
      payload: isRefresh,
    });
  };
};

export const handleGetPageSize = (pageSize) => {
  return (dispatch) => {
    dispatch({
      type: "PAGE_SIZE",
      payload: pageSize,
    });
  };
};

export const handleQuestionModal = (isOpen) => {
  return (dispatch) => {
    dispatch({
      type: "questionModal",
      payload: isOpen,
    });
  };
};

export const handleDetail = (detail) => {
  return (dispatch) => {
    dispatch({
      type: "DETAIL",
      payload: detail,
    });
  };
};

export const handleDetailId = (detailId) => {
  return (dispatch) => {
    dispatch({
      type: "detailId",
      payload: detailId,
    });
  };
};

export const handlePrintInfo = (printInfo) => {
  return (dispatch) => {
    dispatch({
      type: "printInfo",
      payload: printInfo,
    });
  };
};

export const handleDetailExternal = (detailExternal) => {
  return (dispatch) => {
    dispatch({
      type: "DETAIL_EXTERNAL",
      payload: detailExternal,
    });
  };
};

export const handleStatusTny = (staTny) => {
  return (dispatch) => {
    dispatch({
      type: "STATUS_TNY",
      payload: staTny,
    });
  };
};

export const handleExtTab = (extTab) => {
  return (dispatch) => {
    dispatch({
      type: "INFO_EXT_TAB",
      payload: extTab,
    });
  };
};

export const handleExcelDate = (excelDate) => {
  return (dispatch) => {
    dispatch({
      type: "EXCEL_DATE",
      payload: excelDate,
    });
  };
};

export const handleImportCodeInt = (importCodeInt) => {
  return (dispatch) => {
    dispatch({
      type: "IPT_CODE_INT",
      payload: importCodeInt,
    });
  };
};
