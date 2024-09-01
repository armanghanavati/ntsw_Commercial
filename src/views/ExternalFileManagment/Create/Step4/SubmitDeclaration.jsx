import React from "react";
import { Button, VerticalSpace } from "../../../../components";
import { Col, Modal, Row } from "antd";
import themeColors from "../../../../configs/theme";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handelQuestionModal,
  handleLoading,
  handleMessageModal,
} from "../../../../state/action-creators";
import { useEffect } from "react";
import { Upload } from "../../../../components";
import Validation from "../../../../utils/Validation";
import { endpoints } from "../../../../services/endpoints";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import convert from "../../../../configs/helpers/convert";
import { timeout } from "q";
import converGregorianDateToJalali from "../../../../configs/helpers/convert-jalali-date-to-gregorian copy";

const SubmitDeclaration = ({
  editingId,
  filters,
  setFilters,
  setModalMode,
  modalMode,
}) => {
  const { questionModal, GUid, role } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasMounted, setHasMounted] = useState(false);

  const submit = (event) => {
    event?.preventDefault();
    if (filters?.status > 1) {
      validateEdit();
    } else {
      history.push("/Users/AC/Commercial/ExternalTradeFileManagement");
    }
  };


  const validateEdit = () => {
    const setTimeInMethode = () => {
      const abortCntoller = new AbortController();
      setTimeout(() => abortCntoller.abort(), timeout || 0);
      return abortCntoller.signal;
    };
    dispatch(handleLoading(true));
    const docs = [];
    filters.Docs.map((item) => {
      if (!!item?.DOC) {
        docs.push({
          docCaptionStr: item?.Caption,
          docFormat: item?.Caption.split(".")[1],
          DOCS: item?.DOC,
        });
      }
    });
    const EditList = [];

    filters?.allGoods?.map((item) => {
      EditList.push({
        prfVCodeInt: item?.prfVCodeInt,
        pfgprfVCodeInt: item?.prfVCodeInt,
        gdsHSCode: item?.gdsHSCode,
        pfgCommercialDescStr: item?.pfgCommercialDescStr,
        pfgCommercialDescEnStr: item?.pfgCommercialDescEnStr,
        // static
        pfgStaticCommercialDescStr: null,
        pfgStaticCommercialDescEnStr: null,
        pfgTechnicalSpecStr: item?.pfgTechnicalSpecStr,
        // وجود ندارد
        pfgManufractureStr: item?.prfManufractureStr,
        // وجود ندارد
        pfgManufractureCode: 0,
        pfgStandardStr: item?.pfgStandardStr,
        pfgmsuVCodeTny: item?.pfgmsuVCodeTny,
        pfgCountInt: item?.pfgCountInt,
        pfgProductionDate: item?.pfgProductionDate,
        pfgFOBPriceMny: item?.pfgFOBPriceMny,
        pfgGoodsStatusTny: item?.pfgGoodsStatusTny,
        pfgNetWeightInt: item?.pfgNetWeightInt,
        pfgGrossWeightInt: item?.pfgGrossWeightInt,
        pfgpckVCodeInt: item?.pfgpckVCodeInt,
        pfgVCodeLng: item?.pfgVCodeLng,
        gcdVCodeInt: item?.gcdVCodeInt,
        // وجود ندارد
        sgdVCodeInt: 0,
        pfggdsVCodeInt: item?.pfggdsVCodeInt,
        pfgStatusStr: item?.pfgStatusStr,
        cmpIRCCodeStr: item?.cmpIRCCodeStr,
        pfgDiscountMny: item?.pfgDiscountMny,
        pfgCIDTypeTny: item?.pfgCIDTypeTny,
        pfgDescriptionStr: item?.pfgDescriptionStr,
        // وجود ندارد
        OrgCode: item?.pfgOrgIDCodestr,
        pfggcdOrgIDInt: item?.pfggcdOrgIDInt,
        pfgCIDTypeOrgTny: item?.pfgCIDTypeOrgTny,
        // وجود ندارد
        pfgIsCandleOnTny: 1,
        // وجود ندارد
        EdditingStatus: 0,
        gdsHSDescStr: item?.gdsHSDescStr,
        gdsPriorityTny: item?.gdsPriorityTny,
        gdsTariffTny: item?.gdsTariffTny,
        // وجود ندارد
        pfgVersionTny: 0,
        // وجود ندارد
        pfgProductionYear: item?.pfgProductionDate,
        pfgConsumeTypeTny: item?.pfgConsumeTypeTny,
        // وجود ندارد
        pfgInsertDate: "",
        // وجود ندارد
        pfgdescStrCount: 0,
        // وجود ندارد
        pfgdescENStrCount: 0,
        pfgTraceCodeLng: item?.pfgTraceCodeLng,
        ProformaGoodsCountries: item?.ProformaGoodsCountries.map(
          (item) => item?.cnyVCodeInt
        ),
        pfgDepreciated: item?.pfgDepreciated,
        GoodsOtherPropertiesList: item?.GoodsOtherPropertiesList,
      });
    });
    const formData = {
      SuspendPermitOrganizationList: [],
      prfVCodeInt: Number(editingId),
      // ویزارد یک
      BaseInfo: {
        prfVCodeInt: Number(editingId),
        // شماره پیش فاکتور
        ProformaNumberStr: filters?.numberInvoice,
        //کشور ذینفع int
        BeneficiaryCountryProformaInt: filters?.beneficiaryCountry,
        //تاریخ صدور
        IssueDateProformaStr: convert(filters?.DateF),
        // تاریخ انقضا
        ExpiriationDateProformaStr: convert(filters?.DateT),
        FidaVCodeInt: filters?.FidaVCodeIntCode,
        //شناسه کسب و کار
        BusinessIDStr: "",
        //کد نوع ثبت سفارش
        prfromVCodeInt: 0,
        // نوع کالای وارداتی
        prfImportGoodsType: filters?.TypeOfImportedGoods,
        prfProvinceCodeInt: null,
        // نوع واحد فعالیت
        prfProvinceTypeInt: 0,
        ProformaActivityUnitVM: {},
        // کد شیما
        ActivityShimaCodeList: filters?.ActivityShimaCodeListCode,
        EnegyLicensesList: {},
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
      // ویزارد دو
      TransportInfo: {
        prfVCodeInt: Number(editingId),
        // نوع قرارداد
        prfcntVCodeInt: filters?.contractType,
        // نوع حمل و نقل
        ProformaTransportTypeList: Array.isArray(filters?.shippingMethods)
          ? filters?.shippingMethods
          : [filters?.shippingMethods],
        // مرز ورودی
        ProformaBordersList: Array.isArray(filters?.EntranceBorder)
          ? filters?.EntranceBorder
          : [filters?.EntranceBorder],
        // گمرک مقصد
        ProformaDestinationCustomsList: Array.isArray(
          filters?.DestinationCustoms
        )
          ? filters?.DestinationCustoms
          : [filters?.DestinationCustoms],
        //کشور مبدا
        ProformaSourcesList: Array.isArray(filters?.CountryOfOriginOfShipment)
          ? filters?.CountryOfOriginOfShipment
          : [filters?.CountryOfOriginOfShipment],
        // ناوگان حمل و نقل
        prfTransportNationTypeTny: filters?.TransportFleet,
        // حمل به دفعات
        prfTransportCountTny: filters?.carryOften,
        // محل بارگیری
        prfLoadingPlaceStr: filters?.LoadingPlace,
        // حمل یکسره
        prfDirectTransportTny: filters?.onePieceShipping,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },

      // ویزارد سه
      FinanceInfo: {
        //بارنامه های پرونده
        ProformaBillOfLoadingList:
          !!filters?.addNewfreight
            ? filters?.addNewfreight?.map((item) => ({
              //شرکت حمل
              pbltpcVCodeInt: item?.carry,
              //شماره بارنامه
              pblBOLNoStr: item?.freightNumber,
              // تاریخ بارنامه
              pblBOLDate: convert(item?.freightDate),
            }))
            : [],
        // قبض انبارهای پرونده
        ProformaWarehouseList:
          !!filters?.addNewghabzAnbar
            ? filters?.addNewghabzAnbar?.map((item) => ({
              pgaGhabzNoStr: item?.ghabzNumber,
              pgaGhabzDate: converGregorianDateToJalali(item?.ghabzDate),
            }))
            : [],
        //لیست محل تامین ارز
        lctVCodeLst: filters?.lctVCodeLst,
        prfVCodeInt: editingId,
        // نوع قرارداد
        prfcntVCodeInt: 0,
        //مبلغ تخفیف
        prfDiscountMny: Number(filters?.amountOfDiscount),
        // سایر هزینه ها
        prfOtherCostMny: Number(filters?.otherCosts),
        // هزینه حمل
        prfFreightCostMny: Number(filters?.transportationCosts),
        // مجموع هزینه ها
        prfTotalPriceMny: Number(filters?.totalAmountInvoice),
        // بانکی یا غیر بانکی
        prfIsBankOPTny: filters?.typeOfCurrencyOperation,
        //نوع ارز
        prfcurVCodeInt: filters?.currencyType,
        // گواهی تولید  جیسون
        prfproductCertificateNo: !!filters?.productionCertificate
          ? filters?.productionCertificate : "",
        //گارانتی
        prfpcaVCodeInt: filters?.afterSalesService,
        //بانک
        bnkVcodeInt: filters?.bank || 0,
        prfimtVCodeInt: 0,
        //شعبه جیسون
        bchbnkCodeStr: filters?.branch || 0,
        prfpaymentType: 0,
        // شماره ثبت سفارش
        prfReferenceOrderRegistrationStr: "",
        prfReferenceDeclarationSerialStr: "",
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
      //  ویزارد چهار
      Goods: [...EditList],
      // ویزارد پنج
      Docs: {
        InsertedDocument: filters?.InsertedDocument?.map((doc) => {
          return {
            docCaptionStr: doc.Caption,
            docFormat: doc.Format,
            DOCS: doc.DOC,
          };
        }),
        DeletedDocument: filters?.DeletedDocument,
        prfVCodeInt: Number(editingId),
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
      RegedOrderDetails: {},
      DeletedGoods: filters?.DeletedGoods || [],
      SuspendedGoods: filters?.findSuspendGoods || [],
      EditedGoodsLst: filters?.EditedGoodsLst || [],
      HashString: "",
      urlVCodeInt: role,
      ssdsshGUID: GUid,
    };
    axios({
      timeout: 900000,
      signal: setTimeInMethode(900000),
      url: endpoints.RestAPIs.Proforma.validateEdit.url,
      method: endpoints.RestAPIs.Proforma.validateEdit.method,
      data: formData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          setModalMode("SUBMIT");
          dispatch(
            handelQuestionModal({
              isModalOpen: true,
              title: "هشدار",
              describe: res?.data?.ErrorDesc,
            })
          );
          setFilters({
            ...filters,
            hashString: res?.data?.HashString,
            EditedGoods: res?.data?.EditedGoodsLst,
            SuspendPermitOrganizationList:
              res?.data?.SuspendPermitOrganizationList,
          });
          dispatch(handleLoading(false));
        } else if (res?.data?.ErrorCode !== 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
          dispatch(handleLoading(false));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  const executeEdit = () => {
    dispatch(handleLoading(true));
    const docs = [];
    filters.Docs.map((item) => {
      if (!!item?.DOC) {
        docs.push({
          docCaptionStr: item?.Caption,
          docFormat: item?.Caption.split(".")[1],
          DOCS: item?.DOC,
        });
      }
    });
    const EditList = [];
    filters?.allGoods?.map((item) => {
      EditList.push({
        // وجود ندارد
        prfVCodeInt: item?.prfVCodeInt,
        // وجود ندارد
        pfgprfVCodeInt: item?.prfVCodeInt,
        gdsHSCode: item?.gdsHSCode,
        pfgCommercialDescStr: item?.pfgCommercialDescStr,
        pfgCommercialDescEnStr: item?.pfgCommercialDescEnStr,
        // static
        pfgStaticCommercialDescStr: null,
        pfgStaticCommercialDescEnStr: null,
        pfgTechnicalSpecStr: item?.pfgTechnicalSpecStr,
        pfgManufractureStr: item?.prfManufractureStr,
        // وجود ندارد
        pfgManufractureCode: 0,
        pfgStandardStr: item?.pfgStandardStr,
        pfgmsuVCodeTny: item?.pfgmsuVCodeTny,
        pfgCountInt: item?.pfgCountInt,
        pfgProductionDate: item?.pfgProductionDate,
        pfgFOBPriceMny: item?.pfgFOBPriceMny,
        pfgGoodsStatusTny: item?.pfgGoodsStatusTny,
        pfgNetWeightInt: item?.pfgNetWeightInt,
        pfgGrossWeightInt: item?.pfgGrossWeightInt,
        pfgpckVCodeInt: item?.pfgpckVCodeInt,
        pfgVCodeLng: item?.pfgVCodeLng,
        gcdVCodeInt: item?.gcdVCodeInt,
        // وجود ندارد
        sgdVCodeInt: 0,
        pfggdsVCodeInt: item?.pfggdsVCodeInt,
        pfgStatusStr: item?.pfgStatusStr,
        cmpIRCCodeStr: item?.cmpIRCCodeStr,
        pfgDiscountMny: item?.pfgDiscountMny,
        pfgCIDTypeTny: item?.pfgCIDTypeTny,
        pfgDescriptionStr: item?.pfgDescriptionStr,
        // وجود ندارد
        OrgCode: item?.pfgOrgIDCodestr,
        pfggcdOrgIDInt: item?.pfggcdOrgIDInt,
        pfgCIDTypeOrgTny: item?.pfgCIDTypeOrgTny,
        // وجود ندارد
        pfgIsCandleOnTny: 1,
        // وجود ندارد
        EdditingStatus: 0,
        gdsHSDescStr: item?.gdsHSDescStr,
        gdsPriorityTny: item?.gdsPriorityTny,
        gdsTariffTny: item?.gdsTariffTny,
        // وجود ندارد
        pfgVersionTny: 0,
        // وجود ندارد111
        pfgProductionYear: item?.pfgProductionDate,
        pfgConsumeTypeTny: item?.pfgConsumeTypeTny,
        // وجود ندارد
        pfgInsertDate: "",
        // وجود ندارد
        pfgdescStrCount: 0,
        // وجود ندارد
        pfgdescENStrCount: 0,
        pfgTraceCodeLng: item?.pfgTraceCodeLng,
        ProformaGoodsCountries: item?.ProformaGoodsCountries.map(
          (item) => item?.cnyVCodeInt
        ),
        pfgDepreciated: item?.pfgDepreciated,
        GoodsOtherPropertiesList: item?.GoodsOtherPropertiesList,
      });
    });
    const formData = {
      EditInput: {
        SuspendPermitOrganizationList: filters?.SuspendPermitOrganizationList,
        prfVCodeInt: Number(editingId),
        // ویزارد یک
        BaseInfo: {
          prfVCodeInt: Number(editingId),
          // شماره پیش فاکتور
          ProformaNumberStr: filters?.numberInvoice,
          //کشور ذینفع int
          BeneficiaryCountryProformaInt: filters?.beneficiaryCountry,
          //تاریخ صدور
          IssueDateProformaStr: convert(filters?.DateF),
          // تاریخ انقضا
          ExpiriationDateProformaStr: convert(filters?.DateT),
          FidaVCodeInt: filters?.FidaVCodeIntCode,
          //شناسه کسب و کار
          BusinessIDStr: "",
          //کد نوع ثبت سفارش
          prfromVCodeInt: 0,
          // نوع کالای وارداتی
          prfImportGoodsType: filters?.TypeOfImportedGoods,
          prfProvinceCodeInt: null,
          // نوع واحد فعالیت
          prfProvinceTypeInt: 0,
          ProformaActivityUnitVM: {},
          // کد شیما
          ActivityShimaCodeList: filters?.ActivityShimaCodeListCode,
          EnegyLicensesList: {},
          urlVCodeInt: role,
          ssdsshGUID: GUid,
        },

        // ویزارد دو
        TransportInfo: {
          prfVCodeInt: Number(editingId),
          // نوع قرارداد
          prfcntVCodeInt: filters?.contractType,
          // نوع حمل و نقل
          ProformaTransportTypeList: Array.isArray(filters?.shippingMethods)
            ? filters?.shippingMethods
            : [filters?.shippingMethods],
          // مرز ورودی
          ProformaBordersList: Array.isArray(filters?.EntranceBorder)
            ? filters?.EntranceBorder
            : [filters?.EntranceBorder],
          // گمرک مقصد
          ProformaDestinationCustomsList: Array.isArray(
            filters?.DestinationCustoms
          )
            ? filters?.DestinationCustoms
            : [filters?.DestinationCustoms],
          //کشور مبدا
          ProformaSourcesList: Array.isArray(filters?.CountryOfOriginOfShipment)
            ? filters?.CountryOfOriginOfShipment
            : [filters?.CountryOfOriginOfShipment],
          // ناوگان حمل و نقل
          prfTransportNationTypeTny: filters?.TransportFleet,
          // حمل به دفعات
          prfTransportCountTny: filters?.carryOften,
          // محل بارگیری
          prfLoadingPlaceStr: filters?.LoadingPlace,
          // حمل یکسره
          prfDirectTransportTny: filters?.onePieceShipping,
          urlVCodeInt: role,
          ssdsshGUID: GUid,
        },

        // ویزارد سه
        FinanceInfo: {
          //بارنامه های پرونده
          ProformaBillOfLoadingList:
            !!filters?.addNewfreight
              ? filters?.addNewfreight?.map((item) => ({
                //شرکت حمل
                pbltpcVCodeInt: item?.carry,
                //شماره بارنامه
                pblBOLNoStr: item?.freightNumber,
                // تاریخ بارنامه
                pblBOLDate: convert(item?.freightDate),
              }))
              : [],
          // قبض انبارهای پرونده
          ProformaWarehouseList:
            !!filters?.addNewghabzAnbar
              ? filters?.addNewghabzAnbar?.map((item) => ({
                pgaGhabzNoStr: item?.ghabzNumber,
                pgaGhabzDate: converGregorianDateToJalali(item?.ghabzDate),
              }))
              : [],
          //لیست محل تامین ارز
          lctVCodeLst: filters?.lctVCodeLst,
          prfVCodeInt: editingId,
          // نوع قرارداد
          prfcntVCodeInt: 0,
          //مبلغ تخفیف
          prfDiscountMny: Number(filters?.amountOfDiscount),
          // سایر هزینه ها
          prfOtherCostMny: Number(filters?.otherCosts),
          // هزینه حمل
          prfFreightCostMny: Number(filters?.transportationCosts),
          // مجموع هزینه ها
          prfTotalPriceMny: Number(filters?.totalAmountInvoice),
          // بانکی یا غیر بانکی
          prfIsBankOPTny: filters?.typeOfCurrencyOperation,
          //نوع ارز
          prfcurVCodeInt: filters?.currencyType,
          // گواهی تولید  جیسون
          prfproductCertificateNo: !!filters?.productionCertificate
            ? filters?.productionCertificate : "",
          //گارانتی
          prfpcaVCodeInt: filters?.afterSalesService,
          //بانک
          bnkVcodeInt: filters?.bank || 0,
          prfimtVCodeInt: 0,
          //شعبه جیسون
          bchbnkCodeStr: filters?.branch || 0,
          prfpaymentType: 0,
          // شماره ثبت سفارش
          prfReferenceOrderRegistrationStr: "",
          prfReferenceDeclarationSerialStr: "",
          urlVCodeInt: role,
          ssdsshGUID: GUid,
        },
        // ویزارد چهار
        Goods: [...EditList],

        // ویزارد پنج
        Docs: {
          InsertedDocument: filters?.InsertedDocument?.map((doc) => {
            return {
              docCaptionStr: doc.Caption,
              docFormat: doc.Format,
              DOCS: doc.DOC,
            };
          }),
          DeletedDocument: filters?.DeletedDocument,
          prfVCodeInt: Number(editingId),
          urlVCodeInt: role,
          ssdsshGUID: GUid,
        },
        RegedOrderDetails: {},
        DeletedGoods: filters?.DeletedGoods || [],
        SuspendedGoods: filters?.findSuspendGoods || [],
        EditedGoodsLst: filters?.EditedGoods || [],
        HashString: filters?.hashString,
        urlVCodeInt: role,
        ssdsshGUID: GUid,
      },
      HashString: filters?.hashString,
    };
    axios({
      url: endpoints.RestAPIs.Proforma.executeEdit.url,
      method: endpoints.RestAPIs.Proforma.executeEdit.method,
      data: formData,
    })
      .then((res) => {
        if (res?.data?.ErrorCode === 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: "با موفقیت ثبت شد.",
              type: "success",
            })
          );
          dispatch(handleLoading(false));
          history.push(`/Users/AC/Commercial/ExternalTradeFileManagementDetail?_k=v9ifuf&__key=${editingId}`);
        } else if (res?.data?.ErrorCode !== 0) {
          dispatch(
            handleMessageModal({
              isModalOpen: true,
              describe: res?.data?.ErrorDesc,
            })
          );
          dispatch(handleLoading(false));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(handleLoading(false));
      });
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      if (
        questionModal?.answer === "yes" &&
        !!editingId &&
        modalMode === "SUBMIT" &&
        filters?.status > 1
      ) {
        executeEdit();
      }
    }
  }, [questionModal?.answer]);

  return (
    <Button
      name="next"
      type="primary"
      onClick={submit}
      backgroundColor={themeColors.btn.secondary}
      hasVerticalSpace={false}
    >
      ثبت
    </Button>
  );
};

export default SubmitDeclaration;
