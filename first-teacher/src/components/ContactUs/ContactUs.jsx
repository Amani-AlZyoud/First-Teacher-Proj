import React from 'react'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailIcon from '@mui/icons-material/Mail';
import FaxIcon from '@mui/icons-material/Fax';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';


const ContactUs = () => {
  return (
    <>
    <div className="container col-xxl-8 px-4 py-5 bg-light my-5 rounded-2 shadow-sm">
  <div className="row align-items-center text-center justify-content-center g-5 py-1">
    <div className="col-lg-6 text-center">
      <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
        {" "}
        اتصل بنا{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={50}
          height={50}
          style={{ verticalAlign: "sub" }}
          fill="currentColor"
          className="bi bi-telephone-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
          />
        </svg>
      </h1>
      <p className="lead mt-5"></p>
      <div className="col">
        <div className="row row-cols-1 row-cols-sm-2 g-5">
          <div className="col d-flex flex-column gap-2">
          
            <h4 className="fw-semibold mb-0"> <MailIcon /> البريد الإلكتروني</h4>
            <a href = "mailto: FirstTeacher@gmail.com" className="text-body-secondary">FirstTeacher@gmail.com</a>
          </div>
          <div className="col d-flex flex-column gap-2">
            <h4 className="fw-semibold mb-0"> <PhoneInTalkIcon /> رقم الهاتف</h4>
            <p className="text-body-secondary ">0798034207 962+</p>
          </div>
          <div className="col d-flex flex-column gap-2">
            <h4 className="fw-semibold mb-0"> <FaxIcon /> فاكس</h4>
            <p className="text-body-secondary">1234 5236 962+</p>
          </div>
          <div className="col d-flex flex-column gap-2">
            <h4 className="fw-semibold mb-0"> <MarkunreadMailboxIcon /> صندوق البريد</h4>
            <p className="text-body-secondary"> 13125 الهاشمية/الزرقاء</p>
          </div>
        </div>
      </div>
    </div>
    <p />
  </div>
</div>

    </>
  )
}

export default ContactUs