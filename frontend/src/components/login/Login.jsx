import React, { useState } from "react";
import "./login.css";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const credentials = {
      username: username,
      password: password,
    };

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

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
        <button className="login__button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default login;
