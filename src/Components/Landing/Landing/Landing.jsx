import React from "react";
import styles from "./Landing.module.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Landing() {
  console.log(styles);
  return (
    <section className={styles.landing_background}>
      <nav>
        Common landing nav bar here [login, signup, dashboard, contact etc]
      </nav>
      <Outlet />
      <ToastContainer />
    </section>
  );
}

export default Landing;
