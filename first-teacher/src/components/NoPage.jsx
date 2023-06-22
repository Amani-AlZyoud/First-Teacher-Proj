import React from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div class="d-flex align-items-center justify-content-center vh-100 " style={{backgroundColor: "#FFCD29"}}>
    <div class="container text-center ">
        <h1 class="display-1 fw-bold text-white">404</h1>
        <p class="fs-3 fw-bold"> <span class="text-danger">عذراً!</span > الصفحة غير موجودة.</p>
        <p class="lead fs-6">
            الصفحة التي طلبتها غير موجودة
          </p>
        <Link smooth to="/" class="btn btn-dark">الصفحة الرئيسية</Link>
    </div>
</div>




  
  )
}

export default NoPage