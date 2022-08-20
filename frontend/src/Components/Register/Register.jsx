import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import styles from "./Register.module.css";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mob: "",
    password: "",
    isAdmin: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, mob, password, isAdmin } = data;
    let mobile = Number(mob);

    axios
      .post("http://localhost:8080/api/register", {
        name,
        email,
        mobile,
        password,
        isAdmin,
      })
      .then((res) => navigate("/login"))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Navbar type="Register" />
      <div className={styles.register}>
        <div className={styles.upDiv}>
            <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <br />
          <br />
          <input
            type="email"
            placeholder="enter email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <br />
          <br />
          <input
            type="number"
            placeholder="Enter mobile number"
            onChange={(e) => setData({ ...data, mob: e.target.value })}
          />
          <br />
          <br />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <br />
          <br />
          <div className={styles.user}>
            {" "}
            <span>User</span>
            <select
              onChange={(e) => setData({ ...data, isAdmin: e.target.value })}
            >
              <option value="">Select</option>
              <option value="true">Admin</option>
              <option value="false">User</option>
            </select>
          </div>

          <br />
          <br />
          <div className={styles.butnDiv}>
            <input type="submit" placeholder="Submit" className={styles.submit} />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
