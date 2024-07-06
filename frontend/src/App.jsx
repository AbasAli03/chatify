import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import { ChatContextProvider } from "./context/ChatContext.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
import "./App.css";
import "./index.css";

function App() {
  const { authUser } = useAuthContext();

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
            path="/:chatId?"
            element={
              authUser ? (
                <ChatContextProvider>
                  <Home />
                </ChatContextProvider>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
