import React, { Fragment } from "react";
import "../global_styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "../features/Authentication/Auth/Authentication";
import Landing from "./Landing/Landing/Landing.jsx";
import ErrorPage from "./Error/ErrorPage";
import {
  AuthProvider,
  FirestoreProvider,
  useFirebaseApp,
  useInitFirestore,
} from "reactfire";

import { getAuth } from "firebase/auth";
import Login from "../features/Authentication/Login/Login";
import Signup from "../features/Authentication/Signup/Signup";
import PasswordReset from "../features/Authentication/PasswordReset/PasswordReset";
import LandingContent from "./Landing/LandingContent/LandingContent.jsx";

function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  const { status, data: firestoreInstance } = useInitFirestore(
    async (firebaseApp) => {
      const db = initializeFirestore(firebaseApp, {});
      return db;
    }
  );

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Router>
        <Fragment>
          <FirestoreProvider sdk={firestoreInstance}>
            <AuthProvider sdk={auth}>
              <Routes>
                <Route path="/" element={<Landing />}>
                  <Route path="" element={<LandingContent />}></Route>
                  <Route path="pricing" element={<Pricing />}></Route>
                </Route>
                <Route path="auth" element={<Authentication />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Signup />} />
                  <Route path="reset-password" element={<PasswordReset />} />
                </Route>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </AuthProvider>
          </FirestoreProvider>
        </Fragment>
      </Router>
    </>
  );
}
import Dashboard from "../features/Dashboard/Dashboard";
import Pricing from "./Landing/Pricing/Pricing.jsx";
import { initializeFirestore } from "firebase/firestore";

export default App;
