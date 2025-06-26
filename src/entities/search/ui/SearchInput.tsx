import Search from "@mui/icons-material/Search";
import { TextField, Box, ClickAwayListener } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo } from "react";
import type { JSX } from "react";

import { useSearchInput } from "@entities/search/hooks/useSearchInput";
import SearchInputHistory from "@entities/search/ui/SearchInputHistory";

interface SearchInputProps {
  onEnterPress?: () => void;
}

const SearchInput = memo(({ onEnterPress }: SearchInputProps): JSX.Element => {
  const {
    title,
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
  } = useSearchInput({ onEnterPress });

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <SearchContainer ref={containerRef}>
        <StyledTextField
          inputRef={inputRef}
          fullWidth
          label="프로젝트 제목 검색"
          placeholder="어떤 프로젝트를 찾고 계신가요?"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          variant="outlined"
          autoComplete="off"
          InputProps={{
            startAdornment: <StyledSearchIcon />,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderBottomLeftRadius: showHistory ? 0 : undefined,
              borderBottomRightRadius: showHistory ? 0 : undefined,
            },
          }}
        />

        {showHistory && (
          <SearchInputHistory
            onItemClick={handleHistoryItemClick}
            onClose={handleHistoryClose}
          />
        )}
      </SearchContainer>
    </ClickAwayListener>
  );
});

const SearchContainer = styled(Box)(() => ({
  position: "relative",
  width: "100%",
}));

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

export default SearchInput;
