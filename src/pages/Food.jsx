import React from "react";
import { Navigate } from "react-router-dom";
import Foods from "../components/foods/foods";
import Navbar from "../components/navbar/navbar";
import useToken from "../hooks/useToken";

const Food = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <Foods />
    </div>
  );
};

export default Food;
