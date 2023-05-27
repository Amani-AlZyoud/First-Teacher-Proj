import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("currentUser"))
      setUser(JSON.parse(localStorage.getItem("currentUser")));
      console.log(user);
  }, []);


  return (
    <>
      {" "}
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
