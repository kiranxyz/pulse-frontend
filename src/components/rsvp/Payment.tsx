import { Elements } from "@stripe/react-stripe-js";
import { type StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

import CheckoutForm from "./CheckoutForm";

const apiBase = import.meta.env.VITE_PULSE_BACKEND_API_URL;
const key = import.meta.env.VITE_PK_TEST_STRIPE_PUBLIC_KEY;
if (!key) {
  throw new Error(
    "Missing Stripe public key in environment variables, VITE_PK_TEST_STRIPE_PUBLIC_KEY",
  );
}
const stripePromise = loadStripe(key);

const Payment = () => {
  const { state } = useLocation();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const amount = Math.round(Number(state.price) * 100);
  useEffect(() => {
    async function createPaymentIntent() {
      try {
        fetch(`${apiBase}/api/stripe/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount, currency: "usd" }), // $50
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret);
          });
      } catch (error) {
        console.error("Failed to create PaymentIntent:", error);
      }
    }
    createPaymentIntent();
  }, []);

  // Memoize options to avoid re-rendering Elements
  const options: StripeElementsOptions | null = useMemo(() => {
    if (!clientSecret) return null;
    return {
      clientSecret,
      appearance: { theme: "stripe" },
      defaultValues: {
        paymentMethodType: "card",
      },
    };
  }, [clientSecret]);

  if (!clientSecret || !options) return <p>Loading payment form...</p>;

  return (
    <div className="mx-auto mt-10 w-full max-w-lg">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm eventId={state.eventId} />
      </Elements>
    </div>
  );
};

export default Payment;
