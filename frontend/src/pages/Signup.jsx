import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import logo from "../Assets/logo.png";

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
    <div className="flex flex-col justify-center items-center h-full w-full p-4 gap-4">
      <div className="">
        <img src={logo} alt="Logo" />
      </div>

      <div className="flex flex-col gap-4 max-w-md w-full">
        <div className="flex flex-col gap-4">
          <h1>Fullname</h1>
          <input
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="John Doe"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1>Username</h1>
          <input
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="abcd1234"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1>Password</h1>
          <input
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="*********"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1>Confirm Password</h1>
          <input
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="*********"
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Link to="/login" className="underline ">
          Already have an account?
        </Link>
        <button
          className="bg-[#1e71f7] p-4 rounded text-white"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
