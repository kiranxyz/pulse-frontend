import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EventForm from "./EventForm";

const apiBase = import.meta.env.VITE_API_URL;

const EventEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${apiBase}/api/events/${id}`)
      .then((res) => setEventData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return eventData ? <EventForm mode="edit" event={eventData} /> : <p>Loading...</p>;
};

export default EventEdit;
