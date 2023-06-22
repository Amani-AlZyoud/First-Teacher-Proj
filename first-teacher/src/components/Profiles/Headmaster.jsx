import React, { useContext, useEffect, useState } from "react";
import "../../Styles/headmaster_style.css";
import ProfileImg from "../../images/placeholder.jpg";
import t1 from "../../images/placeholder.jpg";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import EditProfile from "./EditProfile";
import { Breadcrumbs } from "@mui/material";
import axios from "axios";

const Headmaster = () => {
  const { user } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const [teachers, setTeachers] = useState([]);

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
          console.log(response.data);
          setTeachers(response.data.success);
        }

        if(response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container my-5">
        <Breadcrumbs aria-label="breadcrumb" dir="rtl">
          <Link underline="hover" className="text-dark fw-bold" to="/">
            الصفحة الرئيسية
          </Link>
          <span className="text-black fw-bold pe-none">صفحتي</span>
        </Breadcrumbs>
      </div>

      <div className="container mt-5 rounded-3 bg-white" id="headmasterProf">
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

      <>
        <div className="container text-center g-0 pe-none" id="title1">
          <h1 className="text-light py-3 mt-5 text-bg-dark rounded">
            المعلمون / المعلمات
          </h1>
        </div>
        <div
          className="container mb-5 rounded"
          id="teachersContainer"
          style={{ backgroundColor: "white" }}
        >
          <div className="row">
            <div className="" id="teacherUser">
              {teachers?.map((teacher) => {
                return (
                  <>
                    <div
                      className="d-flex align-items-center bg-white"
                      key={teacher.user_id}
                    >
                      <img
                        src={teacher?.user_img ? teacher.user_img : t1}
                        alt=""
                        className="bd-placeholder-img my-2 me-1"
                        width={90}
                        height={90}
                        style={{ borderRadius: "90px" }}
                      />
                      <Link
                        to
                        className="text-dark-emphasis col-lg-4 col-sm-12"
                        style={{ alignSelf: "center" }}
                      >
                        <strong className="text-dark" id="teacherUserName">
                           المعلمة {teacher.username}
                        </strong>
                      </Link>
                      <div className=" small lh-sm w-100">
                        <div className="d-flex justify-content-end ">
                          <Link to="">
                            <button className="btn btn-dark m-1">عرض</button>
                          </Link>
                          <Link to="">
                            <button className="btn btn-dark m-1">شوهد</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>

      <EditProfile toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default Headmaster;
