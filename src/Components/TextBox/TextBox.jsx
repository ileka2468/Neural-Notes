import React from "react";
import styles from "../../features/Authentication/Auth.module.css";

const TextBox = ({ data }) => {
  const {
    color,
    type,
    placeholder,
    stateValueSetter,
    stateValue,
    labelText,
    required,
  } = data;

  return (
    <div className={styles.formGroup}>
      <label htmlFor={type}>{labelText}</label>
      <input
        className={styles.noInputBorder}
        type={type}
        name={type}
        placeholder={placeholder}
        style={
          color
            ? { backgroundColor: color }
            : { backgroundColor: "transparent" }
        }
        onChange={(e) => stateValueSetter(e.target.value)}
        value={stateValue}
        required={required}
      />
    </div>
  );
};

export default TextBox;
