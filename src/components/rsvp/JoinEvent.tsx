import { useNavigate } from "react-router";

import { useAuthContext } from "../../context/AuthProvider";
import type { EventType } from "../../types/EventType";

const JoinEvent = ({ event }: { event: EventType }) => {
  const navigate = useNavigate();
  const { member } = useAuthContext();

  const modalId = "join_event_modal_" + event._id;

  const handlePay = () => {
    //navigate("/payment/" + event.price);
    navigate("/payment", { state: { price: event.price, eventId: event._id } });
  };

  const handleJoin = () => {
    //navigate("/thanks", { state: { eventId: event._id } });
    navigate("/thanks");
  };
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary"
        onClick={() => {
          (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
        }}
      >
        join
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {member?.username} Welcome to Join us at!
          </h3>
          {event?.eventType === "free" ? (
            <>
              <h3 className="py-3 text-lg font-bold">
                {event?.title} - Free Event
              </h3>
              <p className="py-2">
                Please click join button to get the entry pass of this event!
              </p>
              <button onClick={handleJoin} className="btn btn-primary py-2">
                Join
              </button>
            </>
          ) : (
            <>
              <h3 className="py-3 text-lg font-bold">
                {event?.title} - Paid Event
              </h3>
              <h4 className="mb-20 py-2 text-xl font-semibold">
                Price : <span className="text-4xl">{event?.price} </span> Euro
              </h4>
              <button onClick={handlePay} className="btn btn-primary py-2">
                Go to Pay
              </button>
            </>
          )}

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default JoinEvent;
