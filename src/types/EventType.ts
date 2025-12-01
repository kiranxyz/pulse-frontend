type DBEventType = {
  _id: string;
};
export type EventType = DBEventType & {
  title: string;
  date: string;
  totalSeats: number;
  seatsBooked: number;
  discount?: { firstN: number; percent: number };
  description: string;
  image: string;
  price: number;
  options?: { showHurryUp: false; sendReminder: false };
  eventType: "free";
};
