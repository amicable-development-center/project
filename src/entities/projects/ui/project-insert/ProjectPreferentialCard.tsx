import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type {
  ChangeEvent,
  CSSProperties,
  JSX,
  FocusEvent,
  MouseEvent,
  KeyboardEvent,
} from "react";
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
        <input
          type="text"
          value={newPreferential}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPreferential(e.target.value)
          }
          onKeyUp={handleKeyPress}
          placeholder="예: AWS, Docker, 스타트업 경험..."
          style={{
            flex: 1,
            height: 40,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            fontSize: isMobile
              ? theme.typography.body2.fontSize
              : large
                ? theme.typography.h5.fontSize
                : theme.typography.body1.fontSize,
            fontFamily: theme.typography.fontFamily,
            background: theme.palette.background.paper,
            padding: large ? theme.spacing(2.2) : theme.spacing(1.7),
            boxSizing: "border-box",
            outline: "none",
            transition: "border-color 0.2s ease-in-out",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme.palette.primary.main;
            e.target.style.borderWidth = "2px";
          }}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            e.currentTarget.style.borderColor = theme.palette.divider;
            e.currentTarget.style.borderWidth = "1px";
          }}
          onMouseEnter={(e: MouseEvent<HTMLInputElement>) => {
            if (e.currentTarget !== document.activeElement) {
              e.currentTarget.style.borderColor = "#000000";
            }
          }}
          onMouseLeave={(e: MouseEvent<HTMLInputElement>) => {
            if (e.currentTarget !== document.activeElement) {
              e.currentTarget.style.borderColor = theme.palette.divider;
            }
          }}
        />
        <Button
          variant="contained"
          onClick={addPreferential}
          disabled={!newPreferential.trim()}
          sx={{
            minWidth: 48,
            height: 46,
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
                fontSize: "1.5rem",
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
                  fontSize: "18px",
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
