import axios from "axios";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import themeColors from "../../../../configs/theme";
import Validation from "../../../../utils/Validation";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Modal, Row } from "antd";
import { endpoints } from "../../../../services/endpoints";
import {
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import { Button, Input, Upload, VerticalSpace } from "../../../../components";
import { useRef } from "react";
import { margin } from "@mui/system";

const AddingGoodsWithExcel = ({ prfVCodeInt, getTable, proformaStatus, data, setData }) => {
  const dispatch = useDispatch();
  const { theme, role, GUid } = useSelector((state) => state);
  const [hrefForPrevDoc, setHrefForPrevDoc] = useState();
  const inputRef = useRef(null);

  const [inputsData, setInputsData] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleChangeInputs = (name, value, validationNameList = [], event) => {
    const temp = [];
    validationNameList &&
      validationNameList.map((item) => {
        if (Validation[item[0]](value, item[1], item[2]) === true) {
        } else {
          temp.push(Validation[item[0]](value, item[1], item[2]));
        }
      });
    setErrors((prevstate) => {
      return {
        ...prevstate,
        [name]: [...temp],
      };
    });
    setInputsData((prevstate) => {
      return {
        ...prevstate,
        [name]: value,
      };
    });
  };

  const handleShowModal = (event) => {
    event?.preventDefault();
    setIsShowModal(true);
  };

  const download = (event) => {
    event?.preventDefault();
    if (!!!inputsData?.hsCode) {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: "شماره تعرفه مورد نظر را وارد نمایید",
          type: "warning",
          title: "هشدار",
        })
      );
    } else if (errors.hsCode.length !== 0) {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: "تعرفه وارد شده غیر فعال/اشتباه می باشد",
        })
      );
    } else {
      excelGenerator();
    }
  };

  const excelGenerator = () => {
    dispatch(handleLoading(true));
    const postData = {
      prfVCodeInt: prfVCodeInt,
      gdsHSCode: inputsData?.hsCode,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.excelGenerator.url,
      method: endpoints.RestAPIs.Proforma.excelGenerator.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          saveAsXlsxFile(res?.data?.Result);
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  const saveAsXlsxFile = (mediaType) => {
    const raw = window.atob(mediaType);
    const rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    var data = new Blob([array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    setHrefForPrevDoc(window.URL.createObjectURL(data));
  };

  useEffect(() => {
    if (!!hrefForPrevDoc && !!inputRef?.current?.href) {
      inputRef?.current?.click();
    }
  }, [hrefForPrevDoc]);

  const upload = (event) => {
    event.preventDefault();
    if (!!!inputsData?.doc) {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: "ابتدا فایل موردنظر خود را بارگذاری نمایید",
        })
      );
    } else if (!!inputsData?.doc && errors?.doc?.length === 0) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const headerObj = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          defval: '',
        });
        const json = XLSX.utils.sheet_to_json(ws);
        let allHeaders = {}
        headerObj[0].map(headerTitle => allHeaders[headerTitle] = '')
        insertProformaGoods(json, allHeaders);
      };
      reader.readAsBinaryString(inputsData?.doc);
    } else {
      dispatch(
        handleMessageModal({
          isModalOpen: true,
          describe: errors?.doc[0],
        })
      );
    }
  };

  const insertProformaGoods = (excelData, allHeaders) => {
    dispatch(handleLoading(true));
    const temp = []
    excelData.map(item => temp.push({
      ...allHeaders,
      ...item,
      '': undefined
    }))
    const postData = {
      prfVCodeInt: prfVCodeInt,
      ExcelGoods: temp,
      FuncType: 2,
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      Good: null,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.insertProformaGoods.url,
      method: endpoints.RestAPIs.Proforma.insertProformaGoods.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          dispatch(
            handleMessageModal({
              type: "success",
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
          if (proformaStatus > 1) {
            const temporaryForSuspendGoods = res?.data?.ProformaGoodWrapper?.goods.map(item => item?.pfgVCodeLng)
            setData({
              ...data,
              Goods: [
                ...res?.data?.ProformaGoodWrapper?.goods?.map(goods => {
                  return (
                    {
                      ...goods,
                      SuspendedGoods: true,
                    }
                  )
                }),
                ...data?.Goods,
              ],
              findSuspendGoods: data?.findSuspendGoods
                ? [
                  ...data.findSuspendGoods,
                  ...temporaryForSuspendGoods,
                ]
                : [...temporaryForSuspendGoods],
            });
          } else {
            getTable();
          }
          setInputsData({
            ...inputsData,
            inputsData: undefined,
            doc: undefined,
            hsCode: undefined
          })
          setHrefForPrevDoc();
          setIsShowModal(false)
          setErrors({})
        } else {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
        }
        dispatch(handleLoading(false));

      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  const handleCancelModal = (event) => {
    event.preventDefault();
    setIsShowModal(false);
    setInputsData({
      ...inputsData,
      inputsData: undefined,
      doc: undefined,
      hsCode: undefined
    })
    setErrors({})
    setHrefForPrevDoc();
  }
  return (
    <>
      <Button onClick={handleShowModal} width="198px">
        <i class="fa fa-file-excel-o" aria-hidden="true"></i>
        افزودن کالا از طریق فایل اکسل
      </Button>
      {isShowModal && (
        <Modal
          style={{
            backgroundColor: themeColors[theme]?.menueBg,
            color: themeColors[theme]?.text,
          }}
          centered
          title="انتخاب فایل اکسل کالاها"
          open={isShowModal}
          onCancel={handleCancelModal}
          width={700}
          footer={null}
        >
          {
            <form style={{ padding: "0 20px" }}>
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <Input
                    title="شماره تعرفه"
                    placeholder="شماره تعرفه را وارد نمایید"
                    name="hsCode"
                    value={inputsData?.hsCode}
                    labelWidth="165px"
                    onChange={handleChangeInputs}
                    validations={[["digits", 8], ["required"]]}
                    error={errors?.hsCode}
                    space="6px"
                  />
                  <a
                    href={hrefForPrevDoc}
                    download={inputsData?.hsCode}
                    ref={inputRef}
                  ></a>
                </Col>
              </Row>
              <span className="flex-order-row-justify-end" style={{ margin: '0 0 0 20px' }}>
                <Button onClick={download}>
                  <i class="fa fa-download" aria-hidden="true"></i>
                  دانلود فایل با کد تعرفه
                </Button>
              </span>
              <VerticalSpace space="1rem" />
              <Row>
                <Col sm={24} md={24} xl={24}>
                  <p className="text-small text-small--bold">
                    سپس از اینجا آپلود نمایید.
                  </p>
                </Col>
                <VerticalSpace space="1.5rem" />

                <Col sm={24} md={24} xl={24}>
                  <Form.Item name="doc" style={{ margin: "0" }}>
                    <Upload
                      error={errors?.doc}
                      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      validations={[
                        [
                          "fileFormat",
                          [
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            "application/vnd.ms-excel",
                          ],
                          "xlsx,xls",
                        ],
                        ["fileSize", 2000],
                      ]}
                      title="مستند"
                      buttonTittle="انتخاب فایل اکسل..."
                      buttonWidth="160px"
                      name="doc"
                      onChange={handleChangeInputs}
                      placeholder="فایل موردنظر را انتخاب کنید..."
                      defaultFile={inputsData?.doc}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <span className="flex-order-column-justify-center">
                <Button onClick={upload}>ثبت مستندات با کد تعرفه</Button>
              </span>
              <VerticalSpace space="2rem" />
              <span className="flex-order-row-justify-end">
                <Button
                  backgroundColor={themeColors.btn.danger}
                  onClick={handleCancelModal}
                >
                  انصراف
                </Button>
              </span>
            </form>
          }
        </Modal>
      )}
    </>
  );
};

export default AddingGoodsWithExcel;
