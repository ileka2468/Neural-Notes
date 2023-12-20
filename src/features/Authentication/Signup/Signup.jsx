import React, { useState } from "react";
import styles from "../Auth.module.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { useToast } from "../../../hooks/useToast";
import { mapFirebaseErrorToMessage } from "../../../utils";
import InputBorder from "../../../Components/InputBorder/InputBorder";
import TextBox from "../../../Components/TextBox/TextBox";
import { useAuth } from "reactfire";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [loadingState, setLoadingState] = useState(false);
  const triggerToast = useToast();
  const passwordsMatch = password == confirmPassword;
  const auth = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingState(true);

    if (!passwordsMatch) {
      setLoadingState(false);
      return triggerToast("Passwords do not match.", "error");
    }

    if (!fullName) {
      setLoadingState(false);
      return triggerToast("You did not supply your name.", "error");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: fullName });
    } catch (err) {
      triggerToast(mapFirebaseErrorToMessage(err.code), "error");
    }
    setLoadingState(false);
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
            <InputBorder>
              <TextBox
                data={{
                  type: "text",
                  placeholder: "John Doe",
                  stateValueSetter: setFullName,
                  stateValue: fullName,
                  labelText: "Full Name",
                  required: true,
                }}
              />

              <TextBox
                data={{
                  type: "email",
                  placeholder: "email@example.com",
                  stateValueSetter: setEmail,
                  stateValue: email,
                  labelText: "Email",
                  required: true,
                }}
              />
              <TextBox
                data={{
                  type: "password",
                  placeholder: "Password",
                  stateValueSetter: setPassword,
                  stateValue: password,
                  labelText: "Password",
                  required: true,
                }}
              />

              <TextBox
                data={{
                  type: "password",
                  placeholder: "Password",
                  stateValueSetter: setConfirmPassword,
                  stateValue: confirmPassword,
                  labelText: "Confirm password",
                  required: true,
                }}
              />
            </InputBorder>

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
};

export default Signup;
