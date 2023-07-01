import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const SignedPlan = ({ downloading, createAndDownloadPdf, refreshData}) => {
  const [signed, setSigned] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();



  useEffect(() => {
    axios
      .get(`http://localhost:5500/lessons/sign/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setSigned(response.data.success);
          setIsLoading(false);
        }

        if (response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshData]);




  return (
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
                            <CircularProgress size="1.5rem" color="success" />
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
  );
};

export default SignedPlan;
