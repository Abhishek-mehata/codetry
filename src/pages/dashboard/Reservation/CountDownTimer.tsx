import { useEffect, useState } from "react";

interface CountDownTimerProps {
  startTimeIso: string | undefined;
  durationMs?: number; // default: 2 hours
  expiredText?: string;
  className?: string;
}

const CountDownTimer = ({
  startTimeIso,
  durationMs = 2 * 60 * 60 * 1000,
  expiredText = "Expired",
  className,
}: CountDownTimerProps) => {
  const [timeLeftMs, setTimeLeftMs] = useState<number>(0);

  useEffect(() => {
    if (!startTimeIso) return;

    const start = new Date(startTimeIso).getTime();
    const endTime = start + durationMs;
    const computeRemaining = () => Math.max(0, endTime - Date.now());

    setTimeLeftMs(computeRemaining());
    const intervalId = window.setInterval(() => {
      const remaining = computeRemaining();
      setTimeLeftMs(remaining);
      if (remaining === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTimeIso, durationMs]);

  const formatTimeLeft = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <span className={className}>
      {timeLeftMs > 0 ? formatTimeLeft(timeLeftMs) : expiredText}
    </span>
  );
};

export default CountDownTimer;


