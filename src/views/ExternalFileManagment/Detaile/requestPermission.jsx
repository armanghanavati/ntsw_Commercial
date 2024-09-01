import { Col, Modal, Row, Table } from 'antd';
import { Button, ComboBox, Input, QuestionModal, VerticalSpace } from '../../../components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { endpoints } from '../../../services/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import Validation from '../../../utils/Validation';
import { useEffect } from 'react';
import { handelQuestionModal, handleLoading, handleMessageModal, handleQuestionModal } from '../../../state/action-creators';
import themeColors from '../../../configs/theme';
import { useRef } from 'react';
import SendDocuments from '../../../components/SendDocuments';

const RequestPermission = () => {
  const { colorMode, role, GUid, theme, questionModal } = useSelector(state => state)
  const dispatch = useDispatch()
  const location = useLocation();
  const history = useHistory()

  const [dataTable, setDataTable] = useState([])
  const [showSendDoc, setShowSendDoc] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})
  const [errors, setErrors] = useState({})
  const [inputsData, setInputsData] = useState({})
  const [docCodeInt, setDocCodeInt] = useState()
  const [showModal, setShowModal] = useState(false)
  const [showDocsData, setShowDocsData] = useState([])
  const [typeOfQuestionModal, setTypeOfQuestionModal] = useState('')
  const [guidOfDoc, setGuidOfDoc] = useState('')

  useEffect(() => {
    getTable()
  }, [])


  const columns = [
    {
      title: "شماره مجازی کالا",
      dataIndex: "pfgVCodeLng",
      align: "center",
    },
    {
      title: "شناسه کالا",
      dataIndex: "pfggcdNameStr",
      align: "center",
    },
    {
      title: "کد تعرفه",
      dataIndex: "gdsHSCode",
      align: "center",
    },
    {
      title: "شرح تجاری",
      dataIndex: "pfgCommercialDescStr",
      align: "center",
    },
    {
      title: "کشور تولید کننده",
      dataIndex: "cdfAppStr",
      align: "center",
      render: (item, { ProformaGoodsCountriesList }, index) => (<>
        <div>{ProformaGoodsCountriesList?.[0]?.cnyNameStr}</div></>)
    },
    {
      title: "مقدار/تعداد",
      dataIndex: "pfgCountInt",
      align: "center",
    },
    {
      title: "واحد اندازه گیری",
      dataIndex: "msuNameStr",
      align: "center",
    },
    {
      title: " وزن خالص(kg)",
      dataIndex: "pfgNetWeightAsKGDbl",
      align: "center",
    },
    Table.EXPAND_COLUMN

  ];
  const subColumn = [
    {
      title: 'ردیف',
      align: 'center',
      render: (item, record, index) => (<>{index + 1}</>)
    },
    {
      title: "عنوان سازمان",
      dataIndex: "agnNameStr",
      align: "center",
    },
    {
      title: "نوع مجوز",
      dataIndex: "pgpRequestTypeStr",
      align: "center",
    },
    {
      title: "افزودن پیوست",
      dataIndex: "cdfAppStr",
      align: "center",
      render: (item, { pgpVCodeLng }, index) => (<>
        <div onClick={() => {
          setShowSendDoc(true)
          setDocCodeInt(pgpVCodeLng)
        }} className='flex-order-row'>
          <span className='table-icon link'>
            <i class="fa fa-link" aria-hidden="true"></i>
          </span>
        </div></>)
    },
    {
      title: "نمایش پیوست",
      dataIndex: "cdfAppStr",
      align: "center",
      render: (item, { pgpVCodeLng }, index) => (
        <div className='flex-order-row' onClick={() => {
          setDocCodeInt(pgpVCodeLng)
          showPermitSendDocumentToOGA(pgpVCodeLng)
        }}>
          <span className='table-icon image'>
            <i class="fa fa-photo" aria-hidden="true"></i>
          </span>
        </div>)
    },
    {
      title: "پیام سازمان مجوز دهنده",
      dataIndex: "pgpTypeStr",
      align: "center",
    },
    {
      title: "دریافت فایل راهنما",
      dataIndex: "cdfAppStr",
      align: "center",
      render: (item, record, index) => (<>
        <span className='flex-order-row'><Button onClick={(e) => ItemModalHandler(e)} backgroundColor={themeColors.comments.green}>
          <i class="fa fa-info" aria-hidden="true"></i> دریافت فایل راهنما
        </Button></span>
      </>)
    },
    {
      title: " نوع درخواست ",
      dataIndex: "pgpRequestTypeStr",
      align: "center",
    },
  ];

  const columnforShowDocs = [
    {
      title: 'ردیف',
      align: 'center',
      render: (item, record, index) => (<>{index + 1}</>)
    },
    {
      title: "پیش نمایش",
      dataIndex: "DOC",
      align: "center",
      render: (item, record, index) => (<div className='flex-order-row' >
        <img style={{ width: '120px' }} src={`data:${record.Caption};base64, ${record.DOC}`} alt={record?.Caption} />
      </div>)
    },
    {
      title: "نام ",
      dataIndex: "Caption",
      align: "center",
      render: (item, { Caption }, index) => (<div style={{ height: '100%' }} className='flex-order-row'>
        {Caption}
      </div>)
    },
    {
      title: "فرمت",
      dataIndex: "Format",
      align: "center",

    },
    {
      title: " حذف",
      dataIndex: "cdfAppStr",
      align: "center",
      render: (item, { GUID }, index) => (<>
        <div onClick={() => {
          handlerDeleteDoc(GUID)
        }} className='flex-order-row'>
          <span className='table-icon link' style={{ backgroundColor: themeColors.btn.danger, color: 'white' }}>
            <i class="fa fa-close" aria-hidden="true"></i>
          </span>
        </div></>)
    },

  ];

  const handlerDeleteDoc = (GUID) => {
    setGuidOfDoc(GUID)
    setTypeOfQuestionModal('delete')
    dispatch(
      handleQuestionModal({
        isModalOpen: true,
        describe: 'آیا از حذف این فایل اطمینان دارید؟',
        title: "حذف",
      })
    );
  }

  const sendGoodsLicenseRequestHandler = () => {
    setTypeOfQuestionModal('sendGoods')
    dispatch(
      handleQuestionModal({
        isModalOpen: true,
        describe: 'آیا از ارسال درخواست مجوز اطمینان دارید؟',
        title: "ارسال درخواست مجوز",
      })
    );
  }
  useEffect(() => {
    if (questionModal.answer === 'yes' && typeOfQuestionModal === 'delete') {
      deletePermitDocuments()
    } else if (questionModal.answer === 'yes' && typeOfQuestionModal === 'sendGoods') {
      sendGoodsLicenseRequest19()
    } else if (questionModal.answer === 'no') {
      dispatch(
        handleQuestionModal({ isModalOpen: false, title: "", answer: "", describe: "" })
      );
    }
  }, [questionModal.isModalOpen])


  // -> get talble service
  const getTable = () => {
    try {
      const postData = {
        "urlVCodeInt": role,
        "ssdsshGUID": GUid,
        "prfVCodeInt": location.state.prfVCodeInt
      }
      setLoading(true);
      dispatch(handleLoading(true));
      axios({
        url: endpoints.RestAPIs.permit.getProformaPermitsList.url,
        method: endpoints.RestAPIs.permit.getProformaPermitsList.method,
        data: postData,
      })
        .then((res) => {
          if (res.data.ErrorCode === 0) {
            setFilters(res?.data?.baseInformation)
            setDataTable(res?.data?.proformaGoodsList)
          } else {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
              })
            );
          }
          dispatch(handleLoading(false));
          setLoading(false);
        })
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  const showPermitSendDocumentToOGA = (pgpVCodeLng) => {
    try {
      const postData = {
        "pgpVCodeLng": pgpVCodeLng || docCodeInt,
        "GUID": [],
        "urlVCodeInt": role,
        "ssdsshGUID": GUid,
        "prfVCodeInt": location.state.prfVCodeInt
      }
      setLoading(true);
      dispatch(handleLoading(true));

      axios({
        url: endpoints.RestAPIs.permit.showPermitSendDocumentToOGA.url,
        method: endpoints.RestAPIs.permit.showPermitSendDocumentToOGA.method,
        data: postData,
      })
        .then((res) => {
          if (res.data.Error === 0) {
            setShowModal(true)
            setShowDocsData(res?.data?.DOCs)

          } else {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
              })
            );
          }
          dispatch(handleLoading(false));
          setLoading(false);
        })
    } catch (error) {
      setLoading(false);
      dispatch(handleLoading(false));
      console.log(error);
    }
  };


  const deletePermitDocuments = () => {
    try {
      const postData = {
        "pgpVCodeLng": docCodeInt,
        "GUID": [guidOfDoc],
        "urlVCodeInt": role,
        "ssdsshGUID": GUid,
        "prfVCodeInt": location.state.prfVCodeInt
      }

      setLoading(true);
      dispatch(handleLoading(true));

      axios({
        url: endpoints.RestAPIs.permit.deletePermitDocuments.url,
        method: endpoints.RestAPIs.permit.deletePermitDocuments.method,
        data: postData,
      })
        .then((res) => {
          if (res.data.Error === 0) {
            if (showDocsData.length === 1) {
              setShowModal(false)
            } else {
              showPermitSendDocumentToOGA()
            }
          } else {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
              })
            );
          }
          dispatch(handleLoading(false));
          setLoading(false);
        })
    } catch (error) {
      setLoading(false);
      dispatch(handleLoading(false));
      console.log(error);
    }
    setTypeOfQuestionModal('')
    handleQuestionModal({ isModalOpen: false, title: "", describe: "", answer: "" })
  };

  const ItemModalHandler = () => {

  }

  const sendGoodsLicenseRequest19 = () => {
    try {
      const postData = {
        urlVCodeInt: role,
        ssdsshGUID: GUid,
        prfVCodeInt: location.state.prfVCodeInt
      }
      setLoading(true);
      dispatch(handleLoading(true));

      axios({
        url: endpoints.RestAPIs.Proforma.sendGoodsLicenseRequest19.url,
        method: endpoints.RestAPIs.Proforma.sendGoodsLicenseRequest19.method,
        data: postData,
      })
        .then((res) => {
          if (res.data.ErrorCode === 0) {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
                type: 'success'
              })
            );
            history.push('/Users/AC/Commercial/ExternalTradeFileManagement')
          } else {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
              })
            )
          }
          dispatch(handleLoading(false));
          setLoading(false);
        })
    } catch (error) {
      console.log(error);
      dispatch(handleLoading(false));
      setLoading(false);
    }
    setTypeOfQuestionModal('')
    handleQuestionModal({ isModalOpen: false, title: "", describe: "", answer: "" })
  };

  return (
    <>

      <Row>
        <Col sm={24} md={12} xl={8} xxl={8} >
          <Button onClick={(e) => ItemModalHandler(e)} backgroundColor={themeColors.comments.green}>
            <i class="fa fa-info" aria-hidden="true"></i>
          </Button>
        </Col>
        <Col sm={24} md={12} xl={8} xxl={8}>
          <Input
            name='searchText'
            // onChange={handleChangeInputs}
            value={filters?.prfVCodeInt}
            title="شماره پرونده پیش فاکتور"
            readOnly={true}
          />
        </Col>
        <Col sm={24} md={12} xl={8} xxl={8}>
          <Input
            name='searchText'
            // onChange={handleChangeInputs}
            value={filters?.prfNumberStr}
            title="شماره پیش فاکتور"
            readOnly={true}
          />
        </Col>
        <Col sm={24} md={12} xl={8} xxl={8}>
          <Input
            name='foreignSeller'
            // onChange={handleChangeInputs}
            value={filters?.prfSellerNameEnStr}
            title="فروشنده خارجی"
            readOnly={true}
          />
        </Col>
        <Col sm={24} md={12} xl={8} xxl={8}>
          <Input
            name='DateF'
            // onChange={handleChangeInputs}
            value={filters?.prfDate?.split(" ")?.[0]}
            title="تاریخ صدور"
            readOnly={true}
          />
        </Col>
        <Col sm={24} md={12} xl={8} xxl={8}>
          <Input
            name='prfCountryNameStr'
            // onChange={handleChangeInputs}
            value={filters?.prfCountryNameStr}
            title="کشور ذینفع"
            readOnly={true}
          />
        </Col>
      </Row>
      <Table
        onHeaderRow={() => {
          return {
            style: { backgroundColor: colorMode },
          };
        }}
        columns={columns}
        loading={loading}
        pagination={false}
        // rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex-order-row" >
              <Table
                onHeaderRow={() => {
                  return {
                    style: { backgroundColor: colorMode },
                  };
                }}
                columns={subColumn}
                pagination={false}
                hasPageSizeCombo={false}
                dataSource={record.ProformaGoodsPermitsList}
              />
            </div>
          ),
          rowExpandable: (record) => true,
          columnTitle: " لیست سازمان های مجوز دهنده",
          columnWidth: '200px',
          // expandedRowClassName: 'table--expanded-row',
        }}
        dataSource={dataTable}
      />
      <VerticalSpace space="1rem" />

      <Row style={{ flexDirection: 'row-reverse' }}>
        <Button onClick={() => { history.goBack() }}>
          <i class="fa fa-share" aria-hidden="true"></i>
          بازگشت
        </Button>
        <Button onClick={() => { sendGoodsLicenseRequestHandler() }} name="sendGoodsLicenseRequest19" backgroundColor={themeColors.btn.darkGreen}>
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
          ارسال درخواست مجوز
        </Button>
      </Row>
      <SendDocuments docCodeInt={docCodeInt} open={showSendDoc} setOpen={setShowSendDoc} setInputsData={setInputsData} errors={errors} setErrors={setErrors} />
      <Modal
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        centered
        title=" نمایش مستندات "
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button name='hideModal1' backgroundColor={themeColors.btn.danger}
            onClick={(e) => {
              e.preventDefault()
              setShowModal(false)
            }}>بستن</Button>
        ]}
        width={1200}
      >
        <form style={{ padding: '0 20px' }}>
          <Table
            onHeaderRow={() => {
              return {
                style: { backgroundColor: colorMode },
              };
            }}
            columns={columnforShowDocs}
            loading={loading}
            pagination={false}
            // rowKey="id"
            dataSource={showDocsData}
          />
        </form>

      </Modal>
      {questionModal.isModalOpen && <QuestionModal />}
    </>
  )
}

export default RequestPermission;
