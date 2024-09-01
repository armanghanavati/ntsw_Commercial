let BaseUrlAddress =
  process.env.REACT_APP_WEATHER_API_KEY === "production-prod"
    ? "https://www.ntsw.ir"
    : "https://lab.ntsw.ir";

let RestAPIsBaseURL = process.env.REACT_APP_API_ENDPOINT;
let RestAPIsBaseURLsrt = process.env.REACT_APP_API_ENDPOINT_COMMERCIAL;

export const endpoints = {
  BaseUrlAddress: BaseUrlAddress,

  RestAPIs: {
    user: {
      getTokenInfo: {
        url: RestAPIsBaseURL + "Person/GetTokenInfo",
        method: "post",
      },
      validateJWTToken: {
        url: RestAPIsBaseURL + "User/ValidateJWTToken",
        method: "get",
      },
      getUserRoles: {
        url: RestAPIsBaseURL + "Person/GetUserRoles",
        method: "post",
      },
      getUserProfiles: {
        url: RestAPIsBaseURL + "Person/GetUserProfile",
        method: "post",
      },
      verifyUserToken: {
        url: RestAPIsBaseURL + "User/VerifyUserToken",
        method: "post",
      },
      getUserAccessList: {
        url: RestAPIsBaseURL + "Person/GetUserAccessedList",
        method: "post",
      },
      logout: {
        url: RestAPIsBaseURL + "User/Logout",
        method: "post",
      },
      NTSW_GetRankingLoginURL: {
        url: RestAPIsBaseURL + "CreditRate/NTSW_GetRankingLoginURL",
        method: "post",
      },
      NTSW_JAMVerifyUser: {
        url: RestAPIsBaseURL + "/CreditRate/NTSW_JAMVerifyUser",
        method: "post",
      },
      NTSW_Sysytem124Login: {
        url: RestAPIsBaseURL + "/CreditRate/NTSW_Sysytem124Login",
        method: "post",
      },
      NTSW_EnergyInquiry: {
        url: RestAPIsBaseURL + "/CreditRate/NTSW_EnergyInquiry",
        method: "post",
      },
    },
    digitalSignature: {
      getChallenge: {
        url: RestAPIsBaseURL + "DigitalSignature/NTSW_GetChallenge",
        method: "post",
      },
    },
    BasicOperationFrm: {
      NTSW_ProxyGetChallange: {
        url: RestAPIsBaseURL + "Proxy/NTSW_ProxyGetChallange",
        method: "post",
      },
    },

    // مدیریت ثبت سفارش
    Proforma: {
      getLatestPermitsStatus: {
        url: RestAPIsBaseURL + "Proforma/GetLatestPermitsStatus",
        method: "post",
      },
      NTSW_ProformaListforma: {
        url: RestAPIsBaseURL + "Proforma/NTSW_ProformaList",
        method: "post",
      },
      checkSignatureForcraeteProforma: {
        url: RestAPIsBaseURL + "Proforma/CheckSignatureForcraeteProforma",
        method: "post",
      },
      getRegedOrderDetail: {
        url: RestAPIsBaseURL + "Proforma/GetRegedOrderDetails",
        method: "post",
      },
      changeProformaLevel: {
        url: RestAPIsBaseURL + "Proforma/ChangeProformaLevel",
        method: "post",
      },
      initializeProformaStaticData: {
        url: RestAPIsBaseURL + "Proforma/InitializeProformaStaticData",
        method: "post",
      },
      insertFreezonesFIDA: {
        url: RestAPIsBaseURL + "Proforma/InsertFreezonesFIDA",
        method: "post",
      },
      manageBaseInformationProforma: {
        url: RestAPIsBaseURL + "Proforma/ManageBaseInformationProforma",
        method: "post",
      },
      manageFinancialInformationProforma: {
        url: RestAPIsBaseURL + "Proforma/ManageFinancialInformationProforma",
        method: "post",
      },
      manageTransportInformationProforma: {
        url: RestAPIsBaseURL + "Proforma/ManageTransportInformationProforma",
        method: "post",
      },
      searchHSCode: {
        url: RestAPIsBaseURL + "Proforma/SearchHSCode",
        method: "post",
      },
      getTitleList: {
        url: RestAPIsBaseURL + "Proforma/GetTitleList",
        method: "post",
      },
      getGroupList: {
        url: RestAPIsBaseURL + "Proforma/GetGroupList",
        method: "post",
      },
      getSubGroupList: {
        url: RestAPIsBaseURL + "Proforma/GetSubGroupList",
        method: "post",
      },
      getGoodsList: {
        url: RestAPIsBaseURL + "Proforma/GetGoodsList",
        method: "post",
      },
      getHSGoodsDetail: {
        url: RestAPIsBaseURL + "Proforma/GetHSGoodsDetail",
        method: "post",
      },
      getHSCIDDetail: {
        url: RestAPIsBaseURL + "/Proforma/GetHSCIDDetail",
        method: "post",
      },
      excelGenerator: {
        url: RestAPIsBaseURL + "/Proforma/ExcelGenerator",
        method: "post",
      },
      // -> لیست کالاها
      getProformaGoodsList: {
        url: RestAPIsBaseURL + "Proforma/GetProformaGoodsList",
        method: "post",
      },
      // -> کپی پرونده جزئیات
      copyProforma: {
        url: RestAPIsBaseURL + "Proforma/CopyProforma",
        method: "post",
      },
      manageCancelRegedOrder: {
        url: RestAPIsBaseURL + "Proforma/ManageCancelRegedOrder",
        method: "post",
      },
      // -> مشاهده مستندات جزئیات
      showProformaDocument: {
        url: RestAPIsBaseURL + "Proforma/ShowProformaDocument",
        method: "post",
      },
      getOrganizationIdDetail: {
        url: RestAPIsBaseURL + "Proforma/GetOrganizationIdDetail",
        method: "post",
      },
      insertProformaGoods: {
        url: RestAPIsBaseURL + "Proforma/InsertProformaGoods",
        method: "post",
      },
      removeProformaGoods: {
        url: RestAPIsBaseURL + "Proforma/RemoveProformaGoods",
        method: "post",
      },
      insertProformaDocument: {
        url: RestAPIsBaseURL + "Proforma/InsertProformaDocument",
        method: "post",
      },
      deleteProformaDocument: {
        url: RestAPIsBaseURL + "Proforma/DeleteProformaDocument",
        method: "post",
      },
      validateEdit: {
        url: RestAPIsBaseURL + "Proforma/ValidateEdit",
        method: "post",
      },
      getPrecotageDetails: {
        url: RestAPIsBaseURL + "Proforma/GetPrecotageDetails",
        method: "post",
      },
      finalizationProforma: {
        url: RestAPIsBaseURL + "Proforma/FinalizationProforma",
        method: "post",
      },
      sendGoodsLicenseRequest19: {
        url: RestAPIsBaseURL + "Proforma/SendGoodsLicenseRequest19",
        method: "post",
      },
      getLatestPermitsStatus: {
        url: RestAPIsBaseURL + "Proforma/GetLatestPermitsStatus",
        method: "post",
      },
      SendProformaToProductInquiry17: {
        url: RestAPIsBaseURL + "Proforma/SendProformaToProductInquiry17",
        method: "post",
      },
      executeEdit: {
        url: RestAPIsBaseURL + "Proforma/ExecuteEdit",
        method: "post",
      },
      removeProformaFirstStep: {
        url: RestAPIsBaseURL + "Proforma/RemoveProformaFirstStep",
        method: "post",
      },
      sendProformaToSabtaresh40: {
        url: RestAPIsBaseURL + "Proforma/SendProformaToSabtaresh40",
        method: "post",
      },
      sendProformaToSabtareshExtend45: {
        url: RestAPIsBaseURL + "Proforma/SendProformaToSabtareshExtend45",
        method: "post",
      },
      priorityMomentInquiry52: {
        url: RestAPIsBaseURL + "Proforma/PriorityMomentInquiry52",
        method: "post",
      },
      proformaRecoveryEdite: {
        url: RestAPIsBaseURL + "Proforma/ProformaRecoveryEdite",
        method: "post",
      },
      proformaRecoveryExtend: {
        url: RestAPIsBaseURL + "Proforma/ProformaRecoveryExtend",
        method: "post",
      },
      removeProformaSecondStep: {
        url: RestAPIsBaseURL + "Proforma/RemoveProformaSecondStep",
        method: "post",
      },
      removeProformaThirdStep: {
        url: RestAPIsBaseURL + "Proforma/RemoveProformaThirdStep",
        method: "post",
      },
      removeProformaFourthStep: {
        url: RestAPIsBaseURL + "Proforma/RemoveProformaFourthStep",
        method: "post",
      },
      getPrecotageDetailsExcel: {
        url: RestAPIsBaseURL + "Proforma/GetPrecotageDetailsExcel",
        method: "post",
      },
      ProformaReportInformation: {
        url: RestAPIsBaseURL + "Proforma/ProformaReportInformation",
        method: "post",
      },
      getProformaRequiredPermits: {
        url: RestAPIsBaseURL + "Proforma/GetProformaRequiredPermits",
        method: "post",
      },
      getProformaRequiredPermitDetails: {
        url: RestAPIsBaseURL + "Proforma/GetProformaRequiredPermitDetails",
        method: "post",
      },
    },
    // درخواست‌های قرارداد با واحدهای تجاری جهت واردات مواد اولیه
    StatisticsRegistration: {
      GetProductionUnitContractRequestInfo: {
        url:
          RestAPIsBaseURLsrt +
          "SRTProformaManagement/GetProductionUnitContractRequestInfo",
        method: "post",
      },
      GetProformaGoodsForContractRequest: {
        url:
          RestAPIsBaseURLsrt +
          "SRTProformaManagement/GetProformaGoodsForContractRequest",
        method: "post",
      },
      ResponseToProductionUnitContractRequest: {
        url:
          RestAPIsBaseURLsrt +
          "SRTProformaManagement/ResponseToProductionUnitContractRequest",
        method: "post",
      },
    },
    GeneralData: {
      getLccurrencyRoleType: {
        url: RestAPIsBaseURL + "GeneralData/GetLccurrencyRoleType",
        method: "post",
      },
      getBankAddressList: {
        url: RestAPIsBaseURL + "GeneralData/BankAddressGetBankAddressListBL",
        method: "post",
      },
      getGoodMeasurementUnitList: {
        url: RestAPIsBaseURL + "GeneralData/GetGoodMeasurementUnitList",
        method: "post",
      },
    },
    Person: {
      getUserPrsInfo: {
        url: RestAPIsBaseURL + "Person/GetUserPrsInfo",
        method: "post",
      },
    },
    Permit: {
      getPermitDetailList_NIKIAZAR: {
        url: RestAPIsBaseURL + "Permit/GetPermitDetailList_NIKIAZAR",
        method: "post",
      },
    },
    // FacadeRest/api/Permit/GetPermitDetailList_NIKIAZAR
    fida: {
      NTSW_GetFIDACodeListByPaging: {
        url: RestAPIsBaseURL + "Fida/NTSW_GetFIDACodeListByPaging",
        method: "post",
      },
      GetFidaDetailListByName: {
        url: RestAPIsBaseURL + "Fida/GetFidaDetailListByName",
        method: "post",
      },
      InsertPersonForFIDAInquiry: {
        url: RestAPIsBaseURL + "Fida/InsertPersonForFIDAInquiry",
        method: "post",
      },
      SendCompanyForFIDAInquiry: {
        url: RestAPIsBaseURL + "Fida/SendCompanyForFIDAInquiry",
        method: "post",
      },
      InitializeFidaStaticData: {
        url: RestAPIsBaseURL + "Fida/InitializeFidaStaticData",
        method: "post",
      },
    },
    // مدیریت مجوز
    permit: {
      // -> دریافت اطلاعات جدول مجوز تجارت
      getAllProformaPermitList: {
        url: RestAPIsBaseURL + "Permit/GetAllProformaPermitList",
        method: "post",
      },
      // -> دریافت اطلاعات جزئیات جدول
      getPermitDetailList: {
        url: RestAPIsBaseURL + "Permit/GetPermitDetailList",
        method: "post",
      },
      // -> جزئیات دکمه ی جدول (ارسال مستندات)
      showPermitSendDocumentToOGA: {
        url: RestAPIsBaseURL + "Permit/ShowPermitSendDocumentToOGA",
        method: "post",
      },
      // -> جزئیات دکمه ی جدول (دریافت مستندات)
      showPermitRecieveDocumentFromOGA: {
        url: RestAPIsBaseURL + "Permit/ShowPermitRecieveDocumentFromOGA",
        method: "post",
      },
      getProformaPermitsList: {
        url: RestAPIsBaseURL + "Permit/GetProformaPermitsList",
        method: "post",
      },
      insertPermitDocuments: {
        url: RestAPIsBaseURL + "Permit/InsertPermitDocuments",
        method: "post",
      },
      permitRejectionRequest: {
        url: RestAPIsBaseURL + "Permit/PermitRejectionRequest",
        method: "post",
      },
      deletePermitDocuments: {
        url: RestAPIsBaseURL + "Permit/DeletePermitDocuments",
        method: "post",
      },
    },

    //  عملیات گواهی بازرسی (IC)
    // -> دریافت کل شماره های پرونده بازرسی
    InspectionCartificatelC: {
      InitializationDataForInspectionCertificateIC: {
        url:
          RestAPIsBaseURL +
          "InspectionCartificatelC/InitializationDataForInspectionCertificateIC",
        method: "post",
      },

      // -> دریافت کل لیست جدول پرونده
      getAllInspectionCertificateIC: {
        url:
          RestAPIsBaseURL +
          "InspectionCartificatelC/GetAllInspectionCertificateIC",
        method: "post",
      },
      // -> لیست جزئیات جدول
      getProformaInfoIC: {
        url:
          RestAPIsBaseURL +
          "InspectionCartificatelC/GetProformaInfoIC",
        method: "post",
      },
      getProformaInfoIC: {
        url:
          RestAPIsBaseURL +
          "InspectionCartificatelC/GetProformaInfoIC",
        method: "post",
      },
      manageInspectionCertificateIC: {
        url:
          RestAPIsBaseURL +
          "InspectionCartificatelC/ManageInspectionCertificateIC",
        method: "post",
      },
      getProformaGoodsIC: {
        url:
          RestAPIsBaseURL +
          "InspectionCartificatelC/GetProformaGoodsIC",
        method: "post",
      }
    },
  },
};
