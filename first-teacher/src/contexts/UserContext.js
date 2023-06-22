import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const id = localStorage.getItem("id") ? localStorage.getItem("id") : 0;

  const userRefresh = () => {
    if(localStorage.getItem("token")) {     
      if(id !== 0) {    
    axios
        .get(`http://localhost:5500/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
         
        })
        .then((response) => {
          if (response?.data?.success) {
            console.log(response.data.success)
            setUser(response.data.success);
            console.log(user)
          }
        })
        .catch((error) => {
          console.error(error.message);
        });}

    }}

    useEffect(() => {
      userRefresh()
    },[])

  return (
    <>
      {" "}
      <UserContext.Provider value={{ user, setUser, userRefresh }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
