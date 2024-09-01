import { useHistory } from "react-router-dom";
import { Button, MessageModal } from "../components";
import { useDispatch } from "react-redux";
import {
  getGUID,
  getAlternativeToken,
} from "../state/action-creators/index.js";
import { endpoints } from "../services/endpoints";
import { kStringMaxLength } from "buffer";

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const login = (event) => {
    event?.preventDefault();
    // dispatch(getGUID('8A7CA14C-97C0-4149-824C-3390201EEEE9'))
    // kish-lab= 0d344746-cb37-41d0-8eca-16a47519e195
    // kish-ntsw= A876FCA6-13A4-47F8-8B21-D24AD699A76E
    // 312514e3-c33f-4f13-b7b0-28e46cd66306  بازرگان
    // --> barazgan-haghighi 84be1ba9-9bff-4f3d-9818-7fb5770cb38e

    dispatch(getGUID("-1"));
    dispatch(getAlternativeToken("84be1ba9-9bff-4f3d-9818-7fb5770cb38e"));
    setTimeout(() => {
      history.push("/Users/AC/Commercial/ExternalTradeFileManagement");
    }, 500);
  };

  return (
    <>
      <MessageModal />
      <div className="login-page">
        <form>
          <div className="login-btn">
            <Button variant="contained" onClick={login} width="200px">
              ورود
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
