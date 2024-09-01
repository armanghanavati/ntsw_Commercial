import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { Button } from '../../../../components';




const ButtonInCerrtificateOfInseptionDetailes = ({ filters }) => {
    return (
        <>
            <div className="btnDiv">
                {(filters?.showButtons?.EditBtn && <Button>ویرایش درخواست گواهی بازرسی</Button>)}
                {(filters?.showButtons?.SendRequestBtn && <Button>ارسال درخواست گواهی بازرسی</Button>)}
                {(filters?.showButtons?.ContinueRegistrationBtn
                    && <Button>ادامه ثبت گواهی</Button>)}
            </div>

        </>
    )
}
export default ButtonInCerrtificateOfInseptionDetailes