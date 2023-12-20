import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./firebase.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
      </FirebaseAppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
