import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../services/endpoints";
import {
  getAlternativeToken,
  handleLoading,
  handleMessageModal,
  changeRole,
  getGUID,
  mainUserId,
  getJWT,
  getPersonType,
  nationalId,
  handleExcelDate,
} from "../state/action-creators";
import { Loading } from "../components";
import { handleUnauthorizedAccess } from "../configs/validate-JWT";

const SecurityAccess = ({ children }) => {

  const [hasAccess, setHasAccess] = useState(false);
  const [getCookieService, setGetCookieService] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { alternativeToken, loading } = useSelector((state) => state);

  const getCookies = async () => {
    dispatch(handleLoading(true));
    axios({
      url: `${endpoints.BaseUrlAddress}/users/ac/cookie/token/get`,
      method: "get",
    })
      .then((res) => {
        if (process.env.NODE_ENV === "production") {
          dispatch(getAlternativeToken(res.data.AlternativeToken));
          dispatch(getGUID(res.data.Session));
        }
        setGetCookieService(true);
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      getCookies();
    } else {
      setGetCookieService(true);
    }
  }, []);

  const getTokenInfo = () => {
    const postData = {
      token: alternativeToken,
    };

    axios(
      {
        url: endpoints.RestAPIs.user.getTokenInfo.url,
        method: endpoints.RestAPIs.user.getTokenInfo.method,
        data: postData,
      },
      { withCredentials: true }
    )
      .then((res) => {
        if (res.data.ErrorCode === 0) {
          dispatch(changeRole(res.data?.result?.role));
          dispatch(mainUserId(res.data?.result?.mainUserId));
          dispatch(nationalId(res.data?.result?.nationalId));
          // dispatch(getJWT(res.data.customJwtToken));
          dispatch(getPersonType(res.data?.result?.personType));
          setHasAccess(true);
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.message,
            })
          );
          history.push({
            pathname: "/",
          });
          dispatch(getAlternativeToken(null));
          // dispatch(getGUID(null));
          // dispatch(getJWT(null));
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        handleUnauthorizedAccess();
        dispatch(handleLoading(false));
      });
  };

  useEffect(() => {
    if (getCookieService) {
      getTokenInfo();
    }
  }, [getCookieService]);

  return (
    <>
      {loading === true && <Loading />}
      {hasAccess && children}
    </>
  );
};

export default SecurityAccess;
