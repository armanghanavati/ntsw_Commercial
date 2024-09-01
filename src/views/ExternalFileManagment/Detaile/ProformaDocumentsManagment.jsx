import { Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../../components';
import { getExtentionType } from '../../../configs/helpers/get-extension-type';
import { endpoints } from '../../../services/endpoints';
import { handleMessageModal } from '../../../state/action-creators';

const ProformaDocumentsManagment = () => {
  const dispatch = useDispatch()
  const { search, pathname } = useLocation()
  const { GUid, role } = useSelector((state) => state)
  const [doucuments, setDoucuments] = useState([])

  const downloadFile = ({ DOC, Caption, Format }) => {
    const raw = window.atob(DOC);
    const rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    const file = new Blob([array], {
      type: getExtentionType(`.${Format.toLowerCase()}`),
    });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  // -> تنظیم دکمه مشاهده مستندات
  const handleShowDoc = () => {
    try {
      const postData = {
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        PrfVcodeInt: localStorage.getItem("fileNumbExt")
      }

      axios({
        url: endpoints.RestAPIs.Proforma.showProformaDocument.url,
        method: endpoints.RestAPIs.Proforma.showProformaDocument.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.Error === 0) {
          setDoucuments(res?.data?.DOCs)
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShowDoc()
  }, [])

  const test = "arman/png"
  const fixImage = test.split(".")[0];

  const allDoc = doucuments.map((doc) => {

    return (
      <img className="showDocs" onClick={() => downloadFile({ DOC: doc.DOC, Caption: doc.Caption, Format: doc.Format })} src={`data:${doc.Caption};base64, ${doc.DOC}`} />
    )
  })

  return (
    <>
      <Link to={`/Users/AC/Commercial/ExternalTradeFileManagementDetail?_k=v9ifuf&__key=${localStorage.getItem("fileNumbExt")}`} >
        <Button >
          <i className='fa fa-step-forward' />
          صفحه قبل
        </Button>
      </Link>
      <div style={{ display: "flex" }}>
        {allDoc}
      </div>
    </>
  )
}

export default ProformaDocumentsManagment;





