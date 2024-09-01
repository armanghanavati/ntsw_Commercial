import axios from "axios";
import Cookies from "js-cookie";
import { endpoints } from "../services/endpoints";
import {
  changeRole,
  getAlternativeToken,
  getGUID,
  getJWT,
  mainUserId,
  handleLoading,
  handleMessageModal,
  handleStepsOfCreatePage,
  getPersonType,
} from "../state/action-creators";
import { store } from "../state/store";

export const handleUnauthorizedAccess = (description) => {
  store.dispatch(
    handleMessageModal({
      isModalOpen: true,
      describe:
        description ||
        "کاربر گرامی، نشست شما در سامانه منقضی شده است. لطفا مجدد وارد شوید.",
    })
  );
  store.dispatch(getAlternativeToken(null));
  store.dispatch(getGUID(null))
  store.dispatch(getJWT(null))
  if (process.env.NODE_ENV === "production") {
    window.location.replace(`${endpoints.BaseUrlAddress}`);
  } else {
    window.location = "/";
  }
};

export const getTokenInfo = async () => {
  const state = store.getState();
  store.dispatch(handleLoading(true));
  const postData = {
    token: state.alternativeToken,
  };
  await axios({
    url: endpoints.RestAPIs.user.getTokenInfo.url,
    method: endpoints.RestAPIs.user.getTokenInfo.method,
    data: postData,
  })
    .then((res) => {
      if (res.data.errorCode === 0) {
        store.dispatch(changeRole(res.data?.result?.role));
        store.dispatch(getJWT(res.data?.result?.customJwtToken));
        store.dispatch(mainUserId(res.data?.result?.mainUserId));
        store.dispatch(getPersonType(res.data?.result?.personType));
      } else {
        handleUnauthorizedAccess(res.data.message);
      }
      store.dispatch(handleLoading(false));
    })
    .catch((err) => {
      console.log(err);
      handleUnauthorizedAccess();
      store.dispatch(handleLoading(false));
    });
};
