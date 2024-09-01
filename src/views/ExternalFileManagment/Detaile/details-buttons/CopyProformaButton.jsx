import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import themeColors from "../../../../configs/theme";
import {
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import { Signature } from "../../../../components";
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";
import { accessList } from "../../../../enums";
import { getBase64ForSignature } from "../../../../configs/signature";

const CopyProformaButton = ({ PrfVcode, handleRefresh }) => {
  const dispatch = useDispatch();
  const { messageModal, role, GUid, isCertificateRequiredList } = useSelector(
    (state) => state
  );
  const [counter, setCounter] = useState(0);
  const [openModalPrimary, setOpenModalPrimary] = useState("");
  const [base64ForSignature, setBase64ForSignature] = useState("");


  useEffect(() => {
    if (messageModal.isModalOpen === false && openModalPrimary === "modal1") {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: "کپی پرونده با موفقیت انجام شد.",
          type: "success",
        })
      );
      setOpenModalPrimary("")
    }
  }, [messageModal])

  const copyProforma = (cert, sign) => {
    const postData = {
      DigitalSignatureAuthenticate: {
        Random: base64ForSignature,
        CmsSignature: sign,
        Certificate: cert,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      
      },
      PrfVcodeInt: PrfVcode,
    };

    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.copyProforma.url,
      method: endpoints.RestAPIs.Proforma.copyProforma.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setOpenModalPrimary("modal1")

          handleRefresh();
          dispatch(handleLoading(false));
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(handleLoading(false));
      });
  };

  const beforeSigning = () => {
    if (isCertificateRequiredList?.includes(accessList.copyProforma)) {
      getBase64ForSignature(setBase64ForSignature, counter, setCounter);
    } else {
      copyProforma();
    }
  };

  return (
    <Signature
      counter={counter}
      beforeSigning={beforeSigning}
      hasbeforeSigningFunction={true}
      base64CertificateInfo={base64ForSignature}
      backgroundColor={themeColors.btn.secondary}
      service={copyProforma}
      beSigned={isCertificateRequiredList.includes(accessList.copyProforma)}
    >
      کپی پرونده
    </Signature>
  );
};

export default CopyProformaButton;
