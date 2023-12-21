import React from "react";
import styles from "./PricingCard.module.css";
import Button from "../../Button/Button";

const PricingCard = ({ dataObject }) => {
  const { subscription_name, subscription_price, button_text, features } =
    dataObject;
  console.log(button_text);

  return (
    <div className={styles.PricingCard}>
      <div className={styles.top_card}>
        <h4 className={styles.subscription_name}>{subscription_name}</h4>
        <h1 className={styles.price}>{subscription_price}</h1>
        <Button>{button_text}</Button>
      </div>

      <hr />
      <ul>
        {features.map((feature) => (
          <li>{feature}</li>
        ))}
      </ul>

      <div className={styles.bottom_card}></div>
    </div>
  );
};

export default PricingCard;
