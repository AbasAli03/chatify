import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import "./login.css";

const login = () => {
  const [loading, login] = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(username, password);
    setPassword("");
    setUsername("");
  };
  return (
    <div className="login">
      <div className="login__elements">
        <div className="login__input">
          <h1>Username</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login__input">
          <h1>Password</h1>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/signup" className="link">
          Dont have an account?
        </Link>
        <button className="login__button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default login;
