"use client";
import { useEffect, useState } from "react";
import { PokemonThumbnail } from "@/components/PokemonThumbnail";

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const getAllPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await res.json();

    async function createPokemonObject(result) {
      const promises = result.map(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        return res.json();
      });
      const pokemons = await Promise.all(promises);
      setAllPokemons(pokemons);
    }

    createPokemonObject(data.results);
  };

  const searchPokemon = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokemon not found");
      const data = await res.json();
      setSearchedPokemon(data);
    } catch (error) {
      setSearchedPokemon(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchedPokemon(null);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      <div id="parent">
        <div id="section">
          <div className="content">
            <h2>Pokemon KingDom</h2>
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search Pokemon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-button" onClick={searchPokemon}>
                Search
              </button>

              <button className="clear-button" onClick={clearSearch}>
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="app-container">
          <div className="pokemon-container">
            <div className="all-container">
              {searchedPokemon ? (
                <PokemonThumbnail
                  id={searchedPokemon.id}
                  name={searchedPokemon.name}
                  image={
                    searchedPokemon.sprites.other.dream_world.front_default
                  }
                  type={searchedPokemon.types[0].type.name}
                  height={searchedPokemon.height}
                  weight={searchedPokemon.weight}
                  stat1={searchedPokemon.stats[0].stat.name}
                  stat2={searchedPokemon.stats[1].stat.name}
                  stat3={searchedPokemon.stats[2].stat.name}
                  stat4={searchedPokemon.stats[3].stat.name}
                  stat5={searchedPokemon.stats[4].stat.name}
                  stat6={searchedPokemon.stats[5].stat.name}
                  bs1={searchedPokemon.stats[0].base_stat}
                  bs2={searchedPokemon.stats[1].base_stat}
                  bs3={searchedPokemon.stats[2].base_stat}
                  bs4={searchedPokemon.stats[3].base_stat}
                  bs5={searchedPokemon.stats[4].base_stat}
                  bs6={searchedPokemon.stats[5].base_stat}
                />
              ) : (
                allPokemons.map((pokemon, index) => (
                  <PokemonThumbnail
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other.dream_world.front_default}
                    type={pokemon.types[0].type.name}
                    key={index}
                    height={pokemon.height}
                    weight={pokemon.weight}
                    stat1={pokemon.stats[0].stat.name}
                    stat2={pokemon.stats[1].stat.name}
                    stat3={pokemon.stats[2].stat.name}
                    stat4={pokemon.stats[3].stat.name}
                    stat5={pokemon.stats[4].stat.name}
                    stat6={pokemon.stats[5].stat.name}
                    bs1={pokemon.stats[0].base_stat}
                    bs2={pokemon.stats[1].base_stat}
                    bs3={pokemon.stats[2].base_stat}
                    bs4={pokemon.stats[3].base_stat}
                    bs5={pokemon.stats[4].base_stat}
                    bs6={pokemon.stats[5].base_stat}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
