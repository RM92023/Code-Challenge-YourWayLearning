import { useEffect, useState } from "react";
import { getTopScores, ScoreEntry } from "../api/leaderboard";

const TopScores = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    getTopScores()
      .then(setScores)
      .catch((err) => console.error("Error al cargar los puntajes", err));
  }, []);

  return (
    <section className="leaderboard">
      <h2>Top 5 Puntajes</h2>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Nombre</th>
            <th>Puntaje</th>
            <th>WPM</th>
            <th>Precisión</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((entry, index) => (
            <tr key={entry.id?.toString() ?? index}>
              <td>{index + 1}</td>
              <td>{entry.username}</td>
              <td>{Math.round(entry.score)}</td>
              <td>{Math.round(entry.wpm)}</td>
              <td>{(entry.accuracy * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TopScores;
