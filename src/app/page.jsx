"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function RefactoredPokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterType, setFilterType] = useState("");
  const [totalPokemon, setTotalPokemon] = useState(0);

  const fetchPokemonList = async () => {
    setLoading(true);
    setError("");
    try {
      let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      if (search) {
        url = `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error fetching Pokémon list");
      const data = await response.json();

      let pokemonData;
      if (search) {
        pokemonData = [data]; 
        setTotalPokemon(1);
      } else {
        setTotalPokemon(data.count);
        const detailedPokemonPromises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        pokemonData = await Promise.all(detailedPokemonPromises);
      }
      setPokemonList(pokemonData);
    } catch (err) {
      setError("Error fetching Pokémon data");
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, [offset, limit]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setOffset(0); 
    fetchPokemonList();
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };

  const filteredAndSortedPokemon = () => {
    let filteredList = pokemonList;
    if (filterType) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === filterType)
      );
    }
    filteredList.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "base_experience") {
        return sortOrder === "asc"
          ? a.base_experience - b.base_experience
          : b.base_experience - a.base_experience;
      }
      return 0;
    });
    return filteredList;
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => prevOffset - limit);
    }
  };

  const handleNextPage = () => {
    if (offset + limit < totalPokemon) {
      setOffset((prevOffset) => prevOffset + limit);
    }
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
              <Search
                className="absolute left-3 top-3.5 text-green-100"
                size={20}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-lg"
            >
              Search
            </button>
            <select
              onChange={handleFilterType}
              value={filterType}
              className="px-4 py-3 rounded-full bg-white bg-opacity-30 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">All Types</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="bug">Bug</option>
              <option value="normal">Normal</option>
              <option value="poison">Poison</option>
            </select>
          </form>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => handleSort("name")}
              className="px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-lg"
            >
              Sort by Name
            </button>
            <button
              onClick={() => handleSort("base_experience")}
              className="px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors shadow-lg"
            >
              Sort by Experience
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-300"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : pokemonList.length === 0 ? (
            <p className="text-white text-center text-xl">
              No Pokémon found. Try a different search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredAndSortedPokemon().map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="bg-white bg-opacity-30 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300 flex flex-col items-center shadow-xl border border-white border-opacity-30"
                >
                  <div className="bg-gradient-to-br from-green-200 to-blue-200 rounded-full p-4 mb-4">
                    <img
                      src={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                      alt={pokemon.name}
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-white capitalize mb-2">
                    {pokemon.name}
                  </h2>
                  <p className="text-green-100 mb-2">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </p>
                  <div className="flex gap-2 mb-4">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                          type.type.name
                        )}`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-white mb-4">
                    Base Exp: {pokemon.base_experience}
                  </p>
                  <div className="w-full grid grid-cols-2 gap-2">
                    {pokemon.stats.map((stat) => (
                      <div
                        key={stat.stat.name}
                        className="flex justify-between items-center bg-white bg-opacity-20 rounded-lg px-3 py-2"
                      >
                        <span className="text-green-100 text-xs capitalize">
                          {stat.stat.name}
                        </span>
                        <span className="text-white font-semibold">
                          {stat.base_stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrevPage}
              disabled={offset === 0 || search !== ""}
              className="flex items-center px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <ChevronLeft size={24} className="mr-2" /> Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={offset + limit >= totalPokemon || search !== ""}
              className="flex items-center px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Next <ChevronRight size={24} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTypeColor(type) {
  const colors = {
    normal: "bg-gray-400 text-gray-800",
    fire: "bg-orange-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-400 text-gray-800",
    grass: "bg-green-500 text-white",
    ice: "bg-blue-200 text-gray-800",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-500 text-white",
    ground: "bg-yellow-600 text-white",
    flying: "bg-indigo-400 text-white",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-500 text-white",
    rock: "bg-yellow-700 text-white",
    ghost: "bg-indigo-600 text-white",
    dragon: "bg-indigo-700 text-white",
    dark: "bg-gray-700 text-white",
    steel: "bg-gray-400 text-gray-800",
    fairy: "bg-pink-300 text-gray-800",
  };
  return colors[type] || "bg-gray-400 text-gray-800";
}
