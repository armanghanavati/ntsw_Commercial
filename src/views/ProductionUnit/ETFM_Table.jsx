import { Table, Col, Row, Dropdown, Menu, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import themeColors from "../../configs/theme";

import { Button } from "../../components";
import { endpoints } from "../../services/endpoints";
import axios from "axios";
import { handleLoading, handleMessageModal } from "../../state/action-creators/index";
import ProductUnitDetailsModal from "./Modals/ProductUnitDetailsModal";
import moment from "jalali-moment";
import converGregorianDateToJalali from "../../configs/helpers/convert-jalali-date-to-gregorian copy";
import { configConsumerProps } from "antd/lib/config-provider";


const ProductionUnitTable = ({
  dataSource,
  handleChangePageSize,
  setTableParams,
  tableParams,
  ali,
}) => {

  const { theme, colorMode, importCodeInt, role, GUid } = useSelector((state) => state);
  const [openModal, setOpenModal] = useState(false)
  const [detailData, setDetailData] = useState([])
  const [idForQuestionModal, setIdForQuestionModal] = useState();
  const [isOpenQuestionModal, setIsOpenQuestionModal] = useState(false);
  const [questionModalMode, setQuestionModalMode] = useState();
  const [ejectMsg, setEjectMsg] = useState(false);
  const [pcrVCodeInt, setpcrVCodeInt] = useState();
  const [pcrNationalCodeStr, setpcrNationalCodeStr] = useState();
  const [pcrDescription, setPcrDescription] = useState();



  // const [ali, setAli] = useState();



  const dispatch = useDispatch()
  const [convertDate, setConvertDate] = useState("")



  const oparationDetails = (prfActiveStatusTny, prfVCodeInt, pcrStatusTny) => {
    // if (prfActiveStatusTny === 2) {
    //   return (
    //     <>
    //       <Button
    //         onClick={() =>
    //           localStorage.setItem("fileNumbExt", prfVCodeInt)
    //         }
    //         width="100px"
    //         backgroundColor={themeColors.comments.red}
    //         type="secondary"
    //       >
    //         ابطال
    //       </Button>
    //     </>
    //   )
    // } else if (prfActiveStatusTny === 4) {
    //   return (
    //     <>
    //       <Button
    //         onClick={() =>
    //           localStorage.setItem("fileNumbExt", prfVCodeInt)
    //         }
    //         width="100px"
    //         backgroundColor={themeColors.btn.purple}
    //         type="secondary"
    //       >
    //         <i className="fa fa-search" />
    //         در حال ویرایش
    //       </Button>
    //     </>)
    // } else {
    return (
      <>
        <Button
          onClick={() =>
            localStorage.setItem("fileNumbExt", prfVCodeInt)
          }
          disabled={pcrStatusTny !== 0 ? true : false}
          width="80px"
          backgroundColor={themeColors.comments.blue}
          type="secondary"
        >
          <i className="fa fa-search" />
          جزئیات
        </Button>
      </>
    )
    // }
  }
  const handlechange = (event) => {
    event?.preventDefault();
    setPcrDescription(event.target.value);

  }
  const modalClose = () => {
    setIsOpenQuestionModal(false)
    setEjectMsg(false)
    setPcrDescription()

  }

  const getDetail = (pcrprfVCodeInt) => {
    try {
      const postData = {
        prfVCodeInt: pcrprfVCodeInt,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      }
      dispatch(handleLoading(true));
      axios({
        url: endpoints.RestAPIs.StatisticsRegistration.GetProformaGoodsForContractRequest.url,
        method: endpoints.RestAPIs.StatisticsRegistration.GetProformaGoodsForContractRequest.method,
        data: postData,

      })
        .then((res) => {
          if (res.data.ErrorCode === 0 && res.data.Result) {
            setOpenModal(true)
            setDetailData(res?.data?.Result)
            // ->get date convert
            // const temp = res?.data?.prfDate.split(" ")[0];
            // const dateTemp = temp.split("/");
            // let day = dateTemp[1];
            // let month = dateTemp[0];
            // let year = dateTemp[2];
            // let datepicker = year + "/" + month + "/" + day;
            // setConvertDate(datepicker)

            dispatch(handleLoading(false));

          } else {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
              })
            );
            dispatch(handleLoading(false));
          }
        })
    } catch (error) {
      console.log(error);
    }
  };

  const gg = (id) => {
    setEjectMsg(true)
    pcrDescription.length >= 1 && okFORconfirm(id)
  }
  const okFORconfirm = (id) => {
    try {
      const postData = {
        pcrVCodeInt: pcrVCodeInt,
        pcrNationalCodeStr: pcrNationalCodeStr,
        pcrDescription: pcrDescription,
        // {(id=== 2) ? (pcrDescription: pcrNationalCodeStr): (pcrDescription: "")},
        status: id,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      }
      dispatch(handleLoading(true));
      axios({
        url: endpoints.RestAPIs.StatisticsRegistration.ResponseToProductionUnitContractRequest.url,
        method: endpoints.RestAPIs.StatisticsRegistration.ResponseToProductionUnitContractRequest.method,
        data: postData,

      })
        .then((res) => {

          if (res.data.ErrorCode === 0) {
            dispatch(
              handleMessageModal({
                type: "success",
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
              })
            );
            ali(pcrVCodeInt)
            dispatch(handleLoading(false));
            modalClose()
            // setOpenModal(false)


          } else {
            dispatch(
              handleMessageModal({
                isModalOpen: true,
                describe: res.data?.ErrorDesc,
              })
            );
            modalClose()

            dispatch(handleLoading(false));
          }
        })
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const columns = [
    {
      title: "ردیف",
      align: "center",

      render: (item, record, index) => (
        <>
          {index +
            1 +
            (Number(tableParams?.pagination?.current || 1) - 1) *
            Number(tableParams.pagination.pageSize || 1)}
        </>
      ),
    },
    {
      title: "شماره پرونده",
      dataIndex: "pcrprfVCodeInt",
      align: "center",
    },
    {
      title: "شماره پیش فاکتور",
      dataIndex: "prfNumberStr",
      align: "center",
    },

    {
      title: "کد/شناسه ملی مالک پرونده",
      dataIndex: "prfNationalCode",
      align: "center",
    },
    {
      title: "نام مالک پرونده",
      dataIndex: "prfOwnerName",
      align: "center",
    },
    {
      title: "تاریخ صدور ",
      dataIndex: "prfDate",

      align: "center",
      render: (_, { prfDate }, index) => {
        let datepicker2 = converGregorianDateToJalali(prfDate)
        // const temp = prfDate.split("T")[0];
        // const date = temp.split("-");
        // let day = date[2];
        // let month = date[1];
        // let year = date[0];
        // let datepicker = year + "/" + month + "/" + day;
        return <sapn className="flex-order-row">{datepicker2}</sapn>;
      },
    },
    {
      title: "تاریخ اعتبار ",
      dataIndex: "prfExpireDate",
      align: "center",
      render: (_, { prfExpireDate }, index) => {
        // const temp = prfExpireDate.split(" ")[0];
        // const date = temp.split("/");
        // let day = date[1];
        // let month = date[0];
        // let year = date[2];

        // const temp = prfExpireDate.split("T")[0];
        // const date = temp.split("-");
        // let day = date[2];
        // let month = date[1];
        // let year = date[0];
        // let datepicker = year + "/" + month + "/" + day;
        let datepicker2 = converGregorianDateToJalali(prfExpireDate)
        return <sapn className="flex-order-row">{datepicker2}</sapn>;
      },
    },
    {
      title: "وضعیت درخواست",
      dataIndex: "pcrStatusStr",
      align: "center",
    },
    {
      title: "تاریخ اعمال نتیجه",
      dataIndex: "pcrResultDate",
      align: "center",
      render: (_, { pcrResultDate }, index) => {
        const temp = pcrResultDate.split("T")[0];
        const date = temp.split("-");
        let day = date[2];
        let month = date[1];
        let year = date[0];
        let datepicker = year + "/" + month + "/" + day;
        // let datepicker2=converGregorianDateToJalali(pcrResultDate)

        return <sapn className="flex-order-row">{datepicker}</sapn>;
      },
    },

    {
      title: "جزئیات",
      dataIndex: "detaile",
      align: "center",
      render: (_, { pcrprfVCodeInt }, index) => (
        <div className="flex-order-row">
          <Button
            onClick={() => {
              getDetail(pcrprfVCodeInt);
            }}
            width="100%"

            backgroundColor={themeColors.comments.blue}

            type="secondary">
            <i className="fa fa-search"></i>
            جزئیات
          </Button>
        </div>
      ),

    },
    {
      title: "عملیات",
      dataIndex: "detaile",
      align: "center",
      render: (_, { pcrVCodeInt, pcrNationalCodeStr, pcrStatusTny }, record) => (

        <Dropdown
          disabled={
            pcrStatusTny !== 0
              ? true
              : false
          }
          overlay={
            <Menu>

              <Menu.Item
                disabled={
                  pcrStatusTny !== 0
                    ? true
                    : false
                }
                key="2"
                onClick={(event) =>
                  deleteCartableRow(event, pcrVCodeInt, pcrNationalCodeStr, 1)
                }
              >
                <i className="fa fa-check-square-o" aria-hidden="true"></i> تایید
              </Menu.Item>
              <Menu.Item
                disabled={
                  pcrStatusTny !== 0
                    ? true
                    : false
                }
                key="2"
                onClick={(event) =>
                  deleteCartableRow(event, pcrVCodeInt, pcrNationalCodeStr, 2)
                }
              >
                <i className="fa fa-check-square-o " aria-hidden="true"></i> عدم تایید
              </Menu.Item>

            </Menu>
          }
          trigger={["click"]}
        >
          <a>
            <Button
              disabled={
                pcrStatusTny !== 0
                  ? true
                  : false
              }
              width="100%"
              backgroundColor={themeColors.comments.blue}

              type="secondary"
            >
              {/* <i className="fa fa-search"></i> */}
              عملیات
            </Button>
            {/* <i className="fa fa-angle-down" aria-hidden="true"></i> */}
          </a>
        </Dropdown>
      ),
    },

  ];

  // if (importCodeInt[0]?.importCodeInt === 5 || importCodeInt[0]?.importCodeInt === 6) {

  //   const columnNameToRemove = "plbDescritpionStr";

  //   const columnIndexToRemove = columns.findIndex(column => column.dataIndex === columnNameToRemove);

  //   if (columnIndexToRemove !== -1) {
  //     columns.splice(columnIndexToRemove, 1);
  //   }
  // }
  const deleteCartableRow = (event, pcrVCodeInt, pcrNationalCodeStr, id) => {
    setIdForQuestionModal(id);
    setIsOpenQuestionModal(true);

    // setQuestionModalMode("CANCELLATION");
    setpcrVCodeInt(pcrVCodeInt);
    setpcrNationalCodeStr(pcrNationalCodeStr)
  };

  return (
    <>
      <span className="page-size-combo">
        <label className="page-size-combo--label" htmlFor="page-size">
          نمایش محتویات
        </label>
        <select
          className="page-size-combo--selector"
          id="page-size"
          value={tableParams.pagination.pageSize}
          onChange={handleChangePageSize}
        >
          <option
            value="10"
            style={{
              backgroundColor: themeColors[theme]?.bg,
            }}
          >
            10
          </option>
          <option
            value="25"
            style={{
              backgroundColor: themeColors[theme]?.bg,
            }}
          >
            25
          </option>
          <option
            value="50"
            style={{
              backgroundColor: themeColors[theme]?.bg,
            }}
          >
            50
          </option>
          <option
            value="100"
            style={{
              backgroundColor: themeColors[theme]?.bg,
            }}
          >
            100
          </option>
        </select>
      </span>
      <Table
        id="Table"
        dataSource={dataSource}
        columns={columns}
        pagination={tableParams.pagination}
        // loading={loading}
        onChange={handleTableChange}
        onHeaderRow={() => {
          return {
            style: { backgroundColor: colorMode },
          };
        }}
      />
      <Modal
        className="questionModal"
        style={{
          backgroundColor: themeColors[theme]?.menueBg,
          color: themeColors[theme]?.text,
        }}
        width={500}
        open={isOpenQuestionModal}
        onCancel={modalClose
          //  setIsOpenQuestionModal(false)     setEjectMsg(false)
        }
        title={
          idForQuestionModal == 1 ? (
            "تایید درخواست"
          ) : (
            "عدم تایید درخواست"
          )

        }
        footer={[
          <span
            style={{ padding: "5px", gap: "5px" }}
            className="flex-order-row-justify-start"
          >
            <Button
              backgroundColor={themeColors.btn.secondary}
              onClick={() => {
                idForQuestionModal == 1 ?
                  (
                    // کال کردن سرویس برای تغییر وضعیت
                    okFORconfirm(1)
                  )
                  : idForQuestionModal == 2 ?
                    (
                      gg(2)
                    )
                    :
                    (
                      modalClose()
                    )
              }}
            >
              {ejectMsg && "تایید"}
              {!ejectMsg && "بله"}

            </Button>
            <Button
              backgroundColor={themeColors.btn.danger}
              onClick={() => {
                idForQuestionModal == 1 ? (
                  // هیچ کار
                  modalClose()
                )
                  : idForQuestionModal == 2 ?
                    (
                      // هیچ کار
                      modalClose()
                      // setEjectMsg(false)


                    )
                    :
                    (
                      modalClose()

                    )
              }}
            >
              {ejectMsg && "انصراف"}
              {!ejectMsg && "خیر"}
            </Button>
          </span>,
        ]}

      >
        {idForQuestionModal === 1 ? (

          <p className="modal--text">
            تایید این درخواست به منزله تایید واردات مواد اولیه واحد تولیدی شما از طریق پرونده مشخص شده در این درخواست می‌باشد. آیا مایل به ادامه فرایند می‌باشید؟
          </p>

        ) :


          idForQuestionModal === 2 ? (
            <div>
              <p className="modal--text">
                با انتخاب این گزینه وضعیت درخواست جاری به «عدم تایید درخواست» تغییر یافته و دیگر امکان بازگشت به گام قبلی به هیچ عنوان وجود نخواهد داشت َآیا از ادامه فرایند مطمئن هستید؟
              </p>
              {
                ejectMsg &&
                <p className="modal--text">
                  لطفا علت رد درخواست خود را بیان کنید :
                  <Input
                    title="دلیل ابطال"
                    type="textarea"
                    name="ReasonCancellation"
                    // value={pcrDescription}
                    onChange={handlechange}
                    validations={[["digits", 4]]}
                  // error={errors?.ReasonCancellation}
                  />
                </p>

              }
            </div>


          ) : null}


        {/*(
        <Row className="form">
          <Col sm={24} md={24} xl={24}>
            <DatePicker
              title="تاریخ اتمام"
              name="date"
              onChange={handleChangeInputs}
              value={inputsData?.date}
              validations={[["required"]]}
              error={errors?.date}
            />
          </Col>
        </Row>
      )} */}
      </Modal>
      <ProductUnitDetailsModal convertDate={convertDate} detailData={detailData} openModal={openModal} setOpenModal={setOpenModal}
      // dataSource={dataSource}
      // setDataSource={setDataSource}
      />
      {/* {isOpenQuestionModal && (
        <QuestionModalWithSignature
          isModalOpen={isOpenQuestionModal}
          setIsModalOpen={setIsOpenQuestionModal}
          mode={questionModalMode}
          id={idForQuestionModal}
          getTable={getTable}
        />
      )} */}

    </>
  );
};

export default ProductionUnitTable;
