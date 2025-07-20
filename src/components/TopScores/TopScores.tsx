import { useEffect, useState } from "react";
import { getTopScores, ScoreEntry } from "../../api/leaderboard";
import "./TopScores.css";

const TopScores = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    getTopScores()
      .then(setScores)
      .catch((err) => console.error("Error al cargar los puntajes", err));
  }, []);

  return (
    <section className="leaderboard">
      <h2 className="leaderboard-title">Top 5 Scores</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>WPM</th>
            <th>Accuracy</th>
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
