export interface Event {
  id?: string;
  _id?: string;
  title: string;
  address: string;
  time: string;
  date: string;
  totalSeats: number;
  seatsBooked: number;
  discount?: { firstN: number; percent: number }; 
  description: string;
  image?: string;
  price: number;
}
