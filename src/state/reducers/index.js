import { combineReducers } from "redux";
import roleReducer from "./roleReducer";
import GUIDReducer from "./getGUID";
import sidebar from "./sidebar";
import theme from "./changeTheme";
import loading from "./loading";
import messageModal from "./messageModal";
import questionModal from "./questionModal";
import stepsOfCreatePage from "./stepsOfCreatePage";
import alternativeToken from "./alternativeToken";
import colorMode from "./colorMode";
import JWT from "./JWT";
import isCertificateRequiredList from "./isCertificateRequiredList";
import mainUser from "./mainUser";
import personType from "./personType";
import nationalId from "./nationalId";
import refreshRole from "./refreshRole";
import { PageSizeReducer } from "./pageSize";
import detail from "./detail";
import detailExternal from "./DetailExternal/detailExternal";
import statusTny from "./DetailExternal/statusTny";
import infoExtTab from "./DetailExternal/infoExtTab";
import editGoods from "./editGoods";
import continueFileRegistration from "./ContinueFileRegistration";
import detailId from "./detailId";
import printInfo from "./printInfo";
// import { HandlecontinueFileRegistration } from "../action-creators";
import importCodeInt from "./importCodeInt";

const reducers = combineReducers({
  importCodeInt: importCodeInt,
  pageSize: PageSizeReducer,
  role: roleReducer,
  mainId: mainUser,
  nationalId: nationalId,
  JWT: JWT,
  GUid: GUIDReducer,
  alternativeToken: alternativeToken,
  sidebar: sidebar,
  theme: theme,
  colorMode: colorMode,
  loading: loading,
  messageModal: messageModal,
  questionModal: questionModal,
  stepsOfCreatePage: stepsOfCreatePage,
  isCertificateRequiredList: isCertificateRequiredList,
  personType: personType,
  refreshRole: refreshRole,
  detail: detail,
  detailExternal: detailExternal,
  statusTny: statusTny,
  infoExtTab: infoExtTab,
  editGoods: editGoods,
  continueFileRegistration: continueFileRegistration,
  detailId: detailId,
  printInfo: printInfo,
});

export default reducers;
