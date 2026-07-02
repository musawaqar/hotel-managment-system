import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../../lib/api";

export default function Login() {
  const [message, setMessage] = useState("");
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await api.post(
        `/auth/login`,
        {loginCreds},
      );

      if (!response.data.success) {
        if (!response.data.user) {
          setMessage("User Does Not Exist!");
        } else {
          setMessage("Invalid credentials!")
        }
      } else {
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      <div className="login__overlay"></div>

      <div className="login__orb login__orb--1"></div>
      <div className="login__orb login__orb--2"></div>

      <div className="login__card">
        <span className="login__eyebrow">
          HOTEL TRANSYLVANIA
        </span>

        <h1 className="login__title">
          Welcome
          <span>Back</span>
        </h1>

        <p className="login__subtitle">
          Continue your luxury experience and manage your reservations.
        </p>

        <div className="login__group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
          />
        </div>

        <div className="login__group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        <button onClick={handleLogin} className="login__btn">
          Login →
        </button>

        <Link to="/auth/signup" style={{textDecoration:"none"}}>
        <p className="login__footer">
          Don't have an account?
          <span> Sign Up</span>
        </p>
        </Link>
      </div>
    </section>
  );
}