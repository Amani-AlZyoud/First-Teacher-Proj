import React, { useContext } from "react";
import Teacher from "./Teacher";
import Headmaster from "./Headmaster";
import Admin from "./Admin";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {

  const { user } = useContext(UserContext);
  console.log(user)
     if(user?.role_id)
   { 
    if (user?.role_id === "2") {
      console.log("Im teacher role")
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
