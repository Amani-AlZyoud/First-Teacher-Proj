import React from "react";

const LessonsHero = () => {
  return (
    <>
      <>
        {/* HERO SECTION */}
        <div className="container-fluid bg-image" id="lesson-hero">
          <div className="px-4 py-5  text-center">
            <h1
              className="display-5 fw-bolder text-light my-5"
              id="lesson-hero-main"
            >
              نمـــوذج خــــــطة الـــدرس
            </h1>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4 my-5 fs-4" id="lesson-hero-text">
                عملية تخطيط الدروس هي عملية مستمرة وتتطلب متابعة وتقييم مستمر
                لتحقيق الأهداف المرجوة والتأكد من أن الطلاب قد تحصلوا على
                المفاهيم والمهارات المطلوبة. وبما أنها تتطلب تحليل دقيق وتصميم
                دقيق، يوفر الموقع طريقة سريعة و منظمة لتسهيل هذه العملية على
                المعلمين والمعلمات.
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default LessonsHero;
