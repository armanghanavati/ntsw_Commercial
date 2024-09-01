import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Modal, Row, Steps, Table, Tooltip } from "antd";
import themeColors from "../../../configs/theme";
import {
  handelQuestionModal,
  handleLoading,
  handleMessageModal,
  handlePrintInfo
} from "../../../state/action-creators";
import { Button, ComboBox, Input, QuickGuide, VerticalSpace } from "../../../components";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import { getExtentionType } from "../../../configs/helpers/get-extension-type";
import Validation from "../../../utils/Validation";
import { useHistory } from "react-router-dom";
import RemoveProformaButton from "./details-buttons/RemoveProformaButton";
import CopyProformaButton from "./details-buttons/CopyProformaButton";
import { Link, useLocation } from 'react-router-dom'
import RemoveProformaForStatisticalRegistraion from "./details-buttons/RemoveProformaForStatisticalRegistraion";
import DocumentsShow from "../Create/Step4/DocumentsShow";
import PrintInfo from "./details-buttons/PrintInfo";

const ETFMDetaileButtons = ({
  detailExternal,
  getCommodityTab,
  getRegedOrderDetail,
  detailId,
  editHSProduct,
  setDetailExternal,
  personalInfo,
  permitDetailList,
  proformaReportInfo,
  setProformaReportInfo,
  setPersonalInfo,
  setPermitDetailList

}) => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const { role, GUid, theme, messageModal, colorMode, importCodeInt, printInfo } = useSelector((state) => state);
  const status = detailExternal.prfStatusTny;
  const activeStatus = detailExternal.prfActiveStatusTny;
  const subStatus = detailExternal.prfSubStatusInt;
  const subActiveStatus = detailExternal.prfSubActiveStatus;
  const [handleMessage, setHandleMessage] = useState();
  const [filters, setFilters] = useState({});
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState({});
  const [proformaDocuments, setProformaDocuments] = useState([]);
  const [enabled, setEnabled] = useState(false);

  const [showOrderPriority, setShowOrderPriority] = useState(false);
  const [showCancellationOfRenewal, setShowCancellationOfRenewal] = useState(false);
  const AccessDocuments = [
    { id: 1, name: "خیلی محدود" },
    { id: 2, name: "محدود" },
    { id: 3, name: "متوسط" },
    { id: 4, name: "کامل" },
  ];
  const [
    orderPriorityInquiryTableParams,
    setOrderPriorityInquiryTableParams,
  ] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });



  const handleRefresh = () => {
    getCommodityTab();
    getRegedOrderDetail();
  };

  const EditFilled = (event) => {
    event?.preventDefault();
    dispatch(
      handleMessageModal({
        type: "warning",
        isModalOpen: true,
        describe:
          "در صورتی که هر یک از فیلدهایی که توسط سازمان مجوز دهنده مهم اعلام شده اند، ویرایش شوند، پرونده نیاز به مجوز جدید از سازمان مربوطه خواهد داشت. برای مشاهده فیلدهای مهم پرونده به کاربرگ مدیریت مجوزها مراجعه شود",
      })
    );
    setHandleMessage("FORWARD_EDIT");
  };

  const handleChangeInputs = (name, value, validationNameList = undefined) => {
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1]));
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });
    setFilters((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
    setDetailExternal((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };

  const handleValidation = (inputsName = []) => {
    const err = { ...errors };
    inputsName.map((item) => {
      if (
        filters[item] === undefined ||
        filters[item] === null ||
        JSON.stringify(filters[item])?.trim() === ""
      ) {
        err[item] = ["پرکردن این فیلد الزامی است"];
      }
    });
    setErrors(err);
    return err;
  };

  const permitForSkip = (inputsName = []) => {
    const error = handleValidation(inputsName);
    for (var key in error) {
      if (error[key]?.length > 0) {
        if (inputsName.includes(key)) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    if (
      handleMessage === "FORWARD_EDIT" &&
      messageModal?.isModalOpen === false
    ) {
      history.push(`/Users/AC/Commercial/Proforma?key=${detailId}`);
    }
  }, [messageModal?.isModalOpen === false]);

  useEffect(() => {
    if (handleMessage === "CONTINUE_FILE_REGISTRATION") {
      history.push({
        pathname: "/Users/AC/Commercial/Proforma",
        state: { from: detailId },
      });
    }
  }, [[messageModal?.isModalOpen === false]]);

  const Btn1 = () => {
    return (
      <Button
        name="viewDocumentation"
        onClick={(e) => {
          e.preventDefault();
          setShowModal1({ show: true, type: 1 });
        }}
      >
        <i class="fa fa-eye" aria-hidden="true"></i>
        تغییر سطح دسترسی
      </Button>
    );
  };

  const Btn4 = () => {
    return (
      <Button name="getTable" onClick={EditFilled}>
        ویرایش پرونده
      </Button>
    );
  };

  const Btn5 = () => {
    return (
      <Button name="getTable"
        onClick={() => setShowModal1({ show: true, type: 3 })}
      >
        انصراف از ویرایش
      </Button>
    );
  };

  const Btn6 = () => {
    return (
      <Button name="getTable" onClick={(e) => handelCancellationOfRenewal(e)}>
        انصراف از تمدید
      </Button>
    );
  };

  const Btn7 = ({ title = "ادامه ثبت پرونده" }) => {
    return (
      <Button
        onClick={(e) => {
          btn7ServiceHandler(e);
        }}
        name="getTable"
        backgroundColor={themeColors.btn.purple}
      >
        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
        {title}
      </Button>
    );
  };

  const Btn8 = () => {
    return (
      <Button
        name="getTable"
        backgroundColor={themeColors.btn.warning}
        onClick={(e) => showProformaDocument(e)}
      >
        <i class="fa fa-file-text-o" aria-hidden="true"></i>
        مشاهده مستندات
      </Button>
    );
  };
  const Btn9 = () => {
    return <Button name="getTable">بایگانی</Button>;
  };
  const Btn10 = () => {
    return (
      <Button name="getTable" onClick={(e) => extensionOrderRegistration(e)}>
        {
          importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6 ? " تمدید ثبت سفارش" : "تمدید ثبت آماری"

        }

      </Button>
    );
  };


  const clickHandler = (e) => {
    e.preventDefault()
    const id = search.split("=")[2];
    history?.push({
      pathname: '/Users/AC/Commercial/NSWUIReports/printPageOrderDetailes',
      state: { id: id },
    })
    // getUserPrsInfo()
    // getPermitDetailList_NIKIAZAR()
    // proformaReportInformation()

  }

  const Btn11 = () => {
    return (
      <Button name="getTable" onClick={(e) => clickHandler(e)}>
        {importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6 ? "چاپ اطلاعات ثبت سفارش" : "چاپ اطلاعات ثبت آماری"}
      </Button>
    );
  };
  const Btn12 = () => {
    return (
      <Button name="getTable" onClick={(e) => getLatestPermitsStatus(e)}>
        <i class="fa fa-database"></i>
        استعلام آخرین وضعیت مجوز
      </Button>
    );
  };
  const Btn13 = () => {
    return (
      <Button name="getTable" onClick={(e) => orderPriorityInquiry(e)}>
        <i class="fa fa-database"></i>
        {
          importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6 ? " استعلام اولویت ثبت سفارش" : " استعلام اولویت ثبت آماری"
        }

      </Button>
    );
  };
  const Btn14 = () => {
    return (
      <Button name="getTable" onClick={() => setShowModal1({ show: true, type: 2 })}>
        <i class="fa fa-database"></i>
        ارسال درخواست رد مجوزها
      </Button>
    );
  };

  const btn7ServiceHandler = (e) => {
    e.preventDefault();
    if (status === 0 && activeStatus === 1) {
      setHandleMessage("CONTINUE_FILE_REGISTRATION");
    }
    if (status === 1 && (activeStatus === 1 || 4 || 6)) {
      // استعلام ضوابط
      sendProformaToProducrInquiry17();
    }
    if (status === 3 && (activeStatus === 1 || 4 || 6)) {
      // درخواست مجوز
      // history.push("/Users/AC/Commercial/RequestPermission");
      history.push({
        pathname: "/Users/AC/Commercial/RequestPermission",
        state: { prfVCodeInt: detailId },
      });
    }
    if (status === 6 && (activeStatus === 1 || 4 || 6)) {
      sendProformaToSabtaresh40();
    }
  };

  const sendProformaToSabtaresh40 = () => {
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: detailId,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.sendProformaToSabtaresh40.url,
      method: endpoints.RestAPIs.Proforma.sendProformaToSabtaresh40.method,
      data: postData,
    })
      .then((res) => {
        if (res.data?.ErrorCode === 0) {
          handleRefresh()
          dispatch(
            handleMessageModal({
              type: "success",
              isModalOpen: true,
              describe: "با موفقیت انجام شد.",
            })
          );
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendProformaToProducrInquiry17 = () => {
    try {
      dispatch(handleLoading(true));
      const postData = {
        CallStatus: 1,
        originCaller: 0,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        prfVCodeInt: detailId,
      };

      axios({
        url: endpoints.RestAPIs.Proforma.SendProformaToProductInquiry17.url,
        method:
          endpoints.RestAPIs.Proforma.SendProformaToProductInquiry17.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.ErrorCode === 0) {
          dispatch(
            handleMessageModal({
              type: "success",
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
          handleRefresh();
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
            })
          );
          handleRefresh();
        }
        dispatch(handleLoading(false));
      });
    } catch (error) {
      console.log(error);
      dispatch(handleLoading(false));
    }
  };

  const showImage = (img) => {
    var image = new Image();
    image.src = "data:image/jpg;base64," + img;
    var w = window.open("");
    w.document.write(image.outerHTML);
  };


  const showPDF = (pdf) => {
    var blob = base64toBlob(pdf);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  };
  const showDocument = (item) => {
    if (item.Format === "pdf") {
      showPDF(item.DOC);
    } else {
      showImage(item.DOC);
    }
  };

  const base64toBlob = (base64Data) => {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: "application/pdf" });
  };

  const getLatestPermitsStatus = (e) => {
    e.preventDefault();
    try {
      dispatch(handleLoading(true));
      const postData = {
        originCaller: 0,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        prfVCodeInt: detailId,
      };
      axios({
        url: endpoints.RestAPIs.Proforma.getLatestPermitsStatus.url,
        method: endpoints.RestAPIs.Proforma.getLatestPermitsStatus.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.ErrorCode !== 0) {
          history.push(`/Users/AC/Commercial/EstelamAkharinMojavez?id=${search?.split("=")?.[2]}`)
          handleRefresh();
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

  const extensionOrderRegistration = (e) => {
    e.preventDefault();
    try {
      dispatch(handleLoading(true));
      const postData = {
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        prfVCodeInt: detailId,
      };
      axios({
        url: endpoints.RestAPIs.Proforma.sendProformaToSabtareshExtend45.url,
        method:
          endpoints.RestAPIs.Proforma.sendProformaToSabtareshExtend45.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.Error === 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: "success",
            })
          );
          handleRefresh()
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

  const optOutOfEditing = (e) => {
    e.preventDefault();
    try {
      dispatch(handleLoading(true));
      const postData = {
        callbackresult: {
          Result: {},
          ErrorCode: 0,
          ErrorDesc: "string",
        },
        recoverysteps: 0,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        prfVCodeInt: detailId,
      };
      axios({
        url: endpoints.RestAPIs.Proforma.proformaRecoveryEdite.url,
        method: endpoints.RestAPIs.Proforma.proformaRecoveryEdite.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.ErrorCode === 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: "success",
            })
          );
          handleRefresh();
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

  const handelCancellationOfRenewal = (e) => {
    e.preventDefault();
    setShowCancellationOfRenewal(true);
  }
  const submitHandlerCancellationOfRenewal = (e) => {
    e.preventDefault();
    cancellationOfRenewal()
  }

  const cancellationOfRenewal = () => {
    try {
      dispatch(handleLoading(true));
      const postData = {
        callbackresult: {
          Result: {},
          ErrorCode: 0,
          ErrorDesc: "string",
        },
        recoverysteps: 0,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        prfVCodeInt: detailId,
      };
      axios({
        url: endpoints.RestAPIs.Proforma.proformaRecoveryExtend.url,
        method: endpoints.RestAPIs.Proforma.proformaRecoveryExtend.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.ErrorCode === 0) {
          handleRefresh();
          setShowCancellationOfRenewal(false);
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: "success"
            })
          );
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

  const permitRejectionRequest = (e) => {
    e.preventDefault();
    try {
      dispatch(handleLoading(true));
      const postData = {
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        PrfVcodeInt: detailId,
      };
      axios({
        url: endpoints.RestAPIs.permit.permitRejectionRequest.url,
        method: endpoints.RestAPIs.permit.permitRejectionRequest.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setShowModal1({ show: false, type: 2 })
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.ErrorDesc,
              type: "success",
            })
          );
          handleRefresh()
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

  const showProformaDocument = (e) => {

    e.preventDefault();

    try {
      dispatch(handleLoading(true));
      const postData = {
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        PrfVcodeInt: detailId,
      };
      axios({
        url: endpoints.RestAPIs.Proforma.showProformaDocument.url,
        method: endpoints.RestAPIs.Proforma.showProformaDocument.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.Error === 0) {
          setProformaDocuments(res?.data?.DOCs);
          setShowModal(true);
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


  const handleChangeGoodsCommercialDescriptionTablePageSize = (event) => {
    event.preventDefault();
    setOrderPriorityInquiryTableParams({
      ...orderPriorityInquiryTableParams,
      pagination: {
        ...orderPriorityInquiryTableParams.pagination,
        pageSize: Number(event.target.value) || 0,
        current: 1,
      },
    });
  };
  const handleOrderPriorityInquiryTableChange = (
    pagination,
    filters,
    sorter
  ) => {
    setOrderPriorityInquiryTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };



  const orderPriorityInquiryTableColumns = [
    {
      title: "ردیف",
      align: "center",
      render: (item, record, index) => (
        <>
          {index +
            1 +
            (Number(
              orderPriorityInquiryTableParams?.pagination?.current || 1
            ) -
              1) *
            Number(
              orderPriorityInquiryTableParams.pagination.pageSize || 1
            )}
        </>
      ),
    },
    {
      title: "کد",
      dataIndex: "gcdCIDCodeStr",
      align: "center",
    },
    {
      title: "نام",
      dataIndex: "gcdCIDCodeStr",
      align: "center",
    },

  ];
  const orderPriorityInquiry = (e) => {
    e.preventDefault();
    try {
      dispatch(handleLoading(true));
      const postData = {
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        PrfVcodeInt: detailId,
      };
      axios({
        url: endpoints.RestAPIs.Proforma.priorityMomentInquiry52.url,
        method: endpoints.RestAPIs.Proforma.priorityMomentInquiry52.method,
        data: postData,
      }).then((res) => {
        if (res.data?.ErrorCode === 0) {
          setShowOrderPriority(true)
          setFilters({
            ...filters,
            numberInvoiceOrderPriorityInquiry: res.data?.Result?.ArzPermitOrgnizations,
            Priority: res.data?.Result?.Priority,
            ErrorDesc: res.data?.Result?.ErrorDesc,
            OrderNo: res.data?.Result?.PrfVCodeInt,
            ErrorCodeSabtaresh: res.data?.Result?.ErrorCodeSabtaresh,
            dataSource: res.data?.Result?.ArzPermitOrgnizations,
          })
          handleRefresh();

        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res.data?.Result?.ErrorDesc,
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

  const changeProformaLevel = (e) => {
    e.preventDefault();
    if (permitForSkip(["AccessDocuments"]) === true) {
      dispatch(handleLoading(true));
      try {
        const postData = {
          PrfLevelTny: filters?.AccessDocuments,
          urlVCodeInt: role,
          ssdsshGUID: GUid,
          PrfVcodeInt: detailId,
        };
        axios({
          url: endpoints.RestAPIs.Proforma.changeProformaLevel.url,
          method: endpoints.RestAPIs.Proforma.changeProformaLevel.method,
          data: postData,
        }).then((res) => {
          if (res?.data?.ErrorCode === 0) {
            setShowModal1({ show: false });
            handleRefresh();
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
    }
  };

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
  };

  const handlerCloseChangeProformaLevel = () => {
    setShowModal1({ show: false });
    setFilters((prev) => ({
      ...prev,
      AccessDocuments: detailExternal?.prfLevelTny,
    }));
    setErrors((prev) => ({ ...prev, AccessDocuments: [] }));
    form.resetFields();
  };

  const steps = [
    {
      element: "#hhha",
      intro:
        "کاربر گرامی این فرم جهت برخی اقدامات و مشاهده جزئیات پرونده طراحی شده است.",
      position: "right",
    },
    {
      element: "#operationButtons",
      intro: "دراین قسمت اقدامات موجود لیست شده است .",
      position: "right",
    },
  ];

  const ItemModalHandler = (event) => {
    event.preventDefault();
    setEnabled(!enabled);
  };

  return (
    <>
      <QuickGuide enabled={enabled} setEnabled={setEnabled} steps={steps}>
        <div id="operationButtons" className="btnDiv">
          {/*  */}
          <Row>
            <Button
              onClick={(e) => ItemModalHandler(e)}
              backgroundColor={themeColors.comments.green}
            >
              <i class="fa fa-info" aria-hidden="true"></i>
            </Button>

            <Button
              id="hhha"
              onClick={handleRefresh}
              backgroundColor={themeColors.btn.danger}
            >
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </Button>

            {subActiveStatus === 10 ? (
              <>
                <CopyProformaButton PrfVcode={detailId} />

                <Btn8 />
              </>
            ) : (
              <>
                {status === 0 && activeStatus === 1 ? (
                  <>
                    <Btn1 />
                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />
                    <CopyProformaButton PrfVcode={detailId} /> <Btn7 />
                    <Btn8 />
                  </>
                ) : status === 0 && activeStatus === 2 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />
                  </>
                ) : null}

                {status === 1 && activeStatus === 1 ? (
                  <>
                    <Btn1 />

                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn4 />

                    <Btn7 title="استعلام ضوابط" />

                    <Btn8 />
                  </>
                ) : status === 1 && activeStatus === 2 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />
                  </>
                ) : status === 1 && activeStatus === 4 ? (
                  <>
                    <Btn5 />

                    <Btn7 title="استعلام ضوابط" />
                  </>
                ) : status === 1 && activeStatus === 6 ? (
                  <>
                    <Btn6 />

                    <Btn7 title="استعلام ضوابط" />
                  </>
                ) : null}

                {status === 2 && (activeStatus === 1 || 2 || 4 || 6) ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />
                  </>
                ) : null}

                {status === 3 && activeStatus === 1 ? (
                  <>
                    <Btn1 />

                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn4 />

                    <Btn7 title="درخواست مجوز" />

                    <Btn8 />
                  </>
                ) : status === 3 && activeStatus === 2 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : status === 3 && activeStatus === 4 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn5 />
                    <Btn7 title="درخواست مجوز" />
                    <Btn8 />
                  </>
                ) : status === 3 && activeStatus === 6 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn6 />
                    <Btn7 title="درخواست مجوز" /> <Btn8 />
                  </>
                ) : null}

                {status === 4 && activeStatus === 1 ? (
                  <>
                    <Btn1 />

                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn4 />

                    <Btn8 />
                  </>
                ) : status === 4 && activeStatus === 2 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />
                  </>
                ) : status === 4 && activeStatus === 4 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn5 />

                    <Btn8 />
                  </>
                ) : status === 4 && activeStatus === 6 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn6 />

                    <Btn8 />
                  </>
                ) : null}
                {status === 5 && activeStatus === 1 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />

                    <Btn12 />
                  </>
                ) : status === 5 && activeStatus === 2 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />
                  </>
                ) : status === 5 && activeStatus === 4 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />

                    <Btn12 />
                  </>
                ) : status === 5 && activeStatus === 6 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />

                    <Btn12 />
                  </>
                ) : null}
                {status === 5 && subStatus === 550 && <Btn14 />}
                {status === 6 && activeStatus === 1 ? (
                  <>
                    <Btn1 />
                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />
                    <CopyProformaButton PrfVcode={detailId} />
                    <Btn4 />
                    <Btn7 title={importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6 ? "درخواست ثبت سفارش" : "درخواست ثبت آماری"} /> <Btn8 />
                  </>
                ) : status === 6 && activeStatus === 2 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />
                  </>
                ) : status === 6 && activeStatus === 4 ? (
                  <>
                    <Btn1 />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn5 />

                    <Btn7 title={importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6 ? "درخواست ثبت سفارش" : "درخواست ثبت آماری"} />

                    <Btn8 />
                  </>
                ) : status === 6 && activeStatus === 6 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} /> <Btn6 />
                    <Btn7 title={importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6 ? "درخواست ثبت سفارش" : "درخواست ثبت آماری"} />
                    <Btn8 />
                  </>
                ) : null}

                {status === 7 && activeStatus === 1 ? (
                  <>
                    <Btn1 />

                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />

                    <CopyProformaButton PrfVcode={detailId} />

                    <Btn8 />
                  </>
                ) : status === 7 && activeStatus === 2 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : status === 7 && activeStatus === 4 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : status === 7 && activeStatus === 6 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : null}

                {status === 8 && activeStatus === 1 ? (
                  <>
                    <Btn1 />
                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />
                    <CopyProformaButton PrfVcode={detailId} /> <Btn4 />
                    {/* <Btn7 title="پرداخت کارمزد" /> */}
                    <Btn8 />
                  </>
                ) : status === 8 && activeStatus === 2 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : status === 8 && activeStatus === 4 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} /> <Btn5 />
                    {/* <Btn7 title="پرداخت کارمزد" /> */}
                    <Btn8 />
                  </>
                ) : status === 8 && activeStatus === 6 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} /> <Btn6 />
                    {/* <Btn7 title="پرداخت کارمزد" /> */}
                    <Btn8 />
                  </>
                ) : null}
                {status === 9 && activeStatus === 1 ? (
                  <>
                    <Btn1 />
                    <RemoveProformaForStatisticalRegistraion
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleRefresh={handleRefresh}
                      handleChangeInputs={handleChangeInputs}
                      detailExternal={detailExternal}
                    />
                    <CopyProformaButton PrfVcode={detailId} /> <Btn4 /> <Btn8 />
                    <Btn10 />
                    <Btn11 />
                    <Btn13 />
                  </>
                ) : status === 9 && activeStatus === 2 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : null}
                {status === 10 && activeStatus === 1 ? (
                  <>
                    <Btn1 />
                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />
                    <CopyProformaButton PrfVcode={detailId} /> <Btn4 /> <Btn8 />
                  </>
                ) : status === 10 && activeStatus === 2 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : status === 10 && activeStatus === 4 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} /> <Btn5 />
                    <Btn8 />
                  </>
                ) : status === 10 && activeStatus === 6 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} /> <Btn6 />
                    <Btn8 />
                  </>
                ) : null}
                {status === 11 && activeStatus === 1 ? (
                  <>
                    <Btn1 />
                    <RemoveProformaButton
                      handleRefresh={handleRefresh}
                      PrfVcode={detailId}
                      filters={filters}
                      setFilters={setFilters}
                      setErrors={setErrors}
                      errors={errors}
                      handleChangeInputs={handleChangeInputs}
                    />
                    <CopyProformaButton PrfVcode={detailId} /> <Btn4 /> <Btn8 />
                  </>
                ) : status === 11 && activeStatus === 2 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : status === 11 && activeStatus === 4 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn5 />
                    <Btn8 />
                  </>
                ) : status === 11 && activeStatus === 6 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn6 />
                    <Btn8 />
                  </>
                ) : null}
                {status === 12 && (activeStatus === 1 || 2 || 4 || 6) ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : null}
                {status === 13 && (activeStatus === 1 || 2 || 4 || 6) ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : null}
                {status === 20 && (activeStatus === 1 || 2 || 4 || 6) ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : null}
                {status === 21 && activeStatus === 1 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : status === 21 && activeStatus === 2 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} />
                    <Btn8 />
                  </>
                ) : status === 21 && activeStatus === 4 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} /> <Btn5 />
                    <Btn8 />
                  </>
                ) : status === 21 && activeStatus === 6 ? (
                  <>
                    <Btn1 /> <CopyProformaButton PrfVcode={detailId} /> <Btn6 />
                    <Btn8 />
                  </>
                ) : null}
              </>
            )}
          </Row>
        </div>
      </QuickGuide>
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        centered
        title="مشاهده مستندات"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button
            name="hideModal1"
            backgroundColor={themeColors.btn.danger}
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
          >
            بستن
          </Button>,
        ]}
        width={2200}
      >
        <form>
          <div style={{ display: "flex" }}>
            {proformaDocuments.map((item) => (
              <span className="document-show--pictures__picture">
                <span
                  onClick={() => {
                    if (item.Format === "pdf") {
                      showPDF(item.DOC);
                    }
                  }}
                  className="document-show--pictures__picture__img"
                >
                  {item.Format === "pdf" ? (
                    <embed
                      src={
                        item.Format === "pdf"
                          ? `data:application/pdf;base64,${item.DOC}`
                          : `data:image/png;base64,${item.DOC}`
                      }
                      alt="حساب کاربری"
                      className="document-show--pictures__picture__img--pic"
                    />
                  ) : (
                    <img
                      src={`data:image/png;base64,${item.DOC}`}
                      alt="حساب کاربری"
                      className="document-show--pictures__picture__img--pic"
                      onClick={() => {
                        showImage(item.DOC);
                      }}
                    />
                  )}
                  <Tooltip placement="top" title={"برای مشاهده کلیک کنید."}>
                    <span
                      className="document-show--pictures__picture__img--caption"
                      onClick={() => showDocument(item)}
                    >
                      {item.Caption}
                    </span>
                  </Tooltip>
                </span>
              </span>
            ))}
          </div>
        </form>
      </Modal>
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        centered
        title={showModal1.type === 1 ? "تغییر سطح دسترسی اسنادی" : showModal1.type === 2 ? "ارسال درخواست رد مجوزها" : showModal1.type === 3 ? "انصراف" : null}
        open={showModal1.show}
        onCancel={(e) => {
          handlerCloseChangeProformaLevel(e);
        }}
        footer={[
          <Button
            name="hideModal2"
            backgroundColor={themeColors.btn.secondary}
            onClick={(e) => {
              if (showModal1.type === 1) {
                changeProformaLevel(e);
              } else if (showModal1.type === 2) {
                setShowModal1({ show: false })
                permitRejectionRequest(e)
              } else if (showModal1.type === 3) {
                optOutOfEditing(e)
                setShowModal1({ show: false })
              }
            }}
          >

            تایید
          </Button >,
          <Button
            name="hideModal1"
            backgroundColor={themeColors.btn.danger}
            onClick={(e) => {
              e.preventDefault();
              handlerCloseChangeProformaLevel();
            }}
          >
            {showModal1.type === 3 ? "بستن" : "انصراف"}
          </Button>,
        ]}
        width={600}
      >
        <form className="form">
          {showModal1.type === 1 ?
            <Col sm={24} md={24} xl={24}>
              <Form form={form}>
                <Form.Item name={'AccessDocuments'}>
                  <ComboBox
                    name="AccessDocuments"
                    title="سطح دسترسی اسنادی"
                    labelWidth="188px"
                    validations={[["required"]]}
                    onChange={handleChangeInputs}
                    options={AccessDocuments}
                    error={errors?.AccessDocuments}
                    defaultValue={filters.AccessDocuments || detailExternal?.AccessDocuments}
                  />
                </Form.Item>
              </Form>
            </Col>
            :
            showModal1.type === 2 ?
              <Col sm={24} md={24} xl={24}>
                <p>
                  توجه: درصورت ارسال درخواست رد مجوز کلیه ارسال های پاسخ داده نشده توسط سازمان مجوز دهنده رد سیستمی میشود. آیا از ارسال آن مطمئن هستید؟
                </p>
              </Col>
              :
              showModal1.type === 3 ?
                <Col sm={24} md={24} xl={24}>
                  <p>
                    توجه: درصورتی که گزینه انصراف از ویرایش انتخاب شود تمام مجوزهای دریافتی در فرآیند ویرایش ابطال میگردد. آیا از انصراف آن اطمینان دارید؟
                  </p>
                </Col>
                :
                null
          }
        </form>
      </Modal >
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        // centered
        title="استعلام اولویت پرونده"
        open={showOrderPriority}
        width={1000}
        footer={false}
        onCancel={e => (e, setShowOrderPriority(false))}
      >
        <div style={{ paddingRight: "25px" }}>
          <Row>
            <Col sm={24} md={12} xl={12}>
              <Input
                name="numberInvoiceOrderPriorityInquiry"
                title="شماره ثبت سفارش"
                readOnly={"readonly"}
                labelWidth="188px"
                value={filters?.numberInvoiceOrderPriorityInquiry}
              />
            </Col>
            <Col sm={24} md={12} xl={12}>
              <Input
                name="OrderNo"
                title="شماره پرونده"
                type="text"
                readOnly={"readonly"}
                labelWidth="188px"
                value={filters?.OrderNo}
              />
            </Col>
            <Col sm={24} md={12} xl={12}>
              <Input
                name="Priority"
                title="اولویت پرونده"
                readOnly={"readonly"}
                labelWidth="188px"
                value={filters?.Priority}
              />
            </Col>
            <Col sm={24} md={12} xl={12}>
              <Input
                name="ErrorCodeSabtaresh"
                title="کد خطای ثبتارش"
                readOnly={"readonly"}
                labelWidth="188px"
                value={filters?.ErrorCodeSabtaresh}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={24} xl={24}>
              <Input
                name="ErrorDesc"
                title="متن خطا"
                readOnly={"readonly"}
                labelWidth="155px"
                value={filters?.ErrorDesc}
              />
            </Col>
          </Row>
          <VerticalSpace space="0.5rem" />
          <div style={{ paddingLeft: "25px" }}>
            <Table
              handleChangePageSize={
                handleChangeGoodsCommercialDescriptionTablePageSize
              }
              dataSource={filters?.dataSource}
              columns={orderPriorityInquiryTableColumns}
              pagination={orderPriorityInquiryTableParams.pagination}
              onChange={handleOrderPriorityInquiryTableChange}
              onHeaderRow={() => {
                return {
                  style: { backgroundColor: colorMode },
                };
              }}
            />
          </div>
        </div>
      </Modal>
      {showCancellationOfRenewal && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          onCancel={() => {
            setShowCancellationOfRenewal(false);
          }}
          footer={[
            <span
              style={{ padding: "5px", gap: "5px" }}
              className="flex-order-row-justify-start"
            >
              <Button
                onClick={e => submitHandlerCancellationOfRenewal(e)}
                backgroundColor={themeColors.btn.danger}
              >
                بله انصراف میدهم
              </Button>
              <Button
                backgroundColor={themeColors.btn.content}
                style={{ border: "1px solid #ccc" }}
                onClick={() => {
                  setShowCancellationOfRenewal(false);
                }}
              >
                انصراف
              </Button>
            </span>,
            ,
          ]}
          open={showCancellationOfRenewal}
          title="انصراف از تمدید"
          width={800}
        >
          <p>
            درصورتی که گزینه انصراف از تمدید انتخاب شود تمام مجوزهای دریافتی در فرآیند تمدید ابطال می گردد ، آیا از انصراف خود مطمئن هستید؟
          </p>
        </Modal>
      )}
    </>
  );
};

export default ETFMDetaileButtons;
