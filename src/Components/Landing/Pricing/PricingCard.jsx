import React from "react";
import styles from "./Card.module.css";
import Button from "../../Button/Button";
import { useSpring, animated } from "react-spring";
import Tooltip from "@mui/material/Tooltip";
const PricingCard = ({ dataObject }) => {
  const {
    subscription_name,
    subscription_price,
    button_text,
    features,
    frequencyState,
    checkoutFN,
    payment_id,
    userRole,
  } = dataObject;

  const animatedProps = useSpring({
    from: { opacity: 0, transform: "translateX(-100px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  });

  const [hovered, setHovered] = React.useState(false);

  const springProps = useSpring({
    transform: hovered ? "translateY(-10px)" : "translateY(0px)",
  });
  const disabled = userRole === payment_id;

  return (
    <>
      <animated.div
        className={styles.PricingCard}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={springProps}
      >
        <div className={styles.top_card}>
          <h4 className={styles.subscription_name}>{subscription_name}</h4>
          <animated.h1 style={animatedProps} className={styles.price}>
            {frequencyState === "month"
              ? subscription_price.monthly
              : subscription_price.yearly}
          </animated.h1>
          <p>per user, per {frequencyState}</p>
          <Button
            onclickParam={payment_id}
            onclick={checkoutFN}
            padding={"0.55em"}
            width={"80%"}
            disabled={disabled}
          >
            {!disabled ? button_text : "Current Plan"}
          </Button>
        </div>

        <div className={styles.hr_div}>
          <hr className={styles.hr} />
        </div>

        <div className={styles.bottom_card}>
          <ul className={styles.features}>
            {frequencyState === "month"
              ? features.monthly.map((feature, index) => (
                  <Tooltip
                    arrow
                    title={feature.tooltipData}
                    placement="top"
                    key={index}
                  >
                    <li className={styles.feature_li}>
                      <span
                        className={styles.feature_span}
                        role="img"
                        aria-label="feature"
                      >
                        <p className={styles.feature_p}>{feature.label}</p>
                      </span>
                    </li>
                  </Tooltip>
                ))
              : features.yearly.map((feature, index) => (
                  <Tooltip
                    arrow
                    title={feature.tooltipData}
                    placement="top"
                    key={index}
                  >
                    <li className={styles.feature_li}>
                      <span
                        className={styles.feature_span}
                        role="img"
                        aria-label="feature"
                      >
                        <p className={styles.feature_p}>{feature.label}</p>
                      </span>
                    </li>
                  </Tooltip>
                ))}
          </ul>
        </div>
      </animated.div>
    </>
  );
};

export default PricingCard;
