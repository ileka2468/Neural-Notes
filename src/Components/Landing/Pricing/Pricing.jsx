import PricingCard from "./PricingCard";
import styles from "./Pricing.module.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const Pricing = () => {
  const [paymentFrequency, setPaymentFrequency] = useState([
    "monthly",
    "month",
  ]);

  const togglePaymentFrequency = () => {
    paymentFrequency[0] === "monthly"
      ? setPaymentFrequency(["yearly", "year"])
      : setPaymentFrequency(["monthly", "month"]);
  };

  return (
    <>
      <div>
        <Form.Check
          type="switch"
          className={styles.check}
          label={`switch to ${
            paymentFrequency === "monthly" ? "yearly" : "monthly"
          }`}
          onChange={() => togglePaymentFrequency()}
        />
      </div>

      <div className={styles.card_container}>
        <PricingCard
          dataObject={{
            subscription_name: "Free Tier",
            subscription_price: { monthly: "$0", yearly: "$0" },
            button_text: "Get Started",
            features: [
              { label: "📝 Unlimited notes" },
              { label: "💡 10 AI note enhancements" },
              { label: "🎙️ 5 Lecture enhancements" },
            ],
            frequencyState: paymentFrequency,
          }}
        />

        <PricingCard
          dataObject={{
            subscription_name: "Standard Tier",
            subscription_price: { monthly: "$10", yearly: "$80" },
            button_text: "Upgrade Now",
            features: [
              { label: "📝 Unlimited Notes" },
              { label: "💡 100 AI note enhancements" },
              { label: "🎙️ 50 Lecture enhancements" },
              { label: "📚 Access to study materials" },
            ],
            frequencyState: paymentFrequency,
          }}
        />

        <PricingCard
          dataObject={{
            subscription_name: "Premium Tier",
            subscription_price: { monthly: "$30", yearly: "$150" },
            button_text: "Get Premium",
            features: [
              { label: "📝 Unlimited Notes" },
              { label: "💡 500 AI note enhancements" },
              { label: "🎙️ 200 Lectures transformed into notes by AI " },
              { label: "📚 Access to study materials" },
              { label: "📚 Scan handwritten notes" },
              { label: "📈 No ads" },
            ],
            frequencyState: paymentFrequency,
          }}
        />
      </div>
    </>
  );
};

export default Pricing;
