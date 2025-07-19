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
  } = useTypingTest("This is the sentence to type");

  return (
    <main className="App">
      <h1>Typing Speed Test</h1>

      <h3>
        {isFinished
          ? `Test Completed! WPM: ${wpm}`
          : "Type the following:"}
      </h3>

      <p>{words.length > 0 && (
  <TextDisplay targetText={words[0]} userInput={input} />
)}
</p>

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
