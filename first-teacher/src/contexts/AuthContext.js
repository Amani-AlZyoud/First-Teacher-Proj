import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  let user;
  let isLoggedIn;
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("currentUser"))
      user = JSON.parse(localStorage.getItem("currentUser"));
      console.log(user);
      isLoggedIn = user ? true : false;
      console.log("isLoggedIn", isLoggedIn);
      setAuth(isLoggedIn);
    }, []);
    
  return (
    <>
      {" "}
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
