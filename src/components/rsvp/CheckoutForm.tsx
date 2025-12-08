import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useAuthContext } from "../../context/AuthProvider";
import Notifications from "../notifications/Notifications";

const apiBase = import.meta.env.VITE_API_URL;

const CheckoutForm = ({ eventId }: { eventId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { me } = useAuthContext();

  if (!stripe || !elements) return <p>Initializing payment...</p>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;
    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    // # Call registerEvent api to register user for the event only if payment is successful
    if (result.paymentIntent?.status === "succeeded") {
      // Payment succeeded
      try {
<<<<<<< HEAD
        //console.log(`URL : ${apiBase}/api/registerParticipant`);
=======
>>>>>>> 373e4acaf322a3f9cf590ac294066775ef2e96bf
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

        const registerResponsedata = await response.json();

        // # Send email with ticket
        const res = await fetch(`${apiBase}/api/ticket/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: me?.id,
            ticketCode: registerResponsedata.ticket.ticketCode,
<<<<<<< HEAD
=======
            eventId: eventId,
>>>>>>> 373e4acaf322a3f9cf590ac294066775ef2e96bf
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to send ticket email");
        }
<<<<<<< HEAD

        const emailResponsedata = await response.json();
        console.log("Email sent response:", emailResponsedata);
        toast.success("Payment successful and registered for the event!");
        // # Redirect to thank you page with ticket code
        navigate("/thanks", {
          state: { ticketCode: registerResponsedata.ticket.ticketCode },
        });
=======
        if (res.status === 200) {
          const emailResponsedata = await res.json();
          console.log(emailResponsedata.message);
          // # if everything is successful then show notification and redirect to thank you page

          const notificationRes = await fetch(`${apiBase}/api/notifications`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: me?.id,
              title: "Event Registration Successful",
              message: `You have successfully registered for the event. Your ticket code is ${registerResponsedata.ticket.ticketCode}.`,
              type: "registration",
              isRead: false,
            }),
          });
          if (!notificationRes.ok) {
            throw new Error("Failed to create notification");
          }
          const notificationdata = await notificationRes.json();
          console.log("Notification created:", notificationdata);
          if (notificationdata.state == "success") {
            <Notifications notifications={notificationdata.data} />;
          }

          toast.success("Payment successful and registered for the event!");
          // # Redirect to thank you page with ticket code
          navigate("/thanks", {
            state: { ticketCode: registerResponsedata.ticket.ticketCode },
          });
        }
>>>>>>> 373e4acaf322a3f9cf590ac294066775ef2e96bf
      } catch (error) {}
    }

    if (result.error) {
      alert(result.error.message);
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
