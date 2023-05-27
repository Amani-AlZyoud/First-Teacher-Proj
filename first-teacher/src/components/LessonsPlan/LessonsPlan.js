import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from '../../contexts/UserContext'
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
const LessonsPlan = () => {

  const unique_id = uuid();
  const small_id = unique_id.slice(0,8);
  const [mood , setMood] = useState("create");
  const [updateId, setUpdateId] = useState("");
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const plann = JSON.parse(localStorage.getItem("plan")) ? JSON.parse(localStorage.getItem("plan")) : "";
// console.log(plann)
  

  let mainForm = plann !== "" && plann[0] === user.UserId ? JSON.parse(localStorage.getItem("plan"))[1] : "";
  let headerForm =  plann !== "" && plann[0] === user.UserId ? JSON.parse(localStorage.getItem("plan"))[2] : "";

  //غلاف الكتاب 
  const [materials, setMaterials] = useState(() => {
    if(JSON.parse(localStorage.getItem("mainForm")))
    return JSON.parse(localStorage.getItem("mainForm")).materials

   else return "";
  });
  const [materialsE, setMaterialsE] = useState("");
  const [gov, setGov] = useState(() => {
    if(JSON.parse(localStorage.getItem("mainForm")))
    return JSON.parse(localStorage.getItem("mainForm")).gov
    else return "";
  });
  const [govE, setGovE] = useState("");
  const [classes, setClasses] = useState(() => {
    if(JSON.parse(localStorage.getItem("mainForm")))
    return JSON.parse(localStorage.getItem("mainForm")).classes

   else return "";
  });
  const [classesE, setClassesE] = useState("");
  const [studyYear, setStudyYear] = useState(() => {
    if(JSON.parse(localStorage.getItem("mainForm")))
    return JSON.parse(localStorage.getItem("mainForm")).studyYear

   else return "";
  });
  const [studyYearE, setStudyYearE] = useState("");

  // ترويسة كل خطة درس headerForm

  const [level, setLevel] = useState(() => {
    if(JSON.parse(localStorage.getItem("headerForm")))
    return JSON.parse(localStorage.getItem("headerForm")).level

   else return "";
  });
  const [levelE, setLevelE] = useState("");
  const [materialType, setMaterialType] = useState(() => {
    if(JSON.parse(localStorage.getItem("headerForm")))
    return JSON.parse(localStorage.getItem("headerForm")).materialType

   else return "";
  });
  const [materialTypeE, setMaterialTypeE] = useState("");
  const [unit , setUnit] = useState(() => {
    if(JSON.parse(localStorage.getItem("headerForm")))
    return JSON.parse(localStorage.getItem("headerForm")).unit

   else return "";
  });
  const [unitE, setUnitE] = useState("");
  const [lessonName, setLessonName] = useState(() => {
    if(JSON.parse(localStorage.getItem("headerForm")))
    return JSON.parse(localStorage.getItem("headerForm")).lessonName

   else return "";
  });
  const [lessonNameE, setLessonNameE] = useState("");
  const [lessonsCount, setLessonsCount] = useState(() => {
    if(JSON.parse(localStorage.getItem("headerForm")))
    return JSON.parse(localStorage.getItem("headerForm")).lessonsCount

   else return "";
  });
  const [lessonsCountE, setLessonsCountE] = useState("");
  const [dataFrom, setDataFrom] = useState(() => {
    if(JSON.parse(localStorage.getItem("headerForm")))
    return JSON.parse(localStorage.getItem("headerForm")).dataFrom

   else return "";
  });
  const [dataFromE, setDataFromE] = useState("");
  const [dataTo, setDataTo] = useState(() => {
    if(JSON.parse(localStorage.getItem("headerForm")))
    return JSON.parse(localStorage.getItem("headerForm")).dataTo

   else return "";
  });
  const [dataToE, setDataToE] = useState("");

  // Table 1
  const [num, setNum] = useState("");
  const [numE, setNumE] = useState("");
  const [strategies, setStrategies] = useState("");
  const [strategiesE, setStrategiesE] = useState("");
  const [results, setResults] = useState("");
  const [resultsE, setResultsE] = useState("");
  const [tools, setTools] = useState("");
  const [toolsE, setToolsE] = useState("");
  const [tq, setTq] = useState("");
  const [tqE, setTqE] = useState("");
  const [tqTool, setTqTool] = useState("");
  const [tqToolE, setTqToolE] = useState("");
  const [toDo, setToDo] = useState("");
  const [toDoE, setToDoE] = useState("");
  const [wq, setWq] = useState("");
  const [wqE, setWqE] = useState("");

  // Table 2

  const [datte, setDatte] = useState("");
  const [datteE, setDatteE] = useState("");
  const [day, setDay] = useState("");
  const [dayE, setDayE] = useState("");
  const [section, setSection] = useState("");
  const [classLesson, setClassLesson] = useState("");
  const [achivedResults, setAchivedResults] = useState("");
  const [hw, setHw] = useState("");
  const [mood2 , setMood2] = useState("create");

  const [tableTwo, setTableTwo] = useState(() => {
    if(plann !== "" && plann[0] === user.UserId )
    return JSON.parse(localStorage.getItem("plan")[4])

   else return []});

  const id  = user.UserId;
  const teacher = user.UserName;
  const school = user.school;
  const [tableOne, setTableOne] = useState(() => {
    
    if(plann !== "" && plann[0] === user.UserId )
    return JSON.parse(localStorage.getItem("plan")[3])

   else return []});

  // main Form elements submits
  const handleMainForm = (event) => {
    event.preventDefault();
     
    let done = true;

    if(materials === ""){
      setMaterialsE("حقل إجباري");
      done = false;
    }

    if(gov === ""){
      setGovE("حقل إجباري");
      done = false;
    }

    if(classes === ""){
        setClassesE("حقل إجباري");
        done = false;
    }
    
    if(studyYear === "" || studyYear === "none"){
      setStudyYearE("حقل إجباري");
      done = false;

    }
    
    if(done){
      mainForm = {  id, teacher, school, materials, gov, classes, studyYear};
      // console.log(mainForm);
      localStorage.setItem("mainForm", JSON.stringify(mainForm));
    }

  }

// Header Form elements submits
  const handleHeaderForm = (event) => {
    event.preventDefault();

    let done = true;

    if( level === ""){
      done = false;
      setLevelE("حقل إجباري")
    }

    if(materialType === ""){
      done = false;
      setMaterialTypeE("حقل إجباري");
    }

    if(unit === ""){
      done = false;
      setUnitE("حقل إجباري");
    }

    if(lessonName === ""){
      done = false;
      setLessonNameE("حقل إجباري");
    }

    if(lessonsCount === ""){
      done = false;
      setLessonsCountE("حقل إجباري");
    }

    if(dataFrom === ""){
      done = false;
      setDataFromE("حقل إجباري");
    }

    if(dataTo === ""){
      done = false;
      setDataToE("حقل إجباري");
    }

    if(done){
       headerForm = {  level, materialType, unit, lessonName, lessonsCount, dataFrom, dataTo };
      // console.log(headerForm);
      localStorage.setItem("headerForm", JSON.stringify(headerForm));
    }

  }

// Table 1 submit handler

  const handleTableOne = (event) =>{
    event.preventDefault();
    let done = true;

    if(num === ""){
      done = false;
      setNumE("حقل إجباري");
    }

    // if(results === ""){
    //   done = false;
    //   setResultsE("حقل إجباري");
    // }


    // if(tools === ""){
    //   done = false;
    //   setToolsE("حقل إجباري");
    // }

    // if(strategies === ""){
    //   done = false;
    //   setStrategiesE("حقل إجباري");
    // }

    // if(tq  === ""){
    //   done = false;
    //   setTqE("حقل إجباري");
    // }

    // if(tqTool === ""){
    //   done = false;
    //   setTqToolE("حقل إجباري");
    // }

    // if(toDo === ""){
    //   done = false;
    //   setToDoE("حقل إجباري");
    // }

    // if(wq === ""){
    //   done = false;
    //   setWqE("حقل إجباري");}

      if(done)
        {
        if(mood === "create") { setTableOne((current) => 
          {
            return [ ...current, { id: small_id,  num, results, tools, strategies, tq, tqTool, toDo, wq }]
          });
          setNum("");
          setResults("");
          setTools("");
          setStrategies("");
          setTq("");
          setTqTool("");
          setToDo("");
          setWq("");
          }


          else {
            tableOne.map((t => {
           
              if(t.id === updateId) { 
               
                  t.num = num;
                  t.results = results;
                  t.tools = tools;
                  t.strategies = strategies;
                  t.tq = tq;
                  t.tqTool = tqTool;
                  t.toDo = toDo;
                  t.wq = wq;
                }
                
        
            }))
            localStorage.setItem("tableOne", JSON.stringify(tableOne));
            setMood("create");
            setNum("");
            setResults("");
            setTools("");
            setStrategies("");
            setTq("");
            setTqTool("");
            setToDo("");
            setWq("");
        }

        
        
      }}
      
      useEffect(() => {
        localStorage.setItem("tableOne", JSON.stringify(tableOne));
        // console.log(tableOne);
        localStorage.setItem("tableTwo", JSON.stringify(tableTwo));
        // console.log(tableTwo);

        if(plann[0] !== user?.UserId){

          localStorage.removeItem("tableOne");
          localStorage.removeItem("tableTwo");
          localStorage.removeItem("mainForm");
          localStorage.removeItem("headerForm");
        }
      })


      const handleDelete = (id) => {
        setTableOne(tableOne.filter((t) => t.id !== id))
      }
      const handleDelete2 = (id) => {
        setTableTwo(tableTwo.filter((t) => t.id !== id))
      }

      const handleUpdate = (id) => {

        setMood("update");
        setUpdateId(id);
        tableOne.map((t => {
           
          if(t.id === id) { 
            setNum(t.num);
            setResults(t.results);
            setTools(t.tools);
            setStrategies(t.strategies);
            setTq(t.tq);
            setTqTool(t.tqTool);
            setToDo(t.toDo);
            setWq(t.wq);
          }

        }))
       
        
      }
      
      const handleUpdate2 = (id) => {

        setMood2("update");
        setUpdateId(id);
        tableTwo.map((t => {
           
          if(t.id === id) { 
            setDatte(t.datte);
            setDay(t.day);
            setSection(t.section);
            setClassLesson(t.classLesson);
            setAchivedResults(t.achivedResults);
            setHw(t.hw);
          
          }

        }))
       
        
      }
      
      const handleTableTwo = (event) =>{
        event.preventDefault();
        let done = true;
        if(done)
        {
        if(mood2 === "create") { setTableTwo((current) => 
          {
            return [ ...current, { id: small_id,  datte, day, section, classLesson, achivedResults, hw }]
          });
          setDatte("");
          setDay("");
          setSection("");
          setClassLesson("");
          setAchivedResults("");
          setHw("");
          }


          else {
            tableTwo.map((t => {
           
              if(t.id === updateId) { 
               
                  t.datte = datte;
                  t.day = day;
                  t.section = section;
                  t.classLesson = classLesson;
                  t.achivedResults = achivedResults;
                  t.hw = hw;
                }
                
        
            }))
            localStorage.setItem("tableTwo", JSON.stringify(tableTwo));
            setMood2("create");
            setDatte("");
            setDay("");
            setSection("");
            setClassLesson("");
            setAchivedResults("");
            setHw("");
        }

        
        
      }
      
      }

  return (
    <>
  {  <div  className="container px-4 pt-5 my-5 text-center border-bottom shadow-lg rounded"  id="form-container"  key={small_id}>
  <h6 className="fs-4 fw-bold text-end">
    يرجى قراءة الإرشادات قبل تعبئة الخطة:
  </h6>
  <div className="col-lg-11 col-md-12 mx-2 my-5">
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
            value={user.UserName}
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
            value={user.school}
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
              setStudyYearE("")
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


    {/* form for ترويسة الصفحة */}
    <form id="heading" onSubmit={handleHeaderForm}>
      <h6 className="fs-4 fw-bold text-end my-5">تعبئة الخطة:</h6>
      <div className="row mb-3 text-end">
        <div className="col-lg-3 col-12 themed-grid-col">
          <label htmlFor="Class">الصف/المستوى</label>
          <select className="form-select text-end" name="Class" id="Class" value={level} onChange={(event) => {
            setLevel(event.target.value);
            setLevelE("");
          }}>
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
            <option value="التربية الوطنية والمدنية">التربية الوطنية والمدنية</option>
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
            }
          }
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
            onChange={(event) =>{
              setDataTo(event.target.value);
              setDataToE("")
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

    <h6 className="fs-4 fw-bold text-end my-5">تعبئة الجداول:</h6>
    <form id="table1Form" onSubmit={handleTableOne}>
      <div className="row mb-3 text-end">
        <div className="col-lg-4 col-12 themed-grid-col text-end">
          <label htmlFor="num">الرقم</label>
          <input
            className="form-control text-end"
            id="num"
            type="number"
            placeholder="رقم"
            data-sb-validations="required"
            value={num}
            onChange={(event) => {
              setNum(event.target.value);
              setNumE("")
            }}
          />
          <span className="text-danger" id="numE">
            {numE}
          </span>
        </div>
        <div className="col-lg-4 col-12 themed-grid-col text-end">
          <label htmlFor="results">النتاجات الخاصـــة</label>
          <input
            className="form-control"
            id="results"
            type="text"
            placeholder="النتاجات الخاصـــة"
            data-sb-validations="required"
            value={results}
            onChange={(event) => {
            setResults(event.target.value);
            setResultsE("")
            }}
          />
          <span className="text-danger" id="resultsE">
            {resultsE}
          </span>
        </div>
        <div className="col-lg-4 col-12 themed-grid-col text-end">
          <label htmlFor="tools">مصادر التعلم</label>
          <select className="form-select text-end" name="tools" id="tools" value={tools} onChange={(event) => {
            setTools(event.target.value)
            setToolsE("")
          }}>
            <option value="none">اختر</option>
            <option value="وسائل تعليمية وتكنولوجية">وسائل تعليمية وتكنولوجية</option>
            <option value="كتب">كتب</option>
            <option value="نماذج">نماذج</option>
            <option value="عينات">عينات</option>
            <option value="افلام">افلام</option>
          </select>
        <span className="text-danger" id="resultsE">
            {toolsE}
          </span>
        </div>
      </div>
      <div className="row mb-3 text-end">
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="strategies">استراتيجيات التدريس</label>
          <select
            className="form-select text-end"
            name="strategies"
            id="strategies"
            value={strategies}
            onChange={(event) => {
              setStrategies(event.target.value);
              setStrategiesE("")
            }}
          >
            <option value="none">اختر</option>
            <option value="التدريس المباشر">التدريس المباشر</option>
            <option value="حل المشكلات والاستقصاء">حل المشكلات والاستقصاء</option>
            <option value="التعلم في المجموعات">التعلم في المجموعات</option>
            <option value="التعلم من خلال النشاط">التعلم من خلال النشاط</option>
            <option value="التفكير الناقد">التفكير الناقد</option>
          </select>
          <span className="text-danger" id="resultsE">
            {strategiesE}
          </span>
        </div>
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="tq">التقويــم-الإستراتيجية</label>
          <select className="form-select text-end" name="tq" id="tq" value={tq} onChange={(event) => {
            setTq(event.target.value);
            setTqE("");
          }}>
            <option value="none">اختر</option>
            <option value="التقويم المعتمد على الاداء">التقويم المعتمد على الاداء</option>
            <option value="القلم والورقة">القلم والورقة</option>
            <option value="الملاحظة">الملاحظة</option>
            <option value="التواصل">التواصل</option>
            <option value="مراجعة الذات">مراجعة الذات</option>
          </select>
          <span className="text-danger" id="resultsE">
            {tqE}
          </span>
        </div>
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="tqTool">التقويــم-الأداة</label>
          <select className="form-select text-end" name="tqTool" id="tqTool" value={tqTool} onChange={
            (event) => {
              setTqTool(event.target.value);
              setTqToolE("");
            }
          }>
            <option value="none">اختر</option>
            <option value="قائمة الرصد">قائمة الرصد</option>
            <option value="سلم التقدير">سلم التقدير</option>
            <option value="سلم التقدير اللفظي">سلم التقدير اللفظي</option>
            <option value="سجل وصف سير التعلم">سجل وصف سير التعلم</option>
            <option value="سجل قصصي">سجل قصصي</option>
          </select>
          <span className="text-danger" id="resultsE">
            {tqToolE}
          </span>
        </div>
      </div>
      <div className="row mb-3 text-end">
        <div className="col-lg-4 col-12 themed-grid-col text-end">
          <label htmlFor="do">الإجراءات</label>
          <input
            className="form-control"
            id="do"
            type="text"
            placeholder="الإجراء"
            data-sb-validations="required"
            value={toDo}
            onChange={(event) => {
                  setToDo(event.target.value);
                  setToDoE("")
            }}

          />
          <span className="text-danger" id="doE">
           {toDoE}
          </span>
        </div>
        <div className="col-lg-4 col-12 themed-grid-col text-end">
          <label htmlFor="time">الزمن</label>
          <input
            className="form-control text-end"
            id="time"
            type="number"
            placeholder="رقم"
            data-sb-validations="required"
            value={wq}
            onChange={(event) => {
              setWq(event.target.value);
              setWqE("")
            }}
          />
          <span className="text-danger" id="timeE">
            {wqE}
          </span>
        </div>
      </div>
      {mood === "create" ? <button className="btn btn-dark" type="submit">
        إدخال
      </button> : <button className="btn btn-dark" type="submit">
        تعديل
      </button> }
    </form>
    {/* table #1 */}
    <h3 className="mt-5 fw-bold text-end">معاينة الإدخال</h3>
    <div
      className="col-12 table-responsive bg-light rounded scroll"
      style={{ height: 300, overflowY: "scroll" }}
    >
      <table
        className="table"
        id="tableOne"
        style={{ width: 2000 }}
      >
        <thead className="bg-dark text-light">
          <tr>
            <th scope="col" rowSpan={2}>
              الرقم
            </th>
            <th scope="col" rowSpan={2}>
              النتاجات الخاصة
            </th>
            <th scope="col" rowSpan={2}>
              مصادر التعلم
            </th>
            <th scope="col" rowSpan={2}>
              استراتيجيات التدريس
            </th>
            <th scope="col" colSpan={2}>
              التقويم
            </th>
            <th scope="col" colSpan={2}>
              التنفيذ
            </th>
            <th scope="col" rowSpan={2}>
              الحذف
            </th>
            <th scope="col" rowSpan={2}>
              التعديل
            </th>
          </tr>
          <tr>
            <td>الاستراتيجية</td>
            <td>الأداة</td>
            <td>الإجراءات</td>
            <td>الزمن</td>
          </tr>
        </thead>
        <tbody id="tableBody" style={{backgroundColor: "white"}}></tbody>
       
       {  tableOne?.map( (row) =>   { return <>
       <tr key={row.id}>
          <td>{row.num}</td>
          <td>{row.results}</td>
          <td>{row.tools}</td>
          <td>{row.strategies}</td>
          <td>{row.tq}</td>
          <td>{row.tqTool}</td>
          <td>{row.toDo}</td>
          <td>{row.wq}</td>
          <td><button className="btn btn-white m-3" id='createPlan' onClick={() => handleDelete(row.id)}>حذف</button></td>
          <td><button className="btn btn-white m-3" id='createPlan' onClick={() => {
            handleUpdate(row.id);
          }}>تعديل</button></td>
        </tr></>})
        }
      
      
      </table>
    </div>
    {/* form for table #2 */}
    <form id="table1Form" onSubmit={handleTableTwo}>
      <h6 className="fs-4 fw-bold text-end my-5">
        ( جــدول المتابعــة اليومــي )
      </h6>
      <div className="row mb-3 text-end">
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="dateInput">التاريخ</label>
          <input
            className="form-control"
            id="dateInput"
            type="date"
            placeholder="التاريخ"
            data-sb-validations="required"
            required=""
            value={datte}
            onChange={(e) => setDatte(e.target.value)}
          />
        </div>
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="day">اليوم</label>
          <input
            className="form-control"
            id="day"
            type="text"
            placeholder="اليوم"
            data-sb-validations="required"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="sh">الشعبة</label>
          <input
            className="form-control"
            id="sh"
            type="text"
            placeholder="الشعبة"
            data-sb-validations="required"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3 text-end">
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="lecture">الحصة</label>
          <input
            className="form-control"
            id="lecture"
            type="text"
            placeholder="الحصة"
            data-sb-validations="required"
            value={classLesson}
            onChange={(e) => setClassLesson(e.target.value)}
          />
        </div>
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="checkedResults">النتاجات المتحققة</label>
          <input
            className="form-control text-end"
            id="checkedResults"
            type="number"
            placeholder="رقم النتاج"
            data-sb-validations="required"
            value={achivedResults}
            onChange={(e) => setAchivedResults(e.target.value)}
          />
        </div>
        <div className="col-lg-4 col-12 themed-grid-col">
          <label htmlFor="homework">الواجب البيتي</label>
          <input
            className="form-control"
            id="homework"
            type="text"
            placeholder="الواجب البيتي"
            data-sb-validations="required"
            value={hw}
            onChange={(e) => setHw(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-dark" type="submit">
        إدخال
      </button>
    </form>
    {/* table #2 */}
    <h3 className="mt-5 fw-bold text-end">معاينة الإدخال</h3>
    <div
      className="col-12 table-responsive rounded scroll"
      style={{ height: 300, overflowY: "scroll", backgroundColor: "white" }}
    >
      <table
        className="table"
        id="tableOne"
        style={{ width: 1300 }}
      >
        <thead className="bg-dark text-light">
          <tr>
            <th scope="col">اليوم والتاريخ</th>
            <th scope="col">الشعبة</th>
            <th scope="col">الحصة</th>
            <th scope="col">النتاجات المتحققة</th>
            <th scope="col">الواجب البيتي</th>
            <th scope="col">الحذف</th>
            <th scope="col">التعديل</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor: "white"}}>
            
       {  tableTwo?.map( (row) =>   { return <>
       <tr key={row.id}>
          <td>{row.datte}، {row.day}</td>
          <td>{row.section}</td>
          <td>{row.classLesson}</td>
          <td>{row.achivedResults}</td>
          <td>{row.hw}</td>
          <td><button className="btn btn-white" id='createPlan' onClick={() => handleDelete2(row.id)}>حذف</button></td>
          <td><button className="btn btn-white" id='createPlan' onClick={() => {
            handleUpdate2(row.id);
          }}>تعديل</button></td>
        </tr></>})
        }
        </tbody>
      </table>
    </div>
  </div>
  {/* <Link to={`/profile/${user.UserId}`} ><button className="btn btn-lg btn-dark mb-5" id='createPlan'>إنهاء</button> </Link> */}
  <button className="btn btn-lg btn-dark mb-5" id='createPlan' onClick={() => {
    
    const plan =[id, mainForm, headerForm, tableOne, tableTwo];
    localStorage.setItem(`plan`, JSON.stringify(plan));
    navigate(`/profile/${user.UserId}`)
  }}>إنهاء</button>
    </div> }

    </>
  )
}

export default LessonsPlan