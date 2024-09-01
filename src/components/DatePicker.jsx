import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import themeColors from "../configs/theme";
import VerticalSpace from "./VerticalSpace";
import {
  DatePicker as DatePickerJalali,
  useJalaliLocaleListener,
} from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { ConfigProvider, DatePicker } from "antd";
import enUS from "antd/es/calendar/locale/en_US";

const Datepicker = ({
  title,
  showDatePicker,
  onChange = () => { },
  required = false,
  error = "",
  // value = { year: 1402, month: 5, day: 6 },
  value,
  minimumDate,
  maximumDate,
  name,
  disabledDays = false,
  validations = [],
  type = 'fa',
  labelWidth,
  isShowValid = false,
  space = "30px",
  minDay = false,
}) => {

  const { theme, colorMode } = useSelector((state) => state);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const handleOnChange = (date) => {
    if (type === 'fa' && !!date) {
      onChange(
        name,
        { year: date.$y, month: date.$M + 1, day: date.$D },
        validations
      );
    } else if (type === 'en' && !!date) {
      if (!!date._d) {
        let temporaryDate = moment(date._d).format('YYYY-MM-DD')?.split('-')
        onChange(
          name,
          // { year: date.$jy, month: date.$jM + 1, day: date.$jD },
          { year: temporaryDate?.[0], month: temporaryDate?.[1], day: temporaryDate?.[2] },
          validations
        );
      } else {
        onChange(
          name,
          // { year: date.$jy, month: date.$jM + 1, day: date.$jD },
          { year: date.$y, month: date.$M + 1, day: date.$D },
          validations
        );
      }

    } else {
      onChange(name, undefined, validations);
    }
  };

  const dateFormatList = ["YYYY/MM/DD", "YY/MM/DD", "YYYY-MM-DD", "YY-MM-DD"];

  // const disabledDate = (d) => {
  //   console.log(d.isAfter(`${maximumDate?.year}-${maximumDate?.month}-${maximumDate?.day}`));
  //   if (!!minimumDate) {
  //     return !d || d.isBefore(`${minimumDate?.year}-${minimumDate?.month}-${minimumDate?.day}`)
  //   } else if (!!maximumDate) {
  //     return !d || d.isAfter(`${maximumDate?.year}-${maximumDate?.month}-${maximumDate?.day}`)
  //   }
  // };

  const disabledDate = (current) => {
    // console.log(current);
    // console.log(dayjs().endOf('year'));
    if (!!minimumDate) {
      if (minDay) {
        return current && current < dayjs().endOf('day')
      }
      return current && current < dayjs(`${minimumDate?.year}/${minimumDate?.month}/${minimumDate?.day}`);
    } else if (!!maximumDate) {
      if (minDay) {
        return current && current > dayjs().endOf('day')
      }
      return current && current > dayjs(`${maximumDate?.year}/${maximumDate?.month}/${maximumDate?.day}`);
    }
  };

  // const defaultPickerValue = () => {
  //   let temporaryDate = moment(value?._d).format("MM/DD/YYYY")
  //   return moment(temporaryDate)
  // }



  return (
    <>
      <span
        style={{
          paddingLeft: space,
          color: themeColors[theme]?.inputText,
        }}
        className="input"
      >
        <span
          className={
            !!!error || (!isShowValid && error.length === 0)
              ? "input--main"
              : error.length === 0
                ? "input--main--valid"
                : "input--main--error"
          }
        >
          <label
            className={
              !!!error || (!isShowValid && error.length === 0)
                ? `input--main--label `
                : error?.length === 0
                  ? "input--main--label--valid"
                  : error?.length > 0
                    ? "input--main--label--error"
                    : "input--main--label"
            }
            style={{
              backgroundColor: themeColors[theme]?.bg,
              width: !!labelWidth ? labelWidth : "fit-content",
            }}
          >
            {required ? (
              <span className="input--main--label__required-sign">*</span>
            ) : (
              ""
            )}
            {title}
          </label>
          <span
            className="date-picker"
            onMouseEnter={() => setShowRemoveButton(true)}
            onMouseLeave={() => setShowRemoveButton(false)}
            onClick={() => setShowRemoveButton(false)}
          >
            {type === 'en' ?
              <ConfigProvider locale={enUS} >
                <DatePicker
                  defaultPickerValue={moment(value)}
                  locale="en"
                  style={{
                    color: themeColors[theme]?.inputText,
                    backgroundColor: themeColors[theme]?.inputBg,
                    width: "100%",
                    border: "none",
                  }}
                  onChange={handleOnChange}
                  // value={!!value ? value : undefined}
                  value={!!value
                    ? dayjs(`${value.year}/${value.month}/${value.day}`)
                    : undefined
                  }
                  // defaultValue={
                  //   dayjs(moment(moment().format("YY-MM-DD"), "YYYY/MM/DD").locale("en").format("YYYY/MM/DD"), dateFormatList[0])
                  // }
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  disabledDays={disabledDays}
                  disabledDate={disabledDate}
                  shouldHighlightWeekends
                  colorPrimary={colorMode}
                  format="YYYY/MM/DD"
                  inputPlaceholder="select..."
                  // calendarClassName={theme === "dark" && "date-picker--calendar"}
                  // calendarClassName={
                  //   theme === "dark"
                  //     ? "date-picker--calendar responsive-calendar"
                  //     : "responsive-calendar"
                  // }
                  calendarClassName={
                    theme === "dark" && !!type
                      ? "responsive-calendar__gregorian responsive-calendar date-picker--calendar "
                      : theme === "dark" && !!!type
                        ? " date-picker--calendar responsive-calendar"
                        : !!type
                          ? "responsive-calendar__gregorian responsive-calendar"
                          : "responsive-calendar"
                  }
                  inputClassName={"DatePicker-input"}
                />
              </ConfigProvider>
              :
              <ConfigProvider locale={fa_IR} >
                <DatePickerJalali
                  style={{ width: "100%" }}
                  changeOnBlur
                  locale={!!type ? "en" : "fa"}
                  onChange={handleOnChange}
                  defaultPickerValue={
                    dayjs(moment(moment().format("YY-MM-DD"), "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD"), dateFormatList[0])
                  }
                  defaultValue={
                    !!value
                      ? dayjs(`${value?.year}/${value?.month}/${value?.day}`, {
                        jalali: false,
                      })
                      : undefined
                  }
                  format={dateFormatList}
                  placeholder="انتخاب کنید..."
                  showToday={false}
                  popupClassName={theme === "dark" && "date-picker-dropdown__dark"}
                  disabledDate={disabledDate} />
              </ConfigProvider>

            }
            {/* {value && showRemoveButton && (
              <span
                className="date-picker--remove-icon"
                onClick={() => handleOnChange(undefined)}
              >
                <i className="fa fa-times-circle " aria-hidden="true"></i>
              </span>
            )} */}
          </span>
        </span>
      </span>
      {error && (
        <>
          <span className="input--error-message">{error}</span>
          <VerticalSpace space="5px" />
        </>
      )}
      <VerticalSpace space="10px" />
    </>
  );
};
export { Datepicker };
