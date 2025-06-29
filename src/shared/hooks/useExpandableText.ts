import { useState, useRef, useEffect } from "react";

interface UseExpandableTextProps {
  text: string;
  maxLines?: number;
}

interface UseExpandableTextReturn {
  isExpanded: boolean;
  shouldShowButton: boolean;
  textRef: React.RefObject<HTMLDivElement | null>;
  handleToggle: () => void;
}

export const useExpandableText = ({
  text,
  maxLines = 10,
}: UseExpandableTextProps): UseExpandableTextReturn => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight
      );
      const maxHeight = lineHeight * maxLines;
      setShouldShowButton(textRef.current.scrollHeight > maxHeight);
    }
  }, [text, maxLines]);

  const handleToggle = (): void => {
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    shouldShowButton,
    textRef,
    handleToggle,
  };
};
