import React from "react";
import styles from "./LoadingSpinner.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner
        style={{ color: "#35185a" }}
        animation="border"
        role="status"
      ></Spinner>
      <b>
        <p className={styles.loading_text}>Loading...</p>
      </b>
    </div>
  );
};

export default LoadingSpinner;
