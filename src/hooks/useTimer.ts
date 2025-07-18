import { useEffect, useState } from "react";

export const useTimer = (isRunning: boolean) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && startTime === null) {
      setStartTime(Date.now());
    }

    if (isRunning && startTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const reset = () => {
    setStartTime(null);
    setElapsedTime(0);
  };

  const getElapsedTimeInMinutes = () => elapsedTime / 60000;

  return {
    elapsedTime,
    getElapsedTimeInMinutes,
    reset,
  };
};
