

import { LoadingOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import themeColors from "../configs/theme";
import VerticalSpace from './VerticalSpace';

const Button = ({
  backgroundColor = themeColors.btn.primary,
  color = themeColors.btn.content,
  width = 'fit-content',
  type = 'primary',
  children,
  loading = false,
  name,
  margin = '0 0 0 10px',
  hasVerticalSpace = true,
  onClick = () => { },
  ...others
}) => {
  return (
    <Tooltip title="prompt text" color={color} >
      <Button>{color}</Button>
    </Tooltip>
  );
};
export default Button;
