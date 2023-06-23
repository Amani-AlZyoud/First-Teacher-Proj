import React, { useContext, useState } from "react";
import { UserContext } from '../../contexts/UserContext'
const MainForm = ({setMainForm}) => {

  const { user } = useContext(UserContext)
   //غلاف الكتاب
  const [materials, setMaterials] = useState("");
  const [materialsE, setMaterialsE] = useState("");
  const [gov, setGov] = useState("");
  const [govE, setGovE] = useState("");
  const [classes, setClasses] = useState("");
  const [classesE, setClassesE] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [studyYearE, setStudyYearE] = useState("");

  // main Form elements submits
  const handleMainForm = (event) => {
    event.preventDefault();

    let done = true;

    if (materials === "") {
      setMaterialsE("حقل إجباري");
      done = false;
    }

    if (gov === "") {
      setGovE("حقل إجباري");
      done = false;
    }

    if (classes === "") {
      setClassesE("حقل إجباري");
      done = false;
    }

    if (studyYear === "" || studyYear === "none") {
      setStudyYearE("حقل إجباري");
      done = false;
    }

    if (done) {
      const mainForm = { materials, gov, classes, studyYear };
      localStorage.setItem("mainForm", JSON.stringify(mainForm));
      setMainForm(mainForm);
    }
  };

  return (
    <>
      <h6 className="fs-4 fw-bold text-end">
        يرجى قراءة الإرشادات قبل تعبئة الخطة:
      </h6>
      {/* Main page form fill once  */}
      <form id="mainPageForm" onSubmit={handleMainForm}>
        <div className="row mb-3 text-end">
          <div className="col-lg-4 col-12 themed-grid-col">
            <label htmlFor="teacherName">اسم المعلمة/المعلم</label>
            <input
              className="form-control text-end"
              id="teacherName"
              type="text"
              placeholder="اسم المعلمة/المعلم"
              data-sb-validations="required"
              value={user?.username}
              disabled
            />
          </div>
          <div className="col-lg-4 col-12 themed-grid-col">
            <label htmlFor="schoolName">اسم المدرسة</label>
            <input
              className="form-control"
              id="schoolName"
              type="text"
              placeholder="اسم المدرسة"
              data-sb-validations="required"
              value={user?.school_name}
              disabled
            />
          </div>
          <div className="col-lg-4 col-12 themed-grid-col">
            <label htmlFor="materials">المبحث/المباحث</label>
            <input
              className="form-control"
              id="materials"
              type="text"
              placeholder="الفيزياء، رياضيات"
              data-sb-validations="required"
              value={materials}
              onChange={(event) => {
                setMaterials(event.target.value);
                setMaterialsE("");
              }}
            />
            <span className="text-danger" id="materialsE">
              {materialsE}
            </span>
          </div>
        </div>
        <div className="row mb-3 text-end">
          <div className="col-lg-4 col-12 themed-grid-col">
            <label htmlFor="gov">مديرية التربية والتعليم</label>
            <input
              className="form-control text-end"
              id="gov"
              type="text"
              placeholder="مديرية التربية والتعليم"
              data-sb-validations="required"
              value={gov}
              onChange={(event) => {
                setGov(event.target.value);
                setGovE("");
              }}
            />
            <span className="text-danger" id="govE">
              {govE}
            </span>
          </div>
          <div className="col-lg-4 col-12 themed-grid-col">
            <label htmlFor="classes">الصفوف والشعب</label>
            <input
              className="form-control"
              id="classes"
              type="text"
              placeholder="أول أ، ثاني ب"
              data-sb-validations="required"
              value={classes}
              onChange={(event) => {
                setClasses(event.target.value);
                setClassesE("");
              }}
            />
            <span className="text-danger" id="classesE">
              {classesE}
            </span>
          </div>
          <div className="col-lg-4 col-12 themed-grid-col" id="field">
            <label htmlFor="studyYear">الفصل الدراسي </label>
            <select
              className="form-select text-end"
              name="studyYear"
              id="studyYear"
              value={studyYear}
              onChange={(event) => {
                setStudyYear(event.target.value);
                setStudyYearE("");
              }}
            >
              <option value="none">اختر</option>
              <option value="first">الفصل الأول</option>
              <option value="second">الفصل الثاني</option>
            </select>
            <span className="text-danger" id="studyYearE">
              {studyYearE}
            </span>
          </div>
        </div>
        <button className="btn btn-dark" type="submit" id="trwBtn">
          إدخال
        </button>
      </form>
    </>
  );
};

export default MainForm;
