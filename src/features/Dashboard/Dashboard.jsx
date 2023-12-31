import { Button } from "bootstrap";
import React from "react";
import { useAuth, useUser } from "reactfire";
import { useRedirectIfNotLoggedIn } from "../../hooks/useRedirectIfNotLoggedIn";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

function Dashboard() {
  const { status, data: user } = useUser();
  const auth = useAuth();

  useRedirectIfNotLoggedIn("auth/login");

  return (
    <>
      {status === "success" && user ? (
        <>
          <div>Dashboard Protected route for {user?.displayName}</div>
          <button onClick={async () => await auth.signOut()}> Sign Out</button>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default Dashboard;
