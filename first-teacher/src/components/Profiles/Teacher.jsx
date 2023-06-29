import React, { useContext, useEffect, useState } from "react";
import Plan from "../../images/خطة الدرس.png";
import exam from "../../images/نموذج امتحان.png";
import { UserContext } from "../../contexts/UserContext";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import ProfileImg from "../../images/placeholder.jpg";
import EditProfile from "./EditProfile";
import { Breadcrumbs } from "@mui/material";
import axios from "axios";
import PaginationComponent from "../PaginationComponent";
import { saveAs } from "file-saver";

const Teacher = () => {
  const [toggle, setToggle] = useState(false);
  const [plan, setPlan] = useState([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [allSessionsCount, setAllSessionCount] = useState(1);
  const [sessionsPerPage, setSessionsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const lastSessionNumber = currentPage * sessionsPerPage;
  const firstSessionIndex = lastSessionNumber - sessionsPerPage;
  const [limitedSessions, setLimitedSessions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/lessons", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setPlan(response.data.success);
          setIsLoading(false);
        }

        if (response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && plan.length > 0) {
      setAllSessionCount(plan.length);
      setLimitedSessions(plan.slice(firstSessionIndex, lastSessionNumber));
    }
  }, [isLoading, plan, firstSessionIndex, lastSessionNumber]);

  const state = {
    name: "Amani",
    receiptId: 0,
    price1: 0,
    price2: 0,
  };
  const createAndDownloadPdf = (p) => {
    console.log(p.mainform[0]);
    axios
      .post("http://localhost:5500/lessons/create-pdf", {
        username: user.username,
        school_name: user.school_name,
        mainform: p.mainform[0],
        headform: p.headform[0],
        table_one: p.table_one,
        table_two: p.table_two
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
       responseType: "blob"
      }, )
      .then((response) => 
      {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        saveAs(pdfBlob, "plan.pdf");
    }
      )
  };

  return (
    <>
      <div className="container my-3 bg-white py-2 rounded-2 border border-warning shadow-lg">
        <Breadcrumbs aria-label="breadcrumb" dir="rtl">
          <Link
            underline="hover"
            className="text-dark fw-bold text-decoration-none"
            to="/"
          >
            الصفحة الرئيسية
          </Link>
          <span className="text-black fw-bold pe-none">صفحتي</span>
        </Breadcrumbs>
      </div>
      <div
        className="container my-5 rounded-3 bg-white border border-warning shadow-lg border-2"
        id="teacherProf"
      >
        <div className="row mb-3 text-end">
          <div className="col-md-2 themed-grid-col mt-4">
            <img
              src={user?.user_img ? user.user_img : ProfileImg}
              id="teacherImg"
              className="img-thumbnail"
              width={200}
              alt="teacherIMG"
            />
          </div>
          <div className="col-md-8 themed-grid-col mt-4 pe-none">
            <h2>
              {user?.role_id === "2" && user?.gender === "Female"
                ? "المعلمة"
                : ""}
              {user?.role_id === "2" && user?.gender === "Male" ? "المعلم" : ""}
              <span id="teacherName"> {user?.username}</span>
            </h2>
            <h5 className="mt-4 text-muted">المدرسة</h5>
            <span className="fs-4" id="teacherSchool">
              {user?.school_name}
            </span>
          </div>
          <div className="d-flex my-4 justify-content-end">
            <HashLink to="/plan">
              <button className="btn btn-dark me-1" id="createPlan">
                + إنشاء خطة درس
              </button>
            </HashLink>
            <HashLink to="/">
              <button className="btn btn-dark" id="createPlan">
                + إنشاء امتحان
              </button>
            </HashLink>
            <button
              className="btn btn-warning me-1 text-white fw-bold"
              id="createPlan"
              onClick={() => setToggle(!toggle)}
            >
              تعديل حسابي
            </button>
          </div>
        </div>
      </div>

      <>
        <div className="container text-center gx-0 pe-none " id="title1">
          <h1 className="text-light py-4 mt-5 text-bg-dark shadow-lg rounded-2">
            النماذج المعبئة
          </h1>
        </div>
        <div className="container bg-light shadow-lg rounded-bottom-2">
          {!isLoading && (
            <div
              className="row row-cols-1 row-cols-sm-1 row-cols-md-3 g-3 mb-5 "
              id="lessonCardsContainer"
            >
              {limitedSessions?.map((p) => {
                return (
                  <div className="col" key={p?.lesson_id}>
                    <div className="card shadow-sm my-5">
                      <img
                        src={Plan}
                        className="bd-placeholder-img card-img-top"
                        width={300}
                        height={300}
                        alt=""
                      />
                      <div className="card-body">
                        <small className="text-body-secondary">
                          {p?.table_two[p?.table_two.length - 1]?.datte}،{" "}
                          {p?.table_two[p?.table_two.length - 1]?.day}
                        </small>
                        <h4 className="mt-1">
                          خطة درس (<span id="planNum">{p?.lesson_id}</span>)
                        </h4>
                        <div className="d-flex justify-content-end align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-dark rounded"
                              id="createPlan"
                              onClick={() => createAndDownloadPdf(p)}
                            >
                              معاينة
                            </button>
                            <Link to={`/plan/${p?.lesson_id}`}>
                              {" "}
                              <button
                                type="button"
                                id="createPlan"
                                className="btn btn-sm btn-outline-dark rounded me-1"
                              >
                                تعديل
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {!isLoading && (
            <div className="d-flex justify-content-center my-5">
              <PaginationComponent
                itemsCount={allSessionsCount}
                itemsPerPage={sessionsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                alwaysShown={false}
              />
            </div>
          )}

          {limitedSessions?.length === 0 && (
            <h3 className="text-center py-4 mb-4">لا يوجد نماذج معبئة بعد</h3>
          )}
        </div>

        {/* <div className="container text-center gx-0 pe-none" id="title1">
          <h1 className="text-light py-4 mt-5 text-bg-dark">
            النماذج المدفوعة
          </h1>
        </div>
        <div className="container bg-light">
          <div
            className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-5"
            id="paidCardsContainer"
          >
            <div className="col">
              <div className="card shadow-sm my-5">
                <img
                  src={exam}
                  className="bd-placeholder-img card-img-top"
                  width={300}
                  height={300}
                  alt=""
                />
                <div className="card-body">
                  <small className="text-body-secondary">
                    الأحد، 12/4/2023 4:20م
                  </small>
                  <h4>
                    نموذج امتحان (<span id="planNum">1</span>)
                  </h4>
                  <div className="d-flex justify-content-end align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark"
                      >
                        معاينة
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark"
                      >
                        تعديل
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>

      <EditProfile toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default Teacher;
