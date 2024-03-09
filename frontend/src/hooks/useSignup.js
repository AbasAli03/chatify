import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const signUp = async (fullname, username, password, confirmPassword) => {
    const valid = handleInputs(fullname, username, password, confirmPassword);

    if (!valid) {
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, username, password, confirmPassword }),
      });

      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      }
      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return [loading, signUp];
};

export default useSignup;

const handleInputs = (fullname, username, password, confirmPassword) => {
  if (!fullname || !username || !password || !confirmPassword) {
    toast.error("invalid credentials");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("passwords dont match");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be atleast 6 characters");
    return false;
  }

  return true;
};
