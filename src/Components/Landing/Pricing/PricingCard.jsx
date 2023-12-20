import React from "react";
import styles from "./Pricing.module.css";

const PricingCard = ({ dataObject }) => {
  const {
    subscription_name,
    subscription_price,
    button_text,
    selectionState,
    id,
    setActive,
    initialState,
  } = dataObject;

  return (
    <div
      className={
        selectionState[id]
          ? styles.PricingCardActive
          : styles.PricingCardInactive
      }
      onMouseOver={() => {
        setActive(id);
      }}
      onMouseLeave={() => setActive(initialState)}
    >
      <div className={styles.top_card}>
        <h4>{subscription_name}</h4>
        <h2>{subscription_price}</h2>
        <button>{button_text}</button>
      </div>

      <div className="bottom_card"></div>
    </div>
  );
};

export default PricingCard;
