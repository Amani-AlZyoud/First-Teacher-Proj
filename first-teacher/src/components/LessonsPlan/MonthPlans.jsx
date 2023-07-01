import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const MonthPlans = ({
  downloading,
  createAndDownloadPdf,
  SignPlan,
  getImg,
}) => {
  const [monthPlans, setMonthPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const { id } = useParams();

  const handleRefreshData = () => {
    setRefreshData((prevValue) => !prevValue);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5500/lessons/monthPlans/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setMonthPlans(response.data.success);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  }, [refreshData]);

  return (
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
                            <CircularProgress size="1.5rem" color="success" />
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
                                SignPlan(p.lesson_id);
                                handleRefreshData();
                                Swal.fire({
                                  title: "تم التوقيع بنجاح",
                                  icon: "success",
                                  showConfirmButton: false,
                                });
                              }}
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
  );
};

export default MonthPlans;
