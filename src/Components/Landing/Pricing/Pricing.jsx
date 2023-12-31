import tooltips from "./PricingTooltips";
import PricingCard from "./PricingCard";
import styles from "./Pricing.module.css";
import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { doc } from "firebase/firestore";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { getApp } from "firebase/app";
import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../../../hooks/useUserRoles";
import { ToastContainer } from "react-toastify";
import { useToast } from "../../../hooks/useToast";

const Pricing = () => {
  const { roleStatus, userRole } = useUserRole();
  const [paymentFrequency, setPaymentFrequency] = useState("month");
  const { status, data: user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const app = getApp();
  const triggerToast = useToast();

  console.log(userRole);

  const stripeLoading = useRef(false);
  let payments;

  useEffect(() => {
    if (user != undefined) {
      let registration_redirect_price_id = sessionStorage.getItem(
        "subscription_redirect_price_id"
      );
      if (registration_redirect_price_id) {
        if (registration_redirect_price_id != "free") {
          console.log(registration_redirect_price_id);
          sessionStorage.removeItem("subscription_redirect_price_id");
          stripeLoading.current = true;
          createCheckoutSessionWrapper(registration_redirect_price_id);
        }
      }
    }
  }, [user, status]);

  useEffect(() => {
    if (userRole) {
      userRole.includes("yearly")
        ? setPaymentFrequency("year")
        : setPaymentFrequency("month");
    }
  }, [userRole]);

  const togglePaymentFrequency = () => {
    paymentFrequency === "month"
      ? setPaymentFrequency("year")
      : setPaymentFrequency("month");
  };

  const createCheckoutSessionWrapper = async (price_id) => {
    payments = getStripePayments(app, {
      productsCollection: "subscriptions",
      customersCollection: "users",
    });

    const session = await createCheckoutSession(payments, {
      price: price_id,
    });
    window.location.assign(session.url);
  };

  const checkOut = async (payment_id) => {
    let price_id;

    switch (payment_id) {
      case "free":
        break;
      case "standard":
        price_id = "price_1OQGh2Ioq3PzZfIZl9tBFVoZ";
        break;
      case "premium":
        price_id = "price_1OQH03Ioq3PzZfIZKY7ilPCK";
        break;
      case "standard_yearly":
        price_id = "price_1ORPpXIoq3PzZfIZKEleZSON";
        break;
      case "premium_yearly":
        price_id = "price_1ORPqtIoq3PzZfIZfJuugbln";
        break;
    }
    if (user) {
      setLoading(true);
      createCheckoutSessionWrapper(price_id);
    } else {
      sessionStorage.setItem("subscription_redirect_price_id", price_id);
      navigate("/auth/register");
    }
  };

  const manageAccount = () => {
    triggerToast(
      "You already have a plan, to change plans, or cancel visit the account manager.",
      "info",
      6500
    );
  };

  return (
    <>
      {loading === false &&
      status === "success" &&
      stripeLoading.current != true ? (
        <>
          <div>
            <Form.Check
              type="switch"
              className={styles.check}
              label={`switch to ${
                paymentFrequency === "month" ? "yearly" : "monthly"
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
                features: {
                  monthly: [
                    {
                      label: "📝 Unlimited notes",
                      tooltipData: tooltips.notes,
                    },
                    {
                      label: "💡 10 AI note enhancements",
                      tooltipData: tooltips.enhancements,
                    },
                    {
                      label: "🎙️ 5 Lecture recordings to notes",
                      tooltipData: tooltips.recordings,
                    },
                  ],
                  yearly: [
                    {
                      label: "📝 Unlimited notes",
                      tooltipData: tooltips.notes,
                    },
                    {
                      label: "💡 120 AI note enhancements",
                      tooltipData: tooltips.enhancements,
                    },
                    {
                      label: "🎙️ 60 Lecture recordings to notes",
                      tooltipData: tooltips.recordings,
                    },
                  ],
                },
                frequencyState: paymentFrequency,
                checkoutFN: manageAccount,
                payment_id: `free`,
                userRole: userRole,
              }}
            />

            <PricingCard
              dataObject={{
                subscription_name: "Standard Tier",
                subscription_price: { monthly: "$4.99", yearly: "$79.99" },
                button_text: "Upgrade Now",
                features: {
                  monthly: [
                    {
                      label: "📝 Unlimited Notes",
                      tooltipData: tooltips.notes,
                    },
                    {
                      label: "💡 100 AI note enhancements",
                      tooltipData: tooltips.enhancements,
                    },
                    {
                      label: "🎙️ 70 Lecture recordings to notes",
                      tooltipData: tooltips.recordings,
                    },
                    {
                      label: "📚 Access to study materials",
                      tooltipData: tooltips.study,
                    },
                  ],
                  yearly: [
                    {
                      label: "📝 Unlimited Notes",
                      tooltipData: tooltips.notes,
                    },
                    {
                      label: "💡 1200 AI note enhancements",
                      tooltipData: tooltips.enhancements,
                    },
                    {
                      label: "🎙️ 840 Lecture recordings to notes",
                      tooltipData: tooltips.recordings,
                    },
                    {
                      label: "📚 Access to study materials",
                      tooltipData: tooltips.study,
                    },
                  ],
                },
                frequencyState: paymentFrequency,
                checkoutFN: checkOut,
                payment_id: `${
                  paymentFrequency === "month" ? "standard" : "standard_yearly"
                }`,
                userRole: userRole,
              }}
            />

            <PricingCard
              dataObject={{
                subscription_name: "Premium Tier",
                subscription_price: { monthly: "$14.99", yearly: "$150" },
                button_text: "Get Premium",
                features: {
                  monthly: [
                    {
                      label: "📝 Unlimited Notes",
                      tooltipData: tooltips.notes,
                    },
                    {
                      label: "💡 500 AI note enhancements",
                      tooltipData: tooltips.enhancements,
                    },
                    {
                      label: "🎙️ 200 Lecture recordings to notes",
                      tooltipData: tooltips.recordings,
                    },
                    {
                      label: "📚 Access to study materials",
                      tooltipData: tooltips.study,
                    },
                    {
                      label: "📚 Scan handwritten notes",
                      tooltipData: tooltips.scan,
                    },
                    { label: "📈 No ads", tooltipData: tooltips.ads },
                  ],
                  yearly: [
                    {
                      label: "📝 Unlimited Notes",
                      tooltipData: tooltips.notes,
                    },
                    {
                      label: "💡 6000 AI note enhancements",
                      tooltipData: tooltips.enhancements,
                    },
                    {
                      label: "🎙️ 2400 Lecture recordings to notes",
                      tooltipData: tooltips.recordings,
                    },
                    {
                      label: "📚 Access to study materials",
                      tooltipData: tooltips.study,
                    },
                    {
                      label: "📚 Scan handwritten notes",
                      tooltipData: tooltips.scan,
                    },
                    { label: "📈 No ads", tooltipData: tooltips.ads },
                  ],
                },
                frequencyState: paymentFrequency,
                checkoutFN: checkOut,
                payment_id: `${
                  paymentFrequency === "month" ? "premium" : "premium_yearly"
                }`,
                userRole: userRole,
              }}
            />
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Pricing;
