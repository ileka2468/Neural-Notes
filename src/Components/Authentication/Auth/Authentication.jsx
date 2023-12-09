import React, { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import styles from "./Authentication.module.css";

function Authentication() {
  const [authState, setAuthState] = useState("signUp");
  const toggleSignIn = () => {};
  const toggleLignIn = () => {};

  if (authState == "loginIn") {
    return <Login toggleLignIn={toggleLignIn} />;
  } else if (authState == "signUp") {
    return <Signup toggleSignIn={toggleSignIn} />;
  }
}

export default Authentication;
