import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import api from "../../../lib/api";

export default function Login({ modal = false }) {
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await api.post(`/auth/login`, { loginCreds });

      if (!response.data.success) {
        if (!response.data.user) {
          toast.error("User does not exist!");
        } else {
          toast.error("Invalid username or password!");
        }
        return;
      } else {
        Cookies.set("userEmail", response.data.email);
        toast.success("Login Successful!");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");

    }
  };

  return (
    <section className={modal ? "login login__modal" : "login"}>
      <div className="login__overlay"></div>

      <div className="login__orb login__orb--1"></div>
      <div className="login__orb login__orb--2"></div>

      <div className="login__card">
        <span className="login__eyebrow">Luxe Stay</span>

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

        <Link to="/auth/signup" style={{ textDecoration: "none" }}>
          <p className="login__footer">
            Don't have an account?
            <span> Sign Up</span>
          </p>
        </Link>
      </div>
    </section>
  );
}