import { useEffect, useState } from "react";

const useCountdown = (start: number, onEnd?: () => void): number => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (count === 0) {
      if (onEnd) onEnd();
      return;
    }
    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onEnd]);

  return count;
};

export default useCountdown;
