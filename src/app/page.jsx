"use client";

import { useState, useEffect } from "react";

export default function RefactoredPokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);
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

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-300"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {pokemonList.map((pokemon) => (
                <div key={pokemon.id} className="bg-white p-4 rounded-lg shadow">
                  <h2>{pokemon.name}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
