import React from "react";
import Commodities from './Commodities'
import Documentation from './Documentation'
import License from './License'
import { Row, Tabs } from "antd";
import themeColors from "../../../configs/theme";
import { Button } from "../../../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const TabCert = ({ filters }) => {
    const { theme } = useSelector((state) => state);
    const tab = [
        { title: 'کالاها', component: <Commodities filters={filters} /> },
        { title: 'مستندات', component: <Documentation filters={filters} /> },
        { title: 'مجوزها', component: <License filters={filters} /> },
    ]

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
                    <Link to={`/Users/AC/Commercial/CertificateOfInspection`}>
                        <Button>
                            <i class="fa fa-share" aria-hidden="true"></i>
                            بازگشت
                        </Button>
                    </Link>
                </Row>
            </div>
        </div>
    )
}

export default TabCert;