/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./user-info/Login.jsx";
import Register from "./user-info/Registration.jsx";
import app from "./firebase";
import Profile from "./user-info/Profile.jsx";
import Messages from "./user-info/Messages.jsx";
import Home from "./Home.js";
import "./index.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="messages/:id" element={<Messages />} />
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
