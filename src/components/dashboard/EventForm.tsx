import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiBase = import.meta.env.VITE_API_URL;

interface Props {
  event?: any;
  mode: "create" | "edit";
}

const EventForm: React.FC<Props> = ({ event, mode }) => {
  const navigate = useNavigate();

  // Form fields
  const [title, setTitle] = useState(event?.title || "");
  const [address, setAddress] = useState(event?.address || "");
  const [date, setDate] = useState(event?.date ? event.date.split("T")[0] : "");
  const [time, setTime] = useState(event?.time || "");
  const [totalSeats, setTotalSeats] = useState(event?.totalSeats || 0);
  const [price, setPrice] = useState(event?.price || 0);
  const [discountFirstN, setDiscountFirstN] = useState(
    event?.discount?.firstN || 0,
  );
  const [discountPercent, setDiscountPercent] = useState(
    event?.discount?.percent || 0,
  );
  const [description, setDescription] = useState(event?.description || "");
  const [image, setImage] = useState(event?.image || "");

  const [categories, setCategories] = useState<string[] | []>([]);
  // Tickboxes
  const [showHurryUp, setShowHurryUp] = useState(
    event?.options?.showHurryUp ?? true,
  );
  const [sendReminder, setSendReminder] = useState(
    event?.options?.sendReminder ?? true,
  );

  useEffect(() => {
    // # Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiBase}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      title,
      address,
      date,
      time,
      totalSeats,
      price,
      description,
      image,
      discount: { firstN: discountFirstN, percent: discountPercent },
      options: { showHurryUp, sendReminder },
    };

    try {
      if (mode === "create") {
        await axios.post(`${apiBase}/api/events`, payload);
      } else if (mode === "edit" && event?._id) {
        await axios.put(`${apiBase}/api/events/${event._id}`, payload);
      }
      navigate("/admin/dashboard/events");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {mode === "create" ? "Create Event" : "Edit Event"}
      </h1>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Time</span>
          </label>
          <input
            type="time"
            className="input input-bordered w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Total Seats</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={totalSeats}
            onChange={(e) => setTotalSeats(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Price (€)</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="col-span-full flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={discountFirstN > 0}
              onChange={(e) => {
                if (!e.target.checked) setDiscountFirstN(0);
                else if (discountFirstN === 0) setDiscountFirstN(10);
              }}
              className="checkbox"
            />
            Apply Discount for First Participants
          </label>
          {discountFirstN > 0 && (
            <input
              type="number"
              className="input input-bordered mt-1 w-full"
              value={discountFirstN}
              onChange={(e) => setDiscountFirstN(Number(e.target.value))}
              min={1}
            />
          )}
        </div>

        <div className="col-span-full flex flex-col gap-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showHurryUp}
              onChange={(e) => setShowHurryUp(e.target.checked)}
              className="checkbox"
            />
            Show "Hurry Up" message when 80% seats booked
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={sendReminder}
              onChange={(e) => setSendReminder(e.target.checked)}
              className="checkbox"
            />
            Send reminder notification 1 hour before event
          </label>
        </div>

        <div className="col-span-full">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-span-full">
          <button
            className={`btn ${mode === "create" ? "btn-success" : "btn-primary"} w-full`}
            onClick={handleSubmit}
          >
            {mode === "create" ? "Create Event" : "Update Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
