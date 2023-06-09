import React, { useContext } from "react";
import "../Styles/style.css";
import { HashLink } from "react-router-hash-link";
import { UserContext } from "../contexts/UserContext";
const Footer = () => {
  const { auth, setAuth } = useContext(UserContext);

  return (
    <footer className="py-3 bg-black" id="footerEdit">
      <ul className="nav justify-content-center border-bottom pb-3 ">
        <li className="nav-item">
          <HashLink smooth to="/#" className="nav-link px-2" id="footer-link">
            الرئيسية
          </HashLink>
        </li>
        <li className="nav-item">
          <HashLink
            smooth
            to="/instructions#"
            className="nav-link px-2"
            id="footer-link"
          >
            الإرشادات
          </HashLink>
        </li>
        <li className="nav-item">
          {auth ? (
            <HashLink
              smooth
              to="/login#"
              className="nav-link px-2"
              id="footer-link"
            >
              نموذج خطة الدرس
            </HashLink>
          ) : (
            <HashLink
              to="/plan"
              className="nav-link px-2"
              id="footer-link"
              onClick={() => {
                localStorage.removeItem("mainForm");
                localStorage.removeItem("headerForm");
                localStorage.removeItem("tableOne");
                localStorage.removeItem("tableTwo");
              }}
            >
              نموذج خطة الدرس
            </HashLink>
          )}
        </li>
        <li className="nav-item">
          <HashLink
            smooth
            to="/About"
            className="nav-link px-2"
            id="footer-link"
          >
            عن الموقع
          </HashLink>
        </li>
        <li className="nav-item">
          <HashLink
            smooth
            to="/contact#"
            className="nav-link px-2"
            id="footer-link"
          >
            اتصل بنا
          </HashLink>
        </li>
      </ul>
      <p className="text-center text-white">
        {" "}
        المعلم الأول - جميع الحقوق محفوظة © 2023
      </p>
    </footer>
  );
};

export default Footer;
