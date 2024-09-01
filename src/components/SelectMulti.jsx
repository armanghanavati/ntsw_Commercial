import { Select } from "antd";
import { useSelector } from "react-redux";
import themeColors from "../configs/theme.js";
import VerticalSpace from "./VerticalSpace.jsx";
import { useEffect } from "react";
import Button from "./Button.jsx";
import { useState } from "react";

const SelectMulti = ({
  name = "",
  defaultValue,
  onChange = () => { },
  handleOnChange,
  options = [],
  error = [],
  title = "",
  optionTitle = "name",
  optionValue = "id",
  disabled = false,
  validations = [],
  index,
  width = "200px",
  className,
  required = false,
  space = "30px",
  maxWidth,
}) => {
  const { theme } = useSelector((state) => state);

  const handleChange = (value) => {
    if (value && value?.length === 0) {
      value = undefined
    } else {
      value = value
    }
    onChange(name, value, validations || undefined, index);
  };
  const { Option } = Select;

  return (
    <>
      <span
        style={{ paddingLeft: space }}
        className={
          !!className && error.length === 0 ? `input ${className}` : "input"
        }
      >
        <label
          className={
            !!className && error.length === 0
              ? `input--main--label input--main--label--${className} combobox--label`
              : error.length === 0
                ? "input--main--label combobox--label"
                : "input--main--label--error combobox--label"
          }
          style={{
            backgroundColor: themeColors[theme]?.bg,
            color: themeColors[theme]?.inputText,
            height: "auto",
            width: width,
          }}
          htmlFor={`${name}`}
        >
          {required ? (
            <span className="input--main--label__required-sign"> * </span>
          ) : (
            ""
          )}
          {title}
        </label>
        <Select
          mode="multiple"
          dropdownMatchSelectWidth={false}
          className={
            !!className && error.length === 0
              ? `get-roles--selectorr--${className} get-roles--selectorr`
              : error.length === 0
                ? "get-roles--selectorr"
                : "get-roles--selectorr--error get-roles--selectorr"
          }
          name={name}
          // height="300px"
          id={name}
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          // dropdownMatchSelectWidth={true}
          style={{
            color: themeColors[theme]?.inputText,
            backgroundColor: themeColors[theme]?.inputBg,
          }}
          value={defaultValue}
          notFoundContent="موجود نیست."
          placeholder="جستجو کنید..."
          allowClear
          disabled={disabled}
          dropdownStyle={{
            color: themeColors[theme]?.inputText,
            backgroundColor: themeColors[theme]?.inputBg,
          }}
        >
          {Array.isArray(options) || JSON.stringify(options).startsWith("[")
            ? options?.map((item, index) => (
              <Option
                style={{
                  color: themeColors[theme]?.inputText,
                  backgroundColor: themeColors[theme]?.inputBg,
                }}
                id={`${name}-${index}-${item[optionValue]}`}
                key={`${name}-${index}-${item[optionValue]}`}
                value={item[optionValue]}
              >
                {item[optionTitle]}
              </Option>
            ))
            : undefined}
        </Select>
      </span>
      {!!error &&
        error.map((err, index) => (
          <span
            key={`${name}-errors-${index}`}
            className="input--error-message"
          >
            {err}
          </span>
        ))}
      <VerticalSpace space={error && error.length > 0 ? "20px" : "10px"} />
    </>
  );
};
export default SelectMulti;
