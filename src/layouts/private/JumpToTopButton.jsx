import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const JumpToTopButton = () => {
  const { colorMode } = useSelector((state) => state);
  const [scrollY, setScrollY] = useState(0);

  const jumpToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className="jump-to-top-btn"
      onClick={jumpToTop}
      style={{
        backgroundColor: colorMode,
        display: window.scrollY > 100 ? "block" : "none",
      }}
    >
      <i
        className="fa fa-arrow-circle-up jump-to-top-btn--icon"
        aria-hidden="true"
      ></i>
    </button>
  );
};
export default JumpToTopButton;
