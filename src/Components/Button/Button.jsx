import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, width, padding, border_radius }) => {
  const style = {
    width: width,
    padding: padding,
    border_radius: border_radius,
  };
  return (
    <button style={style} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
