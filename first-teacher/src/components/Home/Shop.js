import React from 'react'
import { HashLink } from 'react-router-hash-link'
import video from '../../images/shop.mp4'
const Shop = () => {
  return (
    <>

    
<section className="outter">
<section className="video-container">
  <video src={video} autoPlay={true} loop={true} playsInline={true} muted={true}/>
  <div className="callout">
  <h1 className="display-2 fw-bold text-dark">متجر المعلم</h1>
    <div className="lead fw-normal text-warning ">كل ما يحتاجه المعلم وأكثر</div>
    <div className="inner">
    <HashLink smooth to='/shop#' className="btn btn-dark mt-3">
      Coming soon
    </HashLink>
    <div>
  </div>
  
  </div>
  </div>
</section>
</section>



    </>
  )
}

export default Shop