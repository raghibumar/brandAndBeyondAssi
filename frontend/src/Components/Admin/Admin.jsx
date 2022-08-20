import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const tokn = JSON.parse(localStorage.getItem("token"));
  console.log(tokn);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          token: "bearer " + tokn,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) =>alert("You are not an Admin"), navigate("/"));
  }, []);
  return (
    <>
      <Navbar type="Admin" />
      <div className={styles.mainDiv}>
        <h2>Users</h2>
        {data.map((i) => (
          <div className={styles.inDiv}>
            <h3>Name: {i.name}</h3>
            <p>Mobile: {i.mobile}</p>
            <p>Email:{i.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Admin;
