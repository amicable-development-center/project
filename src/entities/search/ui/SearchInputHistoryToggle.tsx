import { History, HistoryToggleOff } from "@mui/icons-material";
import type { JSX } from "react";

interface SearchInputHistoryToggleProps {
  isHistoryEnabled: boolean;
}

const SearchInputHistoryToggle = ({
  isHistoryEnabled,
}: SearchInputHistoryToggleProps): JSX.Element => {
  return isHistoryEnabled ? (
    <History fontSize="small" />
  ) : (
    <HistoryToggleOff fontSize="small" />
  );
};

export default SearchInputHistoryToggle;
