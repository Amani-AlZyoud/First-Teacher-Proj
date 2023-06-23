import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import Swal from "sweetalert2";

const EditProfile = ({ toggle, setToggle }) => {
  const { user, forceUpdate } = useContext(UserContext);

  const [email, setEmail] = useState(user?.email ? user.email : "");
  const [username, setUsername] = useState(user?.username ? user.username : "");
  const [schoolName, setSchoolName] = useState(
    user?.school_name ? user.school_name : ""
  );
  const [UserImg, setUserImg] = useState(user.user_img ? user.user_img : "");
  const [error, setError] = useState("");
  const nameRegex = /^([\u0600-\u06FF]+\s){3}[\u0600-\u06FF]+$/;
  const regex = /مدرسة|المدرسة/;
  const schoolRegex = /^[\u0600-\u06FF\s]+$/;

  // GET 64Base of Img to store it
  const getImg = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };
  const onLoad = (fileString) => {
    setUserImg(fileString);
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const handleSave = () => {
    let done = true;

    if (username === "") {
      setError("يرجى إدخال الاسم، حقل إجباري!");
      done = false;
    } else if (!nameRegex.test(username)) {
      setError("يرجى كتابة الاسم الرباعي بالعربية.");
      done = false;
    } else if (!schoolRegex.test(schoolName)) {
      setError("يرجى كتابة اسم المدرسة-حقل إجباري.");
      done = false;
    } else if (regex.test(schoolName)) {
      setError("يرجى كتابة اسم المدرسة دون كلمة 'المدرسة أو مدرسة'.");
      done = false;
    }

    if (done) {
      if (localStorage.getItem("token")) {
        if (localStorage.getItem("id")) {
          const id = localStorage.getItem("id");
          axios
            .post(
              `http://localhost:5500/users/${id}`,
              {
                username: username,
                school_name: schoolName,
                user_img: UserImg ? UserImg : user.user_img,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              if (response?.data?.success) {
                forceUpdate();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "تم التعديل بنجاح",
                  showConfirmButton: false,
                  iconColor: '#FFCD29',
                  timer: 1500,
                });
                setToggle(false);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    }
  };

  return (
    <>
      {toggle && (
        <>
          <Modal
            show={toggle}
            size="lg"
            centered
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Modal.Header className="bg-dark">
              <Modal.Title
                id="contained-modal-title-vcenter"
                className="fw-bold text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-pencil-square ms-1 text-warning"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
                تعديل حسابي
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    البريد الإلكتروني
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      disabled={true}
                      defaultValue={email}
                      id="InputField"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    <span className="text-danger">*</span>
                    الاسم
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setError("");
                      }}
                      id="InputField"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    <span className="text-danger">*</span>
                    المدرسة
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      value={schoolName}
                      onChange={(e) => {
                        setSchoolName(e.target.value);
                        setError("");
                      }}
                      id="InputField"
                    />
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label>صورتي</Form.Label>
                  <Col sm="11">
                    <Form.Control
                      type="file"
                      id="InputField"
                      onChange={(e) => getImg(e)}
                      accept="image/*"
                    />{" "}
                  </Col>
                </Form.Group>
              </Form>
              <span className="text-danger">{error}</span>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <Button variant="danger" onClick={() => setToggle(false)}>
                إغلاق
              </Button>
              <Button variant="warning" onClick={() => handleSave()}>
                حفظ
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditProfile;
