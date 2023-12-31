import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useRedirectIfLoggedIn } from "../../../hooks/useRedirectIfLoggedIn";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";

function Authentication() {
  const [redirectStatus, isLoggedIn] = useRedirectIfLoggedIn("dashboard");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (redirectStatus === "success") {
      setLoading(false);
    }
  }, [redirectStatus]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <Outlet />;
}

export default Authentication;
