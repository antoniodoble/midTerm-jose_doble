import { fetchAllPokemonList, fetchPokemonDetails } from "../api.js";

/**
 * Inicializa el buscador predictivo de Pokémon.
 * @param {HTMLElement} searchInput - Input de texto para la búsqueda
 * @param {HTMLElement} resultsList - Elemento <ul> para mostrar las sugerencias
 * @param {HTMLElement} previewContainer - Elemento <div> para mostrar la vista previa
 * @param {Function} onSelectPokemon - Callback con la info del Pokémon seleccionado
 */
export function setupPokemonSearch(
  searchInput,
  resultsList,
  previewContainer,
  onSelectPokemon,
) {
  let allPokemons = [];
  let selectedPokemon = null;

  // Cargar la lista completa de PokeAPI al enfocar el input
  searchInput.addEventListener("focus", async () => {
    if (allPokemons.length === 0) {
      allPokemons = await fetchAllPokemonList();
    }
  });

  // Filtrar sugerencias mientras se escribe (Máximo 5 resultados)
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsList.innerHTML = "";

    if (query.length < 2) {
      return;
    }

    const matches = allPokemons
      .filter((p) => p.name.toLowerCase().includes(query))
      .slice(0, 5); // Lista reducida de coincidencias

    if (matches.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No se encontraron Pokémon";
      li.classList.add("no-results");
      resultsList.appendChild(li);
      return;
    }

    matches.forEach((pokemon) => {
      const li = document.createElement("li");
      li.textContent = pokemon.name;
      li.addEventListener("click", () => handleSelectPokemon(pokemon.name));
      resultsList.appendChild(li);
    });
  });

  // Cargar detalles e imagen del Pokémon seleccionado
  async function handleSelectPokemon(pokemonName) {
    resultsList.innerHTML = "";
    searchInput.value = pokemonName;

    previewContainer.innerHTML = "<p>Cargando Pokémon...</p>";

    const details = await fetchPokemonDetails(pokemonName);

    if (details) {
      selectedPokemon = details;
      previewContainer.innerHTML = `
        <div class="selected-card">
          <img src="${details.image}" alt="${details.name}" />
          <span>${details.name.toUpperCase()}</span>
        </div>
      `;
      onSelectPokemon(details);
    } else {
      previewContainer.innerHTML =
        "<p class='error-message visible'>Error al cargar Pokémon</p>";
    }
  }

  // Ocultar lista si se hace clic fuera del buscador
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsList.contains(e.target)) {
      resultsList.innerHTML = "";
    }
  });
}
