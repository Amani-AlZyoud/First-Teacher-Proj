import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
const Form = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, Email, message } = e.target.elements;

    let conFom = {
      name: name.value,
      Email: Email.value,
      message: message.value,
    };

    axios
      .post("http://localhost:5500/contact/message", {
        name: name.value,
        email: Email.value,
        message: message.value,
      })
      .then((response) => {
        if (response.data.success) {
          name.value = "";
          Email.value = "";
          message.value = "";

          Swal.fire({
            title: "<strong>تم إرسال الرسالة بنجاح</strong>",
            text: "شكراً لك",
            icon: "success",
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="container my-5 shadow-lg p-5 contact-form bg-white rounded-4"
        id="dash-box"
      >
        <p className="w-responsive fw-bold fs-3 t">هل لديك أي استفسارات؟</p>
        <p className="w-responsive fw-bold mb-5 fs-6 text-warning">
          لا تتردد في طرح اي سؤال او استفسار، سيتم الرد عليك بأقرب وقت:
        </p>
        <form id="contact-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label
              for="name"
              className="form-label fw-bold text-black"
              htmlFor="name"
            >
              الأسم
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label
              for="Email"
              className="form-label fw-bold text-black mt-3"
              htmlFor="Email"
            >
              البريد الإلكتروني
            </label>
            <input
              type="Email"
              className="form-control"
              id="Email"
              name="Email"
              required
            />
          </div>
          <div className="form-group">
            <label
              for="message"
              className="form-label fw-bold text-black mt-3"
              htmlFor="message"
            >
              الرسالة
            </label>
            <textarea
              className="form-control p-3"
              id="message"
              name="message"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-dark btn-lg mt-3 fw-bold">
            إرسال
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
