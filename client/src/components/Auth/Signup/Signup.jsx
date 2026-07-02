import { useState } from "react";
import "./Signup.css";
import api from "../../../lib/api";

export default function Signup() {
  const [message, setMessage] = useState("");

  const [signupCreds, setSignupCreds] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      const response = await api.post(
        `/auth/signup`,
        {signupCreds}
      );

      if (!response.data.success) {
        if (response.data.already) {
          setMessage("Username or Email already exists!");
        } else {
          setMessage("Something went wrong!");
        }
      } else {
        setMessage("Account created successfully!");
      }
    } catch (error) {
      console.error("Error While Signup:", error);
      setMessage("Server Error!");
    }
  };

  return (
    <section className="signup">
      <div className="signup__overlay"></div>

      <div className="signup__orb signup__orb--1"></div>
      <div className="signup__orb signup__orb--2"></div>

      <div className="signup__card">
        <span className="signup__eyebrow">
          HOTEL TRANSYLVANIA
        </span>

        <h1 className="signup__title">
          Join
          <span>Us</span>
        </h1>

        <p className="signup__subtitle">
          Begin your luxury journey and experience timeless hospitality.
        </p>

        <div className="signup__group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </div>

        <div className="signup__group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            onChange={handleChange}
          />
        </div>

        <div className="signup__group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>

        <div className="signup__group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            onChange={handleChange}
          />
        </div>

        <button className="signup__btn" onClick={handleSignup}>
          Create Account →
        </button>

        {message && (
          <p className="signup__message">
            {message}
          </p>
        )}

        <p className="signup__footer">
          Already have an account?
          <span> Login</span>
        </p>
      </div>
    </section>
  );
}