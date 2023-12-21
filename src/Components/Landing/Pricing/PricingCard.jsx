import React from "react";
import styles from "./PricingCard.module.css";
import Button from "../../Button/Button";
import { useSpring, animated } from "react-spring";

const PricingCard = ({ dataObject }) => {
  const {
    subscription_name,
    subscription_price,
    button_text,
    features,
    frequencyState,
  } = dataObject;

  const animatedProps = useSpring({
    from: { opacity: 0, transform: "translateX(-100px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  });

  return (
    <>
      <div className={styles.PricingCard}>
        <div className={styles.top_card}>
          <h4 className={styles.subscription_name}>{subscription_name}</h4>
          <animated.h1 style={animatedProps} className={styles.price}>
            {frequencyState[1] === "month"
              ? subscription_price.monthly
              : subscription_price.yearly}
          </animated.h1>
          <p>per user, per {frequencyState[1]}</p>
          <Button>{button_text}</Button>
        </div>

        <div className={styles.hr_div}>
          <hr className={styles.hr} />
        </div>

        <div className={styles.bottom_card}>
          <ul className={styles.features}>
            {features.map((feature, index) => (
              <li key={index}>
                <span role="img" aria-label="feature">
                  <p>{feature.label}</p>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
