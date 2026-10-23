import "./css/style.css";
import { getSession, clearSession } from "./storage.js";
import { setupLoginForm } from "./ui/loginUI.js";
import { setupPokemonSearch } from "./ui/searchUI.js";
import { setupGameControls } from "./ui/gameControlsUI.js";
import { createMemoryGame } from "./game/memoryGame.js";
import { renderRanking } from "./ui/rankingUI.js";
import { stopTimer } from "./game/timer.js";

const app = document.querySelector("#app");

function initApp() {
  const session = getSession();

  if (session) {
    renderGameView(session);
  } else {
    renderLoginView();
  }
}

function renderLoginView() {
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

  const loginControls = setupLoginForm((userProfile) => {
    renderGameView(userProfile);
  });

  const searchInput = document.querySelector("#pokemon-search");
  const resultsList = document.querySelector("#search-results");
  const previewContainer = document.querySelector("#selected-pokemon-preview");

  setupPokemonSearch(
    searchInput,
    resultsList,
    previewContainer,
    (selectedPokemon) => {
      loginControls.setSelectedPokemon(selectedPokemon);
    },
  );
}

function renderGameView(userProfile) {
  app.innerHTML = `
    <header class="game-header">
      <div class="user-info">
        <img src="${userProfile.favoritePokemon.image}" alt="${userProfile.favoritePokemon.name}" width="40" height="40" />
        <span><strong>${userProfile.username}</strong> (${userProfile.favoritePokemon.name})</span>
      </div>
      <button id="logout-btn" class="secondary-btn">Cerrar Sesión</button>
    </header>

    <main class="game-layout">
      <section class="game-controls-panel">
        <h2>Nueva Partida</h2>
        <div class="form-group">
          <label for="cards-count">Número de cartas (par, ej. 4, 8, 12):</label>
          <input type="number" id="cards-count" placeholder="Ej. 8" min="2" max="20" step="2" />
          <span id="cards-error" class="error-message"></span>
        </div>
        <div class="game-actions">
          <button id="start-game-btn" disabled>Iniciar / Reiniciar Partida</button>
          <div class="timer-container">
            <span>Tiempo: </span>
            <strong id="game-timer">0m 0s</strong>
          </div>
        </div>
        <div id="game-status-msg" class="status-msg"></div>
      </section>

      <section id="board-container" class="board-container">
        <p class="placeholder-text">Introduce el número de cartas e inicia la partida para jugar.</p>
      </section>

      <div id="ranking-container"></div>
    </main>
  `;

  // Renderizar el ranking inicialmente (sin resaltado activo)
  const rankingContainer = document.querySelector("#ranking-container");
  renderRanking(rankingContainer);

  // Configurar botón de logout
  document.querySelector("#logout-btn").addEventListener("click", () => {
    stopTimer();
    clearSession();
    initApp();
  });

  // Configurar eventos de inicio/reinicie de partida
  setupGameControls((totalCards, pairsCount) => {
    const statusMsg = document.querySelector("#game-status-msg");
    statusMsg.textContent = "";
    statusMsg.className = "status-msg";

    createMemoryGame({
      userProfile,
      totalCards,
      pairsCount,
      timerElement: document.querySelector("#game-timer"),
      boardElement: document.querySelector("#board-container"),
      onGameEnd: (newResultId, finalTime) => {
        statusMsg.textContent = `¡Felicidades! Completaste la partida en ${Math.floor(finalTime / 60)}m ${finalTime % 60}s.`;
        statusMsg.classList.add("success");

        // Actualizar ranking resaltando la partida finalizada
        renderRanking(rankingContainer, newResultId);
      },
    });
  });
}

initApp();
