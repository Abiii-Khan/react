/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./user-info/Login.jsx";
import Register from "./user-info/Registration.jsx";
import app from "./firebase";
import Profile from "./user-info/Profile.jsx";
import Messages from "./user-info/Messages.jsx";
import Home from "./Home.js";
import "./index.css";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const value = localStorage.getItem("Name");
    const loggedInUser = JSON.parse(value);
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  console.log(user)
  // const ProtectedRoute = ({ user, redirectPath = "/Login", children }) => {
  //   if (!user) {
  //     <Navigate to={redirectPath} replace />;
  //   }

  //   return children;
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route
            path="Profile"
            element={
              user ? (
                // <ProtectedRoute user={user}>
                <Profile />
              ) : (
                <Login />
              )
              // </ProtectedRoute>
            }
          />
          <Route
            path="messages/:id"
            element={
              user ? (
                // <ProtectedRoute user={user}>
                <Messages />
              ) : (
                <Login />
              )
              // </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <h1>
                  <strong style={{ color: "red" }}>404 </strong>page not found!
                </h1>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
