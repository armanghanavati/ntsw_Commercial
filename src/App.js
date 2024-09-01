import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { BrowserDetector, DastineInstaller } from "./assets/dastine/Dastine";

import DastineConfig from "./assets/dastine/Dastine-Config";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "./services/axios";
import { Provider, useSelector } from "react-redux";
import { store } from "./state/store";

import "./assets/fontawesome/css/font-awesome.min.css";
import "antd/dist/antd.variable.css";
import "./app.scss";
import Layout from "./layouts/Layout";

import SecurityAccess from "./utils/SecurityAccess";
import PrivateLayaout from "./layouts/private/PrivateLayaout.jsx";

import NewTabPrint from "./views/ExternalFileManagment/Detaile/details-buttons/NewTabInPrint";
import ETFM from "./views/ExternalFileManagment/ExternalTradeFileManagement";
import ExternalTradeFileManagementDetail from "./views/ExternalFileManagment/Detaile/ExternalTradeFileManagementDetail";
import Create from "./views/ExternalFileManagment/Create/Create";
import NotFoundPage from "./layouts/NotFoundPage";
import NewLicenseBackPacker from "./views/manageLicenses/NewLicenseBackPacker";
import ManageLicenses from "./views/manageLicenses/ManageLicenses";

import ProductionUnit from "./views/ProductionUnit/ProductionUnit";

import ExternalTradeCEBuyManage from "./views/ExternalTradeCEBuyManage/Page/ExternalTradeCEBuyManage";
import ExternalTradeCEBuyNewReq from "./views/ExternalTradeCEBuyManage/ExternalTradeCEBuyNewReq/ExternalTradeCEBuyNewReq";

import CertificateOfInspection from "./views/CertificateOfInspection/CertificateOfInspection";
// import NewCertificateOfInspection from "./views/CertificateOfInspection/NewCertificateOfInspection/NewCertificateOfInspection";
import CreateCertificateOfInspection from "./views/CertificateOfInspection/Create/Create"
import MangForenSaler from "./views/MangForenSaler/MangForenSaler";
import CertificateOfInspectionDetails from "./views/CertificateOfInspection/Detail/CertificateOfInspectionDetails";
import ProformaDocumentsManagment from "./views/ExternalFileManagment/Detaile/ProformaDocumentsManagment";
import RequestPermission from "./views/ExternalFileManagment/Detaile/requestPermission";
import EstelamAkharinMojavez from "./views/ExternalFileManagment/Detaile/EstelamAkharinMojavez";
import GetActAmtPerInfDet from "./views/GetActAmtPerInfDet/GetActAmtPerInfDet";

//  
const App = () => {
  useEffect(() => {
    DastineConfig.init();
    BrowserDetector.init();
    // DastineInstaller.init();
    DastineInstaller.createConnection();
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Layout} />
            <Route path="/index.aspx" exact component={Layout} />
            <Route path="/Login.aspx" exact component={Layout} />
            <Route
              path="/Users/AC/Commercial/NSWUIReports/printPageOrderDetailes"
              exact
              component={NewTabPrint}
            />
            <SecurityAccess>
              <PrivateLayaout>
                {/* مدیریت ثبت سفارش */}
                <Route
                  path="/Users/AC/Commercial/Proforma"
                  exact
                  component={Create}
                />
                <Route
                  path="/Users/AC/Commercial/ExternalTradeFileManagement"
                  exact
                  component={ETFM}
                />
                <Route
                  path="/Users/AC/Commercial/ExternalTradeFileManagementDetail"
                  exact
                  component={ExternalTradeFileManagementDetail}
                />
                <Route
                  path="/Users/AC/Commercial/ProformaDocumentsManagment"
                  exact
                  component={ProformaDocumentsManagment}
                />
                <Route
                  path="/Users/AC/Commercial/RequestPermission"
                  exact
                  component={RequestPermission}
                />
                <Route
                  path="/Users/AC/Commercial/EstelamAkharinMojavez"
                  exact
                  component={EstelamAkharinMojavez}
                />

                {/* مدیریت مجوز ها */}
                <Route
                  path="/Users/AC/Commercial/NewLicenseBackPacker"
                  exact
                  component={NewLicenseBackPacker}
                />
                <Route
                  path="/Users/AC/Commercial/ManageLicenses"
                  exact
                  component={ManageLicenses}
                />
                <Route
                  path="/Users/AC/Commercial/GetActiveAmountPermitInfoDetailes"
                  exact
                  component={GetActAmtPerInfDet}
                />

                {/* عملیات گواهی بازرسی (IC) */}
                <Route
                  path="/Users/AC/Commercial/CertificateOfInspection"
                  exact
                  component={CertificateOfInspection}
                />
                {/* <Route
                  path="/Users/AC/Commercial/NewCertificateOfInspection"
                  exact
                  component={NewCertificateOfInspection}
                /> */}
                <Route
                  path="/Users/AC/Commercial/CertificateOfInspectionDetails"
                  exact
                  component={CertificateOfInspectionDetails}
                />
                <Route
                  path="/Users/AC/Commercial/CertificateOfInspectionNew"
                  exact
                  component={CreateCertificateOfInspection}
                />

                {/* درخواست‌های قرارداد با واحدهای تجاری جهت واردات مواد اولیه*/}
                <Route
                  path="/Users/AC/Commercial/ProductionUnit"
                  exact
                  component={ProductionUnit}
                />

                <Route
                  path="/Users/AC/Commercial/MangForenSaler"
                  exact
                  component={MangForenSaler}
                />

                {/* عملیات ارزی */}
                {/* معامله ارز/ خرید ارز  */}
                <Route
                  path="/Users/AC/Commercial/ExternalTradeCEBuyManage"
                  exact
                  component={ExternalTradeCEBuyManage}
                />
                <Route
                  path="/Users/AC/Commercial/ExternalTradeCEBuyNewReq"
                  exact
                  component={ExternalTradeCEBuyNewReq}
                />
              </PrivateLayaout>
            </SecurityAccess>

            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;

//////////////////////////////
