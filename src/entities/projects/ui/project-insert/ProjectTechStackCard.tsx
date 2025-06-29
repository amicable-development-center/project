import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX, KeyboardEvent } from "react";
import { useState } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectTechStackCardProps {
  value: string[];
  onChange: (value: string[]) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectTechStackCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectTechStackCardProps): JSX.Element => {
  const theme = useTheme();
  const [newTech, setNewTech] = useState("");

  const addTech = (): void => {
    if (newTech.trim() && !value.includes(newTech.trim())) {
      onChange([...value, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (techToRemove: string): void => {
    onChange(value.filter((tech) => tech !== techToRemove));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech();
    }
  };

  return (
    <SimpleFormCard
      title="기술 스택"
      description="어떤 기술을 사용할 예정인가요? 확실하지 않아도 괜찮아요!"
      helpText="사용할 기술들을 추가해주세요 (최소 1개 이상)"
      large={large}
      style={style}
    >
      {/* 입력 + 추가 버튼 */}
      <Box display="flex" gap={1} mb={2}>
        <Box
          component="input"
          type="text"
          value={newTech}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTech(e.target.value)
          }
          onKeyUp={handleKeyPress}
          placeholder="React, Python, Figma... 뭐든 좋아요!"
          sx={{
            flex: 1,
            height: { xs: "40px !important", sm: "48px !important" },
            borderRadius: "8px",
            border: `1px solid #c9c9c9`,
            fontSize: {
              xs: "16px",
              sm: "17px",
              md: "18px",
            },
            fontFamily: theme.typography.fontFamily,
            background: "none",
            padding: large ? theme.spacing(1.5) : theme.spacing(1),
            boxSizing: "border-box",
            outline: "none",
            transition: "border-color 0.2s ease-in-out",
            lineHeight: "normal",
            minHeight: "unset",

            "&::placeholder": {
              fontSize: {
                xs: "16px",
                sm: "17px",
                md: "18px",
              },
              color: "#999",
            },

            "&:focus": {
              borderColor: theme.palette.primary.main,
              borderWidth: "2px",
            },

            "&:hover:not(:focus)": {
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={addTech}
          disabled={!newTech.trim()}
          sx={{
            minWidth: 48,
            height: { xs: "40px !important", sm: "48px !important" },
            backgroundColor: "#2563EB",
            "&:hover": { backgroundColor: "#1d4ed8" },
          }}
        >
          <AddIcon />
        </Button>
      </Box>

      {/* 기술 태그들 */}
      {value.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={1}>
          {value.map((tech, index) => (
            <Box
              key={index}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                backgroundColor: theme.palette.grey[100],
                borderRadius: 2,
                fontSize: {
                  xs: "16px",
                  sm: "17px",
                  md: "18px",
                },
                color: theme.palette.text.primary,
              }}
            >
              <span>{tech}</span>
              <Box
                component="button"
                onClick={() => removeTech(tech)}
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "100%",
                  border: "none",
                  color: theme.palette.text.primary,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontSize: {
                    xs: "16px",
                    sm: "17px",
                    md: "18px",
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </SimpleFormCard>
  );
};

export default ProjectTechStackCard;
