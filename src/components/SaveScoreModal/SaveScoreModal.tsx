import { useEffect, useState } from "react";
import { saveScore, ScoreEntry } from "../../api/leaderboard";
import "./SaveScoreModal.css";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  scoreData: Omit<ScoreEntry, "username">;
  onClose: () => void;
}

const SaveScoreModal = ({ open, scoreData, onClose }: Props) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setUsername("");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      await saveScore({
        username,
        score: scoreData.score,
        accuracy: scoreData.accuracy,
        wpm: scoreData.wpm,
        words: scoreData.words,
      });

      toast.success("¡Puntaje guardado exitosamente!");
      setLoading(false);
      onClose();
    } catch (err) {
      toast.error("Ocurrió un error al guardar el puntaje.");
      setError("Error al guardar el puntaje.");
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Guardar puntaje</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <button onClick={onClose} disabled={loading}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default SaveScoreModal;
