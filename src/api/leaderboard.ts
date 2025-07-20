const API_URL = process.env.REACT_APP_API_URL;

export interface ScoreEntry {
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
