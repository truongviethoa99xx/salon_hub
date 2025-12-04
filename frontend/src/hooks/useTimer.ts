// apps/web/src/hooks/useTimer.ts
import { useState, useEffect } from 'react';

// Calculates the time difference and formats it as MM:SS
const formatTime = (startTime: Date): string => {
  const now = new Date();
  const diffSeconds = Math.round((now.getTime() - startTime.getTime()) / 1000);
  
  if (diffSeconds < 0) return '00:00';

  const minutes = Math.floor(diffSeconds / 60);
  const seconds = diffSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
};

export const useTimer = (startTime: string | Date | undefined) => {
  const [elapsedTime, setElapsedTime] = useState('00:00');

  useEffect(() => {
    if (!startTime) return;

    const startDate = new Date(startTime);
    const timerId = setInterval(() => {
      setElapsedTime(formatTime(startDate));
    }, 1000);

    return () => clearInterval(timerId);
  }, [startTime]);

  return elapsedTime;
};
