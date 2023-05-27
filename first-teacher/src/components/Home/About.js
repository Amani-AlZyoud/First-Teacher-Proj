import React, { useEffect } from 'react'
import t from '../../images/t.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init();
  }, [])



  
  return (
    <>
    <span id='About'></span>
    <div className="container-fluid px-4 py-5" id="main-sec1" >
    <div
    className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5"  data-aos="fade-down">
    <div className="col-10 col-sm-8 col-lg-6">
      <img
        src={t}
        className="d-block mx-lg-auto img-fluid rounded"
        id="t-img"
        alt="Bootstrap Themes"
        width={900}
        height={600}
        loading="lazy"
      />
    </div>
    <div className="col-lg-6">
      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
        <h1 className="text-white fw-bold mx-3">المعلم الأول اختيارك الأول</h1>
      </div>
      <p className="lead mx-3">
        {" "}
        إننا نعيش الآن عصر العولمة الذي يتسم بسرعة التغيير، فضلاً عما أفرزه من
        تحديات محلية وعالمية لعل من أهمها الانفجار المعرفي والتطور التكنولوجي
        وثورة المعلومات. وكي يواكب المعلم هذه المتغيرات، فإن عليه أن يدرك أن
        التخطيط بمعناه الشامل ضرورة إنسانية حتمية لمجابهة المشكلات ومواجهة
        التحديات الحالية والمستقبلية، ولذلك صمم "المعلم الأول" ليساعد المعلمين
        على تصميم خططاً تدريسية مترابطة في ضوء النتاجات التعليمية.
      </p>
    </div>
  </div>
</div>

    </>
  )
}

export default About