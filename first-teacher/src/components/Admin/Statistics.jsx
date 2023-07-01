import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const [stat, setStat] = useState({});
  const [teachersCount, setTeachersCount] = useState("");
  const [headmastersCount, setHeadmasterCount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            family: "Alexandria, sans-serif",
            weight: "bold",
            size: 15,
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
                backgroundColor: ["white", "#ffcd29"],
                borderColor: ["white", "#ffcd29"],
                borderWidth: 1,
              },
            ],
          });
          setTeachersCount(response.data.success.teachersCount);
          setHeadmasterCount(response.data.success.headmastersCount);
          setIsLoading(false);
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
          <div className="row bg-white p-2 rounded-2  shadow-inner" id="dash-box">
            <div className="col-lg-4 mb-3">
              <div className="col">
                <div
                  className="card card-cover h-100 overflow-hidden rounded-4 " id="dash-box"
                  style={{
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                    backgroundColor: "rgba(0, 0, 0,0.7)",
                    backgroundPosition: "center",
                    backgroundImage:
                      'url("https://www.brookings.edu/wp-content/uploads/2020/05/empty-classroom_elementary-school-middle-school-high-school.jpg")',
                  }}
                >
                  <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                    <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                      المعلمون
                    </h3>
                    <ul className="d-flex list-unstyled mt-auto">
                      <li className="me-auto fs-5 text-warning">العدد : {teachersCount}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="col">
                <div
                  className="card card-cover h-100 overflow-hidden  rounded-4 " id="dash-box"
                  style={{
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                    backgroundColor: "rgba(0, 0, 0,0.7)",
                    backgroundPosition: "center",
                    backgroundImage:
                      'url("https://www.brookings.edu/wp-content/uploads/2020/05/empty-classroom_elementary-school-middle-school-high-school.jpg")',
                  }}
                >
                  <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                    <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                      المدارس{" "}
                    </h3>
                    <ul className="d-flex list-unstyled mt-auto">
                      <li className="me-auto fs-5 text-warning">العدد : {headmastersCount}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-3">
              <div className="col">
                <div
                  className="card card-cover h-100 overflow-hidden  rounded-4" id="dash-box"
                  style={{
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                    backgroundColor: "rgba(0, 0, 0,0.7)",
                    backgroundPosition: "center",
                    backgroundImage:
                      'url("https://www.brookings.edu/wp-content/uploads/2020/05/empty-classroom_elementary-school-middle-school-high-school.jpg")',
                  }}
                >
                  <div className="d-flex flex-column p-5 pb-3 text-white text-shadow-1">
                    <Doughnut data={stat} options={options} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Statistics;
