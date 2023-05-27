import React, { useContext, useState } from 'react'
import "../../Styles/style_login.css"
import { HashLink } from 'react-router-hash-link'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Swal from "sweetalert2";
import { UserContext } from '../../contexts/UserContext'


const Login = ({setSignUp}) => {
  const navigate = useNavigate("/");
  const {  setAuth } = useContext(AuthContext);
  const {  setUser } = useContext(UserContext);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.Email === Email && u.Password === Password);


    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);

      setAuth(true);
      { if (user.jop === "teacher" && user.Gender === "Female" ) 
      
      Swal.fire({
        title: "<strong style='color:Black'>أهلاً وسهلاً عزيزتي المعلمة</strong>",
        confirmButtonText: "شكراً"
      });
     }
      
      { if (user.jop === "teacher" && user.Gender === "Male" ) 
      
      Swal.fire({
        title: "<strong style='color:Black'>أهلاً وسهلاً بك عزيزي المعلم</strong>",
        confirmButtonText: "شكراً"
      });
    }
      { if (user.jop === "headmaster" && user.Gender === "Female" ) 
      
      Swal.fire({
        title: "<strong style='color:Black'>أهلاً وسهلاً عزيزتي المديرة</strong>",
        confirmButtonText: "شكراً"
      });
    }
      { if (user.jop === "headmaster" && user.Gender === "Male" ) 
      
      Swal.fire({
        title: "<strong style='color:Black'>أهلاً وسهلاً عزيزي المدير</strong>",
        confirmButtonText: "شكراً"
      });
    }

     if(user.jop !== "admin"){ 
      navigate("/");
    }
     else {
      navigate(`/profile/:${user.UserId}`);
     }
      setErrorMsg("");
      setEmail("");
      setPassword("");
    } else {
      setErrorMsg("خطأ في كلمة المرور أو البريد الإلكتروني!");
    }
  };

  return (
    <>
      <FadeIn><div className="container col-xl-10 col-xxl-8 py-5">
        <div className="row">
          <div className="col-md-10 mx-auto col-lg-9">
            <form className="p-4 p-md-5  rounded-3 shadow-lg bg-white" id="reg" onSubmit={handleSubmit} >
              <div className="divider d-flex w-auto">
                <p className="fw-bold display-5" id="sign-in-herotext">
                  تسجيل الدخول
                </p>
              </div>
              {/* Email input */}
              <div className="form-outline my-4">
                <label className="form-label fw-bold" htmlFor="email">
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
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder=""
                  value={Password}
                  onChange={(event) =>{
                    setPassword(event.target.value);
                    setErrorMsg("");
                  }}
                />
                <span className="text-danger" id="EmailErrorMSG" />
              </div>
              <div className="d-flex justify-content-start align-items-start">
                <p className="text-danger" id="EmailError">{ErrorMsg}</p>
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
                  <HashLink smooth to='#'>
                  <button onClick={() => setSignUp(false)}  className="btn link-danger" id='createAcc'>
                    إنشاء حساب
                  </button>
                  </HashLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div> </FadeIn> 
     
    
    </>
  )
}

export default Login