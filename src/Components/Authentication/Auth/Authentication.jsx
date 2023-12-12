import React, { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Routes, Route, Outlet } from "react-router-dom";
import PasswordReset from "../PasswordReset/PasswordReset";

function Authentication() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="reset-password" element={<PasswordReset />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default Authentication;
