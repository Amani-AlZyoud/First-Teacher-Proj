import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/style.css";
import logo from "../images/logo.png";
import profile from "../images/teacher.png";
import { HashLink } from "react-router-hash-link";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);




  return (
    <>
      {/* <!-- HEADER SECTION --> */}
      <header className="bg-white">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid align-items-end">
            <Link to={user?.role_id === "1" ? `/profile/${user?.user_id}` : "/"} className="navbar-brand" id="logo">
              <img src={logo} width={200} alt="" id="logoImg"/>
            </Link>

            <form className="d-flex justify-content-center " role="search">
              {auth ? (
                <div className="dropdown text-end">
                { user?.role_id !== "1" &&
                 <>
                  <a
                    href="#"
                    className="d-block link-dark text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user?.user_img ? user.user_img : profile}
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu text-small" dir="right">
                    <li>
                      <Link
                        to={`/profile/${user?.user_id}`}
                        className="dropdown-item text-end"
                        id="link1"
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          style={{ verticalAlign: "sub" }}
                          fill="currentColor"
                          className="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                        </svg>
                        حسابي
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={() => {
                          setUser({});
                          setAuth(false);
                          localStorage.clear();
                        }}
                        className="dropdown-item text-end"
                        id="link2"
                      >
                        تسجيل خروج{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-box-arrow-left"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                          />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                 </>}
                </div>
              ) : (
                <></>
              )}
              <input
                className="form-control me-2  border-dark"
                type="search"
                placeholder="البحث..."
                aria-label="Search"
                id="searchBar"
              />
              <button className="btn me-1" type="submit" id="searchBtn">
                البحث
              </button>
              {auth ? (
                <>
                  <Link to="/">
                    <button
                      type="button"
                      onClick={() => {
                        setUser({});
                        setAuth(false);
                        localStorage.clear();
                      }}
                      className="btn me-1"
                      id="loginBtn"
                    >
                      خروج
                    </button>
                  </Link>{" "}
                </>
              ) : (
                <Link to="login">
                  <button type="button" className="btn me-1" id="loginBtn">
                    تسجيل
                  </button>
                </Link>
              )}
              <a href="" id="lang">
                EN
              </a>
            </form>
          </div>
        </nav>
        <div>
       { user?.role_id !== '1' ? <nav className="navbar navbar-expand-lg top-0" id="nav-edit-color">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                id="h-menu"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mb-2 mb-lg-0 ms-2">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link"
                      aria-current="page"
                      id="nav-edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        style={{ verticalAlign: "sub" }}
                        fill="currentColor"
                        className="bi bi-house-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                      </svg>{" "}
                      الرئيسية
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/instructions" className="nav-link" id="nav-edit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        style={{ verticalAlign: "sub" }}
                        fill="currentColor"
                        className="bi bi-file-text-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                      </svg>{" "}
                      الإرشادات
                    </Link>
                  </li>
                  
                    <li className="nav-item dropdown">
                      <Link
                        to
                        className="nav-link dropdown-toggle"
                        id="nav-edit"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          style={{ verticalAlign: "sub" }}
                          fill="currentColor"
                          className="bi bi-journals"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
                          <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
                        </svg>{" "}
                        نماذج
                      </Link>
                      <ul
                        className="dropdown-menu text-end"
                        style={{ minWidth: "12rem" }}
                      >
                        <li>
                          {auth ? (
                            <Link
                              to="/plan/1"
                              className="dropdown-item"
                              id="drop-list"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                style={{ verticalAlign: "sub" }}
                                fill="currentColor"
                                className="bi bi-file-earmark-plus"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                              </svg>{" "}
                              خطة الدرس
                            </Link>
                          ) : (
                            <Link
                              to="login"
                              className="dropdown-item"
                              id="drop-list"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                style={{ verticalAlign: "sub" }}
                                fill="currentColor"
                                className="bi bi-file-earmark-plus"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                              </svg>{" "}
                              خطة الدرس
                            </Link>
                          )}
                        </li>
                        <li>
                          {auth ? (
                            <Link
                              to="/activites"
                              className="dropdown-item"
                              id="drop-list"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                style={{ verticalAlign: "sub" }}
                                fill="currentColor"
                                className="bi bi-lock-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                              </svg>{" "}
                              الأنشطة اللامنهجية
                            </Link>
                          ) : (
                            <Link
                              to="login"
                              className="dropdown-item"
                              id="drop-list"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                style={{ verticalAlign: "sub" }}
                                fill="currentColor"
                                className="bi bi-lock-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                              </svg>{" "}
                              الأنشطة اللامنهجية
                            </Link>
                          )}
                        </li>
                        <li>
                          {auth ? (
                            <Link
                              to="/exam"
                              className="dropdown-item"
                              id="drop-list"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                style={{ verticalAlign: "sub" }}
                                fill="currentColor"
                                className="bi bi-lock-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                              </svg>{" "}
                              إنشاء امتحان
                            </Link>
                          ) : (
                            <Link
                              to="login"
                              className="dropdown-item"
                              id="drop-list"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                style={{ verticalAlign: "sub" }}
                                fill="currentColor"
                                className="bi bi-lock-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                              </svg>{" "}
                              إنشاء امتحان
                            </Link>
                          )}
                        </li>
                      </ul>
                    </li>
                  

                  {user?.role_id === "3" ? <></> : <></>}
                  <li className="nav-item">
                    <Link to="shop" className="nav-link" id="nav-edit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        style={{ verticalAlign: "sub" }}
                        fill="currentColor"
                        className="bi bi-shop"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                      </svg>{" "}
                      متجر المعلم
                    </Link>
                  </li>
                  <li className="nav-item">
                    <HashLink
                      smooth
                      to="/#About"
                      className="nav-link"
                      id="nav-edit"
                    >
                      عن الموقع
                    </HashLink>
                  </li>
                  <li className="nav-item">
                    <Link to="contact" className="nav-link" id="nav-edit">
                      اتصل بنا{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        style={{ verticalAlign: "sub" }}
                        fill="currentColor"
                        className="bi bi-telephone-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav> : <></> }
        </div>
      </header>
    </>
  );
};

export default Header;
