import React from "react";
import styles from "./Login.module.css";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // console.log(data)
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;

    axios
      .post("https://loginadmin1.herokuapp.com/api/login", { email, password })
      .then((res) =>
        localStorage.setItem(
          "token",
          JSON.stringify(res.data.accessToken),
          navigate("/")
        )
      )
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Navbar type="login" />

      <div className={styles.login}>
        <div className={styles.upDiv}>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="enter email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
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
          <div className={styles.butnDiv}>
            <input
              type="submit"
              placeholder="Submit"
              className={styles.submit}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
