import axios from "axios";
import React, { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import PaginationComponent from "../PaginationComponent";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [allMessagesCount, setAllMessagesCount] = useState(1);
  const [MessagesPerPage, setMessagesPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [refreshData]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      setAllMessagesCount(messages.length);
      setLimitedMessages(messages.slice(firstMessageIndex, lastMessageNumber));
    }
    // if (messages.length === 0) {
    //   setLimitedMessages([]);
    // }
  }, [isLoading, firstMessageIndex, messages, lastMessageNumber, refreshData]);

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
                    <button className="btn btn-warning text-white">رد</button>
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
    </>
  );
};

export default Message;
