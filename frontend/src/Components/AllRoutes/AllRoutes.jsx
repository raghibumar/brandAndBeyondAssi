import React from "react";
import { Route, Routes } from "react-router";
import Admin from "../Admin/Admin";
import { Home } from "../home/Home";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import Register from "../Register/Register";
import { PrivateRoute } from "./PrivateRoute";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};
