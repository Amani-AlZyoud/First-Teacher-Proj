import React, { useState } from "react";
import "../../Styles/admin_style.css";
import Statistics from "../Admin/Statistics";
import AllUsers from "../Admin/AllUsers";
import TeachersList from "../Admin/TeachersList";
import DeletedT from "../Admin/DeletedT";
import HeadmastersList from "../Admin/HeadmastersList";
import DeletedH from "../Admin/DeletedH";
const Admin = () => {
  const [navLink, setnavLink] = useState("dashboard");
  const [teachersUpdated, setTeachersUpdated] = useState(false);
  const [headmastersUpdated, setHeadmastersUpdated] = useState(false);
  return (
    <>
      <header className="navbar navbar-dark bg-black flex-md-nowrap p-0 h-100 shadow">
        <button
          className="navbar-toggler d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="عرض/إخفاء لوحة التنقل"
          id="btn-toggler"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block sidebar collapse"
            style={{ backgroundColor: "black" }}
          >
            <div className="position-sticky pt-3 sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="#"
                    id="dashboardLink"
                    style={
                      navLink === "dashboard"
                        ? { color: "black", backgroundColor: "white" }
                        : { color: "white", backgroundColor: "black" }
                    }
                    onClick={() => setnavLink("dashboard")}
                  >
                    <span
                      data-feather="home"
                      className="align-text-bottom fw-bold "
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      fill="currentColor"
                      style={{ verticalAlign: "sub" }}
                      className="bi bi-speedometer2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                      <path
                        fillRule="evenodd"
                        d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
                      />
                    </svg>{" "}
                    لوحة القيادة
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    id="teachersLink"
                    style={
                      navLink === "teachers"
                        ? { color: "black", backgroundColor: "white" }
                        : { color: "white", backgroundColor: "black" }
                    }
                    onClick={() => setnavLink("teachers")}
                  >
                    <span data-feather="users" className="align-text-bottom" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      style={{ verticalAlign: "sub" }}
                      fill="currentColor"
                      className="bi bi-person-workspace"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
                    </svg>{" "}
                    المعلمون والمعلمات
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    id="lessonPlanLink"
                    style={
                      navLink === "headmasters"
                        ? { color: "black", backgroundColor: "white" }
                        : { color: "white", backgroundColor: "black" }
                    }
                    onClick={() => setnavLink("headmasters")}
                  >
                    <span
                      data-feather="bar-chart-2"
                      className="align-text-bottom"
                    />
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
                    المدراء والمديرات
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    id="ordersLink"
                    style={
                      navLink === "orders"
                        ? { color: "black", backgroundColor: "white" }
                        : { color: "white", backgroundColor: "black" }
                    }
                    onClick={() => setnavLink("orders")}
                  >
                    <span data-feather="file" className="align-text-bottom" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      style={{ verticalAlign: "sub" }}
                      fill="currentColor"
                      className="bi bi-cart-plus-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                    </svg>{" "}
                    الطلبات
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            style={{ backgroundColor: "#ffcd29" }}
          >
            {navLink === "dashboard" && (
              <>
                <div className="container" style={{ minHeight: "100vh" }}>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom border-white border-2">
                    <h1 className="h2 fw-bold text-white">لوحة القيادة</h1>
                  </div>{" "}
                  <Statistics />
                  <AllUsers />{" "}
                </div>
              </>
            )}

            {navLink === "teachers" && (
              <>
                <div className="container" style={{ minHeight: "100vh" }}>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom border-white border-2">
                    <h1 className="h2 fw-bold text-white">
                      المعلمون والمعلمات
                    </h1>
                  </div>
                  <TeachersList
                    teachersUpdated={teachersUpdated}
                    setTeachersUpdated={setTeachersUpdated}
                  />
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-5 border-bottom border-white border-2">
                    <h1 className="h2 fw-bold text-white">
                      {" "}
                      المعلمون والمعلمات المحذوفين{" "}
                    </h1>
                  </div>
                  <DeletedT
                    teachersUpdated={teachersUpdated}
                    setTeachersUpdated={setTeachersUpdated}
                  />
                </div>
              </>
            )}
            {navLink === "headmasters" && (
              <>
                <div className="container" style={{ minHeight: "100vh" }}>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom border-white border-2">
                    <h1 className="h2 fw-bold text-white">المدراء والمديرات</h1>
                  </div>
                  <HeadmastersList headmastersUpdated={headmastersUpdated} setHeadmastersUpdated={setHeadmastersUpdated} />
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-5 border-bottom border-white border-2">
                    <h1 className="h2 fw-bold text-white">
                      {" "}
                      المدراء والمديرات المحذوفين{" "}
                    </h1>
                  </div>
                  <DeletedH headmastersUpdated={headmastersUpdated} setHeadmastersUpdated={setHeadmastersUpdated} />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Admin;
