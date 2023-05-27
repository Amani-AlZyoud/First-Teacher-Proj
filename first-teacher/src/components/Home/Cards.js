import React, { useContext, useEffect, useState } from 'react'
import exr from '../../images/exr.png'
import plan from '../../images/plan.png'
import exam from '../../images/exam.png'
import store from '../../images/store.png'
import '../../Styles/style.css'
import { HashLink } from 'react-router-hash-link'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../../contexts/AuthContext'


const Cards = () => {
  useEffect(() => {
    AOS.init();
  }, [])


  const {auth, setAuth} = useContext(AuthContext);
  return (
    <>

  {/* Cards shortcuts link */}
  <div className="container- p-4 p-md-5" id="cards">
    <div className="card-group text-center justify-content-center" id="cards">
      <div className="card mx-3" id="card-ele" data-aos="fade-down">
        <img src={plan} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title fw-bold fs-4">نموذج خطة الدرس</h5>
        { auth ? <HashLink smooth to='/plan/1#'>
            <button type="button" className="btn btn-dark">
              انتقل
            </button>
          </HashLink> :  <HashLink smooth to='/login#'>
            <button type="button" className="btn btn-dark">
              انتقل
            </button>
          </HashLink>}
        </div>
      </div>
      <div className="card me-3" id="card-ele" data-aos="fade-down">
        <img src={exr} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title fw-bold fs-4">الأنشطة اللامنهجية</h5>
          { auth ? <HashLink smooth to='/activities#'>
            <button type="button" className="btn btn-dark">
              انتقل
            </button>
          </HashLink> :  <HashLink smooth to='/login#'>
            <button type="button" className="btn btn-dark">
              انتقل
            </button>
          </HashLink>}
        </div>
      </div>
      <div className="card me-3" id="card-ele" data-aos="fade-down">
        <img src={exam} className="card-img-top" alt="Exam IMG" />
        <div className="card-body">
          <h5 className="card-title fw-bold fs-4">إنشاء امتحان</h5>
          { auth ? <HashLink smooth to='/exam#'>
            <button type="button" className="btn btn-dark">
              انتقل
            </button>
          </HashLink> :  <HashLink smooth to='/login#'>
            <button type="button" className="btn btn-dark">
              انتقل
            </button>
          </HashLink>}
        </div>
      </div>
      <div className="card me-3" id="card-ele" data-aos="fade-down">
        <img src={store} className="card-img-top" alt="Exam IMG" />
        <div className="card-body">
          <h5 className="card-title fw-bold fs-4">متجر المعلم</h5>
          { auth ? <HashLink smooth to='/shop#'>
            <button type="button" className="btn btn-dark">
              انتقل
            </button>
          </HashLink> :  <HashLink smooth to='/login#'>
            <button type="button" className="btn btn-dark">
              انتقل
            </button>
          </HashLink>}
        </div>
      </div>
    </div>
  </div>
</>

    
 
  )
}

export default Cards