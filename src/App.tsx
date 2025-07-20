import { useEffect, useState } from "react";
import TypingInput from "./components/TypingInput";
import { useTypingTest } from "./hooks/useTypingTest";
import ControlButtons from "./components/ControlButtons";
import "./App.css";
import TextDisplay from "./components/TextDisplay";
import calculateScore from "./utils/calculateScore";
import SaveScoreModal from "./components/SaveScoreModal";

const App = () => {
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

  const score =
    isFinished && wpm && accuracyReal
      ? calculateScore(
          wpm,
          input.trim().split(" ").length,
          accuracyReal / 100,
          corrections
        )
      : null;

  useEffect(() => {
    if (isFinished && wpm && accuracyReal && score && !scoreSaved) {
      setShowModal(true);
    }
  }, [isFinished, wpm, accuracyReal, score, scoreSaved]);

  return (
    <main className="App">
      <h1>Typing Speed Test</h1>

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

      <div>
        {words.length > 0 && (
          <TextDisplay targetText={words[0]} userInput={input} />
        )}
      </div>

      <TypingInput
        input={input}
        onChange={onInputChange}
        isFinished={isFinished}
      />

      <ControlButtons
        onReset={reset}
        isFinished={isFinished}
        isStarted={isStarted}
      />

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
    </main>
  );
};

export default App;
