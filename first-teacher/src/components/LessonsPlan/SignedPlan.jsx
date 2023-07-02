import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PaginationComponent from "../PaginationComponent";

const SignedPlan = ({ downloading, createAndDownloadPdf, refreshData }) => {
  const [signed, setSigned] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [allPlansCount, setAllPlansCount] = useState(1);
  const [PlansPerPage, setPlansPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPlanNumber = currentPage * PlansPerPage;
  const firstPlanIndex = lastPlanNumber - PlansPerPage;
  const [limitedPlans, setLimitedPlans] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoading && signed.length > 0) {
      setAllPlansCount(signed.length);
      setLimitedPlans(signed.slice(firstPlanIndex, lastPlanNumber));
    }
    if (signed.length === 0) {
      setLimitedPlans([]);
    }
  }, [isLoading, firstPlanIndex, signed, lastPlanNumber]);

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
      className="bg-dark rounded-bottom-4 container mb-3" style={{minHeight: "50vh"}} id="dash-box"
    >
      {signed?.length === 0 && (
        <h3 className="text-warning py-2 text-center">لا يوجد نماذج موقعة</h3>
      )}
      {!isLoading && signed.length > 0 && (
        <>
          <>
            <Table striped bordered hover>
              <thead className="bg-white">
                <tr className="text-white">
                  <th className="text-black">رقم خطة الدرس</th>
                  <th className="text-black">التاريخ</th>
                  <th className="text-black">معاينة</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {limitedPlans.map((p) => {
                  return (
                    <tr key={p.lesson_id}>
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
            {!isLoading && (
              <div className="d-flex justify-content-center mt-2">
                <PaginationComponent
                  itemsCount={allPlansCount}
                  itemsPerPage={PlansPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  alwaysShown={false}
                />
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default SignedPlan;
