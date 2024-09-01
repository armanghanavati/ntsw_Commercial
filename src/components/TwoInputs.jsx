import { InputNumber } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { VerticalSpace } from ".";
import themeColors from "../configs/theme";

const TwoInputs = ({
    title,
    value = "",
    name = "",
    onClick = () => { },
    onChange = () => { },
    required = false,
    error,
    type = "text",
    maxLength,
    placeholder,
    labelWidth = "200px",
    validations,
    index,
    readOnly,
    isCurrency = false,
    className = undefined,
}) => {
    const { theme } = useSelector((state) => state);
    const [newClassName, setNewClassName] = useState();
    const handleChange = (event) => {
        event?.preventDefault();
        const { value } = event.target;
        if (
            JSON.stringify(value).trim()?.length == 0 ||
            value == "" ||
            value === undefined ||
            value == null
        ) {
            onChange(name, undefined, validations, index);
        } else {
            onChange(name, value, validations, index);
        }
        if (!!className && (error?.length === 0 || !!!error)) {
            setNewClassName("orange");
        }
    };

    const handleChangeForCurrencyFormat = (value) => {
        if (value == 0) {
            onChange(name, 0, validations, index);
        } else if (
            JSON.stringify(value).trim()?.length == 0 ||
            value == "" ||
            value === undefined ||
            value == null
        ) {
            onChange(name, undefined, validations, index);
        } else {
            onChange(name, value, validations, index);
        }
    };

    const formatNumberInput = (e) => {
        let checkIfNum;
        if (e.key !== undefined) {
            checkIfNum =
                e.key === "Enter" ||
                e.key === "e" ||
                e.key === "+" ||
                // e.key === "-" ||
                e.keyCode === 69 ||
                e.keyCode === 190 ||
                e.keyCode === 187 ||
                e.keyCode === 189 ||
                (maxLength !== undefined &&
                    type === "number" &&
                    JSON.stringify(value)?.length - 2 === Number(maxLength) &&
                    e.key !== "Backspace");
        }
        return checkIfNum && e.preventDefault();
    };

    const formatInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <>
            <span
                style={{
                    color: themeColors[theme]?.inputText,
                }}
                className="input"
                onClick={onClick}
            >
                <span
                    className={
                        !!newClassName && (!!!error || error.length === 0)
                            ? `input--main input--main--${newClassName}`
                            : !!className && !!!error
                                ? `input--main input--main--${className}`
                                : error?.length === 0 && !!validations
                                    ? "input--main--valid"
                                    : error?.length > 0
                                        ? "input--main--error"
                                        : "input--main"
                    }
                >
                    <label
                        className={
                            !!newClassName && (!!!error || error.length === 0)
                                ? `input--main--label input--main--label--${newClassName}`
                                : !!className && !!!error
                                    ? `input--main--label input--main--label--${className}`
                                    : error?.length === 0 && !!validations
                                        ? "input--main--label--valid"
                                        : error?.length > 0
                                            ? "input--main--label--error"
                                            : "input--main--label"
                        }
                        style={{
                            backgroundColor: themeColors[theme]?.bg,
                            width: labelWidth,
                        }}
                    >
                        {required ? (
                            <span className="input--main--label__required-sign">*</span>
                        ) : (
                            ""
                        )}
                        {title}
                    </label>
                    {type === "textarea" ? (
                        <textarea
                            className="input--main--box"
                            name={name}
                            maxLength={maxLength}
                            placeholder={placeholder}
                            value={value}
                            title={value}
                            type={type}
                            style={{
                                color: themeColors[theme]?.inputText,
                                backgroundColor: themeColors[theme]?.inputBg,
                                paddingTop: "10px",
                            }}
                            onChange={handleChange}
                            readOnly={readOnly}
                            onKeyDown={type === "number" ? formatNumberInput : formatInput}
                        />
                    ) : isCurrency ? (
                        <InputNumber
                            className="input--main--box--currency-mode"
                            value={value}
                            readOnly={readOnly}
                            disabled={readOnly === "readOnly" ? true : false}
                            formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            onChange={handleChangeForCurrencyFormat}
                            onKeyDown={formatNumberInput}
                            controls={false}
                        />
                    ) : (
                        <>
                            <input
                                id={name}
                                className="input--main--box"
                                name={name}
                                maxLength={maxLength}
                                // pattern={(maxLength !== undefined && type === 'number') ? "\d*" : undefined}
                                pattern={
                                    maxLength !== undefined && type === "number"
                                        ? // ? "/^-?d+.?d*$/"
                                        "-?[0-9]+"
                                        : undefined
                                }
                                value={value}
                                title={value}
                                // type={(maxLength && type === 'number') ? 'text' : type}
                                type={type}
                                style={{
                                    color: themeColors[theme]?.inputText,
                                    backgroundColor: themeColors[theme]?.inputBg,
                                    textAlign: type === "number" || isCurrency ? "left" : "right",
                                    direction: type === "number" || isCurrency ? "ltr" : "rtl",
                                }}
                                onChange={handleChange}
                                readOnly={readOnly}
                                onKeyDown={type === "number" ? formatNumberInput : formatInput}
                            />
                            <input
                                id={name}
                                className="input--main--box"
                                name={name}
                                maxLength={maxLength}
                                // pattern={(maxLength !== undefined && type === 'number') ? "\d*" : undefined}
                                pattern={
                                    maxLength !== undefined && type === "number"
                                        ? // ? "/^-?d+.?d*$/"
                                        "-?[0-9]+"
                                        : undefined
                                }
                                value={value}
                                title={value}
                                // type={(maxLength && type === 'number') ? 'text' : type}
                                type={type}
                                style={{
                                    color: themeColors[theme]?.inputText,
                                    backgroundColor: themeColors[theme]?.inputBg,
                                    textAlign: type === "number" || isCurrency ? "left" : "right",
                                    direction: type === "number" || isCurrency ? "ltr" : "rtl",
                                }}
                                onChange={handleChange}
                                readOnly={readOnly}
                                onKeyDown={type === "number" ? formatNumberInput : formatInput}
                            />
                        </>
                    )}
                </span>
            </span>
            <span className="flex-order-column">
                {error &&
                    error.map((err, index) => (
                        <span
                            key={`${name}-errors-${index}`}
                            className="input--error-message"
                        >
                            {err}
                        </span>
                    ))}
            </span>
            <VerticalSpace space="10px" />
        </>
    );
};
export default TwoInputs;
