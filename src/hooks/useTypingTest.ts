import { useState } from "react";
import { useTimer } from "./useTimer";

export const useTypingTest = (targetText: string) => {
  const wordsArray = targetText.split(" ");

  const [input, setInput] = useState("");
  const [words, setWords] = useState(wordsArray);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [wpm, setWpm] = useState<number | null>(null);

  const {
    getElapsedTimeInMinutes,
    reset: resetTimer,
  } = useTimer(isStarted);

  const onInputChange = (value: string) => {
    if (!isStarted) {
      setIsStarted(true);
    }

    setInput(value.trim());

    if (value.trim() === words[0]) {
      setInput("");
      setWords((prev) => prev.slice(1));
    }

    if (words.length === 1 && value.trim() === words[0]) {
      setIsFinished(true);

      const minutes = getElapsedTimeInMinutes();
      const charsTyped = targetText.length;
      const calculatedWPM = Math.floor((charsTyped / 5) / minutes);
      setWpm(calculatedWPM);
    }
  };

  const reset = () => {
    setInput("");
    setWords(wordsArray);
    setIsFinished(false);
    setIsStarted(false);
    setWpm(null);
    resetTimer();
  };

  return {
    input,
    onInputChange,
    words,
    isFinished,
    isStarted,
    reset,
    wpm,
  };
};
