import React, { useContext } from "react";
import "../../Styles/pricing.css";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const Pricing = () => {
  const { user, setUser, auth, setAuth } = useContext(UserContext);

  return (
    <>
      {/*====== PRICING STYLE ONE START ======*/}
      <section className="pricing-area pricing-one bg-black">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-7 col-lg-8">
              <div className="section-title text-center">
                <h2 className="mb-3 fw-bold text-white">الإشتراكات</h2>
                <p className="text-lg text-warning">
                  اختر الاشتراك المناسب لك، الإشتراكات المتاحة: {" "}
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-7 col-sm-9">
              <div className="pricing-style-one bg-white">
                <div className="pricing-header text-center">
                  <h5 className="sub-title">الاساسية </h5>
                  <span className="price text-warning">50 دينار</span>
                  <h5 className="year">لكل فصل دراسي</h5>
                </div>
                <div className="pricing-list">
                  <p>
                    يقدم موقعنا خدمة لمدراء المدارس وللمعلمين خيار الاشتراك
                    الفصلي، وهو نوع من الاشتراكات يتيح للمدرسة الوصول إلى جميع
                    الميزات المتاحة على الموقع لمدة فصل دراسي واحد. يعتبر
                    الاشتراك الفصلي خيارًا مناسبًا للمعلمين الذين يرغبون في
                    الاستفادة من الخدمات والأدوات التعليمية خلال فترة زمنية
                    محددة، مثل فصل دراسي واحد.
                  </p>
                </div>
                <div className="pricing-btn rounded-buttons text-center">
                  <Link to={auth ? "/payment" : "/login"} className="btn btn-lg btn-dark rounded-full">دفع</Link>
                </div>
                <div className="bottom-shape">
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 350 112.35"
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n.color-1 {\n fill: #ffcd29;\n       isolation: isolate;\n     }\n     .cls-1 {\n      opacity: 0.1;\n                        }\n                           .cls-2 {\n                           opacity: 0.2;\n                           }\n                           .cls-3 {\n                           opacity: 0.4;\n                           }\n                           .cls-4 {\n                           opacity: 0.6;\n                           }\n                        ",
                        }}
                      />
                    </defs>
                    <title>bottom-part1</title>
                    <g>
                      <g data-name="Group 747">
                        <path
                          data-name="Path 294"
                          className="cls-1 color-1"
                          d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z"
                          transform="translate(0 0)"
                        />
                        <path
                          data-name="Path 297"
                          className="cls-2 color-1"
                          d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z"
                          transform="translate(0 0)"
                        />
                        <path
                          data-name="Path 296"
                          className="cls-3 color-1"
                          d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z"
                          transform="translate(0 0)"
                        />
                        <path
                          data-name="Path 295"
                          className="cls-4 color-1"
                          d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z"
                          transform="translate(0 0)"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              {/* single pricing */}
            </div>
            <div className="col-lg-4 col-md-7 col-sm-9">
              <div className="pricing-style-one bg-white">
                <div className="pricing-header text-center">
                  <h5 className="sub-title">السنوية</h5>
                  <span className="price text-warning">100 دينار</span>
                  <h5 className="year">لكل سنة</h5>
                </div>
                <div className="pricing-list">
                  <p>
                    يعتبر الاشتراك لسنة كاملة خيارًا آخر يقدمه الموقع للمعلمين.
                    يسمح هذا النوع من الاشتراك بالوصول إلى جميع المحتوى والمزايا
                    المقدمة على الموقع لمدة سنة كاملة. يعد الاشتراك لسنة كاملة
                    خيارًا جيدًا للمعلمين الذين يرغبون في الاستفادة الكاملة من
                    الموارد والأدوات التعليمية المتاحة على الموقع على مدار العام
                    الدراسي.
                  </p>
                </div>
                <div className="pricing-btn rounded-buttons text-center">
                  <Link to={auth ? "/payment" : "/login"} className="btn btn-lg btn-dark rounded-full">دفع </Link>
                </div>
                <div className="bottom-shape">
                  <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 350 112.35"
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                           .color-1 {\n                           fill: #ffcd29;\n                           isolation: isolate;\n                           }\n                           .cls-1 {\n                           opacity: 0.1;\n                           }\n                           .cls-2 {\n                           opacity: 0.2;\n                           }\n                           .cls-3 {\n                           opacity: 0.4;\n                           }\n                           .cls-4 {\n                           opacity: 0.6;\n                           }\n                        ",
                        }}
                      />
                    </defs>
                    <title>bottom-part1</title>
                    <g>
                      <g data-name="Group 747">
                        <path
                          data-name="Path 294"
                          className="cls-1 color-1"
                          d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z"
                          transform="translate(0 0)"
                        />
                        <path
                          data-name="Path 297"
                          className="cls-2 color-1"
                          d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z"
                          transform="translate(0 0)"
                        />
                        <path
                          data-name="Path 296"
                          className="cls-3 color-1"
                          d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z"
                          transform="translate(0 0)"
                        />
                        <path
                          data-name="Path 295"
                          className="cls-4 color-1"
                          d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z"
                          transform="translate(0 0)"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              {/* single pricing */}
            </div>
          </div>
          {/* row */}
        </div>
        {/* container */}
      </section>
      {/*====== PRICING STYLE ONE ENDS ======*/}
    </>
  );
};

export default Pricing;
