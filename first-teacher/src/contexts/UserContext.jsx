import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

export const UserContext = createContext();


export function UserProvider({ children }) {

  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const id = localStorage.getItem("id") ? localStorage.getItem("id") : 0;

   useEffect(() => {
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
              setUser(response.data.success);
              setAuth(true);
            }
          })
          .catch((error) => {
            console.error(error.message);
          });}}

    },[reducerValue])

  return (
    <>
      {" "}
      <UserContext.Provider value={{ user, setUser, auth, setAuth, forceUpdate }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
