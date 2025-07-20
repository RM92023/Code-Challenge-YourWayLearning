import { useEffect, useState } from "react";
import TypingInput from "./components/TypingInput/TypingInput";
import { useTypingTest } from "./hooks/useTypingTest";
import ControlButtons from "./components/ControlButtons/ControlButtons";
import "./App.css";
import TextDisplay from "./components/TextDisplay/TextDisplay";
import calculateScore from "./utils/calculateScore";
import SaveScoreModal from "./components/SaveScoreModal/SaveScoreModal";
import TopScores from "./components/TopScores/TopScores";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Componente principal que organiza y renderiza toda la aplicación
const App = () => {
  // Hook que contiene la lógica principal del test
  const {
    input,
    onInputChange,
    words,
    isFinished,
    isStarted,
    reset,
    wpm,
    accuracyReal,
    corrections,
    typedCorrect,
  } = useTypingTest("This is the sentence to type");

  const [showModal, setShowModal] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);

  // Calcula el puntaje final una vez que termina el test
  const score =
    isFinished && wpm && accuracyReal
      ? calculateScore(
          wpm,
          input.trim().split(" ").length,
          accuracyReal / 100,
          corrections
        )
      : null;

  // Muestra el modal cuando el test termina y el puntaje aún no ha sido guardado
  useEffect(() => {
    if (isFinished && wpm && accuracyReal && score && !scoreSaved) {
      setShowModal(true);
    }
  }, [isFinished, wpm, accuracyReal, score, scoreSaved]);

  return (
    <main className="App">
      <h1>Typing Speed Test</h1>

      {/* Resultado final mostrado al terminar el test */}
      <h3>
        {isFinished && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-green-600">
              Test finalizado
            </p>
            <p className="text-md">
              WPM: <strong>{wpm}</strong>
            </p>
            <p className="text-md">
              Precisión: <strong>{accuracyReal}%</strong>
            </p>
            <p className="text-md">
              Puntuación: <strong>{score}</strong>
            </p>
          </div>
        )}
      </h3>

      {/* Muestra palabra actual y progreso */}
      <div>
        {words.length > 0 && (
          <TextDisplay targetText={words[0]} userInput={input} />
        )}
      </div>

      {/* Input principal de tipeo */}
      <TypingInput
        input={input}
        onChange={onInputChange}
        isFinished={isFinished}
      />

      {/* Botones para reiniciar o cancelar */}
      <ControlButtons
        onReset={() => {
          reset();
          setScoreSaved(false);
        }}
        isFinished={isFinished}
        isStarted={isStarted}
      />

      {/* Modal para guardar el puntaje */}
      <SaveScoreModal
        open={showModal}
        scoreData={{
          score: score || 0,
          accuracy: (accuracyReal || 0) / 100,
          wpm: wpm || 0,
          words: typedCorrect.trim().split(" ").length,
        }}
        onClose={() => {
          setShowModal(false);
          setScoreSaved(true);
        }}
      />

      {/* Tabla de mejores puntajes */}
      <TopScores />

      {/* Contenedor de notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </main>
  );
};

export default App;
