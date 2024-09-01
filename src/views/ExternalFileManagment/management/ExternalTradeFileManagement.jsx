import { Col, Row, Tooltip } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Validation from "../../../utils/Validation";
import ETFM_Table from "./ETFM_Table";
import {
  Input,
  VerticalSpace,
  DatePicker,
  ComboBox,
  Button,
} from "../../../components";

import themeColors from "../../../configs/theme";
import { endpoints } from "../../../services/endpoints";
import { useDispatch, useSelector } from "react-redux";
import QuickGuide from "../../../components/QuickGuide";
import convert from "../../../configs/helpers/convert";
import CreateNewProforma from "./CreateNewProforma";
import { handleLoading } from "../../../state/action-creators";
import ExcelExportButton from "../../../common/ExcelExportCommon";
const ExternalTradeFileManagement = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [errors, setErrors] = useState({});
  //  --------------------------------------------start
  const [inputsValue, setInputsValue] = useState(0);
  //  --------------------------------------------end
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comboStatus, setComboStatus] = useState([]);
  const [comboSort, setComboSort] = useState([]);
  const [dataSource, setDataSource] = useState(undefined);
  const [appHasMounted, setAppHaMounted] = useState(false);
  const { GUid, role } = useSelector(
    (state) => state
  );


  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  });


  const steps = [
    {
      element: "#Table",
      intro:
        "کاربر گرامی پیش فاکتور های موجود به جزئیات لیست شده است، در صورت زدن دکمه جزئیات در هر سطر جزئیات بیشتری از پیش فاکتور همان سطر را مشاهده می کنید، اعمال مربوط به پیش فاکتور نیز در آن صفحه انجام میگیرد.",
      position: "right",
    },
    {
      element: "#Nav",
      intro:
        "در صورتی که پیش فاکتور مد نظر شما در لیست نبود می توانید به صورت اختصاصی با فیلتر های موجود جستجو کنید.",
      position: "right",
    },
    {
      element: "#NewFile",
      intro:
        "در صورت نیاز می توانید با این دکمه به صفحه ایجاد پیش فاکتور جدید منتقل شوید.",
      position: "right",
    },
  ];

  const permitForNextStep = (inputsName = []) => {
    for (var key in errors) {
      if (errors[key]?.length > 0) {
        return false;
      }
    }
    return true;
  };

  const search = (event) => {
    event.preventDefault();
    if (permitForNextStep(["DateT", "DateF"])) {
      if (tableParams.pagination.current === 1) {
        getTable();
      } else {
        setTableParams({
          pagination: {
            current: 1,
            pageSize: 25,
          },
        });
      }
    }
  };

  const ItemModalHandler = (event) => {
    event.preventDefault();
    setEnabled(!enabled);
  };

  const handleChangeInputs = (name, value, validationNameList, event) => {
    setInputsValue(value);
    if (name === "DateF") {
      if (Validation.minimumDate(filters?.DateT, value) === true) {
        setErrors({
          ...errors,
          DateT: [],
        });
      } else {
        setErrors({
          ...errors,
          DateT: Validation.minimumDate(filters?.DateT, value),
        });
      }
    } else if (name === "DateT") {
      if (Validation.maximumDate(filters?.DateF, value) === true) {
        setErrors({
          ...errors,
          DateF: [],
        });
      } else {
        setErrors({
          ...errors,
          DateF: Validation.maximumDate(filters?.DateF, value),
        });
      }
    }
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
  };

  const handleChangePageSize = (event, id) => {
    event.preventDefault();
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        pageSize: Number(event.target.value) || 0,
        current: 1,
      },
    });
  };

  const getDataforExcel = (handleDownloadExcel) => {
    const postData = {
      withComboData: true,
      pState: filters?.status || "",
      pDateF: convert(filters?.DateF),
      pDateT: convert(filters?.DateT),
      ptxtSearch: filters?.grantor || "",
      pStartIndex: 0,
      pPageSize: 10000,
      pSortBy: filters?.sort || "",
      PrfVCodeInt: 0,
      prfplbVCodeInt: "",
      prfromVCodeInt: "",
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.NTSW_ProformaListforma.url,
      method: endpoints.RestAPIs.Proforma.NTSW_ProformaListforma.method,
      data: postData,
    })
      .then((res) => {
        const bodyData = [];
        res?.data?.Result?.PerformaList.map((itm) =>
          bodyData.push([
            itm?.prfVCodeInt,
            itm?.prfNumberStr,
            itm?.prfDate,
            itm?.prfExpireDate,
            itm?.prfSellerNameEnStr,
            itm?.prfCountryNameStr,
            itm?.prfTotalPriceMny,
            itm?.prfCurrencyTypeStr,
            itm?.prfIsBankOPStr,
            itm?.prfStatusStr,
            itm?.registrant,
            itm?.prfStatusTny,
            itm?.romDescritpionStr,
          ])
        );
        const headerRowData = [
          "شماره پرونده",
          "شماره پیش فاکتور",
          "تاریخ صدور پیش فاکتور",
          "تاریخ اعتبار پیش فاکتور",
          "فروشنده خارجی",
          "کشور ذینفع",
          "مبلغ کل پیش فاکتور",
          "نوع ارز",
          "نوع عملیات ارزی",
          "وضعیت",
          "ثبت کننده",
          "شماره ثبت سفارش",
          "برچسب پرونده",
        ]
        handleDownloadExcel(headerRowData, bodyData, "NTSW_ExportCurrencyReques");

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTable = (mode) => {
    dispatch(handleLoading(true));
    const postData = {
      withComboData: true,
      pState: filters?.status || "",
      pDateF: convert(filters?.DateF),
      pDateT: convert(filters?.DateT),
      ptxtSearch: filters?.grantor || "",
      pStartIndex: tableParams?.pagination?.current - 1,
      pPageSize: tableParams?.pagination?.pageSize,
      pSortBy: filters?.sort || "",
      PrfVCodeInt: 0,
      prfplbVCodeInt: "",
      prfromVCodeInt: "",
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    setLoading(true);
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.NTSW_ProformaListforma.url,
      method: endpoints.RestAPIs.Proforma.NTSW_ProformaListforma.method,
      data: postData,
    })
      .then((res) => {
        if (mode === "FIRST_TIME") {
          const optionsStatus = [];
          const sortStatus = [];

          const optionsTemp = Object.entries(res?.data?.Result?.ProformaStatus);
          optionsTemp.map((item) =>
            optionsStatus.push({ id: item[0], name: item[1] })
          );
          setComboStatus([{ id: "", name: "همه" }, ...optionsStatus]);

          const sortTemp = Object.entries(
            res?.data?.Result?.ProformaActiveStatus
          );
          sortTemp.map((itm) => sortStatus?.push({ id: itm[0], name: itm[1] }));
          setComboSort([{ id: "", name: "همه" }, ...sortStatus]);
        }
        setDataSource(res?.data?.Result?.PerformaList || []);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res?.data.Result?.PerformaListCount || 0,
          },
        });
        setLoading(false);
        dispatch(handleLoading(false));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        dispatch(handleLoading(false));
      });
  };

  useEffect(() => {
    if (appHasMounted) {
      setDataSource([]);
      getTable();
    }
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  useEffect(() => {
    setAppHaMounted(true);
    setDataSource([]);
    getTable("FIRST_TIME");
  }, []);



  return (
    <QuickGuide enabled={enabled} setEnabled={setEnabled} steps={steps}>
      <form className="form">
        <Row>
          <CreateNewProforma />
        </Row>
        <VerticalSpace space="0.5rem" />
        <Row id="Nav">
          <Col sm={24} md={12} xl={6}>
            <ComboBox
              title="وضعیت"
              name="status"
              value={filters?.status}
              onChange={handleChangeInputs}
              options={comboStatus}
              width="180px"
              defaultValue={filters?.status ? filters?.status : ""}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <ComboBox
              title="انتخاب پرونده ها"
              name="sort"
              value={filters?.sort}
              onChange={handleChangeInputs}
              options={comboSort}
              defaultValue={filters?.sort ? filters?.sort : ""}
              width="180px"
            />
          </Col>
          <Col sm={24} md={12} xl={6}>

            <DatePicker
              title="صدور از تاریخ"
              name="DateF"
              onChange={handleChangeInputs}
              value={filters?.DateF}
              validations={[["maximumDate", filters?.DateT]]}
              error={errors?.DateF}
              type={"en"}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <DatePicker
              title="تا تاریخ"
              name="DateT"
              onChange={handleChangeInputs}
              value={filters?.DateT}
              validations={[["minimumDate", filters?.DateF]]}
              error={errors?.DateT}
              type={"en"}
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <Input
              onChange={handleChangeInputs}
              title="متن جستجو"
              type="text"
              validations={[["maxLength", 54]]}
              name="grantor"
              value={filters?.grantor}
              labelWidth="190px"
            />
          </Col>
          <Col sm={24} md={12} xl={6}>
            <span className="flex-order-row-justify-start">
              <Button loading={loading} onClick={(event) => search(event)}>
                <i className="fa fa-search" aria-hidden="true"></i>
                جستجو
              </Button>
              <Tooltip title="راهنمای سریع" color={themeColors.comments.green}>
                <span>
                  <Button
                    onClick={ItemModalHandler}
                    backgroundColor={themeColors.comments.green}
                  >
                    <i class="fa fa-info" aria-hidden="true"></i>
                  </Button>
                </span>
              </Tooltip>
              <ExcelExportButton getData={getDataforExcel} />
            </span>
          </Col>
        </Row>
      </form>
      <VerticalSpace space="0.5rem" />
      <ETFM_Table
        inputsValue={inputsValue}
        dataSource={dataSource}
        setDataSource={setDataSource}
        handleChangePageSize={handleChangePageSize}
        setTableParams={setTableParams}
        tableParams={tableParams}
      />
    </QuickGuide>
  );
};

export default ExternalTradeFileManagement;
