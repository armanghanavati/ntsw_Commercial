import { Col, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DetailsSteps({ prfActiveStatusTny, prfStatusTny }) {
  const Step = Steps.Step;
  const [editStep, setEditStep] = useState(false)
  const { theme, importCodeInt } = useSelector((state) => state);

  const data = [
    { id: "1", name: (prfActiveStatusTny === 2 && prfStatusTny === 0) ? "ابطال شده" : (prfActiveStatusTny === 6 && prfStatusTny === 0) ? "در حال تمدید" : (prfActiveStatusTny === 4 && prfStatusTny === 0) ? "درحال ویرایش" : "پیش  نویس" },
    { id: "2", name: (prfActiveStatusTny === 2 && prfStatusTny === 1) ? "ابطال شده" : (prfActiveStatusTny === 6 && prfStatusTny === 1) ? "در حال تمدید" : (prfActiveStatusTny === 4 && prfStatusTny === 1) ? "درحال ویرایش" : "جدید" },
    { id: "3", name: (prfActiveStatusTny === 2 && prfStatusTny === 2) ? "ابطال شده" : (prfActiveStatusTny === 6 && prfStatusTny === 2) ? "در حال تمدید" : (prfActiveStatusTny === 4 && prfStatusTny === 2) ? "درحال ویرایش" : "در حال استعلام" },
    { id: "4", name: (prfActiveStatusTny === 2 && prfStatusTny === 4) ? "ابطال شده" : (prfActiveStatusTny === 6 && prfStatusTny === 4) ? "در حال تمدید" : (prfActiveStatusTny === 1 && prfStatusTny === 4) ? "رد پرونده" : (prfActiveStatusTny === 4 && prfStatusTny === 3) ? "درحال ویرایش" : (prfActiveStatusTny === 2 && prfStatusTny === 3) ? "ابطال شده" : (prfActiveStatusTny === 4 && prfStatusTny === 4) ? "در حال ویرایش" : (prfActiveStatusTny === 6 && prfStatusTny === 3) ? "در حال تمدید" : "استعلام شده" },
    { id: "5", name: (prfActiveStatusTny === 2 && prfStatusTny === 5) ? "ابطال شده" : (prfActiveStatusTny === 6 && prfStatusTny === 5) ? "در حال تمدید" : (prfActiveStatusTny === 4 && prfStatusTny === 5) ? "درحال ویرایش" : "منتظر مجوزها" },
    { id: "6", name: (prfActiveStatusTny === 2 && prfStatusTny === 6) ? "ابطال شده" : (prfActiveStatusTny === 6 && prfStatusTny === 6) ? "در حال تمدید" : (prfActiveStatusTny === 4 && prfStatusTny === 6) ? "درحال ویرایش" : ((importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6) ? "آماده ثبت سفارش" : ((prfActiveStatusTny === 2 && prfStatusTny === 10) ? "ابطال شده" : (prfActiveStatusTny === 4 && prfStatusTny === 10) ? "در حال ویرایش" : (prfActiveStatusTny === 6 && prfStatusTny === 10) ? "در حال تمدید" : prfStatusTny === 10 ? "رد درخواست مجوز" : "آماده ثبت نهایی")) },
    { id: "7", name: (prfActiveStatusTny === 2 && prfStatusTny === 7) ? "ابطال شده" : (prfActiveStatusTny === 6 && prfStatusTny === 7) ? "در حال تمدید" : (prfActiveStatusTny === 4 && prfStatusTny === 7) ? "درحال ویرایش" : ((importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6) ? "درحال ثبت سفارش" : ((prfActiveStatusTny === 2 && prfStatusTny === 12) ? "ابطال شده" : prfStatusTny === 12 ? (prfActiveStatusTny === 4 && prfStatusTny === 12) ? "در حال ویرایش" : (prfActiveStatusTny === 6 && prfStatusTny === 12) ? "در حال تمدید" : "منتظر نتیجه کارشناسی" : "درحال ثبت آماری")) },
  ];

  if (importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6) {
    data.push({
      id: "8", name: (prfActiveStatusTny === 2 && prfStatusTny === 8) ? "ابطال شده" : (prfActiveStatusTny === 4 && prfStatusTny === 8) ? "درحال ویرایش" : (prfStatusTny === 11 && prfActiveStatusTny === 1) ? "عدم تایید درخواست" : "آماده پرداخت کارمزد"
    })
  }
  data.push({ id: "9", name: (prfActiveStatusTny === 2 && prfStatusTny === 9) ? "ابطال شده" : (prfActiveStatusTny === 4 && prfStatusTny === 9) ? "درحال ویرایش" : (prfStatusTny === 8 && prfActiveStatusTny === 1) ? "آماده پرداخت کارمزد" : (prfStatusTny === 11 && prfActiveStatusTny === 1) ? "عدم تایید درخواست" : (prfActiveStatusTny === 2 && prfStatusTny === 8) ? "ابطال شده" : (prfActiveStatusTny === 2 && prfStatusTny === 11) ? "ابطال شده" : (prfActiveStatusTny === 4 && prfStatusTny === 8) ? "در حال ویرایش" : (prfActiveStatusTny === 4 && prfStatusTny === 11) ? "در حال ویرایش" : (prfActiveStatusTny === 6 && prfStatusTny === 8) ? "در حال تمدید" : (prfActiveStatusTny === 6 && prfStatusTny === 9) ? "در حال تمدید" : (prfActiveStatusTny === 6 && prfStatusTny === 11) ? "در حال تمدید" : "ثبت‌ نهایی" });

  const currentStepHandler = () => {
    let stepStatus = ''
    switch (prfStatusTny) {
      case 0:
        if (prfActiveStatusTny === 2) {
          stepStatus = 'error'
          return ([0, stepStatus])
        } else if (prfActiveStatusTny === 4) {
          stepStatus = 'edit'
          return ([0, stepStatus])
        } else if (prfActiveStatusTny === 6) {
          stepStatus = 'edit'
          return ([0, stepStatus])
        } else {
          return [0];
        }
      case 1:
        if (prfActiveStatusTny === 2) {
          stepStatus = 'error'
          return ([1, stepStatus])
        } else if (prfActiveStatusTny === 4) {
          stepStatus = 'edit'
          return ([1, stepStatus])
        } else if (prfActiveStatusTny === 6) {
          stepStatus = 'edit'
          return ([1, stepStatus])
        } else {
          return [1];
        }
      case 2:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([2, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = "edit"
          return ([2, stepStatus])
        } else {
          return [2];
        }
      case 3:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([3, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = "edit"
          return ([3, stepStatus])
        } else {
          return [3];
        }
      case 4:
        if (prfActiveStatusTny === 2 || prfActiveStatusTny === 1) {
          stepStatus = "error"
          return ([3, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = "edit"
          return ([3, stepStatus])
        } else {
          return [3];
        }
      // stepStatus = 'error'
      // return ([3, stepStatus])
      case 5:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([4, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = "edit"
          return ([4, stepStatus])
        } else {
          return [4];
        }
      case 6:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([5, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = "edit"
          return ([5, stepStatus])
        } else {
          return [5];
        }
      case 7:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([6, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = "edit"
          return ([6, stepStatus])
        } else {
          return [6];
        }
      case 8:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([7, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = "edit"
          return ([7, stepStatus])
        } else {
          return [7];
        }
      case 9:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          if (importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6) {
            return ([8, stepStatus])
          } else {
            return ([7, stepStatus])
          }
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = "edit"
          if (importCodeInt[0]?.imtGeneralCodeInt !== 5 && importCodeInt[0]?.imtGeneralCodeInt !== 6) {
            return ([8, stepStatus])
          } else {
            return ([7, stepStatus])
          }
        } else {
          return [7];
        }
      case 10:
        if (prfActiveStatusTny === 2 || prfActiveStatusTny === 1) {
          stepStatus = 'error'
          return ([5, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = 'edit'
          return ([5, stepStatus])
        } else {
          return [5];
        }
      case 11:
        if (prfActiveStatusTny === 2 || prfActiveStatusTny === 1) {
          stepStatus = "error"
          return ([7, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = 'edit'
          return ([7, stepStatus])
        } else {
          return [7];
        }
      case 12:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([6, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = 'edit'
          return ([6, stepStatus])
        } else {
          return [6];
        }
      case 13:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([9, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = 'edit'
          return ([9, stepStatus])
        } else {
          return [14];
        }
      case 20:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([9, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = 'edit'
          return ([9, stepStatus])
        } else {
          return [14];
        }
      case 21:
        if (prfActiveStatusTny === 2) {
          stepStatus = "error"
          return ([9, stepStatus])
        } else if (prfActiveStatusTny === 4 || prfActiveStatusTny === 6) {
          stepStatus = 'edit'
          return ([9, stepStatus])
        } else {
          return [14];
        }
      default:
        return [0];
    }
  };

  return (
    <>
      <div className={`${theme === "dark" && "bgDark"} `}>
        <Steps status={currentStepHandler()[1]} current={currentStepHandler()[0]}>
          {data.map((item, index) => (
            <Step key={index} description={item.name} />
          ))}
        </Steps>
      </div>
    </>
  );
}

export default DetailsSteps;
// style={{ color: "ant-steps-item-description" }}