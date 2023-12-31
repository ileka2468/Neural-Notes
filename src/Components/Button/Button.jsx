import React, { useEffect } from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  width,
  padding,
  border_radius,
  onclick,
  onclickParam,
  disabled,
}) => {
  const style = {
    width: width,
    padding: padding,
    border_radius: border_radius,
    opacity: disabled ? ".6" : "1",
  };

  return (
    <button
      onClick={() => onclick(onclickParam)}
      style={style}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
