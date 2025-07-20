// Calcula el puntaje final usando la fórmula:
// (WPM * Palabras escritas * Precisión) - Correcciones
const calculateScore = (
  wpm: number,
  wordsTyped: number,
  accuracy: number,
  deletions: number
): number => {
  const rawScore = (wpm * wordsTyped * accuracy) - deletions;
  
  // Asegura que el puntaje mínimo sea 0
  return Math.max(0, Math.round(rawScore));
};
export default calculateScore;