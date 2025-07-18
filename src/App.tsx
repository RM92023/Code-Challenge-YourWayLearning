import TypingInput from "./components/TypingInput";
import { useTypingTest } from "./hooks/useTypingTest";
import "./App.css";
import ControlButtons from "./components/ControlButtons";

const App = () => {
  const { input, onInputChange, words, isFinished, reset } = useTypingTest("This is the sentence to type");

  return (
    <main className="App">
      <h1>Typing Speed Test</h1>
      <h3>{isFinished ? "Test Completed!" : "Type the following:"}</h3>

      <p>
        {words.join(" ") + " "}
      </p>

      <TypingInput
        input={input}
        onChange={onInputChange}
        isFinished={isFinished}
      />
      <ControlButtons onReset={reset} isFinished={isFinished} />
    </main>
  );
};

export default App;
