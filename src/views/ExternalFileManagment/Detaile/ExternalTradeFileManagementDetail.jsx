import React, { useState } from "react";
import axios from "axios";
import { VerticalSpace, QuestionModal, TitleBox } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import Tab from "./Tabs/Tab";
import { endpoints } from "../../../services/endpoints";
import { useEffect } from "react";
import { useLocation } from "react-router";
import {
  handleLoading,
  handleMessageModal,
  handleDetailId
} from "../../../state/action-creators";
import ETFMDetaileButtons from "./ETFMDetaileButtons";
import ExTrFields from "./ExTrFields";
import DetailsSteps from "./detailsSteps";
import BolsStruct from "./BolsStruct";
import { Col, DatePicker, Row } from "antd";
import themeColors from "../../../configs/theme";
import GhabzAnbarStruct from "./GhabzAnbarStruct";

const ExternalTradeFileManagementDetail = () => {
  const { theme, questionModal, GUid, role, handleDetailExternal } = useSelector((state) => state);
  const [detailId, setDetailId] = useState(undefined);
  const { search, pathname } = useLocation();
  const dispatch = useDispatch();
  const [hasMounted, setHasMounted] = useState(false);
  const [detailExternal, setDetailExternal] = useState([]);
  const [infoExtTab, setInfoExtTab] = useState([]);
  const [personalInfo, setPersonalInfo] = useState([])
  const [permitDetailList, setPermitDetailList] = useState([])
  // -> تنظیم  اطلاعات ثبت سفارش پرونده ها
  const getRegedOrderDetail = () => {
    const id = search.split("=")[2];
    localStorage.setItem("fileNumbExt", id);
    const postData = {
      urlVCodeInt: role,
      ssdsshGUID: GUid,
      prfVCodeInt: id,
    };
    dispatch(handleLoading(true));
    axios({
      url: endpoints.RestAPIs.Proforma.getRegedOrderDetail.url,
      method: endpoints.RestAPIs.Proforma.getRegedOrderDetail.method,
      data: postData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          dispatch(
            handleDetailId({
              prfVCode: res?.data?.Result?.proformaStruct?.prfVCodeInt,
              status: res?.data?.Result?.proformaStruct?.prfStatusTny,
            })
          )
          setDetailExternal({
            prfOrderNoStr: res?.data?.Result?.activeStatusAndStatusList?.prfOrderNoStr,
            AllRes: res?.data?.Result,
            ActiveStatusList: res?.data?.Result?.activeStatusAndStatusList,
            proformaLevelChanges: res?.data?.Result?.proformaLevelChanges,
            prfLevelTny: res?.data?.Result?.proformaStruct?.prfLevelTny,
            NumberFile: res.data?.Result?.proformaStruct?.prfVCodeInt,
            NumberInvoice: res.data?.Result?.proformaStruct?.prfNumberStr,
            ActiveStatusStr: res.data?.Result?.proformaStruct?.prfLevelStr,
            AccessDocuments: res.data?.Result?.proformaStruct?.prfLevelTny,
            ImportGoodType: res.data?.Result?.proformaStruct?.prfImportGoodType,
            SellerNameEnStr: res.data?.Result?.proformaStruct?.prfSellerNameEnStr,
            CountryNameStr: res.data?.Result?.proformaStruct?.prfCountryNameStr,
            SellerTellStr: res.data?.Result?.proformaStruct?.prfSellerTellStr,
            ExpireDate: res.data?.Result?.proformaStruct?.prfExpireDate,
            Descritpion: res.data?.Result?.proformaStruct?.plbDescritpionStr,
            branch: res.data?.Result?.proformaStruct?.bchAdrsStr,
            CntVCodeStr: res.data?.Result?.proformaStruct?.prfcntVCodeStr,
            Registrant: res.data?.Result?.proformaStruct?.registrant,
            FDate: res.data?.Result?.proformaStruct?.prfDate,
            PrfimtVCodeStr: res.data?.Result?.proformaStruct?.prfimtVCodeStr,
            CurrencyTypeStr: res.data?.Result?.proformaStruct?.prfCurrencyTypeStr,
            totalAllFile: res.data?.Result?.proformaStruct?.prfTotalPriceMny,
            IsBankOPStr: res.data?.Result?.proformaStruct?.prfIsBankOPStr,
            LctNameStr: res.data?.Result?.proformaStruct?.prflctNameStr,
            OrderNoStr: res.data?.Result?.proformaStruct?.prfOrderNoStr,
            carryOften: res.data?.Result?.proformaStruct?.prfTransportCountStr,
            LoadingPlace: res.data?.Result?.proformaStruct?.prfLoadingPlaceStr,
            RegedOrderDate: res.data?.Result?.proformaStruct?.RegedOrderDate,
            RegedOrderExpireDate: res.data?.Result?.proformaStruct?.RegedOrderExpireDate,
            TransportCountTny: res.data?.Result?.proformaStruct?.prfTransportCountTny,
            prfActiveStatusTny: res.data?.Result?.proformaStruct?.prfActiveStatusTny,
            prfStatusTny: res.data?.Result?.proformaStruct?.prfStatusTny,
            bank: res.data?.Result?.proformaStruct?.bnkNameStr,
            prfSubStatusInt: res.data?.Result?.proformaStruct?.prfSubStatusInt,
            prfSubActiveStatus: res.data?.Result?.proformaStruct?.prfSubActiveStatus,
            requestStatus: res?.data?.Result?.requestStatus,
            FIDACodeStr: res?.data?.Result.proformaStruct?.fdrFIDACodeStr,
            TransportationCosts: res?.data?.Result?.proformaStruct?.prfFreightCostMny,
            otherCosts: res?.data?.Result?.proformaStruct?.prfOtherCostMny,
            Discount: res?.data?.Result?.proformaStruct?.prfDiscountFlt,
            BOLsStruct: res?.data?.Result?.proformaStruct?.profBOLsStruct,
            GhabzAnbarStruct: res?.data?.Result?.proformaStruct?.profGhabzAnbarStruct,
            DescritpionStr: res?.data?.Result?.proformaStruct?.plbDescritpionStr,
            transportFleet: res?.data?.Result?.proformaStruct?.prfTransportNationTypeStr,
            PriorityTny: res?.data?.Result?.proformaStruct?.prfPriorityTny,
            EntranceBorder: res.data?.Result?.proformaStruct?.prfBordersList?.map(item => { return item?.prfBorderStr }),
            shippingMethod: res.data?.Result?.proformaStruct?.prftptList?.map(item => { return item?.tptNameStr }),
            destinationCustoms: res.data?.Result?.proformaStruct?.prfctmList?.map(item => { return item?.ctmNameStr }),
            ShippingOriginCountries: res.data?.Result?.proformaStruct?.prfSourseList?.map(item => { return item?.prfSourceStr })
          });
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
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };




  // -> تنظیم تب اطلاعات ثبت سفارش پرونده ها
  const getCommodityTab = () => {
    const id = search.split("=")[2];
    try {
      const postData = {
        pState: "",
        pDateF: "",
        pDateT: "",
        ptxtSearch: "",
        pStartIndex: 0,
        pPageSize: 10,
        pSortBy: "",
        PrfvcCodeInt: id,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      };
      dispatch(handleLoading(true));
      axios({
        url: endpoints.RestAPIs.Proforma.getProformaGoodsList.url,
        method: endpoints.RestAPIs.Proforma.getProformaGoodsList.method,
        data: postData,
      }).then((res) => {
        if (res?.data?.Error === 0) {
          setInfoExtTab(res?.data?.GoodsList);
        }
        dispatch(handleLoading(false));
      });
    } catch (error) {
      console.log(error);
      dispatch(handleLoading(false));
    }
  };

  useEffect(() => {
    if (pathname.toLowerCase().includes("detail")) {
      setDetailId(search.split("=")[2]);
      getRegedOrderDetail();
      getCommodityTab();
    }
  }, []);



  useEffect(() => {
    setHasMounted(true);
  }, []);



  return (
    <>
      {questionModal.isModalOpen && <QuestionModal />}
      <div className="nav-AgenciesChain">
        <form className="form">
          <DetailsSteps
            prfStatusTny={detailExternal?.prfStatusTny}
            prfActiveStatusTny={detailExternal?.prfActiveStatusTny}
          />
          <ExTrFields
            detailExternal={detailExternal}
          />
        </form>
        {detailExternal?.BOLsStruct?.length > 0 && (
          <>
            <BolsStruct detailExternal={detailExternal} />
          </>
        )}

        {detailExternal?.GhabzAnbarStruct?.length > 0 && <><GhabzAnbarStruct detailExternal={detailExternal} /></>}
        <hr style={{ border: "1px solid #e5e5e5" }} />
        <div className="btnDiv">
          <ETFMDetaileButtons
            detailExternal={detailExternal}
            detailId={detailId}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            setPermitDetailList={setPermitDetailList}
            getCommodityTab={getCommodityTab}
            getRegedOrderDetail={getRegedOrderDetail}
            setDetailExternal={setDetailExternal}
            permitDetailList={permitDetailList}
          />
        </div>
        <VerticalSpace space="1rem" />
        <Tab
          infoExtTab={infoExtTab}
          latestRequests={detailExternal?.requestStatus}
          activeStatusAndStatusList={detailExternal?.ActiveStatusList}
          proformaLevelChanges={detailExternal?.proformaLevelChanges}
        />
      </div>
    </>
  );
};

export default ExternalTradeFileManagementDetail;
