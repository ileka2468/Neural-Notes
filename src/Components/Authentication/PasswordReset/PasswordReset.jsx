import { auth } from "../../../firebase";
import authStyles from "../../Authentication/Auth.module.css";
import styles from "./PasswordReset.module.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [loadingState, setLoadingState] = useState(false);
  const handlePasswordReset = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.resetFormContainer}>
      <div className={styles.resetForm}>
        <h2>Forgot your password</h2>
        <p>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form
          onSubmit={(e) => {
            handlePasswordReset(e);
          }}
        >
          <div className={authStyles.form}>
            <div className={`${authStyles.formGroup} ${authStyles.emailGroup}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className={styles.resetInput}
              />
            </div>
          </div>

          <button className={authStyles.button}>
            {loadingState && <Spinner animation="border" size="sm" />}
            <span className={authStyles.spinner}>Request reset link</span>
          </button>
        </form>
        <Link to="/auth/login" className={authStyles.routerLink}>
          <p style={{ textAlign: "center" }} className={authStyles.authLink}>
            Back to login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PasswordReset;
