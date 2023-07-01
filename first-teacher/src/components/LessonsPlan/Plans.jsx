import React, { useContext, useEffect, useReducer, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import WeekPlans from "./WeekPlans";
import MonthPlans from "./MonthPlans";
import SignedPlan from "./SignedPlan";

const Plans = () => {

  const { user } = useContext(UserContext);
  const [sign, setSign] = useState("");
  const [downloading, setDownloading] = useState();
  const [refreshData, setRefreshData] = useState(false);


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
        handleRefreshData();
      })
      .catch((err) => console.log(err.message));
  };


  const handleRefreshData = () => {
     setRefreshData((prevValue) => !prevValue);
   };
   


  return (
    <>
      <Tabs
        defaultActiveKey="هذا الأسبوع"
        id="uncontrolled-tab-example"
        className="my-3 border-bottom border-2 border-white"
      >
        <Tab  eventKey="هذا الأسبوع" title="هذا الأسبوع">
          <WeekPlans downloading={downloading} createAndDownloadPdf={createAndDownloadPdf} SignPlan={SignPlan} getImg={getImg}/>
        </Tab>
        <Tab eventKey="هذا الشهر" title="هذا الشهر">
          <MonthPlans downloading={downloading} createAndDownloadPdf={createAndDownloadPdf} SignPlan={SignPlan} getImg={getImg}/>
        </Tab>
        <Tab  eventKey="شوهد" title="شوهد">
         <SignedPlan refreshData={refreshData} downloading={downloading} createAndDownloadPdf={createAndDownloadPdf}/> 
        </Tab>
      </Tabs>
    </>
  );
};

export default Plans;
