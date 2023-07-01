import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import EditProfile from "../Profiles/EditProfile";
import t1 from "../../images/placeholder.jpg";

const ProfileInfo = () => {
  const { user } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        className="container mt-5 rounded-3 bg-white border border-warning shadow-lg border-2"
        id="headmasterProf"
      >
        <div className="row mb-3 text-end">
          <div className="col-md-2 themed-grid-col mt-4">
            <img
              src={user?.user_img ? user.user_img : t1}
              id="headmasterImg"
              className="img-thumbnail"
              width={200}
              alt="teacherIMG"
            />
          </div>
          <div className="col-md-8 themed-grid-col mt-4 pe-none">
            <h2>
              {user?.role_id === "3" && user?.gender === "Female"
                ? "المديرة"
                : ""}
              {user?.role_id === "3" && user?.gender === "Male" ? "المدير" : ""}
              <span id="teacherName"> {user?.username}</span>
            </h2>
            <h5 className="mt-4 text-muted">المدرسة</h5>
            <span className="fs-4" id="teacherSchool">
              {user?.school_name}
            </span>
          </div>
          <div className="d-flex themed-grid-col mb-2 justify-content-end">
            <button
              className="btn btn-dark text-white fw-bold"
              id="createPlan"
              onClick={() => setToggle(!toggle)}
            >
              تعديل حسابي
            </button>
          </div>
        </div>
      </div>

      <EditProfile toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default ProfileInfo;
