import { getRandomPokemonPairs } from "../api.js";
import { startTimer, stopTimer } from "./timer.js";
import { saveGameResult } from "../storage.js";

const BOARD_ROWS = 2;

let state = {
  userProfile: null,
  totalCards: 0,
  cardsData: [],
  flippedCards: [], // Guardará los elementos DOM seleccionados
  matchedPairs: 0,
  isChecking: false, // Bloqueo para evitar 3ª carta
  timerElement: null,
  boardElement: null,
  onGameEndCallback: null,
};

/**
 * Inicializa y arranca una nueva partida de Memory.
 */
export async function createMemoryGame({
  userProfile,
  totalCards,
  pairsCount,
  timerElement,
  boardElement,
  onGameEnd,
}) {
  // 1. Resetear estados previos
  stopTimer();
  state = {
    userProfile,
    totalCards,
    cardsData: [],
    flippedCards: [],
    matchedPairs: 0,
    isChecking: false,
    timerElement,
    boardElement,
    onGameEndCallback: onGameEnd,
  };

  boardElement.innerHTML = `<p class="loading-text">Cargando cartas de PokeAPI...</p>`;

  // 2. Obtener Pokémon aleatorios y duplicarlos
  const pokemons = await getRandomPokemonPairs(pairsCount);
  if (pokemons.length === 0) {
    boardElement.innerHTML = `<p class="error-message visible">Error al cargar las cartas. Inténtalo de nuevo.</p>`;
    return;
  }

  const deck = [...pokemons, ...pokemons].map((p, index) => ({
    uid: `card-${index}-${Math.random()}`,
    id: p.id,
    name: p.name,
    image: p.image,
  }));

  // Barajar mazo
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  state.cardsData = deck;
  renderBoard();
  startTimer(timerElement);
}

function renderBoard() {
  state.boardElement.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "cards-grid";
  grid.style.setProperty("--columns", state.totalCards / BOARD_ROWS);

  state.cardsData.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className = "memory-card";
    cardEl.dataset.id = card.id;
    cardEl.dataset.uid = card.uid;

    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
        </div>
        <div class="card-back">
          <img src="${card.image}" alt="${card.name}" draggable="false" />
          <span>${card.name}</span>
        </div>
      </div>
    `;

    cardEl.addEventListener("click", () => handleCardClick(cardEl));
    grid.appendChild(cardEl);
  });

  state.boardElement.appendChild(grid);
}

function handleCardClick(cardEl) {
  // Ignorar clic si estamos comprobando 2 cartas, o la carta ya está volteada/encontrada
  if (
    state.isChecking ||
    cardEl.classList.contains("flipped") ||
    cardEl.classList.contains("matched")
  ) {
    return;
  }

  // Voltear la carta
  cardEl.classList.add("flipped");
  state.flippedCards.push(cardEl);

  // Si ya tenemos dos cartas volteadas, comprobar
  if (state.flippedCards.length === 2) {
    checkPair();
  }
}

function checkPair() {
  state.isChecking = true; // Bloquear selección de 3ª carta
  const [card1, card2] = state.flippedCards;

  const isMatch = card1.dataset.id === card2.dataset.id;

  if (isMatch) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    state.matchedPairs++;
    state.flippedCards = [];
    state.isChecking = false;

    // ¿Partida finalizada?
    if (state.matchedPairs === state.totalCards / 2) {
      handleGameComplete();
    }
  } else {
    // Si no son iguales, devolver la vuelta tras 900ms
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      state.flippedCards = [];
      state.isChecking = false;
    }, 900);
  }
}

function handleGameComplete() {
  const finalTime = stopTimer();

  const gameResult = {
    username: state.userProfile.username,
    favoritePokemon: state.userProfile.favoritePokemon,
    timeInSeconds: finalTime,
    cardsCount: state.totalCards,
  };

  const newResultId = saveGameResult(gameResult);

  if (state.onGameEndCallback) {
    state.onGameEndCallback(newResultId, finalTime);
  }
}
