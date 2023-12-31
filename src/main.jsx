import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.jsx";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>
);
