import { useCallback } from "react";

import {
  useSearchHistory as useSearchHistoryStore,
  useSearchHistoryActions,
  useIsHistoryEnabled,
} from "@shared/stores/searchStore";

interface UseSearchHistoryReturn {
  searchHistory: string[];
  isHistoryEnabled: boolean;
  handleRemoveHistoryItem: (historyItem: string, e: React.MouseEvent) => void;
  handleClearAllHistory: () => void;
  handleToggleHistory: () => void;
  handleHistoryItemClick: (
    historyItem: string,
    onItemClick: (item: string) => void,
    onClose: () => void
  ) => void;
}

export const useSearchHistory = (): UseSearchHistoryReturn => {
  const searchHistory = useSearchHistoryStore();
  const isHistoryEnabled = useIsHistoryEnabled();
  const { clearHistory, removeFromHistory, toggleHistoryEnabled } =
    useSearchHistoryActions();

  const handleRemoveHistoryItem = useCallback(
    (historyItem: string, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      removeFromHistory(historyItem);
    },
    [removeFromHistory]
  );

  const handleClearAllHistory = useCallback(() => {
    clearHistory();
  }, [clearHistory]);

  const handleToggleHistory = useCallback(() => {
    toggleHistoryEnabled();
  }, [toggleHistoryEnabled]);

  const handleHistoryItemClick = useCallback(
    (
      historyItem: string,
      onItemClick: (item: string) => void,
      onClose: () => void
    ) => {
      onItemClick(historyItem);
      onClose();
    },
    []
  );

  return {
    searchHistory,
    isHistoryEnabled,
    handleRemoveHistoryItem,
    handleClearAllHistory,
    handleToggleHistory,
    handleHistoryItemClick,
  };
};
