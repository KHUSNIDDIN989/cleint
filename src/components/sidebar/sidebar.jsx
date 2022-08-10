import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <div className="d-flex flex-column w-100">
          <Link to="/admin/addminrest">
            <button className="btn btn-danger my-3 w-100 shadow-lg">
              Restaurants
            </button>
          </Link>
          <Link to="/admin/addproduct">
            <button className="btn btn-danger my-3 w-100 shadow-lg">
              Products
            </button>
          </Link>
          <Link to={"/admin/orders"}>
            <button className="btn btn-danger my-3 w-100 shadow-lg">
              Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
