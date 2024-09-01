import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleLoading,
  handleMessageModal,
} from "../../../state/action-creators";
import { Signature, VerticalSpace } from "../../../components";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import { accessList } from "../../../enums";
import { getBase64ForSignature } from "../../../configs/signature";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CreateNewProforma = ({ PrfVcode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { role, GUid, isCertificateRequiredList } = useSelector(
    (state) => state
  );
  const [counter, setCounter] = useState(0);
  const [base64ForSignature, setBase64ForSignature] = useState("");

  const checkSignatureForcraeteProforma = (cert, sign) => {
    try {
      dispatch(handleLoading(true));
      const postData = {
        // DigitalSignatureAuthenticate: {
        //   Random: base64ForSignature,
        //   CmsSignature: sign,
        //   Certificate: cert,
        //   urlVCodeInt: role,
        //   ssdsshGUID: GUid,
        // },
        // PrfVcodeInt: PrfVcode,
        ActionCode: 0,
        Random: base64ForSignature,
        CmsSignature: sign,
        // LoginProfile: "string",
        Certificate: cert,
        // HashAlgorithm: 0,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      };
      axios({
        url: endpoints.RestAPIs.Proforma.checkSignatureForcraeteProforma.url,
        method:
          endpoints.RestAPIs.Proforma.checkSignatureForcraeteProforma.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.ErrorCode === 0) {
          history.push("/Users/AC/Commercial/Proforma");
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      });
    } catch (error) {
      console.log(error);
      dispatch(handleLoading(false));
    }
  };

  const beforeSigning = () => {
    if (isCertificateRequiredList.includes(accessList.createProforma)) {
      getBase64ForSignature(setBase64ForSignature, counter, setCounter);
    } else {
      history?.push("/Users/AC/Commercial/Proforma");
    }
  };

  return (
    <Signature
      counter={counter}
      beforeSigning={beforeSigning}
      hasbeforeSigningFunction={true}
      base64CertificateInfo={base64ForSignature}
      // backgroundColor={themeColors.btn.secondary}
      service={checkSignatureForcraeteProforma}
      beSigned={isCertificateRequiredList.includes(accessList.createProforma)}
    >
      <i class="fa fa-plus-square" aria-hidden="true"></i>
      پرونده جدید
    </Signature>
  );
};

export default CreateNewProforma;
