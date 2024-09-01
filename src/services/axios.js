import axios from "axios";
import { handleUnauthorizedAccess } from "../configs/validate-JWT";
import { getJWT, handleMessageModal } from "../state/action-creators";
import { store } from "./../state/store";
import { endpoints } from "./endpoints";

axios.interceptors.request.use(
  function (config) {
    const state = store.getState();
    config.headers.post = {
      "Content-Type": "application/json",
    };
    // set for all inputs guid

    // if (state.JWT != null) {
    //   config.headers.Authorization = `Bearer ${state.JWT}`;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    if (
      !!response?.data?.ErrorCode &&
      response?.data?.ErrorCode !== 0 &&
      response?.data?.ErrorCode !== 2 &&
      response?.data?.ErrorCode !== 5 &&
      response?.data?.ErrorCode !== 10 &&
      response?.data?.ErrorCode !== 11
    ) {
      store.dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe:
            response?.data?.ErrorDesc || "مشکلی در سرور به وجود آمده است.",
        })
      );
    }
    return response;
  },
  async function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      store.dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: "مشکلی در سرور به وجود آمده است.",
        })
      );
      return error;
    } else {
      return error;
    }
  }
);
