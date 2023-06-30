import React, { useContext, useEffect, useReducer, useState } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { CircularProgress } from "@mui/material";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

const Plans = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [sign, setSign] = useState("");
  const [downloading, setDownloading] = useState();
  const [signed, setSigned] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

  const getImg = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };
  const onLoad = (fileString) => {
    setSign(fileString);
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const createAndDownloadPdf = (p) => {
    setDownloading(p.lesson_id);
    axios
      .post(
        "http://localhost:5500/lessons/create-pdf",
        {
          username: user.username,
          school_name: user.school_name,
          mainform: p.mainform[0],
          headform: p.headform[0],
          table_one: p.table_one,
          table_two: p.table_two,
          sign: p.sign,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        setDownloading(false);
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        saveAs(pdfBlob, "plan.pdf");
      });
  };

  const getAllPlans = () => {
    axios
      .get(`http://localhost:5500/lessons/userPlans/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setPlan(response.data.success);
          plan.map((p) => {
            const result = isCurrentMonth(
              p.table_two[p.table_two.length - 1].datte
            );
            if (result) {
              setMonthPlans((current) => {
                return [...current, p];
              });
            }
          });
          setIsLoading(false);
        }

        if (response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5500/lessons/sign/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setSigned(response.data.success);
          
        }

        if (response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    
    getAllPlans();
    if (!isLoading && plan.length > 0) {
      plan.map((p) => {
        const result = isInCurrentWeek(
          p.table_two[p.table_two.length - 1].datte
        );
        if (result) {
          setWeekPlans((current) => {
            return [...current, p];
          });
        }
      });

      

      console.log(monthPlans);
    }
  }, [isLoading,reducerValue]);

  const [monthPlans, setMonthPlans] = useState([]);
  const [weekPlans, setWeekPlans] = useState([]);

  

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay;
    const startDate = new Date(today.setDate(diff));
    const endDate = new Date(today.setDate(diff + 6));
    return {
      startDate,
      endDate,
    };
  };

  const isInCurrentWeek = (dateToCheck) => {
    const { startDate, endDate } = getCurrentWeekDates();
    const checkDate = new Date(dateToCheck);
    return checkDate >= startDate && checkDate <= endDate;
  };

  function isCurrentMonth(datte) {
    const currentDate = new Date();
    const date = new Date(datte);
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  }

  const SignPlan = (planId) => {
    axios
      .put(
        `http://localhost:5500/lessons/sign/${planId}`,
        { sign: sign },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        Swal.fire({
          title: "تم التوقيع بنجاح",
          icon: "success",
          showConfirmButton: false,
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Tabs
        defaultActiveKey="هذا الأسبوع"
        id="uncontrolled-tab-example"
        className="my-3 border-bottom border-2 border-white"
      >
        <Tab eventKey="هذا الأسبوع" title="هذا الأسبوع">
          <div
            className="bg-black container mb-3"
            style={{ height: "80vh", overflowY: "scroll" }}
          >
            {weekPlans?.length === 0 && (
              <h1 className="text-white text-center mt-5">
                لا يوجد نماذج لهذا الأسبوع
              </h1>
            )}
            {!isLoading && weekPlans.length > 0 && (
              <>
                <>
                  <Table striped bordered hover>
                    <thead className="bg-white">
                      <tr className="text-white">
                        <th className="text-black">#</th>
                        <th className="text-black">رقم خطة الدرس</th>
                        <th className="text-black">التاريخ</th>
                        <th className="text-black">معاينة</th>
                        <th className="text-black">توقيع</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {weekPlans.map((p) => {
                        return (
                          <tr key={p.lesson_id}>
                            <td></td>
                            <td className="text-black">{p.lesson_id}</td>
                            <td className="text-black">
                              {p.table_two[p.table_two.length - 1].datte}
                            </td>
                            <td>
                              <button
                                className="btn btn-dark mt-2 text-white fw-bold"
                                id="createPlan"
                                onClick={() => createAndDownloadPdf(p)}
                              >
                                {downloading === p.lesson_id ? (
                                  <CircularProgress
                                    size="1.5rem"
                                    color="success"
                                  />
                                ) : (
                                  "معاينة"
                                )}
                              </button>
                            </td>
                            <td>
                              <>
                                <span>
                                  <Form.Control
                                    type="file"
                                    id="InputField"
                                    className="w-50"
                                    onChange={(e) => getImg(e)}
                                    accept="image/*"
                                  />{" "}
                                  <button
                                    className="btn btn-warning mt-2 text-white fw-bold"
                                    id="createPlan"
                                    onClick={() => {
                                      SignPlan(p.lesson_id)}}
                                  >
                                    شوهد
                                  </button>
                                </span>
                              </>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              </>
            )}
          </div>
        </Tab>
        <Tab eventKey="هذا الشهر" title="هذا الشهر">
          <div
            className="bg-black container mb-3"
            style={{ height: "80vh", overflowY: "scroll" }}
          >
            {monthPlans?.length === 0 && (
              <h1 className="text-white text-center mt-5">
                لا يوجد نماذج لهذا الشهر
              </h1>
            )}
            {!isLoading && monthPlans.length > 0 && (
              <>
                <>
                  <Table striped bordered hover>
                    <thead className="bg-white">
                      <tr className="text-white">
                        <th className="text-black">#</th>
                        <th className="text-black">رقم خطة الدرس</th>
                        <th className="text-black">التاريخ</th>
                        <th className="text-black">معاينة</th>
                        <th className="text-black">توقيع</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {monthPlans.map((p) => {
                        return (
                          <tr key={p.lesson_id}>
                            <td></td>
                            <td className="text-black">{p.lesson_id}</td>
                            <td className="text-black">
                              {p.table_two[p.table_two.length - 1].datte}
                            </td>
                            <td>
                              <button
                                className="btn btn-dark mt-2 text-white fw-bold"
                                id="createPlan"
                                onClick={() => createAndDownloadPdf(p)}
                              >
                                {downloading === p.lesson_id ? (
                                  <CircularProgress
                                    size="1.5rem"
                                    color="success"
                                  />
                                ) : (
                                  "معاينة"
                                )}
                              </button>
                            </td>
                            <td>
                              <>
                                <span>
                                  <Form.Control
                                    type="file"
                                    id="InputField"
                                    className="w-50"
                                    onChange={(e) => getImg(e)}
                                    accept="image/*"
                                  />{" "}
                                  <button
                                    className="btn btn-warning mt-2 text-white fw-bold"
                                    id="createPlan"
                                    onClick={() => {
                                      SignPlan(p.lesson_id)
                                      forceUpdate()}}
                                  >
                                    شوهد
                                  </button>
                                </span>
                              </>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              </>
            )}
          </div>
        </Tab>
        <Tab eventKey="شوهد" title="شوهد">
          <div
            className="bg-black container mb-3"
            style={{ height: "80vh", overflowY: "scroll" }}
          >
            {signed?.length === 0 && (
              <h1 className="text-white text-center mt-5">لا يوجد نماذج موقعة</h1>
            )}
            {!isLoading && signed.length > 0 && (
              <>
                <>
                  <Table striped bordered hover>
                    <thead className="bg-white">
                      <tr className="text-white">
                        <th className="text-black">#</th>
                        <th className="text-black">رقم خطة الدرس</th>
                        <th className="text-black">التاريخ</th>
                        <th className="text-black">معاينة</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {signed.map((p) => {
                        return (
                          <tr key={p.lesson_id}>
                            <td></td>
                            <td className="text-black">{p.lesson_id}</td>
                            <td className="text-black">
                              {p.table_two[p.table_two.length - 1].datte}
                            </td>
                            <td>
                              <button
                                className="btn btn-dark mt-2 text-white fw-bold"
                                id="createPlan"
                                onClick={(e) => createAndDownloadPdf(p)}
                              >
                                {downloading === p.lesson_id ? (
                                  <CircularProgress
                                    size="1.5rem"
                                    color="success"
                                  />
                                ) : (
                                  "معاينة"
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              </>
            )}
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Plans;
