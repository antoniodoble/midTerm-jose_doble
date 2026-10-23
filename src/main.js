// src/main.js
import "./css/style.css";
import { setupLoginForm } from "./ui/loginUI.js";
import { setupPokemonSearch } from "./ui/searchUI.js";

const app = document.querySelector("#app");

// Renderizar formulario de login y buscador
app.innerHTML = `
  <main class="login-container">
    <h1>PokeMemory</h1>
    <form id="profile-form">
      <div class="form-group">
        <label for="username">Nombre de usuario (3-15 caracteres):</label>
        <input type="text" id="username" minlength="3" maxlength="15" placeholder="Tu nombre..." autocomplete="off" />
        <span id="username-error" class="error-message"></span>
      </div>

      <div class="form-group">
        <label for="pokemon-search">Pokémon Favorito:</label>
        <input type="text" id="pokemon-search" placeholder="Escribe para buscar (ej. pikachu)..." autocomplete="off" />
        <ul id="search-results" class="search-results"></ul>
      </div>

      <div id="selected-pokemon-preview" class="pokemon-preview">
        <p>No se ha seleccionado ningún Pokémon</p>
      </div>

      <button type="submit" id="start-btn" disabled>Crear Perfil</button>
    </form>
  </main>
`;

// 1. Inicializar formulario de perfil
setupLoginForm((userProfile) => {
  console.log("Perfil creado con éxito:", userProfile);
  alert(
    `¡Perfil creado para ${userProfile.username} con ${userProfile.favoritePokemon.name}!`,
  );
});

// 2. Inicializar buscador de Pokémon
const searchInput = document.querySelector("#pokemon-search");
const resultsList = document.querySelector("#search-results");
const previewContainer = document.querySelector("#selected-pokemon-preview");

setupPokemonSearch(
  searchInput,
  resultsList,
  previewContainer,
  (selectedPokemon) => {
    // Pasar el Pokémon seleccionado al formulario de login
    if (window.setSelectedPokemonForProfile) {
      window.setSelectedPokemonForProfile(selectedPokemon);
    }
  },
);
