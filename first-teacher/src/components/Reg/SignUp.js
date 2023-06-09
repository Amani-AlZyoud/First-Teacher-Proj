import React, { useContext, useState } from 'react'
import "../../Styles/style_login.css"
import { HashLink } from 'react-router-hash-link'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';
import { UserContext } from '../../contexts/UserContext'


const SignUp = ({setSignUp}) => {
    const navigate = useNavigate("/");
    const { setAuth } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8);


    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [school, setSchool] = useState("");
    const [UserName, setUserName] = useState("");
    const [Gender, setGender] = useState("");
    const [jop, setJop] = useState("");
    const [UserImg, setUserImg] = useState("");
    const [UserId, setUserId] = useState(small_id);

    const [ErrorMsgE, setErrorMsgE] = useState("");
    const [ErrorMsgN, setErrorMsgN] = useState("");
    const [ErrorMsgP, setErrorMsgP] = useState("");
    const [ErrorMsgS, setErrorMsgS] = useState("");
    const [ErrorMsgG, setErrorMsgG] = useState("");
    const [ErrorMsgJ, setErrorMsgJ] = useState("");
    const [ErrorMsgI, setErrorMsgI] = useState("");
    let done = true;




    const handleSubmit = (event) => {
      event.preventDefault();
      const users = JSON.parse(localStorage.getItem("users")) || [''];
      const user = users.find((u) => u.Email === Email);
      const nameRegex = /^([\u0600-\u06FF]+\s){3}[\u0600-\u06FF]+$/;
      const EmailRegex = /^\S+@\S+\.\S+$/;
      const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      const regex = /مدرسة|المدرسة/;
      const schoolRegex = /^[\u0600-\u06FF\s]+$/;
      
      if (user) {
        setErrorMsgE("البريد الإلكتروني مستخدم!");
        done  = false;
      }
      
      if(!nameRegex.test(UserName)){
        setErrorMsgN("يرجى كتابة الاسم الرباعي بالعربية.");
        done  = false;       
      }

       if (Email === "") {
        setErrorMsgE("يرجى إدخال البريد الإلكتروني-حقل إجباري.");
        done  = false;
      }

      if (!EmailRegex.test(Email)) {
        setErrorMsgE("البريد الإلكتروني غير صحيح.");  
        done  = false;
      }

      if (!PasswordRegex.test(Password)) {
        setErrorMsgP("يجب أن تحتوي كلمة المرور على الاقل 8 حروف: حرف كبير، حرف صغير، رقم ورمز خاص.");        
        done  = false;
      }

      if (!schoolRegex.test(school)) {
        setErrorMsgS("يرجى كتابة اسم المدرسة-حقل إجباري.");
        done  = false;
      }

     if(regex.test(school)){
        setErrorMsgS("يرجى كتابة اسم المدرسة دون كلمة 'المدرسة أو مدرسة'.");
        done  = false;
      }

      if(Gender === ""){
        setErrorMsgG("يرجى اختيار الجنس.");
        done  = false;
      }

      if(jop == ""){
        setErrorMsgJ("يرجى اختيار المسمى الوظيفي.");
        done  = false;
      }

      if(UserImg === ""){
        setErrorMsgI("يرجى إرفاق صورة.");
        done  = false;
      }
      
 

   if(done){ 
     
    const userData = { UserId, Email, Password, UserName, school, jop, Gender, UserImg };
    const currentUser = userData;
    console.log(currentUser);
    setUser(currentUser);
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    console.log(userData);
    
    setEmail("");
    setSchool("");
    setUserImg("");
    setUserName("");
    setGender("");
    setJop("");
    setPassword("");



    setAuth(true);
   {  if(Gender == 'Female') 
    Swal.fire({
      title: "<strong style='color:Black'> أهلا بك </strong>",
      confirmButtonText: "شكراً"
    });}
   {  if(Gender == 'Male') 
    Swal.fire({
      title: "<strong style='color:Black'> أهلا بك </strong>",
      confirmButtonText: "شكراً"
    });}
    navigate("/");

    
   }
     
  };
      
  


  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUserImg(URL.createObjectURL(event.target.files[0]));
    }
    setErrorMsgI("")
   };

  return (
    <>
     <div className="container col-xl-10 col-xxl-8 py-5" >
      <div className="row">
        <div className="col-md-10 mx-auto col-lg-9">
        <FadeIn>
          <form className="p-4 p-md-5  rounded-3 shadow-lg bg-white" onSubmit={handleSubmit} id="reg">
            <div className="divider d-flex w-auto my-4">
              <p className="fw-bold display-5 mb-0" id="sign-up-herotext">
                تسجيل حساب
              </p>
            </div>
            {/* USERNAME input */}
            <div className="form-outline mb-4">
              <label className="form-label fw-bold" htmlFor="username">
                الاسم الرباعي
              </label>
              <input
              
                type="text"
                id="username"
                className="form-control form-control-lg"
                placeholder=""
                value={UserName}
                onChange={(event) =>{ setUserName(event.target.value)
                setErrorMsgN("") }}
              />
              <span className="text-danger" id="usernameError">{ErrorMsgN}</span>
            </div>
            {/* Email input */}
            <div className="form-outline mb-4">
              <label className="form-label fw-bold" htmlFor="email">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder=""
                value={Email}
                onChange={(event) => {setEmail(event.target.value)
                setErrorMsgE("")}}
              />
              <span className="text-danger" id="EmailError">{ErrorMsgE}</span>
            </div>
            {/* Password input */}
            <div className="form-outline mb-3">
              <label className="form-label fw-bold" htmlFor="password">
                كلمة المرور
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control form-control-lg"
                placeholder=""
                value={Password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setErrorMsgP("")}}
                
              />
              <input type="checkbox" id='showPass' className="form-check-input" onChange={handlePasswordToggle} /> إظهار كلمة المرور 
              <p className="text-danger" id="PassError">{ErrorMsgP}</p>
            </div>
            {/* school name input */}
            <div className="form-outline mb-3">
              <label className="form-label fw-bold" htmlFor="school">
                اسم المدرسة <span className='text-secondary'>(دون كتابة كلمة "مدرسة")</span>
              </label>
              <input
                type="text"
                id="school"
                className="form-control form-control-lg"
                placeholder=""
                value={school}
                onChange={(event) => {setSchool(event.target.value)
                setErrorMsgS("")}}
              />
              <span className="text-danger" id="schoolError">{ErrorMsgS}</span>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label d-block fw-bold">الجنس</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  id="female"
                  type="radio"
                  name="gender"
                  defaultValue="Female"
                  data-sb-validations=""
                  value="Female"
                  onChange={(event) => {setGender(event.target.value)
                  setErrorMsgG("")}}
                  
                />
                <label className="form-check-label" htmlFor="female">
                  انثى
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  id="male"
                  type="radio"
                  name="gender"
                  defaultValue="Male"
                  value="Male"
                  onChange={(event) => {setGender(event.target.value)
                  setErrorMsgG("")}}
                  data-sb-validations=""
                />
                <label className="form-check-label" htmlFor="male">
                  ذكر
                </label>
              </div>
              <p className="text-danger" id="GenderError">{ErrorMsgG}</p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label d-block fw-bold">المسمى الوظيفي</label>
              <select className="form-select" name="userType" id="userType" onChange={(event) => {setJop(event.target.value) 
              setErrorMsgJ("")}}>
                <option value="none">اختر</option>
                <option value="teacher">معلم/ة</option>
                <option value="headmaster">مدير/ة</option>
              </select>
              <p className="text-danger" id="jopError">{ErrorMsgJ}</p>
            </div>
            <div className="form-outline mb-3">
              <label htmlFor="formFile" className="form-label fw-bold">
                ارفق صورتك
              </label>
              <input className="form-control" type="file" id="formFile" onChange={onImageChange} />
              <p className="text-danger" id="ImgError">{ErrorMsgI}</p>
            </div>
            <div className="text-end text-lg-end mt-4 pt-2">
             <button
                type="submit"
                className="btn btn-dark btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                id="sign-up"
              >
                تسجيل
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                لديك حساب؟{" "}
               <HashLink smooth to='#'><button onClick={() => setSignUp(true)}  className="btn link-danger" id='createAcc'>
                  تسجيل دخول
                </button></HashLink>              
                </p>
            </div>
          </form>
         </FadeIn>
        </div>
      </div>
    </div>
    </>
  )
}

export default SignUp