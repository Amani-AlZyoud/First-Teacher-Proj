import React, { useContext, useState } from 'react'
import '../../Styles/style.css'
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../../contexts/AuthContext';


const Hero = () => {
  const {auth} = useContext(AuthContext);
  return (
    <>
    {/* HERO SECTION */}
    <div className="container-fulid">
    <div className="bg-image">
      <div className="container col-xxl-12 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-lg-6 col-sm-12">
            <h1
              className="display-3 fw-bold text-body-emphasis lh-1 mb-3 my-5"
              id="hero-main" >
              <span> المعلم </span>
              <span>الناجح</span>
            </h1>
            <p></p>
            <h1 className="fs-3 mt-3" id="hero-content">
              <span> هو </span>
              <span> أهم </span>
              <span> أعمدة </span>
              <span> بناء </span>
              <span className="display-5 fw-bold" id="hero-text">
                التعليم الناجح 
              </span>
            </h1>
            <p />
            <div className="d-grid gap-2 d-md-flex justify-content-md-start ms-2">
            { auth ? <></> :  <HashLink smooth to='/login#'>
              <button
                  type="button"
                  className="btn btn-dark btn-lg px-4 gap-3"
                  id="heroBtn"
                >
                  انضم إلينا !
                </button> 
              </HashLink>}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </>
  
  )
}

export default Hero