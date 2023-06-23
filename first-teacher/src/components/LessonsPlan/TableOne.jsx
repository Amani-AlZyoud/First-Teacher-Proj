import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
const TableOne = ({setTableO}) => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

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

  // For Update and Delete
  const [mood, setMood] = useState("create");
  const [updateId, setUpdateId] = useState("");

  const [tableOne, setTableOne] = useState(JSON.parse(localStorage.getItem("tableOne") ? localStorage.getItem("tableOne"): []));
  // Table 1 submit handler

  const handleTableOne = (event) => {
    event.preventDefault();
    let done = true;

    if (num === "") {
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

    if (done) {
      if (mood === "create") {
        setTableOne((current) => {
          return [
            ...current,
            {
              id: small_id,
              num,
              results,
              tools,
              strategies,
              tq,
              tqTool,
              toDo,
              wq,
            },
          ];
        });
        setNum("");
        setResults("");
        setTools("");
        setStrategies("");
        setTq("");
        setTqTool("");
        setToDo("");
        setWq("");
      } else {
        tableOne.map((t) => {
          if (t.id === updateId) {
            t.num = num;
            t.results = results;
            t.tools = tools;
            t.strategies = strategies;
            t.tq = tq;
            t.tqTool = tqTool;
            t.toDo = toDo;
            t.wq = wq;
          }
        });
        localStorage.setItem("tableOne", JSON.stringify(tableOne));
        setTableO(tableOne)
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
    }
  };

  const handleDelete = (id) => {
    setUpdateId(id);
    setTableOne(tableOne.filter((t) => t.id !== id));
    localStorage.setItem("tableOne", JSON.stringify(tableOne));
    setTableO(tableOne)

  };

  const handleUpdate = (id) => {
    setMood("update");
    setUpdateId(id);
    tableOne.map((t) => {
      if (t.id === id) {
        setNum(t.num);
        setResults(t.results);
        setTools(t.tools);
        setStrategies(t.strategies);
        setTq(t.tq);
        setTqTool(t.tqTool);
        setToDo(t.toDo);
        setWq(t.wq);
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("tableOne", JSON.stringify(tableOne));
    setTableO(tableOne)
  }, [tableOne]);

  return (
    <>
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
                setNumE("");
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
                setResultsE("");
              }}
            />
            <span className="text-danger" id="resultsE">
              {resultsE}
            </span>
          </div>
          <div className="col-lg-4 col-12 themed-grid-col text-end">
            <label htmlFor="tools">مصادر التعلم</label>
            <select
              className="form-select text-end"
              name="tools"
              id="tools"
              value={tools}
              onChange={(event) => {
                setTools(event.target.value);
                setToolsE("");
              }}
            >
              <option value="none">اختر</option>
              <option value="وسائل تعليمية وتكنولوجية">
                وسائل تعليمية وتكنولوجية
              </option>
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
                setStrategiesE("");
              }}
            >
              <option value="none">اختر</option>
              <option value="التدريس المباشر">التدريس المباشر</option>
              <option value="حل المشكلات والاستقصاء">
                حل المشكلات والاستقصاء
              </option>
              <option value="التعلم في المجموعات">التعلم في المجموعات</option>
              <option value="التعلم من خلال النشاط">
                التعلم من خلال النشاط
              </option>
              <option value="التفكير الناقد">التفكير الناقد</option>
            </select>
            <span className="text-danger" id="resultsE">
              {strategiesE}
            </span>
          </div>
          <div className="col-lg-4 col-12 themed-grid-col">
            <label htmlFor="tq">التقويــم-الإستراتيجية</label>
            <select
              className="form-select text-end"
              name="tq"
              id="tq"
              value={tq}
              onChange={(event) => {
                setTq(event.target.value);
                setTqE("");
              }}
            >
              <option value="none">اختر</option>
              <option value="التقويم المعتمد على الاداء">
                التقويم المعتمد على الاداء
              </option>
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
            <select
              className="form-select text-end"
              name="tqTool"
              id="tqTool"
              value={tqTool}
              onChange={(event) => {
                setTqTool(event.target.value);
                setTqToolE("");
              }}
            >
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
                setToDoE("");
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
                setWqE("");
              }}
            />
            <span className="text-danger" id="timeE">
              {wqE}
            </span>
          </div>
        </div>
        {mood === "create" ? (
          <button className="btn btn-dark" type="submit">
            إدخال
          </button>
        ) : (
          <button className="btn btn-dark" type="submit">
            تعديل
          </button>
        )}
      </form>
      {/* table #1 */}
      <h3 className="mt-5 fw-bold text-end">معاينة الإدخال</h3>
      <div
        className="col-12 table-responsive bg-light rounded scroll"
        style={{ height: 300, overflowY: "scroll" }}
      >
        <table className="table" id="tableOne" style={{ width: 2000 }}>
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
          <tbody id="tableBody" style={{ backgroundColor: "white" }} >

          {tableOne?.map((row) => {
            return (
                  <tr key={row.id}>
                  <td>{row.num}</td>
                  <td>{row.results}</td>
                  <td>{row.tools}</td>
                  <td>{row.strategies}</td>
                  <td>{row.tq}</td>
                  <td>{row.tqTool}</td>
                  <td>{row.toDo}</td>
                  <td>{row.wq}</td>
                  <td>
                    <button
                      className="btn btn-white m-3"
                      id="createPlan"
                      onClick={() => handleDelete(row.id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-white m-3"
                      id="createPlan"
                      onClick={() => handleUpdate(row.id)}
                    >
                      تعديل
                    </button>
                  </td>
                </tr>
            
            );
          })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableOne;
