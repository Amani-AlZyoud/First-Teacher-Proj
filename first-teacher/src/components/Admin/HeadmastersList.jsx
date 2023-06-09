import React, { useEffect, useState } from "react";
import PaginationComponent from "../PaginationComponent";
import axios from "axios";
import Swal from "sweetalert2";

const HeadmastersList = ({ headmastersUpdated, setHeadmastersUpdated }) => {
  const [users, setUsers] = useState([]);

  const [allUsersCount, setAllUsersCount] = useState(1);
  const [UsersPerPage, setUsersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const lastUserNumber = currentPage * UsersPerPage;
  const firstUserIndex = lastUserNumber - UsersPerPage;
  const [limitedUsers, setLimitedUsers] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5500/headmasters", {
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

  const handleDelete = (id) => {
    axios
      .put(
        `http://localhost:5500/headmasters/${id}`,
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
            title: "تم الحذف بنجاح",
            icon: "success",
            showConfirmButton: false,
          });
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.user_id !== id)
          );
          setHeadmastersUpdated(!headmastersUpdated);
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
    if (users.length === 0) {
      setLimitedUsers([]);
    }
  }, [
    isLoading,
    firstUserIndex,
    users,
    lastUserNumber,
    refreshData,
    headmastersUpdated,
  ]);

  const handleAccount = (type, id) => {
    Swal.fire({
      title: "هل انت متأكد؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCD29",
      cancelButtonColor: "red",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:5500/users/account/${id}`,
            { type: type },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.success) {
              Swal.fire({
                title: "تم التعديل بنجاح",
                icon: "success",
                showConfirmButton: false,
              });
              setHeadmastersUpdated(!headmastersUpdated);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <div className="table-responsive smal mb-3">
        <div class="form-outline mb-4">
          <input
            type="search"
            className="form-control"
            placeholder="ابحث"
            id="searchBAR"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table
          className="table table-sm"
          id="dash-box"
          style={{ backgroundColor: "black" }}
        >
          <thead className="text-white">
            <tr>
              <th scope="col">رقم المستخدم</th>
              <th scope="col">اسم المدير/ة</th>
              <th scope="col">البريد الإلكتروني</th>
              <th scope="col">حالة الإشتراك</th>
              <th scope="col">تعديل الإشتراك</th>
              <th scope="col">حذف</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {!isLoading && (
              <>
                {search !== ""
                  ? users
                      .filter((user) => {
                        return user.username
                          .toLowerCase()
                          .includes(search.toLowerCase());
                      })
                      .map((user) => {
                        return (
                          <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              {user.account == "YES" ? "فعّال" : "غير فعال"}
                            </td>
                            <td>
                              {user.account == "NO" ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    handleAccount("YES", user.user_id);
                                  }}
                                >
                                  تفعيل
                                </button>
                              ) : (
                                <button
                                  className="btn btn-warning"
                                  onClick={() => {
                                    handleAccount("NO", user.user_id);
                                  }}
                                >
                                  إلغاء
                                </button>
                              )}
                            </td>
                            <td>
                              <button
                                className="btn"
                                id="btn-toggler"
                                onClick={() => {
                                  handleDelete(user.user_id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-trash-fill text-white"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  : limitedUsers
                      .filter((user) => {
                        return user.username
                          .toLowerCase()
                          .includes(search.toLowerCase());
                      })
                      .map((user) => {
                        return (
                          <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              {user.account == "YES" ? "فعّال" : "غير فعال"}
                            </td>
                            <td>
                              {user.account == "NO" ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    handleAccount("YES", user.user_id);
                                  }}
                                >
                                  تفعيل
                                </button>
                              ) : (
                                <button
                                  className="btn btn-warning"
                                  onClick={() => {
                                    handleAccount("NO", user.user_id);
                                  }}
                                >
                                  إلغاء
                                </button>
                              )}
                            </td>
                            <td>
                              <button
                                className="btn"
                                id="btn-toggler"
                                onClick={() => {
                                  handleDelete(user.user_id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-trash-fill text-white"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
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
        <h5 className="text-center text-white">لا يوجد مدراء</h5>
      )}
    </>
  );
};

export default HeadmastersList;
