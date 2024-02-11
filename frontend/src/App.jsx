import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/Signup.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/login/Login.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";

import "./app.css";

function App() {
  const { authUser, setAuthUser } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/"
            element={
              authUser ? (
                <ChatContextProvider>
                  <Home />
                </ChatContextProvider>
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
