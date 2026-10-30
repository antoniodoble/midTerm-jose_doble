// src/api.js

const BASE_URL = "https://pokeapi.co/api/v2";

const MAX_ANIMATED_POKEMON_ID = 649;

let allPokemonList = [];

/**
 * Obtiene la lista completa de Pokémon para el buscador en tiempo real
 */
export async function fetchAllPokemonList() {
  if (allPokemonList.length > 0) return allPokemonList;
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
    const data = await response.json();
    allPokemonList = data.results;
    return allPokemonList;
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
}

/**
 * Obtiene los detalles (nombre e imagen) de un Pokémon específico
 */
export async function fetchPokemonDetails(identifier) {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon/${identifier.toLowerCase()}`,
    );
    if (!response.ok) throw new Error("Pokémon no encontrado");
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image:
        data.sprites.other?.["official-artwork"]?.front_default ||
        data.sprites.front_default,
    };
  } catch (error) {
    console.error(`Error fetching details for ${identifier}:`, error);
    return null;
  }
}

/**
 * Obtiene un array de N Pokémon aleatorios y únicos para las parejas del juego
 */
export async function getRandomPokemonPairs(numPairs) {
  const list = await fetchAllPokemonList();
  if (list.length === 0) return [];

  const selectedIndices = new Set();
  while (selectedIndices.size < numPairs) {
    const randomIndex = Math.floor(Math.random() * list.length);
    selectedIndices.add(randomIndex);
  }

  const pokemonPromises = Array.from(selectedIndices).map((index) =>
    fetchPokemonDetails(list[index].name),
  );

  const pokemons = await Promise.all(pokemonPromises);
  return pokemons.filter((p) => p !== null);
}

/**
 * Obtiene un Pokémon aleatorio con su sprite animado (GIF).
 * Los sprites animados de PokeAPI solo existen hasta la generación V (id 649).
 */
export async function fetchRandomAnimatedSprite() {
  const id = Math.floor(Math.random() * MAX_ANIMATED_POKEMON_ID) + 1;
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");
    const data = await response.json();
    const animated =
      data.sprites.versions?.["generation-v"]?.["black-white"]?.animated
        ?.front_default;
    return { name: data.name, image: animated || data.sprites.front_default };
  } catch (error) {
    console.error("Error fetching animated sprite:", error);
    return null;
  }
}
