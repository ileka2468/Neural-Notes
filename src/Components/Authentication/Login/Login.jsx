import React, { useState } from "react";
import { auth } from "../../../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ToastContainer } from "react-toastify";
import { useToast } from "../../../hooks/useToast";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Auth.module.css";
import { mapFirebaseErrorToMessage } from "../../../utils";
import GoogleButton from "react-google-button";
import "bootstrap/dist/css/bootstrap.min.css";

function Login({ toggleSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const triggerToast = useToast();

  const handleLogin = async (e) => {
    setLoadingState(true);
    console.log(loadingState);
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoadingState(false);
      const user = auth.currentUser; // set a user in the redux store, then redirect to somewhere
    } catch (err) {
      setLoadingState(false);
      triggerToast(mapFirebaseErrorToMessage(err.code), "error");
      console.log(err.code);
    }
  };

  const handleGoogleLogin = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      console.log(token);
    } catch (err) {
      triggerToast(mapFirebaseErrorToMessage(err.code, "error"));
    }
  };

  return (
    <div className={styles.authContainer}>
      <Link to="/home">
        <img
          className={styles.logo}
          src="https://ik.imagekit.io/smec/git/logo.png?updatedAt=1702276876233"
        />
      </Link>

      <div className={styles.containerForm}>
        <div className={styles.formWrapper}>
          <div>
            <h2 className={styles.login_header}>
              Login To
              <b className={styles.login_header_span}> Neural Notes</b>
            </h2>
          </div>

          <form onSubmit={(e) => handleLogin(e)}>
            <div className={styles.form}>
              <div className={`${styles.formGroup} ${styles.emailGroup}`}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <hr className={styles.hr} />

              <div className={`${styles.formGroup}`}>
                <div className={styles.inputEyeContainer}>
                  <div
                    className={styles.eyeContainer}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <box-icon
                        name="show-alt"
                        size="1.2em"
                        color="gray"
                      ></box-icon>
                    ) : (
                      <box-icon
                        name="low-vision"
                        size="1.2em"
                        color="gray"
                      ></box-icon>
                    )}
                  </div>
                  <div className={styles.labelPasswordGroup}>
                    <div>
                      <label htmlFor="password">Password</label>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Link to="/auth/reset-password" className={styles.routerLink}>
              <p className={styles.forgotPassword}>Forgot Password?</p>
            </Link>

            <button disabled={loadingState} className={styles.button}>
              {loadingState && <Spinner animation="border" size="sm" />}
              <span className={styles.spinner}>Login</span>
            </button>
            <p className={styles.authPrompt}>
              Don't have an account?{" "}
              <Link className={styles.routerLink} to={"/auth/register"}>
                <span onClick={toggleSignUp} className={styles.authLink}>
                  Sign Up
                </span>
              </Link>
            </p>
          </form>
          <div className={styles.GoogleButtonForm}>
            <GoogleButton onClick={(e) => handleGoogleLogin(e)} type="dark" />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.authHero}></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
