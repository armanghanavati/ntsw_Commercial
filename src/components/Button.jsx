import { LoadingOutlined } from "@ant-design/icons";
import themeColors from "../configs/theme";
import VerticalSpace from "./VerticalSpace";

const Button = ({
  backgroundColor = themeColors.btn.primary,
  color = themeColors.btn.content,
  width = "fit-content",
  type = "primary",
  children,
  loading = false,
  name,
  className = undefined,
  margin = "0 0 0 10px",
  hasVerticalSpace = true,
  disabled = false,
  onClick = () => { },
  ...others
}) => {
  return (
    <>
      <button
        className={
          type === "primary"
            ? `btn ${className}`
            : `btn btn-secondary ${className}`
        }
        style={{
          backgroundColor: disabled ? themeColors.btn.disable : backgroundColor,
          border: disabled
            ? `1px solid ${themeColors.btn.disable}`
            : backgroundColor
              ? `1px solid ${backgroundColor}`
              : "",
          cursor: disabled ? "not-allowed" : "pointer",
          // border:
          //   backgroundColor === themeColors.btn.content
          //     ? `1px solid ${themeColors.btn.disable}`
          //     : `1px solid ${backgroundColor}`,
          color:
            backgroundColor === themeColors.btn.content
              ? themeColors.btn.black
              : color,
          width,
          margin: type === "primary" ? margin : "0 5px 0 5px",
        }}
        {...others}
        onClick={
          loading || disabled ? (event) => event.preventDefault() : onClick
        }
        id={name}
      >
        {loading ? (
          <LoadingOutlined
            style={{
              fontSize: 24,
              color: "white",
            }}
            spin
          />
        ) : (
          children
        )}
      </button>
      {hasVerticalSpace && type === "primary" && <VerticalSpace space="10px" />}
    </>
  );
};
export default Button;
