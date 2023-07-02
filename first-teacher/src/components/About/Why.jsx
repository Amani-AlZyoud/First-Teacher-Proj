import React from "react";

const Why = () => {
  return (
    <div className="container my-3 rounded-5 px-4 py-5 bg-white" id="dash-box">
      <h2 className="pb-2 border-black border-3 border-bottom fw-bold">
        لماذا المعلم الأول؟
      </h2>
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        <div className="col">
          <div
            className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundColor: "rgba(0, 0, 0,0.9)",
              backgroundBlendMode: "soft-light",
              backgroundImage:
                'url("https://images2.alphacoders.com/720/720843.jpg")',
            }}
          >
            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                تنظيم وهيكلة فعالة
              </h3>
              <p>
              يوفر الموقع هيكلًا منظمًا لكتابة الخطط الدراسية، مما يساعد على تنظيم الأفكار وترتيب المحتوى بطريقة منطقية.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div
            className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundColor: "rgba(0, 0, 0,0.9)",
              backgroundBlendMode: "soft-light",
              backgroundImage:
                'url("https://images2.alphacoders.com/720/720843.jpg")',
            }}
          >
            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                توفير وقت وجهد
              </h3>
              <p>
              يقوم الموقع بتوفير  نموذج جاهز لخطط الدروس، مما يقلل من مجهود المعلم في إعداد هذه الخطط من الصفر.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div
            className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundColor: "rgba(0, 0, 0,0.9)",
              backgroundBlendMode: "soft-light",
              backgroundImage:
                'url("https://images2.alphacoders.com/720/720843.jpg")',
            }}
          >
            <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
              <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                سهولة الاستخدام
              </h3>
              <p>
                سهولة استخدام الموقع تسهم في تسهيل وتحسين عملية كتابة خطط الدروس
                للمعلمين.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
