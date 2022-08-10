import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCount from "../../hooks/useCount";

const Navbar = () => {
  const [count, setCount] = useCount();
  const [state, setState] = useState();
  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("order")));
  }, [count]);

  return (
    <div>
      <ul className="d-flex justify-content-between align-items-center w-100 py-4 shadow px-5">
        <Link to="/">
          <li className="list-group fs-2 fw-bold">restaurants</li>
        </Link>
        <Link to="/corzinka">
          <i className="bi bi-cart4 fs-1 text-dark">
            <span className=" fs-6 fw-bold fst-normal rounded-circle bg-primary text-light px-2 position-absolute">
              {state?.length || 0}
            </span>
          </i>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
