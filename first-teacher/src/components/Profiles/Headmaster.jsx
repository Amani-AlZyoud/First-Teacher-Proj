import React, { useContext, useEffect, useState } from "react";
import "../../Styles/headmaster_style.css";
import t1 from "../../images/placeholder.jpg";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import EditProfile from "./EditProfile";
import { Breadcrumbs } from "@mui/material";
import axios from "axios";
import PaginationComponent from "../PaginationComponent";
import CircularStatic from "../CircularProgressWithLabel";

const Headmaster = () => {
  const { user } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "http://localhost:5500/teachers/group",
        {
          school_name: user.school_name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          setTeachers(response.data.success);
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

  const [allTeachersCount, setAllTeachersCount] = useState(1);
  const [TeachersPerPage, setTeachersPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const lastTeacherNumber = currentPage * TeachersPerPage;
  const firstTeacherIndex = lastTeacherNumber - TeachersPerPage;
  const [limitedSessions, setLimitedTeachers] = useState([]);

  useEffect(() => {
    if (!isLoading && teachers.length > 0) {
      setAllTeachersCount(teachers.length);
      setLimitedTeachers(teachers.slice(firstTeacherIndex, lastTeacherNumber));
    }
  }, [isLoading, teachers, firstTeacherIndex, lastTeacherNumber]);

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
        className="container mt-5 rounded-3 bg-white border border-warning shadow-lg border-2"
        id="headmasterProf"
      >
        <div className="row mb-3 text-end">
          <div className="col-md-2 themed-grid-col mt-4">
            <img
              src={user?.user_img ? user.user_img : t1}
              id="headmasterImg"
              className="img-thumbnail"
              width={200}
              alt="teacherIMG"
            />
          </div>
          <div className="col-md-8 themed-grid-col mt-4 pe-none">
            <h2>
              {user?.role_id === "3" && user?.gender === "Female"
                ? "المديرة"
                : ""}
              {user?.role_id === "3" && user?.gender === "Male" ? "المدير" : ""}
              <span id="teacherName"> {user?.username}</span>
            </h2>
            <h5 className="mt-4 text-muted">المدرسة</h5>
            <span className="fs-4" id="teacherSchool">
              {user?.school_name}
            </span>
          </div>
          <div className="d-flex themed-grid-col mb-2 justify-content-end">
            <button
              className="btn btn-dark text-white fw-bold"
              id="createPlan"
              onClick={() => setToggle(!toggle)}
            >
              تعديل حسابي
            </button>
          </div>
        </div>
      </div>

      <div className="container text-center g-0 pe-none " id="title1">
        <h1 className="text-light py-3 mt-5 text-bg-dark rounded">
          المعلمون / المعلمات
        </h1>
      </div>
      <div className="container mb-5 rounded-2 bg-white" id="teachersContainer">
        <div class="row">
          {!isLoading ? (
            limitedSessions?.map((teacher) => {
              return (
                <>
                  <div class="col-xl-3 col-sm-6 my-4">
                    <div className="card text-center bg-dark">
                      <div className="card-body">
                        <div className="avatar-xs mr-3 float-left">
                          <a href="#">
                            <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                              <i className="icon-xs" data-feather="zap" />
                            </div>
                          </a>
                        </div>
                        <div className="clearfix" />
                        <div className="mb-4">
                          <div className="avatar-md mx-auto">
                            <img
                              src={teacher?.user_img ? teacher.user_img : t1}
                              width={100}
                              height={100}
                              alt=""
                              className="rounded-circle border border-2"
                            />
                          </div>
                        </div>
                        <h5 className="font-size-15 mb-1">
                          <a
                            href="#"
                            className="text-white text-decoration-none"
                          >
                            {teacher.username}
                          </a>
                        </h5>
                        <p className="text-warning mb-2">{teacher.email}</p>
                      </div>
                      <div className="card-body border-top py-3">
                        <Link
                          to={`/plans/${teacher.user_id}`}
                          className="btn btn-light w-lg waves-effect waves-light"
                        >
                          عرض خطط الدروس
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <></>
          )}
        </div>

        {limitedSessions?.length === 0 && (
          <h3 className="text-center py-4 mb-4">لا يوجد معلمات بعد</h3>
        )}

        {!isLoading && (
          <div className="d-flex justify-content-center my-3">
            <PaginationComponent
              itemsCount={allTeachersCount}
              itemsPerPage={TeachersPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              alwaysShown={false}
            />
          </div>
        )}
      </div>

      <EditProfile toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default Headmaster;
