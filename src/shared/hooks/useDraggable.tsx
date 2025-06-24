import { useRef, useCallback } from "react";

interface ReturnTypes<T> {
  scrollRef: React.RefObject<T | null>;
  handleMouseDown: (e: React.MouseEvent) => void;
}

const useDraggable = <T extends HTMLDivElement | null>(): ReturnTypes<T> => {
  const scrollRef = useRef<T>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent): void => {
    const slider = scrollRef.current;
    if (!slider) return;

    e.preventDefault();

    let isDown = true;
    let startX = e.pageX;
    let scrollLeft = slider.scrollLeft;
    let hasMoved = false;

    slider.style.cursor = "grabbing";
    slider.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDown) return;
      e.preventDefault();

      hasMoved = true;
      const x = e.pageX;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = (): void => {
      isDown = false;

      slider.style.cursor = "grab";
      slider.style.userSelect = "";

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      if (hasMoved) {
        const preventClick = (e: Event): void => {
          e.stopPropagation();
          e.preventDefault();
        };

        slider.addEventListener("click", preventClick, { once: true });
        setTimeout(() => {
          slider.removeEventListener("click", preventClick);
        }, 0);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  return {
    scrollRef,
    handleMouseDown,
  };
};

export default useDraggable;
