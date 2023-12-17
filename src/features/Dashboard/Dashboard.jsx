import { Button } from "bootstrap";
import React from "react";
import { useAuth, useUser } from "reactfire";
import { useRedirectIfNotLoggedIn } from "../../hooks/useRedirectIfNotLoggedIn";

function Dashboard() {
  const { data: user } = useUser();
  const auth = useAuth();

  useRedirectIfNotLoggedIn("auth/login");

  if (user) {
    return (
      <>
        <div>Dashboard Protected route.</div>
        <button onClick={async () => await auth.signOut()}> Sign Out</button>
      </>
    );
  } else {
  }
}

export default Dashboard;
