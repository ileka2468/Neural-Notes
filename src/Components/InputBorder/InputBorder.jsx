import React from "react";
import styles from "../../features/Authentication/Auth.module.css";

const InputBorder = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const numberOfChildren = childrenArray.length;

  return (
    <>
      <div className={styles.form}>
        {React.Children.map(children, (child, index) => {
          return (
            <>
              {child}
              {index < numberOfChildren - 1 && <hr className={styles.hr} />}
            </>
          );
        })}
      </div>
    </>
  );
};

export default InputBorder;
