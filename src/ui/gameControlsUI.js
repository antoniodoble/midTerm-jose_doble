import { validateCardsCount } from "../validacion.js";

export function setupGameControls(onStartGame) {
  const cardsInput = document.querySelector("#cards-count");
  const cardsError = document.querySelector("#cards-error");
  const startBtn = document.querySelector("#start-game-btn");

  if (!cardsInput || !startBtn) return;

  // Validación en tiempo real del input de cartas
  cardsInput.addEventListener("input", () => {
    const validation = validateCardsCount(cardsInput.value);

    if (!validation.isValid) {
      cardsError.textContent = validation.message;
      cardsError.classList.add("visible");
      startBtn.disabled = true;
    } else {
      cardsError.textContent = "";
      cardsError.classList.remove("visible");
      startBtn.disabled = false;
    }
  });

  startBtn.addEventListener("click", () => {
    const validation = validateCardsCount(cardsInput.value);

    if (!validation.isValid) {
      cardsError.textContent = validation.message;
      cardsError.classList.add("visible");
      return;
    }

    const totalCards = Number(cardsInput.value);
    const pairsCount = totalCards / 2;

    onStartGame(totalCards, pairsCount);
  });
}
