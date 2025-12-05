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

  const categories = [
    "All",
    "Art & Culture",
    "Career & Business",
    "Community & Environment",
    "Dancing",
    "Games",
    "Health & Wellbeing",
    "Hobbies & Passions",
    "Identity & Language",
    "Music",
    "Parents & Family",
    "Pets & Animals",
    "Religion & Spirituality",
    "Science & Education",
    "Social Activities",
    "Sports & Fitness",
    "Technology",
    "Travel & Outdoor",
    "Writing"
  ];

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
   <section className="p-6 rounded-2xl mb-10 bg-white shadow-lg">
  <div className="max-w-7xl mx-auto flex flex-col gap-6">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {/* Search input */}
      <div className="bg-white border border-gray-300 px-1 rounded-xl">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={handleFilterChange}
          className="p-3  placeholder-gray-400 text-gray-800 w-full focus:outline-none"
        />
      </div>

      {/* Topic input */}
      <div className="bg-white border border-gray-300 px-1 rounded-xl">
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3  placeholder-gray-400 text-gray-800 w-full focus:outline-none"
        />
      </div>

      {/* Category dropdown */}
      <div className="bg-white border border-gray-300 px-1 rounded-xl">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterChange();
          }}
          className="p-3  placeholder-gray-400 text-gray-800 w-full focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === "All" ? "" : cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Location input */}
      <div className="bg-white border border-gray-300 px-1 rounded-xl">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3  placeholder-gray-400 text-gray-800 w-full focus:outline-none"
        />
      </div>

      {/* Min Price */}
      <div className="bg-white border border-gray-300 px-1 rounded-xl">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3  placeholder-gray-400 text-gray-800 w-full focus:outline-none"
        />
      </div>

      {/* Max Price */}
      <div className="bg-white border border-gray-300 px-1 rounded-xl">
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3 placeholder-gray-400 text-gray-800 w-full focus:outline-none"
        />
      </div>

      {/* Date */}
      <div className="bg-white border border-gray-300 px-1 rounded-xl">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={handleFilterChange}
          className="p-3  placeholder-gray-400 text-gray-800 w-full focus:outline-none"
        />
      </div>

      {/* Search button */}
      <button
        onClick={handleFilterChange}
        className="w-full p-4 rounded-full shadow-md bg-black text-white focus:outline-none"
      >
        Search
      </button>

    </div>
  </div>
</section>

  );
}
