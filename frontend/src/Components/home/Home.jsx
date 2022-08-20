import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Hello");
    navigate("/admin");
  };

  return (
    <>
      <Navbar type="HomePage" />
      <div className={styles.maindiv}>
        <h1>Hi welcome to homepage</h1>
        <div className={styles.btnDiv}>
          <button onClick={handleClick}>Admin Panel</button>
        </div>
      </div>
    </>
  );
};
