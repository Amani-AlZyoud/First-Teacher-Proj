import React, { useContext } from "react";
import Teacher from "./Teacher";
import Headmaster from "./Headmaster";
import Admin from "./Admin";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {

  const { user, setUser} = useContext(UserContext);
  
     if(user.jop !== undefined)
   { 
    
    if (user.jop === "teacher") {
      return <Teacher />;
    } else if (user.jop === "headmaster") {
      return <Headmaster />;
    } else {
      return <Admin />;
    }
}
};

export default Profile;
