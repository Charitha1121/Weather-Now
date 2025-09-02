import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md mb-6 shadow-lg rounded-xl overflow-hidden"
    >
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-2 text-lg outline-none"
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
