import React from "react";
import "../global_styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./Authentication/Auth/Authentication";
import Landing from "./Landing/Landing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="auth/*" element={<Authentication />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
