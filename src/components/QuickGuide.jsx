import React from "react";
 import "intro.js";
 import "intro.js/introjs.css";
 import { Steps } from "intro.js-react";

const QuickGuide = ({ children, enabled, setEnabled, steps }) => {
  const onExit = () => {
    setEnabled(false);
  };
  const options = {
    showProgress: true,
    showBullets: true,
    exitOnOverlayClick: true,
    exitOnEsc: true,
    hidePrev: true,
    keyboardNavigation: true,
    scrollToElement: true,
    nextLabel: "بعدی",
    prevLabel: "قبلی",
    doneLabel: "اتمام",
    showButtons: true,
    // showStepNumbers: true,

  };
  return (
    <>
      { <Steps
        enabled={enabled}
        steps={steps}
        onExit={onExit}
        initialStep={0}
        options={options}
      /> }
      {children}
    </>
  );
};

export default QuickGuide;
