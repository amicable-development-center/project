import Search from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useCallback, useEffect, memo } from "react";
import type { JSX } from "react";

interface SearchInputSectionProps {
  title: string;
  onTitleChange: (title: string) => void;
}

const SearchInputSection = memo(
  ({ title, onTitleChange }: SearchInputSectionProps): JSX.Element => {
    const [localTitle, setLocalTitle] = useState(title);

    useEffect(() => {
      const timer = setTimeout(() => {
        onTitleChange(localTitle);
        console.log("title", localTitle);
      }, 300);

      return () => clearTimeout(timer);
    }, [localTitle, onTitleChange]);

    useEffect(() => {
      setLocalTitle(title);
    }, [title]);

    const handleTitleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.target.value);
      },
      []
    );

    return (
      <StyledTextField
        fullWidth
        label="프로젝트 제목 검색"
        placeholder="어떤 프로젝트를 찾고 계신가요?"
        value={localTitle}
        onChange={handleTitleChange}
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
