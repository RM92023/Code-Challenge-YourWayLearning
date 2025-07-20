import { useState } from "react";
import { useTimer } from "./useTimer";

export const useTypingTest = (targetText: string) => {
  const wordsArray = targetText.split(" ");

  const [input, setInput] = useState("");
  const [words, setWords] = useState(wordsArray);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [wpm, setWpm] = useState<number | null>(null);
  const [typedCorrect, setTypedCorrect] = useState("");
  const [accuracyVisual, setAccuracyVisual] = useState<number | null>(null);
  const [accuracyReal, setAccuracyReal] = useState<number | null>(null);
  const [corrections, setCorrections] = useState<number>(0);

  const { getElapsedTimeInMinutes, reset: resetTimer } = useTimer(isStarted);

  const onInputChange = (value: string) => {
    if (isFinished) return;

    if (!isStarted) {
      setIsStarted(true);
    }

    if (value.length < input.length) {
      setCorrections((prev) => prev + 1);
    }

    setInput(value);

    if (value.trim() === words[0]) {
      setTypedCorrect((prev) => prev + value.trim() + " ");
      setInput("");
      setWords((prev) => prev.slice(1));
    }

    if (words.length === 1 && value.trim() === words[0]) {
      const finalTyped = typedCorrect + value.trim();
      const totalChars = targetText.length;

      let correctChars = 0;
      for (let i = 0; i < totalChars; i++) {
        if (finalTyped[i] === targetText[i]) {
          correctChars++;
        }
      }

      const calculatedVisual = correctChars / totalChars;
      setAccuracyVisual(Number((calculatedVisual * 100).toFixed(2)));

      const adjusted = Math.max(0, correctChars - corrections);
      const calculatedReal = adjusted / totalChars;
      setAccuracyReal(Number((calculatedReal * 100).toFixed(2)));

      const minutes = getElapsedTimeInMinutes();
      const calculatedWPM = Math.floor(finalTyped.length / 5 / minutes);
      setWpm(calculatedWPM);

      setIsFinished(true);
    }
  };

  const reset = () => {
    setInput("");
    setWords(wordsArray);
    setIsFinished(false);
    setIsStarted(false);
    setWpm(null);
    setTypedCorrect("");
    setAccuracyVisual(null);
    setAccuracyReal(null);
    setCorrections(0);
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
    accuracyVisual,
    accuracyReal,
    corrections,
    typedCorrect,
  };
};
