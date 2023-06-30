import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { BiPeople } from 'react-icons/bi';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [stat, setStat] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "black",
          font: {
            family: "Alexandria, sans-serif",
            weight: "bold",
            size: 15, // Adjust the font size here
          },
        },
      },
    },
  };
  useEffect(() => {
    axios
      .get("http://localhost:5500/users/stat", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setStat({
            labels: ["المعلمون/المعلمات", "مدراء المدارس"],
            datasets: [
              {
                label: "عدد",
                data: [
                  response.data.success.teachersCount,
                  response.data.success.headmastersCount,
                ],
                backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
                borderColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
                borderWidth: 1,
              },
            ],
          });
          setIsLoading(false);
          console.log(response.data.success);
        }

        if (response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <div class="row">
            <div class="col-lg-4">
              <Doughnut data={stat} options={options} className="w-50 h-100 bg-white p-2 rounded-2 shadow-lg" />
            </div>
            <div class="col-lg-4">
              <div className="card-body bg-white">
                <h5 className="card-title">
                  المعلمات / المعلمون
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people" />
                  </div>
                  <div className="ps-3">
                    <h6>1244</h6>
                    <span className="text-danger small pt-1 fw-bold">
                      12%
                    </span>{" "}
                    <span className="text-muted small pt-2 ps-1">decrease</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Statistics;
