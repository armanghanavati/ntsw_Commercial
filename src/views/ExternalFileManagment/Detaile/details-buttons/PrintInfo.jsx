import { Table, Modal } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../../components";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import NewTabPrint from "./NewTabInPrint";
import ReactDOM from "react-dom";

const PrintInfo = () => {
    const { role, GUid, theme, messageModal, colorMode, importCodeInt } = useSelector((state) => state);

    return (
        <>
            <div style={{ border: "1px solid #ccc", margin: "10px 20px" }}>

            </div>

        </>
    );
}

export default PrintInfo;
