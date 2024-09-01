const reducer = (state = {
  disabledStepsList: [],
  // مدیریت اظهارنامه واردات جدید
  ImD: 0,
  // مدیریت اظهارنامه صادرات جدید
  NETDM: 0,
  // اظهارنامه ترانزیت
  NTD: 0,
  // اظهارنامه ورود موقت
  TEnD: 0,
  // اظهارنامه خروج موقت
  TExD: 0,
  // اظهارنامه مرجوعی
  RD: 0,
  // مدیریت ثبت سفارش
  NEF:0,
  // عملیات گواهی بازرسی
  ICO:0,

}, action) => {

  switch (action.type) {
    case "stepsOfCreatePage":
      return {
        disabledStepsList: action.payload?.disabledStepsList === undefined ? state.disabledStepsList : action.payload?.disabledStepsList,
        hasAccessToImD: action.payload?.hasAccessToImD === undefined ? false : true,
        hasAccessToStep: action.payload?.hasAccessToStep === undefined ? false : true,
        ImD: action.payload?.ImD === undefined ? state.ImD : action.payload?.ImD,
        NETDM: action.payload?.NETDM === undefined ? state.NETDM : action.payload?.NETDM,
        NTD: action.payload?.NTD === undefined ? state.NTD : action.payload?.NTD,
        TEnD: action.payload?.TEnD === undefined ? state.TEnD : action.payload?.TEnD,
        TExD: action.payload?.TExD === undefined ? state.TExD : action.payload?.TExD,
        RD: action.payload?.RD === undefined ? state.RD : action.payload?.RD,
        NEF: action.payload?.NEF === undefined ? state.NEF : action.payload?.NEF,
        ICO: action.payload?.ICO === undefined ? state.ICO : action.payload?.ICO,
      };
    default:
      return state
  }
}

export default reducer;
