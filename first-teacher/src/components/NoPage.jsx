import React from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 " style={{backgroundColor: "#FFCD29"}}>
    <div className="container text-center ">
        <h1 className="display-1 fw-bold text-white">404</h1>
        <p className="fs-3 fw-bold"> <span className="text-danger">عذراً!</span > الصفحة غير موجودة.</p>
        <p className="lead fs-6">
            الصفحة التي طلبتها غير موجودة
          </p>
        <Link to="/" className="btn btn-dark">الصفحة الرئيسية</Link>
    </div>
</div>




  
  )
}

export default NoPage