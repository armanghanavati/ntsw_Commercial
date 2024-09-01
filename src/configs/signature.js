import axios from "axios";
import { endpoints } from "../services/endpoints";
import { handleLoading, handleMessageModal } from "../state/action-creators";
import { store } from "../state/store";

export const getBase64ForSignature = (
  setBase64ForSignature,
  counter,
  setCounter
) => {
  const state = store.getState();
  store.dispatch(handleLoading(true));
  const postData = {
    urlVCodeInt: state.role,
    ssdsshGUID: state.GUid,
  };
  axios({
    url: endpoints.RestAPIs.digitalSignature.getChallenge.url,
    method: endpoints.RestAPIs.digitalSignature.getChallenge.method,
    data: postData,
  })
    .then((res) => {
      if (res?.data?.ErrorCode === 0) {
        setBase64ForSignature(res?.data?.Challenge);
        setCounter(counter + 1);
      } else {
        store.dispatch(
          handleMessageModal({
            isModalOpen: true,
            describe: res.data?.ErrorDesc,
          })
        );
      }
      store.dispatch(handleLoading(false));
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(handleLoading(false));
    });
};
