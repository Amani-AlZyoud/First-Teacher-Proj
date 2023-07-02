import React from "react";

const Hero = () => {
  return (
    <div className="px-4 py-5 text-center bg-dark">
      <h1
        className="display-4 fw-bold pt-5 text-light"
        style={{ textShadow: "0 1px 0 black, 0 2px 0 black" }}
      >
        الإرشادات
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4 text-warning">
          يجب قراءة هذه الإرشادات جيدا لكتابة خطة الدرس بشكل صحيح و دقيق.
        </p>
      </div>
    </div>
  );
};

export default Hero;
