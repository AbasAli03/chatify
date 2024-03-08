import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import logo from "../../Assets/logo.png";
import "./signup.css";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, signup] = useSignup();

  const handleSignup = async (e) => {
    await signup(fullname, username, password, confirmPassword);
  };

  return (
    <div className="signup">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="signup__elements">
        <div className="signup__input">
          <h1>Fullname</h1>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="signup__input">
          <h1>Username</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="signup__input">
          <h1>Password</h1>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup__input">
          <h1>Confirm Password</h1>
          <input
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Link to="/login" className="link">
          Dont have an account?
        </Link>
        <button className="signup__button" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
