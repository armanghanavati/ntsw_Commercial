import img1 from "../assets/images/allah.png";
import img2 from "../assets/images/nameNTSW.png";
import img3 from "../assets/images/logoNTSW.png";

const Header = ({ foreign = false }) => {
  return (
    <div>
      <div
        className={`register-header ${
          foreign === true ? "register-header-foreign" : ""
        }`}
      >
        <section
          className={`img1-register ${
            foreign === true ? "img1-register-foreign" : ""
          }`}
        >
          <img src={img1} alt="img" />
        </section>
        <section className="img2-register">
          <img src={img2} alt="img" className="img2" />
        </section>
        <section
          className={`img3-register ${
            foreign === true ? "img3-register-foreign" : ""
          }`}
        >
          <img src={img3} alt="img" className="img3" />
        </section>
      </div>
    </div>
  );
};

export default Header;
