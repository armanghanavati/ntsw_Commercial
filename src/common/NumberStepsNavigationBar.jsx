import { Button, message, Steps, theme } from "antd";
import { useState } from "react";
const NumberStepsNavigationBar = ({ steps = [] }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  // const next = () => {
  //   setCurrent(current + 1);
  // };
  // const prev = () => {
  //   setCurrent(current - 1);
  // };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,

    
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
};
export default NumberStepsNavigationBar;
