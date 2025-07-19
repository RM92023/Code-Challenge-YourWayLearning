const calculateScore = (
  wpm: number,
  wordsTyped: number,
  accuracy: number,
  deletions: number
): number => {
  const rawScore = (wpm * wordsTyped * accuracy) - deletions;
  return Math.max(0, Math.round(rawScore));
};
export default calculateScore;