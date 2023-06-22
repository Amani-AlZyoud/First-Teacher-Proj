import React, { useContext, useEffect, useState } from "react";
import "../../Styles/style_login.css";
import { HashLink } from "react-router-hash-link";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const Login = ({ setSignUp }) => {
  const navigate = useNavigate("/");
  const { user, setUser, forceUpdate } = useContext(UserContext);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  let done = true;

  useEffect(() => {}, [done]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Email === "") {
      done = false;
      setErrorMsg("يرجى إدخال البريد الإلكتروني.");
    } else if (Password === "") {
      done = false;
      setErrorMsg("يرجى إدخال كلمة المرور.");
    }

    if (done) {
      axios
        .post("http://localhost:5500/auth", {
          email: Email,
          password: Password,
        })
        .then(async (response) => {
          if (response.data?.Invalid) {
            done = false;
            setErrorMsg("خطأ في البريد الإلكتروني أو كلمة المرور!");
          }

          if (response.data?.success) {
            setUser(response.data.success.user);
            forceUpdate();
            localStorage.setItem("token", response.data.success.token);
            localStorage.setItem("id", response.data.success.user.user_id);
            done = false;
          }

          if (response.data?.Error) {
            console.log(response.data.Error);
            done = false;
          }
        })
        .catch((error) => {
          console.log(error);
          done = false;
        });

      if (done) {
   
          Swal.fire({
            position: "center",
            icon: "success",
            title: "أهلاً وسهلاً بك",
            showConfirmButton: false,
            iconColor: '#FFCD29',
            timer: 1500,
          });
          
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <FadeIn>
        <div className="container col-xl-10 col-xxl-8 py-5">
          <div className="row">
            <div className="col-md-10 mx-auto col-lg-9">
              <form
                className="p-4 p-md-5  rounded-3 shadow-lg bg-white"
                id="reg"
                onSubmit={handleSubmit}
              >
                <div className="divider d-flex w-auto">
                  <p className="fw-bold display-5" id="sign-in-herotext">
                    تسجيل الدخول
                  </p>
                </div>
                {/* Email input */}
                <div className="form-outline my-4">
                  <label className="form-label fw-bold" htmlFor="email">
                    <span className="text-danger">*</span>
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder=""
                    value={Email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrorMsg("");
                    }}
                  />
                  <span className="text-danger" id="EmailErrorMSG" />
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <label className="form-label fw-bold" htmlFor="password">
                    <span className="text-danger">*</span>
                    كلمة المرور
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control form-control-lg"
                    autoComplete="true"
                    placeholder=""
                    value={Password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrorMsg("");
                    }}
                  />
                  <input
                    type="checkbox"
                    id="showPass"
                    className="form-check-input"
                    onChange={handlePasswordToggle}
                  />{" "}
                  إظهار كلمة المرور
                  <span className="text-danger" id="EmailErrorMSG" />
                </div>
                <div className="d-flex justify-content-start align-items-start">
                  <p className="text-danger" id="EmailError">
                    {ErrorMsg}
                  </p>
                </div>
                <div className="text-end text-lg-end mt-2 pt-2">
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    id="sign-in"
                  >
                    تسجيل دخول
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    ليس لديك حساب؟{" "}
                    <HashLink smooth to="#">
                      <button
                        onClick={() => setSignUp(false)}
                        className="btn link-danger"
                        id="createAcc"
                      >
                        إنشاء حساب
                      </button>
                    </HashLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>{" "}
      </FadeIn>
    </>
  );
};

export default Login;
