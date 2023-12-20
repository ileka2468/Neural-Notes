import React from "react";
import { Outlet } from "react-router-dom";

function Landing() {
  return (
    <>
      <div>
        Common landing nav bar here [login, signup, dashboard, contact etc]
      </div>
      <Outlet />
    </>
  );
}

export default Landing;
