import React, { useState } from "react";
import styles from "../Auth.module.css";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { useToast } from "../../../hooks/useToast";
import "react-toastify/dist/ReactToastify.css";
import { mapFirebaseErrorToMessage } from "../../../utils";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const triggerToast = useToast();
  const passwordsMatch = password == confirmPassword;
  console.log(passwordsMatch);

  const handleSignup = async (e) => {
    setLoadingState(true);
    e.preventDefault();
    try {
      if (passwordsMatch) {
        await createUserWithEmailAndPassword(auth, email, password);
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        await updateProfile(user, { displayName: email });
      } else {
        triggerToast("Passwords do not match.", "error");
      }
      setLoadingState(false);
    } catch (err) {
      setLoadingState(false);
      triggerToast(mapFirebaseErrorToMessage(err.code), "error");
      console.log(err.code);
    }
  };

  return (
    <div className={styles.authContainer}>
      <img
        className={styles.logo}
        src="https://ik.imagekit.io/smec/git/logo.png?updatedAt=1702276876233"
      />
      <div className={styles.containerForm}>
        <div className={styles.formWrapper}>
          <div>
            <h2 className={styles.login_header}>
              Sign Up For
              <b className={styles.login_header_span}> Neural Notes</b>
            </h2>
          </div>

          <form onSubmit={(e) => handleSignup(e)}>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                />
              </div>

              <hr className={styles.hr} />

              <div className={`${styles.formGroup}`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required={true}
                />
              </div>

              <hr className={styles.hr} />

              <div className={`${styles.formGroup}`}>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required={true}
                />
              </div>
            </div>

            <button className={styles.button}>
              {loadingState && <Spinner animation="border" size="sm" />}
              Sign Up
            </button>
            <p className={styles.authPrompt}>
              Already have an account?{" "}
              <Link to="/auth/login" className={styles.routerLink}>
                <span className={styles.authLink}>Login</span>
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>

      <div className={styles.container}>
        <div className={styles.authHero}></div>
      </div>
    </div>
  );
}

export default Signup;
