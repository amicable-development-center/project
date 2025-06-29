import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX, KeyboardEvent } from "react";
import { useState } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectPreferentialCardProps {
  value: string[];
  onChange: (value: string[]) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectPreferentialCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectPreferentialCardProps): JSX.Element => {
  const theme = useTheme();
  const [newPreferential, setNewPreferential] = useState("");

  const addPreferential = (): void => {
    if (newPreferential.trim() && !value.includes(newPreferential.trim())) {
      onChange([...value, newPreferential.trim()]);
      setNewPreferential("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPreferential();
    }
  };

  const removePreferential = (preferentialToRemove: string): void => {
    onChange(value.filter((pref) => pref !== preferentialToRemove));
  };

  return (
    <SimpleFormCard
      title="우대사항"
      description="있으면 좋은 기술이나 경험이 있나요?"
      helpText="있으면 더 좋은 조건들을 적어주세요 (최소 1개 이상)"
      large={large}
      style={style}
    >
      {/* 입력 + 추가 버튼 */}
      <Box display="flex" gap={1} mb={2}>
        <Box
          component="input"
          type="text"
          value={newPreferential}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPreferential(e.target.value)
          }
          onKeyUp={handleKeyPress}
          placeholder="예: AWS, Docker, 스타트업 경험..."
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
          onClick={addPreferential}
          disabled={!newPreferential.trim()}
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

      {/* 우대사항 태그들 */}
      {value.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={1}>
          {value.map((preferential, index) => (
            <Box
              key={index}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                backgroundColor: theme.palette.grey[100],
                borderRadius: "999px",
                fontSize: {
                  xs: "16px",
                  sm: "17px",
                  md: "18px",
                },
                color: theme.palette.text.primary,
              }}
            >
              <span>{preferential}</span>
              <Box
                component="button"
                onClick={() => removePreferential(preferential)}
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

export default ProjectPreferentialCard;
