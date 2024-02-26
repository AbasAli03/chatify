import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const valid = handleInputs(username, password);

    if (!valid) {
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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

  return [loading, login];
};

export default useLogin;

const handleInputs = (username, password) => {
  if (!username || !password) {
    toast.error("invalid credentials");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be atleast 6 characters");
    return false;
  }

  return true;
};
