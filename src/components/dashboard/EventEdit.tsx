import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { EventType } from "../../types/EventType";
import EventForm from "./EventForm";

const apiBase = import.meta.env.VITE_PULSE_BACKEND_API_URL;

const EventEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<EventType | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${apiBase}/api/events/${id}`)
      .then((res) => setEventData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return eventData ? (
    <EventForm mode="edit" event={eventData} />
  ) : (
    <p>Loading...</p>
  );
};

export default EventEdit;
