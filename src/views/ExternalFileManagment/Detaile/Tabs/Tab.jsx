import React from "react";
import { Row, Tabs } from "antd";
import { useSelector } from "react-redux";
import themeColors from "../../../../configs/theme";
import Commodity from "./Commodity";
import ShowLastStatus from "./ShowLastStatus";
import CaseRecordes from "./CaseRecordes";
import FileAuthorization from "./FileAuthorization";
import AccessLevelChangeRecords from "./AccessLevelChangeRecords";
import PaymentReport from "./PaymentReport";
import { Button } from "../../../../components";
import { Link } from "react-router-dom";

const Tab = ({ proformaLevelChanges, latestRequests, activeStatusAndStatusList, infoExtTab }) => {
  const { theme } = useSelector((state) => state);

  const tab = [
    { title: "کالاها", component: <Commodity infoExtTab={infoExtTab} /> },
    { title: "مشاهده آخرین وضعیت درخواست ها", component: <ShowLastStatus latestRequests={latestRequests} />, },
    { title: "مشاهده سوابق تغییر وضعیت پرونده", component: (<CaseRecordes activeStatusAndStatusList={activeStatusAndStatusList} />), },
    { title: "مجوزهای مورد نیاز پرونده", component: <FileAuthorization /> },
    { title: "مشاهده سوابق تغییر سطح دسترسی", component: <AccessLevelChangeRecords levelChanges={proformaLevelChanges} />, },
    { title: "گزارش پرداخت", component: <PaymentReport /> },
  ];

  return (
    <div className="tabDeatailes">
      <Tabs
        className="wrapper-loadin-qualification"
        style={{ color: themeColors[theme]?.text }}
        type="card"
        items={tab.map((item, i) => {
          return {
            label: item.title,
            key: `tab${i}`,
            children: item.component,
          };
        })}
      />
      <div style={{ margin: "10px" }}>
        <Row>
          <Link to={`/Users/AC/Commercial/ExternalTradeFileManagement`}>
            <Button>
              <i class="fa fa-share" aria-hidden="true"></i>
              بازگشت
            </Button>
          </Link>
        </Row>
      </div>
    </div>
  );
};

export default Tab;
