import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ChangeEvent, CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectRequirementsCardProps {
  value: string[];
  large?: boolean;
  style?: CSSProperties;
  onChange: (value: string[]) => void;
}

const ProjectRequirementsCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectRequirementsCardProps): JSX.Element => {
  const theme = useTheme();

  const displayValue = value;

  const handleInputChange = (index: number, newValue: string): void => {
    const newArr = [...displayValue];
    newArr[index] = newValue;
    onChange(newArr);
  };

  const addInput = (): void => {
    onChange([...displayValue, ""]);
  };

  const removeInput = (index: number): void => {
    if (displayValue.length <= 1) return;
    const newArr = displayValue.filter((_, i) => i !== index);
    onChange(newArr);
  };

  return (
    <SimpleFormCard
      title="지원 요구사항"
      description="팀원에게 바라는 필수 조건들을 적어주세요"
      helpText="필수 조건들을 하나씩 추가해주세요 (최소 1개 이상)"
      large={large}
      style={style}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {displayValue.map((requirement, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: 1,
              px: 0,
              py: 0,
            }}
          >
            <TextField
              value={requirement}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, e.target.value)
              }
              placeholder="예: 주 2-3회 온라인 미팅 참여 가능"
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: { xs: 36, sm: 48 },
                  fontSize: {
                    xs: "16px",
                    sm: "17px",
                    md: "18px",
                  },
                  fontFamily: theme.typography.fontFamily,
                  background: "none",
                  border: "none",

                  // 호버 시 테두리 검정색
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.text.primary,
                  },
                  // 포커스 시 테두리 primary 색상
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                    borderWidth: "2px",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: large ? theme.spacing(1.5) : theme.spacing(1),
                  "&::placeholder": {
                    fontSize: {
                      xs: "16px",
                      sm: "17px",
                      md: "18px",
                    },
                    color: "#999",
                  },
                },
              }}
            />

            <IconButton
              onClick={() => removeInput(index)}
              color="error"
              size="small"
              disabled={displayValue.length <= 1}
              sx={{
                ml: 0.5,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Box>
        ))}
        <Box display="flex" justifyContent="center">
          <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={addInput}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2,
              borderStyle: "dashed",
              borderWidth: "2px",
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}08`,
                transform: "scale(1.02)",
              },
            }}
          >
            입력란 추가
          </Button>
        </Box>
      </Box>
    </SimpleFormCard>
  );
};

export default ProjectRequirementsCard;
