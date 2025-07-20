import { useEffect, useState } from "react";

// Hook personalizado que mide el tiempo transcurrido desde que inicia el test
export const useTimer = (isRunning: boolean) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    // Si comienza el test y no se ha registrado el tiempo de inicio, lo registramos
    if (isRunning && startTime === null) {
      setStartTime(Date.now());
    }

    // Si ya hay tiempo de inicio, comenzamos a contar cada 100ms
    if (isRunning && startTime !== null) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }

    // Limpiamos el intervalo si cambia alguna dependencia
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const reset = () => {
    setStartTime(null);
    setElapsedTime(0);
  };

  // Devuelve el tiempo transcurrido en minutos
  const getElapsedTimeInMinutes = () => elapsedTime / 60000;

  return {
    elapsedTime,
    getElapsedTimeInMinutes,
    reset,
  };
};
