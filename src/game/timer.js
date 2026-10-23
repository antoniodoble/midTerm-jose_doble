// src/game/timer.js

let timerInterval = null;
let secondsElapsed = 0;

/**
 * Inicia o reinicia el temporizador de la partida.
 * @param {HTMLElement} displayElement Elemento HTML donde renderizar la hora
 */
export function startTimer(displayElement) {
  stopTimer(); // Asegurar cancelar cualquier temporizador previo
  secondsElapsed = 0;
  updateDisplay(displayElement);

  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateDisplay(displayElement);
  }, 1000);
}

/**
 * Detiene el temporizador y devuelve el tiempo final en segundos.
 */
export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  return secondsElapsed;
}

/**
 * Obtiene los segundos transcurridos actualmente.
 */
export function getSecondsElapsed() {
  return secondsElapsed;
}

/**
 * Formatea el tiempo transcurrido en el formato exigido: "Xm Ys"
 */
function updateDisplay(displayElement) {
  if (!displayElement) return;
  const mins = Math.floor(secondsElapsed / 60);
  const secs = secondsElapsed % 60;
  displayElement.textContent = `${mins}m ${secs}s`;
}
