import React, { Children } from "react";
import { Navigate, useNavigate } from "react-router";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  if (token !== null) {
    return children;
  }
  return <Navigate to="/register" />;
};
