export type DBEventType = {
  _id: string;
  id?: string;
  image?: string;
  time: string;
  address: string;
};

export type EventType = DBEventType & {
  title: string;
  id: string;
  _id: string;
  date: string;
  topic: string;
  category: string;
  location: string;
  totalSeats: number;
  time: string;
  address: string;
  seatsBooked: number;

  discount?: {
    firstN: number;
    percent: number;
  };

  description: string;
  image: string | null;
  price: number;

  options?: {
    showHurryUp: boolean;
    sendReminder: boolean;
  };

  eventType: "free";
};
