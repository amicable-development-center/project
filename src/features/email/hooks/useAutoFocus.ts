import { useRef, useCallback } from "react";

interface UseAutoFocusOptions {
  isOpen: boolean;
}

interface UseAutoFocusReturn {
  elementRef: React.RefObject<HTMLInputElement | null>;
  handleTransitionEnd: () => void;
}

export const useAutoFocus = ({
  isOpen,
}: UseAutoFocusOptions): UseAutoFocusReturn => {
  const elementRef = useRef<HTMLInputElement>(null);

  const focusElement = useCallback((): void => {
    const input = elementRef.current?.querySelector("input");
    if (input) {
      input.focus();
    }
  }, []);

  const handleTransitionEnd = useCallback((): void => {
    if (isOpen) {
      focusElement();
    }
  }, [isOpen, focusElement]);

  return {
    elementRef,
    handleTransitionEnd,
  };
};

export default useAutoFocus;
