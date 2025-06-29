import { useEffect, useState } from "react";

interface UseCountUpProps {
  end: number;
  duration?: number;
  start?: number;
  delay?: number;
  enabled?: boolean;
}

export const useCountUp = ({
  end,
  duration = 2000,
  start = 0,
  delay = 0,
  enabled = true,
}: UseCountUpProps): { count: number; isComplete: boolean } => {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      let startTimestamp: number | null = null;
      const startValue = start;
      const endValue = end;

      const step = (timestamp: number): void => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const easeProgress =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const currentValue =
          startValue + (endValue - startValue) * easeProgress;

        let currentCount: number;
        if (progress >= 0.98) {
          currentCount = endValue;
        } else if (progress >= 0.9) {
          currentCount = Math.round(currentValue);
        } else {
          currentCount = Math.floor(currentValue);
        }

        setCount(currentCount);

        if (progress >= 0.98) {
          setCount(endValue);
          setIsComplete(true);
        } else {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, start, delay, enabled]);

  return { count, isComplete };
};
