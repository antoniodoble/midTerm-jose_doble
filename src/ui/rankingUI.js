// src/ui/rankingUI.js
import { getRanking } from "../storage.js";

/**
 * Renderiza la tabla de ranking en el contenedor indicado.
 * @param {HTMLElement} container Elemento donde insertar el ranking
 * @param {string|null} lastResultId ID del resultado de la partida recién completada
 */
export function renderRanking(container, lastResultId = null) {
  const ranking = getRanking();

  if (ranking.length === 0) {
    container.innerHTML = `
      <section class="ranking-section">
        <h2>Ranking Global</h2>
        <p class="empty-ranking">Aún no hay partidas registradas. ¡Sé el primero!</p>
      </section>
    `;
    return;
  }

  // Si hay más de 5, tomamos los 5 primeros
  const MAX_VISIBLE = 5;
  const isLongRanking = ranking.length > MAX_VISIBLE;

  const MEDALS = ["🥇", "🥈", "🥉"];

  let visibleEntries = ranking.slice(0, MAX_VISIBLE);
  let lastResultOmitted = false;
  let lastResultData = null;
  let lastResultRank = -1;

  // Si hay registro reciente, verificar si quedó fuera de los 5 primeros
  if (lastResultId) {
    const foundIndex = ranking.findIndex((entry) => entry.id === lastResultId);
    if (foundIndex >= MAX_VISIBLE) {
      lastResultOmitted = true;
      lastResultData = ranking[foundIndex];
      lastResultRank = foundIndex + 1;
    }
  }

  const rowsHTML = visibleEntries
    .map((entry, index) =>
      buildRowHTML(entry, index + 1, entry.id === lastResultId),
    )
    .join("");

  let omittedNoteHTML = "";
  if (isLongRanking) {
    const countOmitted = ranking.length - MAX_VISIBLE;
    omittedNoteHTML = `
      <tr class="omitted-row">
        <td colspan="5">... y ${countOmitted} resultado(s) más omitido(s) por legibilidad ...</td>
      </tr>
    `;
  }

  let lastResultRowHTML = "";
  if (lastResultOmitted && lastResultData) {
    lastResultRowHTML = buildRowHTML(lastResultData, lastResultRank, true);
  }

  container.innerHTML = `
    <section class="ranking-section">
      <h2>Ranking Global</h2>
      <div class="table-responsive">
        <table class="ranking-table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Jugador</th>
              <th>Pokémon</th>
              <th>Tiempo</th>
              <th>Cartas</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
            ${omittedNoteHTML}
            ${lastResultRowHTML}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function buildRowHTML(entry, position, isRecent) {
  const mins = Math.floor(entry.timeInSeconds / 60);
  const secs = entry.timeInSeconds % 60;
  const formattedTime = `${mins}m ${secs}s`;
  const recentClass = isRecent ? "recent-result" : "";

  return `
    <tr class="${recentClass}">
      <td><strong>${MEDALS[position - 1] ?? `#${position}`}</strong></td>
      <td>${escapeHTML(entry.username)}</td>
      <td class="pokemon-cell">
        <img src="${entry.favoritePokemon.image}" alt="${entry.favoritePokemon.name}" width="28" height="28" />
        <span>${escapeHTML(entry.favoritePokemon.name)}</span>
      </td>
      <td>${formattedTime}</td>
      <td>${entry.cardsCount}</td>
    </tr>
  `;
}

function escapeHTML(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        tag
      ] || tag,
  );
}
