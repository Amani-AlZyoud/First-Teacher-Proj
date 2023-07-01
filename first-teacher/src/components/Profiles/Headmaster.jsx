import React, { useContext } from "react";
import "../../Styles/headmaster_style.css";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import Teachers from "../Headmaster/Teachers";
import ProfileInfo from "../Headmaster/ProfileInfo";
import { UserContext } from "../../contexts/UserContext";

const Headmaster = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="container my-3 bg-white py-2 rounded-2 border border-warning shadow-lg">
        <Breadcrumbs aria-label="breadcrumb" dir="rtl">
          <Link
            underline="hover"
            className="text-dark fw-bold text-decoration-none"
            to="/"
          >
            الصفحة الرئيسية
          </Link>
          <span className="text-black fw-bold pe-none">صفحتي</span>
        </Breadcrumbs>
      </div>

      <ProfileInfo />

      <div className="container text-center g-0" id="title1">
        {user.account === "YES" && <Teachers />}

        {user.account === "NO" && (
          <>
            <h3
              className="text-light py-3 mt-5 rounded"
              style={{ backgroundColor: "black" }}
            >
              لم يتم تفعيل الحساب، يجب إتمام عملية الدفع{" "}
              <Link to="/payment">
                <button className="btn btn-danger">تفعيل حسابي</button>
              </Link>
            </h3>
          </>
        )}
      </div>
    </>
  );
};

export default Headmaster;
