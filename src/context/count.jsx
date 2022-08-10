import { createContext, useState } from "react";

const Context = createContext();

const UseContex = ({ children }) => {
  const [counr, setCount] = useState([]);
  return (
    <Context.Provider value={[counr, setCount]}>{children}</Context.Provider>
  );
};

export { Context, UseContex };
