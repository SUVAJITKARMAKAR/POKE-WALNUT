"use client";

import { useState } from "react";

export default function RefactoredPokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Fetch logic will be added later
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 p-8">
      <div className="max-w-7xl mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white border-opacity-30">
        <div className="p-8">
          <h1 className="text-5xl font-bold text-white text-center mb-8 tracking-wide">
            POKIPOKI
          </h1>
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search Pokémon"
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white bg-opacity-30 text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
