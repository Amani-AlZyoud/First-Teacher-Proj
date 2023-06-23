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
const Teacher = () => {
  const [toggle, setToggle] = useState(false);
  const [plan, setPlan] = useState([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    axios
    .get(
      "http://localhost:5500/lessons",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      if (response.data.success) {
        console.log(response.data.success);
        setPlan(response.data.success)
        setIsLoading(false)
      }

      if (response.data.message) {
        console.log(response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },[])


  return (
    <>
      <div className="container my-3 bg-white py-2 rounded-2">
        <Breadcrumbs aria-label="breadcrumb" dir="rtl">
          <Link underline="hover" className="text-dark fw-bold" to="/">
            الصفحة الرئيسية
          </Link>
          <span className="text-black fw-bold pe-none">صفحتي</span>
        </Breadcrumbs>
      </div>
      <div className="container my-5 rounded-3 bg-white" id="teacherProf">
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
          <div className="d-flex themed-grid-col mt-2 justify-content-end">
            <HashLink to='/plan'>
              <button className="btn btn-dark" id="createPlan">
                + إنشاء خطة درس
              </button>
            </HashLink>
          </div>
          <div className="d-flex themed-grid-col my-2 justify-content-end">
            <a href="">
              <button className="btn btn-dark" id="createPlan">
                + إنشاء امتحان
              </button>
            </a>
          </div>
          <div className="d-flex themed-grid-col mb-2 justify-content-end">
            <button
              className="btn btn-warning text-white fw-bold"
              id="createPlan"
              onClick={() => setToggle(!toggle)}
            >
              تعديل حسابي
            </button>
          </div>
        </div>
      </div>

      <>
        <div className="container text-center gx-0 pe-none" id="title1">
          <h1 className="text-light py-4 mt-5 text-bg-dark">النماذج المعبئة</h1>
        </div>
        <div className="container bg-light">
        { !isLoading && <div
            className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-5"
            id="lessonCardsContainer"
          >
            { 
              plan?.map((p)=>{
                return <div className="col" key={p?.lesson_id}>
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
                    {p?.headform[0]?.dataFrom}، {p?.table_two[0]?.day}
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
              }
            )}

          </div>}
            { isLoading && <h3 className="text-center py-4 mb-4">لا يوجد نماذج معبئة بعد</h3>}
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
