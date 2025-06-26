import Search from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, memo } from "react";
import type { JSX } from "react";

import {
  useSearchTitle,
  useSearchTitleActions,
} from "@shared/stores/searchStore";

interface SearchInputSectionProps {
  onEnterPress?: () => void;
}

const SearchInputSection = memo(
  ({ onEnterPress }: SearchInputSectionProps): JSX.Element => {
    const title = useSearchTitle();
    const { updateTitle } = useSearchTitleActions();

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnterPress) {
          e.preventDefault();
          onEnterPress();
        }
      },
      [onEnterPress]
    );

    return (
      <StyledTextField
        fullWidth
        label="프로젝트 제목 검색"
        placeholder="어떤 프로젝트를 찾고 계신가요?"
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="outlined"
        InputProps={{
          startAdornment: <StyledSearchIcon />,
        }}
      />
    );
  }
);

const StyledSearchIcon = styled(Search)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1.5),
  fontSize: "1.5rem",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: `0 2px 8px ${theme.palette.action.hover}`,
    },
    "&.Mui-focused": {
      boxShadow: `0 4px 12px ${theme.palette.primary.main}25`,
    },
  },
}));

export default SearchInputSection;
