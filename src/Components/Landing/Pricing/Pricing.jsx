import React, { useState } from "react";
import PricingCard from "./PricingCard";

const Pricing = () => {
  const initialState = { free: false, standard: false, premium: false };
  const [activeSelection, setActiveSelection] = useState(initialState);

  const setActive = (id) => {
    setActiveSelection({ ...initialState, [id]: true });
    //     console.log(activeSelection);
  };

  return (
    <>
      <PricingCard
        dataObject={{
          subscription_name: "Free Trial",
          subscription_price: "$55",
          button_text: "$Buy now",
          features: [
            "Unlimited Note Creation",
            "25 AI Text Augments",
            "5 Lecture recording augments",
          ],
          selectionState: activeSelection,
          id: "free",
          setActive: setActive,
        }}
      />

      <PricingCard
        dataObject={{
          subscription_name: "Free Trial",
          subscription_price: "$55",
          button_text: "$Buy now",
          features: [
            "Unlimited Note Creation",
            "25 AI Text Augments",
            "5 Lecture recording augments",
          ],
          selectionState: activeSelection,
          id: "standard",
          setActive: setActive,
        }}
      />

      <PricingCard
        dataObject={{
          subscription_name: "Free Trial",
          subscription_price: "$55",
          button_text: "$Buy now",
          features: [
            "Unlimited Note Creation",
            "25 AI Text Augments",
            "5 Lecture recording augments",
          ],
          selectionState: activeSelection,
          id: "premium",
          setActive: setActive,
        }}
      />
    </>
  );
};

export default Pricing;
