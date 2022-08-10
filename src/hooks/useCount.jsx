import { useContext } from "react";
import { Context } from "../context/count";

const useCount = () => {
  const [count, setCount] = useContext(Context);

  return [count, setCount];
};

export default useCount;
