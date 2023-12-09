import React, { useState } from "react";
import styles from "../Auth.module.css";
import logo from "../../../assets/logo.png";
import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: email });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.authContainer}>
      <img className={styles.logo} src={logo} />
      <div className={styles.containerForm}>
        <div className={styles.formWrapper}>
          <div>
            <h2 className={styles.login_header}>
              Signup For
              <b className={styles.login_header_span}> Neural Notes</b>
            </h2>
          </div>

          <form onSubmit={(e) => handleLogin(e)}>
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

            <button className={styles.button}>Sign Up</button>
          </form>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.authHero}></div>
      </div>
    </div>
  );
}

export default Signup;
