import React, { useContext } from "react";
import Teacher from "./Teacher";
import Headmaster from "./Headmaster";
import Admin from "./Admin";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {

  const { user } = useContext(UserContext);

  if(user?.role_id)
   { 
    if (user?.role_id === "2") {
      return <Teacher />
    }
     else if (user?.role_id === "3") {
      return <Headmaster />
    } 
    else if(user?.role_id === "1") {
      return <Admin />
    }
}
};

export default Profile;
