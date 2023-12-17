import React, { Fragment } from "react";
import "../global_styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "../features/Authentication/Auth/Authentication";
import Landing from "./Landing/Landing";
import ErrorPage from "./Error/ErrorPage";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { AuthProvider, DatabaseProvider, useFirebaseApp } from "reactfire";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

function App() {
  const app = useFirebaseApp();
  const database = getDatabase(app);
  const auth = getAuth(app);

  return (
    <>
      <Router>
        <Fragment>
          <Provider store={store}>
            <AuthProvider sdk={auth}>
              <DatabaseProvider sdk={database}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth/*" element={<Authentication />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </DatabaseProvider>
            </AuthProvider>
          </Provider>
        </Fragment>
      </Router>
    </>
  );
}
import Dashboard from "../features/Dashboard/Dashboard";

export default App;
