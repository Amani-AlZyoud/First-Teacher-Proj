import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const HeadForm = ({ setHeadForm }) => {
  const [headerForm, setHeaderForm] = useState(
    localStorage.getItem("headerForm")
      ? JSON.parse(localStorage.getItem("headerForm"))
      : undefined
  );
  const [level, setLevel] = useState(headerForm ? headerForm.level : "");
  const [levelE, setLevelE] = useState("");
  const [materialType, setMaterialType] = useState(
    headerForm ? headerForm.materialType : ""
  );
  const [materialTypeE, setMaterialTypeE] = useState("");
  const [unit, setUnit] = useState(headerForm ? headerForm.unit : "");
  const [unitE, setUnitE] = useState("");
  const [lessonName, setLessonName] = useState(
    headerForm ? headerForm.lessonName : ""
  );
  const [lessonNameE, setLessonNameE] = useState("");
  const [lessonsCount, setLessonsCount] = useState(
    headerForm ? headerForm.lessonsCount : ""
  );
  const [lessonsCountE, setLessonsCountE] = useState("");
  const [dataFrom, setDataFrom] = useState(
    headerForm ? headerForm.dataFrom : ""
  );
  const [dataFromE, setDataFromE] = useState("");
  const [dataTo, setDataTo] = useState(headerForm ? headerForm.dataTo : "");
  const [dataToE, setDataToE] = useState("");

  // Header Form elements submits
  const handleHeaderForm = (event) => {
    event.preventDefault();
    let done = true;
    console.log()
    if (level === "" || level === "none" || level === undefined) {
      done = false;
      setLevelE("حقل إجباري");
    }
    if (materialType === undefined || materialType === "" || materialType === "none") {
      done = false;
      setMaterialTypeE("حقل إجباري");
    }

    if (unit === undefined || unit === "") {
      done = false;
      setUnitE("حقل إجباري");
    }

    if (lessonName === undefined || lessonName === "") {
      done = false;
      setLessonNameE("حقل إجباري");
    }

    if (lessonsCount === undefined || lessonsCount === "") {
      done = false;
      setLessonsCountE("حقل إجباري");
    }

    if (dataFrom === undefined || dataFrom === "") {
      done = false;
      setDataFromE("حقل إجباري");
    }

    if (dataTo === undefined || dataTo === "") {
      done = false;
      setDataToE("حقل إجباري");
    }

    if (done) {
      const header = {
        level,
        materialType,
        unit,
        lessonName,
        lessonsCount,
        dataFrom,
        dataTo,
      };
      localStorage.setItem("headerForm", JSON.stringify(header));
      setHeadForm(header);
      Swal.fire({
        title: "تم الحفظ بنجاح",
        icon: "success",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    setHeaderForm(
      localStorage.getItem("headerForm")
        ? JSON.parse(localStorage.getItem("headerForm"))
        : {}
    );
    setLevel(headerForm ? headerForm.level : "");
    setMaterialType(headerForm ? headerForm.materialType : "");

    setUnit(headerForm ? headerForm.unit : "");

    setLessonName(headerForm ? headerForm.lessonName : "");

    setLessonsCount(headerForm ? headerForm.lessonsCount : "");

    setDataFrom(headerForm ? headerForm.dataFrom : "");

    setDataTo(headerForm ? headerForm.dataTo : "");
  }, []);

  return (
    <>
      <form id="heading" onSubmit={handleHeaderForm}>
        <h6 className="fs-4 fw-bold text-end my-5">تعبئة الخطة:</h6>
        <div className="row mb-3 text-end">
          <div className="col-lg-3 col-12 themed-grid-col">
            <label htmlFor="Class">الصف/المستوى</label>
            <select
              className="form-select text-end"
              name="Class"
              id="Class"
              value={level}
              onChange={(event) => {
                setLevel(event.target.value);
                setLevelE("");
              }}
            >
              <option value="none">اختر</option>
              <option value="أول">أول</option>
              <option value="ثاني">ثاني</option>
              <option value="ثالث">ثالث</option>
              <option value="رابع">رابع</option>
              <option value="خامس">خامس</option>
              <option value="سادس">سادس</option>
              <option value="سابع">سابع</option>
              <option value="ثامن">ثامن</option>
              <option value="تاسع">تاسع</option>
              <option value="عاشر">عاشر</option>
              <option value="أول ثانوي / أدبي">أول ثانوي / أدبي</option>
              <option value="أول ثانوي / علمي">أول ثانوي / علمي</option>
              <option value="ثاني ثانوي / أدبي">ثاني ثانوي / أدبي</option>
              <option value="ثاني ثانوي / علمي">ثاني ثانوي / علمي</option>
            </select>
            <span className="text-danger" id="unitE">
              {levelE}
            </span>
          </div>
          <div className="col-lg-3 col-12 themed-grid-col">
            <label htmlFor="materialLevel">المبحث</label>
            <select
              className="form-select text-end"
              name="materialLevel"
              id="materialLevel"
              value={materialType}
              onChange={(event) => {
                setMaterialType(event.target.value);
                setMaterialTypeE("");
              }}
            >
              <option value="none">اختر</option>
              <option value="اللغة العربية">اللغة العربية</option>
              <option value="اللغة الإنجليزية">اللغة الإنجليزية</option>
              <option value="الرياضيات">الرياضيات</option>
              <option value="التربية الإسلامية">التربية الإسلامية</option>
              <option value="التربية الفنية">التربية الفنية</option>
              <option value="التربية الأجتماعية">التربية الأجتماعية</option>
              <option value="العلوم">العلوم</option>
              <option value="الفيزياء">الفيزياء</option>
              <option value="الكيمياء">الكيمياء</option>
              <option value="العلوم الحياتية">العلوم الحياتية</option>
              <option value="علوم الأرض والبيئة">علوم الأرض والبيئة</option>
              <option value="الحاسوب">الحاسوب</option>
              <option value="التاريخ">التاريخ</option>
              <option value="الجغرافيا">الجغرافيا</option>
              <option value="الثقافة المالية">الثقافة المالية</option>
              <option value="التربية الوطنية والمدنية">
                التربية الوطنية والمدنية
              </option>
              <option value="التربية المهنية">التربية المهنية</option>
            </select>
            <span className="text-danger" id="unitE">
              {materialTypeE}
            </span>
          </div>
          <div className="col-lg-3 col-12 themed-grid-col">
            <label htmlFor="unit">عنوان الوحدة</label>
            <input
              className="form-control"
              id="unit"
              type="text"
              placeholder="عنوان الوحدة"
              data-sb-validations="required"
              value={unit}
              onChange={(event) => {
                setUnit(event.target.value);
                setUnitE("");
              }}
            />
            <span className="text-danger" id="unitE">
              {unitE}
            </span>
          </div>
          <div className="col-lg-3 col-12 themed-grid-col">
            <label htmlFor="lessonName">عنوان الدرس</label>
            <input
              className="form-control"
              id="lessonName"
              type="text"
              placeholder="عنوان الدرس"
              data-sb-validations="required"
              value={lessonName}
              onChange={(event) => {
                setLessonName(event.target.value);
                setLessonNameE("");
              }}
            />
            <span className="text-danger" id="lessonNameE">
              {lessonNameE}
            </span>
          </div>
          <div className="col-lg-3 col-12 themed-grid-col">
            <label htmlFor="lessonsCount">عدد الحصص</label>
            <input
              className="form-control text-end"
              id="lessonsCount"
              type="number"
              placeholder="رقم"
              data-sb-validations="required"
              value={lessonsCount}
              onChange={(event) => {
                setLessonsCount(event.target.value);
                setLessonsCountE("");
              }}
            />
            <span className="text-danger" id="lessonsCountE">
              {lessonsCountE}
            </span>
          </div>
          <div className="col-lg-3 col-12 themed-grid-col">
            <label htmlFor="dateFrom">التاريخ من:</label>
            <input
              className="form-control"
              id="dateFrom"
              type="date"
              placeholder="التاريخ"
              data-sb-validations="required"
              required=""
              value={dataFrom}
              onChange={(event) => {
                setDataFrom(event.target.value);
                setDataFromE("");
              }}
            />
            <span className="text-danger" id="unitE">
              {dataFromE}
            </span>
          </div>
          <div className="col-lg-3 col-12 themed-grid-col">
            <label htmlFor="dateTo">إلى:</label>
            <input
              className="form-control"
              id="dateTo"
              type="date"
              placeholder="التاريخ"
              data-sb-validations="required"
              required=""
              value={dataTo}
              onChange={(event) => {
                setDataTo(event.target.value);
                setDataToE("");
              }}
            />
            <span className="text-danger" id="unitE">
              {dataToE}
            </span>
          </div>
        </div>
        <button className="btn btn-dark" type="submit">
          إدخال
        </button>
      </form>
    </>
  );
};

export default HeadForm;
