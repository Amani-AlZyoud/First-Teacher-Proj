import React, { useEffect, useState } from "react";
import MainForm from "./MainForm";
import HeadForm from "./HeadForm";
import TableOne from "./TableOne";
import TableTwo from "./TableTwo";
import Swal from "sweetalert2";
import axios from "axios";

const LessonsPlan = () => {

  const [mainForm, setMainForm] = useState(localStorage.getItem("mainForm") ? JSON.parse(localStorage.getItem("mainForm")) : {});
  const [headForm, setHeadForm] = useState(localStorage.getItem("headerForm") ? JSON.parse(localStorage.getItem("headerForm")) : {})
  const [tableOne, setTableOne] = useState(localStorage.getItem("tableOne") ? JSON.parse(localStorage.getItem("tableOne")) : [])
  const [tableTwo, setTableTwo] = useState(localStorage.getItem("tableTwo") ? JSON.parse(localStorage.getItem("tableTwo")) : [])

  useEffect(() => {
    console.log(tableOne);
  }, [mainForm, headForm, tableOne, tableTwo]);

  const handleSave = () => {
    if (
      mainForm === {} &&
      headForm === {} &&
      tableOne === [] &&
      tableTwo === []
    ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "لا يوجد بيانات معبأة",
        showConfirmButton: false,
        iconColor: "#FFCD29",
        timer: 1500,
      });
    } else {
      const lesson = [mainForm, headForm, tableOne, tableTwo];

      Swal.fire({
        title: "هل انت متأكد؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FFCD29",
        cancelButtonColor: "red",
        confirmButtonText: "حفظ",
        cancelButtonText: "إلغاء",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              "http://localhost:5500/lessons",
              { lesson },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              if (response.data.success) {
                Swal.fire({
                  title: "تم الحفظ بنجاح",
                  text: "تم حفظ خطة الدرس ",
                  icon: "success",
                  confirmButtonColor: "#FFCD29",
                });
              }

              if (response.data.message) {
                console.log(response.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  };

  return (
    <>
      <div
        className="container px-4 pt-5 my-5 text-center border-bottom shadow-lg rounded"
        id="form-container"
      >
        <MainForm setMainForm={setMainForm}/>
        <HeadForm setHeadForm={setHeadForm} />
        <TableOne setTableO={setTableOne}/>
        <TableTwo setTableT={setTableTwo}/>
        


        <button
          className="btn btn-lg btn-dark my-5"
          id="createPlan"
          onClick={() => {
            handleSave();
          }}
        >
          إنهاء
        </button>
      </div>
    </>
  );
};

export default LessonsPlan;
