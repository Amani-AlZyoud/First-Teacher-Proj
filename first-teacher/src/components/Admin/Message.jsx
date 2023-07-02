import axios from "axios";
import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import PaginationComponent from "../PaginationComponent";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [allMessagesCount, setAllMessagesCount] = useState(1);
  const [MessagesPerPage, setMessagesPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({});
  const [letter, setLetter] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const lastMessageNumber = currentPage * MessagesPerPage;
  const firstMessageIndex = lastMessageNumber - MessagesPerPage;
  const [limitedMessages, setLimitedMessages] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5500/contact/messages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setMessages(response.data.success);
          setIsLoading(false);
        }

        if (response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshData, isLoading]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      setAllMessagesCount(messages.length);
      setLimitedMessages(messages.slice(firstMessageIndex, lastMessageNumber));
    }
    if (messages.length === 0) {
      setLimitedMessages([]);
    }
  }, [isLoading, firstMessageIndex, messages, lastMessageNumber, refreshData]);

  const handleReply = async (message, letter) => {
    const name = message.name;
    const email = message.email;

    emailjs
      .send(
        "service_6tz00ab",
        "template_2eax2ic",
        {
          from_name: "المعلم الأول",
          to_name: name,
          message: letter,
          email_to: email,
        },
        "5d6YZ8dOcxZTfXQEW"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          axios
            .put(`http://localhost:5500/contact/${message.message_id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((response) => {
              if (response.data.success) {
                setRefreshData(!refreshData);
                setIsLoading(!isLoading);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "تم الإرسال بنجاح",
                  showConfirmButton: false,
                  iconColor: "#FFCD29",
                  timer: 1500,
                });
                setLetter("")
              }

              if (response.data.message) {
                console.log(response.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  return (
    <>
      {/* {!isLoading && ( */}
      <>
        <div className="row g-4 py-5 row-cols-4 row-cols-lg-3 justify-content-start">
          {limitedMessages.map((m) => {
            return (
              <Toast key={m.message_id}>
                <Toast.Header closeButton={false}>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">{m.name}</strong>
                </Toast.Header>
                <Toast.Body>
                  <h6 className="">{m.message}</h6>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-warning text-white"
                      onClick={() => {
                        handleShow();
                        setMessage(m);
                      }}
                    >
                      رد
                    </button>
                  </div>
                </Toast.Body>
              </Toast>
            );
          })}
        </div>
      </>
      {/* )} */}

      {!isLoading && (
        <div className="d-flex justify-content-center mt-2">
          <PaginationComponent
            itemsCount={allMessagesCount}
            itemsPerPage={MessagesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            alwaysShown={false}
          />
        </div>
      )}

      {limitedMessages.length === 0 && (
        <h5 className="text-center text-white">لا يوجد رسائل</h5>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={false}></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>الرسالة</Form.Label>
            <Form.Control as="textarea" value={letter} onChange={(e) => setLetter(e.target.value)} rows={3} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            إلغاء
          </Button>
          <Button
            variant="warning"
            className="text-white"
            onClick={() => {handleReply(message, letter)
            handleClose()}}
          >
            إرسال
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Message;
