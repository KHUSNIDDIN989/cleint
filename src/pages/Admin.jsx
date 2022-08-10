import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "../components/admin/addproduct";
import AdminRest from "../components/admin/adminRest";
import AllOrder from "../components/admin/allorders";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import useToken from "../hooks/useToken";

const Admin = () => {
  const [token] = useToken();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col">
          <Routes>
            <Route path="/addminrest" element={<AdminRest />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/orders" element={<AllOrder />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
