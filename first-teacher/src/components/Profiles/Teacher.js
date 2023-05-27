import React, { useContext, useState } from 'react'
import Plan from "../../images/خطة الدرس.png"
import exam from "../../images/نموذج امتحان.png"
import { UserContext } from '../../contexts/UserContext'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
const Teacher = () => {

  const [plan, setPlan] = useState(() => {
    if(JSON.parse(localStorage.getItem("plan")))
    return JSON.parse(localStorage.getItem("plan"));
    else return [];
  })

  const {user, setUser} = useContext(UserContext);
  return (
    <>
    <div className="container my-5 rounded-3 bg-white" id="teacherProf">
  <div className="row mb-3 text-end">
    <div className="col-md-2 themed-grid-col mt-4">
      <img
        src={user.UserImg}
        id="teacherImg"
        className="img-thumbnail"
        width={200}
        alt="teacherIMG"
      />
    </div>
    <div className="col-md-8 themed-grid-col mt-4">
      <h2>
      {user.jop === "teacher" && user.Gender === "Female" ? "المعلمة" : ""}
        {user.jop === "teacher" && user.Gender === "Male" ? "المعلم" : ""}
        <span id="teacherName"> {user.UserName}</span>
      </h2>
      <h5 className="mt-4 text-muted">المدرسة</h5>
      <span className="fs-4" id="teacherSchool">
        {user.school}
      </span>
      
    </div>
    <div className="d-flex themed-grid-col mt-2 justify-content-end">
      <HashLink to={`/plan/${user?.UserId}`}>
        <button className="btn btn-dark" id='createPlan'>+ إنشاء خطة الدرس</button>
      </HashLink>
    </div>
    <div className="d-flex themed-grid-col my-2 justify-content-end">
      <a href="">
        <button className="btn btn-dark" id='createPlan'>+ إنشاء امتحان</button>
      </a>
    </div>
    <div className="d-flex themed-grid-col mb-2 justify-content-end">
      <a href="">
        <button className="btn btn-dark" id='createPlan'>+ إضافة نشاط</button>
      </a>
    </div>
  </div>
</div>

<>
  <div className="container text-center gx-0" id="title1">
    <h1 className="text-light py-4 mt-5 text-bg-dark">النماذج المعبئة</h1>
  </div>
  <div className="container bg-light">
    <div
      className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-5"
      id="lessonCardsContainer"
    >
      { plan.length !== 0 && plan[0] === user?.UserId && <div className="col">
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
              {plan[4][0].datte}، {plan[4][0].day}
            </small>
            <h4 className='mt-1'>
              خطة درس (<span id="planNum">{plan[0]}</span>)
            </h4>
            <div className="d-flex justify-content-end align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-dark rounded" id='createPlan'>
                  معاينة
                </button>
               <Link to={`/plan/${plan[0]}`}> <button type="button" id='createPlan' className="btn btn-sm btn-outline-dark rounded me-1">
                  تعديل
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div> }
    </div>
  </div>





  <div className="container text-center gx-0" id="title1">
    <h1 className="text-light py-4 mt-5 text-bg-dark">النماذج المدفوعة</h1>
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
                <button type="button" className="btn btn-sm btn-outline-dark">
                  معاينة
                </button>
                <button type="button" className="btn btn-sm btn-outline-dark">
                  تعديل
                </button>
              </div>
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

export default Teacher