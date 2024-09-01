import { Select } from "antd";
import { useSelector } from "react-redux";
import themeColors from "../configs/theme.js";
import VerticalSpace from "./VerticalSpace.jsx";
import { useEffect } from "react";
import Button from "./Button.jsx";

const ComboGroup = ({
  name = "",
  defaultValue,
  onChange = () => {},
  handleOnChange,
  options = [],
  error = [],
  title = "",
  optionTitle = "name",
  optionValue = "id",
  disabled = false,
  validations = [],
  index,
  width = "300px",
  className,
  required = false,
  space = "30px",
  maxWidth,
}) => {
  const { theme } = useSelector((state) => state);

  const handleChange = (value) => {
    onChange(name, value, validations || undefined, index);
  };

  const { Option } = Select;

  useEffect(() => {
    if (
      !!options &&
      options !== [] &&
      Array.isArray(options) &&
      options.length === 1
    )
      onChange(name, options[0][optionValue], validations || undefined, index);
  }, []);

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
            height: "35px",
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
          className={
            !!className && error.length === 0
              ? `get-roles--selector--${className} get-roles--selector`
              : error.length === 0
              ? "get-roles--selector"
              : "get-roles--selector--error get-roles--selector"
          }
          name={name}
          id={name}
          showSearch
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          dropdownMatchSelectWidth={false}
          style={{
            color: themeColors[theme]?.inputText,
            backgroundColor: themeColors[theme]?.inputBg,
          }}
          defaultValue={
            Array.isArray(options) && options?.length === 1
              ? options[0][optionValue]
              : defaultValue
          }
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
export default ComboGroup;

{
  /* <Row>
  <Col sm={24} md={12} lg={6}>
    <div className="frmGroup">
      <span className="frmGroupSpan">
        <label className="frmGroupLabel">
          <button className="btnAdd">درج</button>
          <button className="btnRemove">حذف</button>
        </label>
        <div className="frmGroupDiv">
          <select className="frmGroupSelect" onChange={handleOptionChange}>
            <option value="">Select an option</option>
            <option value="1">تهران</option>
            <option value="2">تهران</option>
            <option value="3">تهران</option>
            <option value="4">تهران</option>
          </select>
        </div>
      </span>
    </div>
    <div className="frmGroupBox">{selectedOption}</div>
    <ComboGroup
      title="درج"
      name="status"
      value={filters?.status}
      onChange={handleChangeInputs}
      options={allActivity}
      width="200px"
    />
  </Col>
</Row>; */
}

{
  /* <Col sm={24} md={12} lg={6}>
  <div className="frmGroup">
    <span className="frmGroupSpan">
      <label className="frmGroupLabel">
        <button className="btnAdd" onClick={addSkeleton}>
          درج
        </button>
        <button className="btnRemove">حذف</button>
      </label>
      <div className="frmGroupDiv">
        <select className="frmGroupSelect" onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="1">تهران</option>
          <option value="2">تهران1</option>
          <option value="3">تهران2</option>
          <option value="4">تهران3</option>
        </select>
      </div>
    </span>
  </div>
  <div className="frmGroupBox">{skeletons}</div>
</Col>; */
}
