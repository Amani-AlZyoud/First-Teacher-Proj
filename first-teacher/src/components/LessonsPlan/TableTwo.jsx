import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuid } from "uuid";
const TableTwo = ({ setTableT }) => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  // Table 2

  const [datte, setDatte] = useState("");
  const [datteE, setDatteE] = useState("");
  const [day, setDay] = useState("");
  const [dayE, setDayE] = useState("");
  const [section, setSection] = useState("");
  const [classLesson, setClassLesson] = useState("");
  const [achivedResults, setAchivedResults] = useState("");
  const [hw, setHw] = useState("");
  const [mood, setMood] = useState("create");
  const [updateId, setUpdateId] = useState("");

  const [tableTwo, setTableTwo] = useState(
    localStorage.getItem("tableTwo")
      ? JSON.parse(localStorage.getItem("tableTwo"))
      : []
  );

  const handleTableTwo = (event) => {
    event.preventDefault();
    let done = true;
    if (done) {
      if (mood === "create") {
        setTableTwo((current) => {
          return [
            ...current,
            {
              id: small_id,
              datte,
              day,
              section,
              classLesson,
              achivedResults,
              hw,
            },
          ];
        });
        Swal.fire({
          title: "تم الحفظ بنجاح",
          icon: "success",
          showConfirmButton: false,
        });
        setDatte("");
        setDay("");
        setSection("");
        setClassLesson("");
        setAchivedResults("");
        setHw("");
      } else {
        tableTwo.map((t) => {
          if (t.id === updateId) {
            t.datte = datte;
            t.day = day;
            t.section = section;
            t.classLesson = classLesson;
            t.achivedResults = achivedResults;
            t.hw = hw;
          }
        });
        localStorage.setItem("tableTwo", JSON.stringify(tableTwo));
        Swal.fire({
          title: "تم الحفظ بنجاح",
          icon: "success",
          showConfirmButton: false,
        });
        setTableT(tableTwo);
        setMood("create");
        setDatte("");
        setDay("");
        setSection("");
        setClassLesson("");
        setAchivedResults("");
        setHw("");
      }
    }
  };

  const handleDelete = (id) => {
    setTableTwo(tableTwo.filter((t) => t.id !== id));
  };

  const handleUpdate = (id) => {
    setMood("update");
    setUpdateId(id);
    tableTwo.map((t) => {
      if (t.id === id) {
        setDatte(t.datte);
        setDay(t.day);
        setSection(t.section);
        setClassLesson(t.classLesson);
        setAchivedResults(t.achivedResults);
        setHw(t.hw);
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("tableTwo", JSON.stringify(tableTwo));
    setTableT(tableTwo);
  }, [tableTwo]);

  return (
    <>
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
        <table className="table" id="tableOne" style={{ width: 1300 }}>
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
          <tbody style={{ backgroundColor: "white" }}>
            {tableTwo?.map((row) => {
              return (
                <tr key={row.id}>
                  <td>
                    {row.datte}، {row.day}
                  </td>
                  <td>{row.section}</td>
                  <td>{row.classLesson}</td>
                  <td>{row.achivedResults}</td>
                  <td>{row.hw}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      id="createPlan"
                      onClick={() => handleDelete(row.id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning text-white"
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

export default TableTwo;
