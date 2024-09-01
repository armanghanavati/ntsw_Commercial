// import { useSelector } from "react-redux";
// import themeColors from "./../configs/theme.js";
// import VerticalSpace from "./VerticalSpace.jsx";
// import { useEffect } from "react";
// import Select from "react-select";

// const SelectOptions = ({
//   name = "",
//   defaultValue,
//   onChange = () => { },
//   handleOnChange,
//   options = [],
//   error = [],
//   title = "",
//   optionTitle = "name",
//   optionValue = "id",
//   disabled = false,
//   validations = [],
//   index,
//   width = "200px",
//   className,
//   required = false,
//   space = "30px",
//   maxWidth,
// }) => {
//   const { theme } = useSelector((state) => state);
//   const handleChange = (event) => {
//     const { value } = event.target;
//     onChange(name, value, validations || undefined, index);
//   };

//   // useEffect(() => {
//   //   if (
//   //     !!options &&
//   //     options !== [] &&
//   //     Array.isArray(options) &&
//   //     options.length === 1
//   //   )
//   //     onChange(name, options[0][optionValue], validations || undefined, index);
//   // }, []);

//   return (
//     <>
//       <span
//         style={{ paddingLeft: space }}
//         className={
//           !!className && error.length === 0 ? `input ${className}` : "input"
//         }
//       >
//         <label
//           className={
//             !!className && error.length === 0
//               ? `input--main--label input--main--label--${className} combobox--label`
//               : error.length === 0
//                 ? "input--main--label combobox--label"
//                 : "input--main--label--error combobox--label"
//           }
//           style={{
//             backgroundColor: themeColors[theme]?.bg,
//             color: themeColors[theme]?.inputText,
//             height: "35px",
//             width: width,
//           }}
//           htmlFor={`${name}`}
//         >
//           {required ? (
//             <span className="input--main--label__required-sign"> * </span>
//           ) : (
//             ""
//           )}
//           {title}
//         </label>
//         <Select
//           className={
//             !!className && error.length === 0
//               ? `get-select--${className} get-select`
//               : error.length === 0
//                 ? "get-select"
//                 : "get-select--error get-select"
//           }
//           name={name}
//           id={name}
//           onChange={handleChange}
//           style={{
//             color: themeColors[theme]?.inputText,
//             backgroundColor: themeColors[theme]?.inputBg,
//           }}
//         >
//           {Array.isArray(options) || JSON.stringify(options).startsWith("[")
//             ? options?.map((item, index) => (
//               <option
//                 style={{
//                   color: themeColors[theme]?.inputText,
//                   backgroundColor: themeColors[theme]?.inputBg,
//                   maxWidth: window.innerWidth,
//                 }}
//                 id={`${name}-${index}-${item[optionValue]}`}
//                 key={`${name}-${index}-${item[optionValue]}`}
//                 value={item[optionValue]}
//               >
//                 {item[optionTitle]}
//               </option>
//             ))
//             : undefined}
//         </Select>
//       </span>
//       {!!error &&
//         error.map((err, index) => (
//           <span
//             key={`${name}-errors-${index}`}
//             className="input--error-message"
//           >
//             {err}
//           </span>
//         ))}
//       <VerticalSpace space={error && error.length > 0 ? "20px" : "10px"} />
//     </>
//   );
// };
// export default SelectOptions;



import { useSelector } from "react-redux";
import themeColors from "./../configs/theme.js";
import VerticalSpace from "./VerticalSpace.jsx";
import { useEffect } from "react";
import Select from "react-select";

const SelectOptions = ({
  name = "",
  defaultValue,
  onChange = () => { },
  options = [],
  error = [],
  title = "",
  optionTitle = (option) => option.name,
  optionValue = (option) => option.id,
  disabled = false,
  validations = [],
  index,
  width = "200px",
  className = "",
  required = false,
  space = "30px",
  maxWidth,
}) => {
  const { theme } = useSelector((state) => state);

  const handleChange = (event) => {
    const { value } = event;
    onChange(name, value, validations || undefined, index);
  };

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
          className={`${className} w-100`}
          options={options}
          getOptionLabel={optionTitle}
          getOptionValue={optionValue}
          name={name}
          id={name}
          onChange={handleChange}
          style={{
            color: themeColors[theme]?.inputText,
            backgroundColor: themeColors[theme]?.inputBg,
          }}
        />

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
export default SelectOptions;
