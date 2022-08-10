import React from "react";
import Foods from "../components/foods/foods";
import Navbar from "../components/navbar/navbar";
const Food = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <Foods />
    </div>
  );
};

export default Food;
