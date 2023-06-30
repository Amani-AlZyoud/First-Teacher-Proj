import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { user, forceUpdate } = useContext(UserContext);

  const [fname, setFname] = useState("");
  const [fnameE, setFnameE] = useState("");
  const [lname, setLname] = useState("");
  const [lnameE, setLnameE] = useState("");
  const [subscribtion, setSubscribtion] = useState("");
  const [subscribtionE, setSubscribtionE] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNameE, setCardNameE] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberE, setCardNumberE] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardCVVE, setCardCVVE] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardExpiryE, setCardExpiryE] = useState("");
  const [payment, setPayment] = useState({});
  const navigate = useNavigate("/");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardNumberPattern = /^(\d{4}-){3}\d{4}$|^(\d{4} ){3}\d{4}$|^\d{16}$/;
    const cvvPattern = /^[0-9]{3}$/;

    let done = true;
    if (fname === "") {
      setFnameE("يرجى إدخال الاسم - حقل إجباري");
      done = false;
    }
    if (lname === "") {
      setLnameE("يرجى إدخال اسم العائلة - حقل إجباري");
      done = false;
    }
    if (subscribtion === "") {
      setSubscribtionE("يرجى إدخال نوع الإشتراك - حقل إجباري");
      done = false;
    }
    if (cardName === "") {
      setCardNameE("يرجى إدخال الاسم - حقل إجباري");
      done = false;
    }

    if (!cardNumberPattern.test(cardNumber)) {
      setCardNumberE("رقم البطاقة غير صحيح");
      done = false;
    }

    if (!cvvPattern.test(cardCVV)) {
      setCardCVVE("الرمز الثلاثي غير صحيح");
      done = false;
    }

    if (isExpiryDateExpired(cardExpiry)) {
      setCardExpiryE("البطاقة منتهية الصلاحية");
      done = false;
    }

    if (done) {
      const id = user.user_id;
      axios
        .post(
          `http://localhost:5500/users/payment/${id}`,
          {
            fname: fname,
            lname: lname,
            subscribtion: subscribtion,
            cardname: cardName,
            cardnumber: cardNumber,
            cardcvv: cardExpiry,
            cardexpiry: cardCVV,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            forceUpdate();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "تم الدفع بنجاح",
              showConfirmButton: false,
              iconColor: "#FFCD29",
              timer: 1500,
            });
            navigate("/");
            done = true;
          } else {
            done = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function isExpiryDateExpired(expiryDate) {
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const matches = expiryDate.match(expiryDatePattern);

    if (matches) {
      const month = parseInt(matches[1]);
      const year = parseInt(matches[2]);
      console.log(currentYear);
      console.log(year);

      if (year < currentYear) {
        return true;
      } else if (year === currentYear && month <= currentMonth) {
        return true;
      }
    }

    return false;
  }

  return (
    <>
      <div
        className="container shadow-sm py-5 px-5 rounded-2 my-5"
        style={{ backgroundColor: "white" }}
      >
        <main>
          <div className="py-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={60}
              height={60}
              style={{ verticalAlign: "middle", color: "#FFCD29" }}
              fill="currentColor"
              className="bi bi-wallet2"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
            </svg>
            <h1 className="fw-bold mt-2">الدفع</h1>
          </div>
          <div className="row g-3">
            <div className="col-md-12 col-lg-12">
              <h4 className="mb-3"> الفاتورة</h4>
              <form className="needs-validation" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      defaultValue={fname}
                      onChange={(e) => {
                        setFname(e.target.value);
                        setFnameE("");
                      }}
                      required=""
                    />
                    <small className="text-danger">{fnameE}</small>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      اسم العائلة
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      value={lname}
                      onChange={(e) => {
                        setLname(e.target.value);
                        setLnameE("");
                      }}
                      required=""
                    />
                    <small className="text-danger">{lnameE}</small>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="subscription" className="form-label">
                      نوع الإشتراك
                    </label>
                    <select
                      className="form-select"
                      id="subscription"
                      onChange={(e) => {
                        setSubscribtion(e.target.value);
                        setSubscribtionE("");
                      }}
                    >
                      <option value="">اختر</option>
                      <option value="semester">لفصل واحد</option>
                      <option value="year">لسنة</option>
                    </select>
                  </div>
                  <small className="text-danger">{subscribtionE}</small>
                </div>

                <div className="row gy-3 mt-3">
                  <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                      الاسم على البطاقة
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder=""
                      required=""
                      defaultValue={cardName}
                      onChange={(e) => {
                        setCardName(e.target.value);
                        setCardNameE("");
                      }}
                    />
                    <small className="text-danger">
                      {cardNameE !== ""
                        ? cardNameE
                        : "الاسم الكامل كما هو معروض على البطاقة"}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                      رقم البطاقة
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-number"
                      placeholder=""
                      required=""
                      defaultValue={cardNumber}
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                        setCardNumberE("");
                      }}
                    />
                    <small className="text-danger">{cardNumberE}</small>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                      تاريخ انتهاء الصلاحية
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      placeholder=""
                      defaultValue={cardExpiry}
                      onChange={(e) => {
                        setCardExpiry(e.target.value);
                        setCardExpiryE("");
                      }}
                      required=""
                    />
                    
                    {cardExpiryE !== ""
                        ? <small className="text-danger">{cardExpiryE}</small>
                        : <small className="text-secondary">MM/YYYY</small>}
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                      الرمز الثلاثي (CVV)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-cvv"
                      placeholder=""
                      required=""
                      defaultValue={cardCVV}
                      onChange={(e) => {
                        setCardCVV(e.target.value);
                        setCardCVVE("");
                      }}
                    />
                    <small className="text-danger">{cardCVVE}</small>
                  </div>
                </div>
                <hr className="my-4" />
                <button className="w-100 btn btn-dark btn-lg" type="submit">
                  الاستمرار بالدفع
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Payment;
