import { createContext, useEffect, useState } from "react";

const Context = createContext();

const AuthContex = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token")) || null
  );
  useEffect(() => {
    window.localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
};

export { Context, AuthContex };
