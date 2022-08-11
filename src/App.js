import React from "react";
import { Routes, Route } from "react-router-dom";
import Order from "./pages/order";
import Home from "./pages/home";
import Product from "./pages/product";
import Food from "./pages/Food";

import "./App.css";
import Admin from "./pages/Admin";
import Regstr from "./pages/registr";
import Login from "./pages/login";

const App = () => {
  return (
    <div className="container-fuild">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/corzinka" element={<Order />} />
        <Route path="/food/:id" element={<Food />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/regstr" element={<Regstr />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
