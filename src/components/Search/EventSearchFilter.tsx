import { useState } from "react";

type EventFilterProps = {
  onFilterChange: (filters: any) => void;
};

export default function EventSearchFilter({ onFilterChange }: EventFilterProps) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [date, setDate] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      search,
      topic,
      category,
      location,
      minPrice,
      maxPrice,
      date,
    });
  };

  return (
    <section className="p-6 rounded-2xl mb-10 bg-linear-to-r from-purple-500 to-blue-500 shadow-lg">
  <div className="max-w-7xl mx-auto flex flex-col gap-6">

    

    {/* Inputs */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {/* Input wrapper */}
      <div className="bg-white/10 border border-white/10 px-1 rounded-xl">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={handleFilterChange}
          className="p-3 bg-transparent placeholder-gray-300 text-white w-full 
                     focus:outline-none"
        />
      </div>

      <div className="bg-white/10 border border-white/10 px-1 rounded-xl">
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3 bg-transparent placeholder-gray-300 text-white w-full 
                     focus:outline-none"
        />
      </div>

      <div className="bg-white/10 border border-white/10 px-1 rounded-xl">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3 bg-transparent placeholder-gray-300 text-white w-full 
                     focus:outline-none"
        />
      </div>

      <div className="bg-white/10 border border-white/10 px-1 rounded-xl">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3 bg-transparent placeholder-gray-300 text-white w-full 
                     focus:outline-none"
        />
      </div>

      <div className="bg-white/10 border border-white/10 px-1 rounded-xl">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3 bg-transparent placeholder-gray-300 text-white w-full 
                     focus:outline-none"
        />
      </div>

      <div className="bg-white/10 border border-white/10 px-1 rounded-xl">
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3 bg-transparent placeholder-gray-300 text-white w-full 
                     focus:outline-none"
        />
      </div>

      <div className="bg-white/10 border border-white/10 px-1 rounded-xl">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3 bg-transparent placeholder-gray-300 text-white w-full 
                     focus:outline-none"
        />
      </div>

      <button
        onClick={handleFilterChange}
        className="w-full p-4 rounded-full shadow-md bg-green-300 text-gray-800 focus:outline-none"
      >
        Search
      </button>
    </div>
  </div>
</section>


  );
}
