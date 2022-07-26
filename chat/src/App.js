import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./user-info/Login";
import Register from "./user-info/Registration";
import app from "./firebase";
import Profile from "./user-info/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Profile" element={<Profile />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There is nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
