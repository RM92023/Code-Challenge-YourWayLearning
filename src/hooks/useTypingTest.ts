import { useState } from 'react';

export const useTypingTest = (targetText: string) => {
  const wordsArray = targetText.split(" ");

  const [input, setInput] = useState("");
  const [words, setWords] = useState(wordsArray);
  const [isFinished, setIsFinished] = useState(false);

  const onInputChange = (value: string) => {
    setInput(value.trim());

    if (value.trim() === words[0]) {
      setInput("");
      setWords(prev => prev.slice(1));
    }

    if (words.length === 1 && value.trim() === words[0]) {
      setIsFinished(true);
    }
  };

  return {
    input,
    onInputChange,
    words,
    isFinished,
  };
};
