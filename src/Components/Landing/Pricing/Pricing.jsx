import PricingCard from "./PricingCard";
import styles from "./Pricing.module.css";

const Pricing = () => {
  return (
    <>
      <div className={styles.card_container}>
        <PricingCard
          dataObject={{
            subscription_name: "Free Tier",
            subscription_price: "$0",
            button_text: "Buy now",
            features: [
              "Unlimited note creation",
              "30 AI note edits",
              "5 Lecture recording edits",
            ],
          }}
        />

        <PricingCard
          dataObject={{
            subscription_name: "Standard Tier",
            subscription_price: "$20",
            button_text: "Buy now",
            features: [
              "Unlimited Note Creation",
              "100 AI Text edits",
              "50 Lecture recording edits",
              "Access to study material generator (flashcards, quizzes, tests, review games)",
            ],
          }}
        />

        <PricingCard
          dataObject={{
            subscription_name: "Premium Tier",
            subscription_price: "$40",
            button_text: "Buy now",
            features: [
              "Unlimited Note Creation",
              "500 AI Text edits",
              "200 Lecture recording edits",
              "Access to study material generator (flashcards, quizzes, tests, review games)",
            ],
          }}
        />
      </div>
    </>
  );
};

export default Pricing;
