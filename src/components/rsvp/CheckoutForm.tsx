import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

import { useAuthContext } from "../../context/AuthProvider";

const apiBase = import.meta.env.VITE_API_URL;

const CheckoutForm = ({ eventId }: { eventId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { me } = useAuthContext();

  if (!stripe || !elements) return <p>Initializing payment...</p>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;
    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   return_url: window.location.href + "/thanks", // after success, send user to thanks page
      // },
      redirect: "if_required",
    });

    // TODO: Call registerEvent api to register user for the event only if payment is successful
    if (result.paymentIntent?.status === "succeeded") {
      // Payment succeeded
      console.log("Payment succeeded:", result.paymentIntent);
      try {
        console.log(`URL : ${apiBase}/api/registerParticipant`);
        const response = await fetch(`${apiBase}/api/registerParticipant`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: eventId,
            userId: me?.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to register for the event");
        }

        const data = await response.json();
        console.log("Registration successful:", data);
      } catch (error) {}
    }

    if (result.error) {
      alert(result.error.message);
    } else {
      //console.log("HREF : ", window.location.href);
      alert("Payment Successful!");
      window.location.href = "/thanks";
    }

    setLoading(false);
  }

  const handelCancel = () => {
    window.location.href = "/";
  };
  return (
    <div className="w-md justify-center space-y-4 text-center">
      <p>Please fill in the information and press Pay Now</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement />
        <div className="flex justify-center space-x-4">
          <button
            disabled={!stripe || loading}
            className="btn btn-primary btn-lg"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          <button onClick={handelCancel} className="btn btn-ghost btn-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
