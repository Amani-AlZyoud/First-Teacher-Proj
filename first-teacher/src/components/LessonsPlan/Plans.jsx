import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import PaginationComponent from "../PaginationComponent";
import { useParams } from "react-router-dom";

const Plans = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState([]);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState();

  const [allPlansCount, setAllPlansCount] = useState(1);
  const [PlansPerPage, setPlansPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPlanNumber = currentPage * PlansPerPage;
  const firstPlanIndex = lastPlanNumber - PlansPerPage;
  const [limitedPlans, setLimitedPlans] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5500/lessons/userPlans/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setPlan(response.data.success);
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

  const monthPlans = [];
  useEffect(() => {
    if (!isLoading && plan.length > 0) {
      setAllPlansCount(plan.length);
      setLimitedPlans(plan.slice(firstPlanIndex, lastPlanNumber));

      
        plan.map((p) => {
          const result = isInCurrentWeek(
            p.table_two[p.table_two.length - 1].datte
          );
          if (result) {
            monthPlans.push(p);
          }
        })
        
        console.log(monthPlans);
    }
  }, [isLoading, plan, firstPlanIndex, lastPlanNumber]);

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = today.getDate() - currentDay; // Adjust for Sunday as the start of the week
    const startDate = new Date(today.setDate(diff));
    const endDate = new Date(today.setDate(diff + 6));
    return {
      startDate,
      endDate,
    };
  };

  const isInCurrentWeek = (dateToCheck) => {
    const { startDate, endDate } = getCurrentWeekDates();

    // Convert the dateToCheck to a JavaScript Date object
    const checkDate = new Date(dateToCheck);

    // Check if the checkDate is within the range of the current week
    return checkDate >= startDate && checkDate <= endDate;
  };

  // Usage example
  const dateToCheck = "07-07-2023";
  const result = isInCurrentWeek(dateToCheck);
  //   console.log(result); // true or false

  return (
    <>
      <Tabs
        defaultActiveKey="هذا الأسبوع"
        id="uncontrolled-tab-example"
        className="my-3 border-bottom border-2 border-white"
      >
        <Tab eventKey="هذا الأسبوع" title="هذا الأسبوع">
          <div
            className="bg-black container rounded-5 mb-3"
            style={{ height: "100vh" }}
          >
            <h1 className="text-white text-center">Tab content for Home</h1>
            {!isLoading && (
              <div className="d-flex justify-content-center mb-3">
                <PaginationComponent
                  itemsCount={allPlansCount}
                  itemsPerPage={PlansPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  alwaysShown={false}
                />
              </div>
            )}
          </div>
        </Tab>
        <Tab eventKey="هذا الشهر" title="هذا الشهر">
          <div
            className="bg-white mb-3 container rounded-5"
            style={{ height: "100vh" }}
          >
            <h1 className="text-center">Tab content for Profile</h1>
          </div>
        </Tab>
        <Tab eventKey="شوهد" title="شوهد">
          <div
            className="bg-white mb-3 container rounded-5"
            style={{ height: "100vh" }}
          >
            <h1 className="text-center">Tab content for Contact</h1>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Plans;
