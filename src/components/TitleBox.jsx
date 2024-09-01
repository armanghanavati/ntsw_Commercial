import { useSelector } from "react-redux";
import themeColors from "../configs/theme";

const TitleBox = ({
  backgroundColor = themeColors.btn.primary,
  color = themeColors.btn.content,
  title = '',
  ...others
}) => {
  const { theme, colorMode } = useSelector(state => state)
  return (
    <h6
      className='title-box'
      style={{
        color: themeColors[theme].titleBox,
        borderColor: colorMode
      }}
      {...others}
    >
      {title}
    </h6>
  );
};
export default TitleBox;
