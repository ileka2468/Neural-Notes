import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { Routes, Route, Outlet } from "react-router-dom";
import PasswordReset from "../PasswordReset/PasswordReset";
import ErrorPage from "../../../Components/Error/ErrorPage";
import { useRedirectIfLoggedIn } from "../../../hooks/useRedirectIfLoggedIn";

function Authentication() {
  const [status, isLoggedIn] = useRedirectIfLoggedIn("dashboard");
  console.log(status, isLoggedIn);

  if (status === "loading") {
    return <div></div>;
  } else {
    return (
      <>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="reset-password" element={<PasswordReset />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Outlet />
      </>
    );
  }
}

export default Authentication;
