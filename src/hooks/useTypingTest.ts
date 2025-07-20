import { useState } from "react";
import { useTimer } from "./useTimer";

// Hook personalizado que maneja toda la lógica del test de tipeo
export const useTypingTest = (targetText: string) => {
  const wordsArray = targetText.split(" "); // Lista de palabras a escribir

  const [input, setInput] = useState("");
  const [words, setWords] = useState(wordsArray); // Palabras restantes
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [wpm, setWpm] = useState<number | null>(null);
  const [typedCorrect, setTypedCorrect] = useState(""); // Texto correctamente escrito
  const [accuracyVisual, setAccuracyVisual] = useState<number | null>(null); // Precisión sin contar correcciones
  const [accuracyReal, setAccuracyReal] = useState<number | null>(null); // Precisión descontando errores
  const [corrections, setCorrections] = useState<number>(0); // Número de correcciones (backspaces)

  const { getElapsedTimeInMinutes, reset: resetTimer } = useTimer(isStarted);

  // Maneja el input del usuario en tiempo real
  const onInputChange = (value: string) => {
    if (isFinished) return;

    // Inicia el test al primer input
    if (!isStarted) {
      setIsStarted(true);
    }

    // Si el nuevo valor es más corto que el anterior, se considera corrección
    if (value.length < input.length) {
      setCorrections((prev) => prev + 1);
    }

    setInput(value);

    // Si el usuario escribe correctamente una palabra completa
    if (value.trim() === words[0]) {
      setTypedCorrect((prev) => prev + value.trim() + " "); // Acumula la palabra
      setInput(""); // Limpia el input
      setWords((prev) => prev.slice(1)); // Avanza a la siguiente palabra
    }

    // Si era la última palabra y se escribió correctamente
    if (words.length === 1 && value.trim() === words[0]) {
      const finalTyped = typedCorrect + value.trim(); // Texto completo final
      const totalChars = targetText.length;

      // Calcula caracteres correctos en total
      let correctChars = 0;
      for (let i = 0; i < totalChars; i++) {
        if (finalTyped[i] === targetText[i]) {
          correctChars++;
        }
      }

      // Precisión visual: incluye todo lo escrito, sin descontar errores
      const calculatedVisual = correctChars / totalChars;
      setAccuracyVisual(Number((calculatedVisual * 100).toFixed(2)));

      // Precisión real: descuenta correcciones (errores)
      const adjusted = Math.max(0, correctChars - corrections);
      const calculatedReal = adjusted / totalChars;
      setAccuracyReal(Number((calculatedReal * 100).toFixed(2)));

      // Calcula WPM (palabras por minuto) usando la longitud del texto
      const minutes = getElapsedTimeInMinutes();
      const calculatedWPM = Math.floor(finalTyped.length / 5 / minutes);
      setWpm(calculatedWPM);

      setIsFinished(true); // Finaliza el test
    }
  };

  // Reinicia todos los estados y el temporizador
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
