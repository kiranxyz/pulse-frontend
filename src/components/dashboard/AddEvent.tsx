import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_PULSE_BACKEND_API_URL;

interface EventOptions {
  discountFirst10: boolean;
  showHurryUp: boolean;
  reminder: boolean;
  emailNotify: boolean;
}

interface EventData {
  title: string;
  address: string;
  date: string;
  time: string;
  totalSeats: number;
  options?: Partial<EventOptions>;
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox"
      />
      {label}
    </label>
  );
}

export default function AddEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);

  const [options, setOptions] = useState<EventOptions>({
    discountFirst10: false,
    showHurryUp: false,
    reminder: false,
    emailNotify: false,
  });

  useEffect(() => {
    if (!isEditing) return;
    fetch(`${BASE_URL}/api/events/${id}`)
      .then((res) => res.json())
      .then((event: EventData) => {
        setTitle(event.title);
        setAddress(event.address);
        setDate(event.date);
        setTime(event.time);
        setTotalSeats(event.totalSeats);
        setOptions({
          discountFirst10: event.options?.discountFirst10 || false,
          showHurryUp: event.options?.showHurryUp || false,
          reminder: event.options?.reminder || false,
          emailNotify: event.options?.emailNotify || false,
        });
      });
  }, [id, isEditing]);

  const handleOptionChange = (key: keyof EventOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      const url = isEditing
        ? `${BASE_URL}/api/events/${id}`
        : `${BASE_URL}/api/events`;
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          address,
          date,
          time,
          totalSeats,
          options,
        }),
      });
      if (!res.ok) throw new Error("Saving event failed");
      alert(isEditing ? "Event updated!" : "Event created!");
      navigate("/dashboard/events");
    } catch (err) {
      console.error(err);
      alert("Failed to save event");
    }
  };

  return (
    <main className="mx-auto max-w-xl p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
        {isEditing ? "Edit Event" : "Add Event"}
      </h1>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="input input-bordered w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="date"
          className="input input-bordered w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          className="input input-bordered w-full"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Seats"
          className="input input-bordered w-full"
          value={totalSeats}
          onChange={(e) => setTotalSeats(Number(e.target.value))}
          min={1}
          required
        />

        <div className="mt-4 space-y-2">
          {Object.entries(options).map(([key, value]) => (
            <Checkbox
              key={key}
              label={
                {
                  discountFirst10: "Discount first 10 participants",
                  showHurryUp: "Hurry up message at 80% bookings",
                  reminder: "Reminder 1 hour before",
                  emailNotify: "Email participants",
                }[key as keyof EventOptions]
              }
              checked={value}
              onChange={() => handleOptionChange(key as keyof EventOptions)}
            />
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          {isEditing ? "Update Event" : "Save Event"}
        </button>
      </form>
    </main>
  );
}
