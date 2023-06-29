import React, { useContext, useEffect, useState } from "react";
import MainForm from "./MainForm";
import HeadForm from "./HeadForm";
import TableOne from "./TableOne";
import TableTwo from "./TableTwo";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Spinner } from "react-bootstrap";

const LessonsPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [mainForm, setMainForm] = useState(
    localStorage.getItem("mainForm")
      ? JSON.parse(localStorage.getItem("mainForm"))
      : undefined
  );
  const [headForm, setHeadForm] = useState(
    localStorage.getItem("headerForm")
      ? JSON.parse(localStorage.getItem("headerForm"))
      : undefined
  );
  const [tableOne, setTableOne] = useState(
    localStorage.getItem("tableOne")
      ? JSON.parse(localStorage.getItem("tableOne"))
      : undefined
  );
  const [tableTwo, setTableTwo] = useState(
    localStorage.getItem("tableTwo")
      ? JSON.parse(localStorage.getItem("tableTwo"))
      : undefined
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:5500/lessons/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.data.success) {
            const { mainform, headform, table_one, table_two } = response?.data?.success;
            setMainForm(mainform);
            setHeadForm(headform);
            setTableOne(table_one);
            setTableTwo(table_two);
            localStorage.setItem("mainForm", JSON.stringify(mainform));
            localStorage.setItem("headerForm", JSON.stringify(headform));
            localStorage.setItem("tableOne", JSON.stringify(table_one));
            localStorage.setItem("tableTwo", JSON.stringify(table_two));
            setIsLoading(false);
          }

          if (response.data.message) {
            console.log(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      } 
    };

    fetchData();
  }, [id]);

  const handleSave = () => {
    if (
      mainForm === undefined &&
      headForm === undefined &&
      tableOne === undefined &&
      tableTwo === undefined
    ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "لا يوجد بيانات معبأة",
        showConfirmButton: false,
        iconColor: "#FFCD29",
        timer: 1500,
      });
    } 
    else if(tableOne.length === 0){
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "لا يوجد بيانات معبأة",
        showConfirmButton: false,
        iconColor: "#FFCD29",
        timer: 1500,
      });
    }
        
    else {
  

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
              { lesson: [mainForm, headForm, tableOne, tableTwo] },
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
                navigate(`/profile/${user?.user_id}`);
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

    if (id !== undefined) {
       if(tableOne.length === 0 || tableTwo.length === 0) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "يرجى تعبأة الجداول",
          showConfirmButton: false,
          iconColor: "#FFCD29",
          timer: 1500,
        });
      }
      
 else
     { Swal.fire({
        title: "هل تريد حفظ التغيرات؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FFCD29",
        cancelButtonColor: "red",
        confirmButtonText: "حفظ",
        cancelButtonText: "إلغاء",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://localhost:5500/lessons/${id}`,
              { lesson: [mainForm, headForm, tableOne, tableTwo] },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              Swal.fire({
                title: "تم التعديل بنجاح",
                text: "تم حفظ خطة الدرس ",
                icon: "success",
                confirmButtonColor: "#FFCD29",
              });
              localStorage.removeItem("mainForm");
              localStorage.removeItem("headerForm");
              localStorage.removeItem("tableOne");
              localStorage.removeItem("tableTwo");
              navigate(`/profile/${user?.user_id}`);

              if (response.data.message) {
                console.log(response.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
    }
    }
  };

  return (
    <>
      <div
        className="container px-4 pt-5 my-5 text-center border-bottom shadow-lg rounded"
        id="form-container"
      >
        {isLoading && id !== undefined && (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden text-center">Loading...</span>
            </Spinner>
          </>
        )}
        {!isLoading && id !== undefined && (
          <>
            <MainForm setMainForm={setMainForm} mainForm={mainForm} />
            <HeadForm setHeadForm={setHeadForm} headForm={headForm} />
            <TableOne setTableO={setTableOne} table_one={tableOne} />
            <TableTwo setTableT={setTableTwo} table_two={tableTwo} />
          </>
        )}

        {id === undefined && (
          <>
            <MainForm setMainForm={setMainForm} mainForm={mainForm} />
            <HeadForm setHeadForm={setHeadForm} headForm={headForm} />
            <TableOne setTableO={setTableOne} table_one={tableOne} />
            <TableTwo setTableT={setTableTwo} table_two={tableTwo} />
          </>
        )}

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
