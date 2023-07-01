import React, { useContext, useEffect, useState } from "react";
import PaginationComponent from "../PaginationComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import t1 from "../../images/placeholder.jpg";

const Teachers = () => {
  const { user } = useContext(UserContext);
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
      <h1
        className="text-light py-3 mt-5 rounded"
        style={{ backgroundColor: "black" }}
      >
        المعلمون / المعلمات
      </h1>
      <div className="container mb-5 rounded-2 bg-white" id="teachersContainer">
        <div class="row">
          {!isLoading ? (
            limitedSessions?.map((teacher) => {
              return (
                <>
                  <div class="col-xl-3 col-sm-6 my-4">
                    <div
                      className="card text-center"
                      style={{ backgroundColor: "black" }}
                    >
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
    </>
  );
};

export default Teachers;
