import React, { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import styles from "./Authentication.module.css";
import { Routes, Route, Outlet } from "react-router-dom";

function Authentication() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default Authentication;
