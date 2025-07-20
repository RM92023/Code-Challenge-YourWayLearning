const API_URL = process.env.REACT_APP_API_URL;

export interface ScoreEntry {
  id?: string | number;
  username: string;
  score: number;
  accuracy: number;
  wpm: number;
  words: number;
}

export const saveScore = async (entry: ScoreEntry) => {
  const res = await fetch(`${API_URL}/leaderboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    throw new Error("Error al guardar el puntaje");
  }

  return res.json();
};

export const getTopScores = async (): Promise<ScoreEntry[]> => {
  const res = await fetch(`${API_URL}/leaderboard?_sort=score&_order=desc&_limit=5`);

  if (!res.ok) {
    throw new Error("Error al cargar los puntajes");
  }

  const data: ScoreEntry[] = await res.json();

  return data.sort((a, b) => b.score - a.score);
};
