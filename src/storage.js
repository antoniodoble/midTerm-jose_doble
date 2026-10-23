const SESSION_KEY = "pokememory_session";
const RANKING_KEY = "pokememory_ranking";

// --- SessionStorage (Perfil del usuario) ---
export function saveSession(userProfile) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(userProfile));
}

export function getSession() {
  const data = sessionStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// --- LocalStorage (Historial y Ranking) ---
export function getRanking() {
  const data = localStorage.getItem(RANKING_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveGameResult(result) {
  const ranking = getRanking();
  const newEntry = {
    id: crypto.randomUUID(),
    username: result.username,
    favoritePokemon: result.favoritePokemon,
    timeInSeconds: result.timeInSeconds,
    cardsCount: result.cardsCount,
    createdAt: new Date().toISOString(),
  };

  ranking.push(newEntry);

  //  1º Mayor nº de cartas, 2º Menor tiempo
  ranking.sort((a, b) => {
    if (b.cardsCount !== a.cardsCount) {
      return b.cardsCount - a.cardsCount;
    }
    return a.timeInSeconds - b.timeInSeconds;
  });

  localStorage.setItem(RANKING_KEY, JSON.stringify(ranking));
  return newEntry.id;
}
