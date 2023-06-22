import React, { useContext, useState } from 'react'

import '../../Styles/headmaster_style.css'
import t1 from "../../images/t-prof.png"
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
const Headmaster = () => {
    const { user } = useContext(UserContext);
    // console.log(user)
  return (
    <>
    <div className="container mt-5 rounded-3 bg-white" id="headmasterProf">
  <div className="row mb-3 text-end">
    <div className="col-md-2 themed-grid-col mt-4">
      <img
        src={user?.user_img}
        id="headmasterImg"
        className="img-thumbnail"
        width={200}
        alt="teacherIMG"
      />
    </div>
    <div className="col-md-8 themed-grid-col mt-4">
      <h2>
        {user?.role_id === "3" && user?.gender === "Female" ? "المديرة" : ""}
        {user?.role_id === "3" && user?.gender === "Male" ? "المدير" : ""}
        <span id="teacherName"> {user?.username}</span>
      </h2>
      <h5 className="mt-4 text-muted">المدرسة</h5>
      <span className="fs-4" id="teacherSchool">
        {user?.school_name}
      </span>
    </div>
    <div className="d-flex themed-grid-col my-2 justify-content-end">
      <a href="../pages/teachers.html">
        <button className="btn btn-dark">+ إضافة معلم/ة</button>
      </a>
    </div>
  </div>
</div>


<>
  <div className="container text-center g-0" id="title1">
    <h1 className="text-light py-3 mt-5 text-bg-dark rounded">المعلمون / المعلمات</h1>
  </div>
  <div
    className="container mb-5 rounded"
    id="teachersContainer"
    style={{ backgroundColor: "white" }}
  >
    <div className="row">
      <div className="" id="teacherUser">
        <div className="d-flex align-items-center bg-white">
          <img
            src={t1}
            alt=""
            className="bd-placeholder-img my-2 me-1"
            width={150}
            height={90}
            style={{borderRadius: "90px"}}
          />
              <Link to
                className="text-dark-emphasis col-lg-4 col-sm-12"
                style={{ alignSelf: "center" }}>
                <strong className="text-dark" id="teacherUserName">
                  المعلمة ايه شهاب الزيود
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
      </div>
    </div>

  </div>
</>

    
    </>
  )
}

export default Headmaster