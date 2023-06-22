import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  let isLoggedIn;
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token"))
     { isLoggedIn = true;
      console.log("isLoggedIn", isLoggedIn);
      setAuth(isLoggedIn);
     } else {
      isLoggedIn = false;
      console.log("isLoggedIn", isLoggedIn);
      setAuth(isLoggedIn);
     }
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
