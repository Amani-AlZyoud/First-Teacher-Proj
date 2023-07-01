import React, { useEffect, useState } from "react";
import PaginationComponent from "../PaginationComponent";
import axios from "axios";
import Swal from "sweetalert2";

const DeletedH = ({ headmastersUpdated, setHeadmastersUpdated }) => {
  const [users, setUsers] = useState([]);

  const [allUsersCount, setAllUsersCount] = useState(1);
  const [UsersPerPage, setUsersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const lastUserNumber = currentPage * UsersPerPage;
  const firstUserIndex = lastUserNumber - UsersPerPage;
  const [limitedUsers, setLimitedUsers] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5500/headmasters/deleted", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.success);
          setIsLoading(false);
        }

        if (response.data.message) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshData, headmastersUpdated]);

  const handleActive = (id) => {
    axios
      .put(
        `http://localhost:5500/headmasters/active/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        } else {
          Swal.fire({
            title: "تم استرجاعه بنجاح",
            icon: "success",
            showConfirmButton: false,
          });
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.user_id !== id)
          );
          setHeadmastersUpdated(!headmastersUpdated)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isLoading && users.length > 0) {
      setAllUsersCount(users.length);
      setLimitedUsers(users.slice(firstUserIndex, lastUserNumber));
    }
    if(users.length === 0) {
        setLimitedUsers([])
    }
  }, [isLoading, firstUserIndex, users, lastUserNumber, refreshData, headmastersUpdated]);

  return (
    <>
      <div className="table-responsive small  mb-3">
        <table
          className="table table-sm"
          id="dash-box"
          style={{ backgroundColor: "black" }}
        >
          <thead className="text-white">
            <tr>
              <th scope="col">رقم المستخدم</th>
              <th scope="col">اسم المعلم/ة</th>
              <th scope="col">البريد الإلكتروني</th>
              <th scope="col">استرجاع</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {!isLoading && (
              <>
                {limitedUsers.map((user) => {
                  return (
                    <tr key={user.user_id}>
                      <td>{user.user_id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn"
                          id="btn-toggler"
                          onClick={() => {
                            handleActive(user.user_id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square text-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
        {!isLoading && (
          <div className="d-flex justify-content-center mt-2">
            <PaginationComponent
              itemsCount={allUsersCount}
              itemsPerPage={UsersPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              alwaysShown={false}
            />
          </div>
        )}
      </div>

      {limitedUsers.length === 0 && (
        <h5 className="text-center text-white">لا يوجد مدراء محذوفين</h5>
      )}
    </>
  );
};

export default DeletedH;
