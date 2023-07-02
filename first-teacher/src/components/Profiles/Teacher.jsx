import React, { useContext, useEffect, useState } from "react";
import Plan from "../../images/خطة الدرس.png";
import exam from "../../images/نموذج امتحان.png";
import { UserContext } from "../../contexts/UserContext";
import { HashLink } from "react-router-hash-link";
import { Link, useParams } from "react-router-dom";
import ProfileImg from "../../images/placeholder.jpg";
import EditProfile from "./EditProfile";
import { Breadcrumbs, CircularProgress } from "@mui/material";
import axios from "axios";
import PaginationComponent from "../PaginationComponent";
import { saveAs } from "file-saver";
import SignedPlan from "../LessonsPlan/SignedPlan";
import Swal from "sweetalert2";

const Teacher = () => {
  const [toggle, setToggle] = useState(false);
  const [plan, setPlan] = useState([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState();
  const [refreshData, setRefreshData] = useState(false);

  const [allPlansCount, setAllPlansCount] = useState(1);
  const [PlansPerPage, setPlansPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPlanNumber = currentPage * PlansPerPage;
  const firstPlanIndex = lastPlanNumber - PlansPerPage;
  const [limitedPlans, setLimitedPlans] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5500/lessons/userPlans/${id}`, {
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
  }, [refreshData]);

  useEffect(() => {
    if (!isLoading && plan.length > 0) {
      setAllPlansCount(plan.length);
      setLimitedPlans(plan.slice(firstPlanIndex, lastPlanNumber));
    }
    if(plan.length === 0){
      setLimitedPlans([]);
    }
  }, [isLoading, plan, firstPlanIndex, lastPlanNumber, refreshData]);

  const handleDelete = (plan) => {
    Swal.fire({
      title: "هل انت متأكد؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCD29",
      cancelButtonColor: "red",
      confirmButtonText: "نعم",
      cancelButtonText: "لا، إلغاء الحذف",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5500/lessons/${plan.lesson_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              Swal.fire({
                title: "تم الحذف بنجاح",
                icon: "success",
                showConfirmButton: false,
              });
              setRefreshData(true);
            }

            if (response.data.message) {
              console.log(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const createAndDownloadPdf = (p) => {
    setDownloading(p.lesson_id);
    axios
      .post(
        "http://localhost:5500/lessons/create-pdf",
        {
          username: user.username,
          school_name: user.school_name,
          mainform: p.mainform[0],
          headform: p.headform[0],
          table_one: p.table_one,
          table_two: p.table_two,
          sign: p.sign
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        setDownloading(false);
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        saveAs(pdfBlob, "plan.pdf");
      });
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
          <div className="col-md-4 col-3 col-lg-2 themed-grid-col mt-4">
            <img
              src={user?.user_img ? user.user_img : ProfileImg}
              id="teacherImg"
              className="img-thumbnail"
              width={200}
              alt="teacherIMG"
            />
          </div>
          <div className="col-md-9 col-9 col-lg-10 themed-grid-col mt-4 pe-none">
            <h2>
              {user?.role_id === "2" && user?.gender === "Female"
                ? "المعلمة"
                : ""}
              {user?.role_id === "2" && user?.gender === "Male" ? "المعلم" : ""}
              <span id="teacherName"> {user?.username}</span>
            </h2>
            <h5 className="mt-4 text-muted">المدرسة</h5>
            <h2>
              <span id="teacherSchool">{user?.school_name}</span>
            </h2>
          </div>
          <div className="d-flex my-4 justify-content-end">
            <HashLink to="/plan">
              <button
                className="btn btn-dark me-1"
                id="createPlan"
                onClick={() => {
                  localStorage.removeItem("mainForm");
                  localStorage.removeItem("headerForm");
                  localStorage.removeItem("tableOne");
                  localStorage.removeItem("tableTwo");
                }}
              >
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
        <div className="container text-center gx-0" id="dash-box">
          <h1 className="text-light py-4 mt-5 text-bg-dark shadow-lg">
            النماذج المعبئة
          </h1>
        </div>
        <div className="container bg-light shadow-lg rounded-bottom-2">
          {!isLoading && (
            <div
              className="row row-cols-1 row-cols-sm-1 row-cols-md-3 g-3 mb-5 "
              id="lessonCardsContainer"
            >
              {limitedPlans?.map((p) => {
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
                              {downloading === p.lesson_id ? (
                                <CircularProgress
                                  size="1.5rem"
                                  color="success"
                                />
                              ) : (
                                "معاينة"
                              )}
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-dark me-1 rounded"
                              id="createPlan"
                              onClick={() => handleDelete(p)}
                            >
                              حذف
                            </button>
                            <Link to={`/plan/${p?.lesson_id}`}>
                              {" "}
                              <button
                                type="button"
                                id="createPlan"
                                className="btn btn-sm btn-outline-dark rounded"
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
            <div className="d-flex justify-content-center my-3">
              <PaginationComponent
                itemsCount={allPlansCount}
                itemsPerPage={PlansPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                alwaysShown={false}
              />
            </div>
          )}

          {limitedPlans?.length === 0 && (
            <h3 className="text-center py-3">لا يوجد نماذج معبئة بعد</h3>
          )}
        </div>

        <div className="container text-center gx-0" id="title1">
          <h1 className="text-light py-4 mt-5 text-bg-dark">النماذج الموقعة</h1>
          <SignedPlan
            createAndDownloadPdf={createAndDownloadPdf}
            downloading={downloading}
          />
        </div>
      </>

      <EditProfile toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default Teacher;
