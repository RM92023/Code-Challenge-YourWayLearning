import TypingInput from "./components/TypingInput";
import { useTypingTest } from "./hooks/useTypingTest";
import ControlButtons from "./components/ControlButtons";
import "./App.css";
import TextDisplay from "./components/TextDisplay";

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
  } = useTypingTest("This is the sentence to type");

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
    </main>
  );
};

export default App;
