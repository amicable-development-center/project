import { useCallback, useState, useRef } from "react";

import {
  useSearchTitle,
  useSearchTitleActions,
  useSearchHistoryActions,
} from "@shared/stores/searchStore";

interface UseSearchInputReturn {
  title: string;
  isHistoryOpen: boolean;
  isFocused: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  showHistory: boolean;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleHistoryItemClick: (historyItem: string) => void;
  handleHistoryClose: () => void;
  handleClickAway: (event: Event | React.SyntheticEvent) => void;
  updateTitle: (title: string) => void;
}

interface UseSearchInputProps {
  onEnterPress?: () => void;
}

export const useSearchInput = ({
  onEnterPress,
}: UseSearchInputProps): UseSearchInputReturn => {
  const title = useSearchTitle();
  const { updateTitle } = useSearchTitleActions();
  const { addToHistory } = useSearchHistoryActions();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onEnterPress) {
        e.preventDefault();
        if (title.trim()) {
          addToHistory(title);
        }
        onEnterPress();
        setIsHistoryOpen(false);
      } else if (e.key === "Escape") {
        setIsHistoryOpen(false);
        inputRef.current?.blur();
      }
    },
    [onEnterPress, title, addToHistory]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setIsHistoryOpen(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  }, []);

  const handleHistoryItemClick = useCallback(
    (historyItem: string) => {
      updateTitle(historyItem);
      inputRef.current?.focus();
    },
    [updateTitle]
  );

  const handleHistoryClose = useCallback(() => {
    setIsHistoryOpen(false);
  }, []);

  const handleClickAway = useCallback((event: Event | React.SyntheticEvent) => {
    const target = event.target as Element;

    const isInsideDropdown =
      target?.closest("[data-history-dropdown]") ||
      target?.hasAttribute("data-history-dropdown") ||
      target?.parentElement?.closest("[data-history-dropdown]") ||
      containerRef.current?.contains(target as Node);

    if (isInsideDropdown) {
      return;
    }

    setIsHistoryOpen(false);
  }, []);

  const showHistory = isHistoryOpen && isFocused;

  return {
    title,
    isHistoryOpen,
    isFocused,
    inputRef,
    containerRef,
    showHistory,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handleHistoryItemClick,
    handleHistoryClose,
    handleClickAway,
    updateTitle,
  };
};
