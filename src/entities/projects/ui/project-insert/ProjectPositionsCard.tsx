import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { CSSProperties, JSX } from "react";

import type { Positions } from "@shared/types/project";
import type { UserRole } from "@shared/types/user";
import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectPositionsCardProps {
  value: Positions[];
  onChange: (value: Positions[]) => void;
  large?: boolean;
  style?: CSSProperties;
}

const USER_ROLES = [
  { value: "프론트엔드 개발자", label: "프론트엔드 개발자" },
  { value: "백엔드 개발자", label: "백엔드 개발자" },
  { value: "풀스택 개발자", label: "풀스택 개발자" },
  { value: "디자이너", label: "디자이너" },
  { value: "프로덕트 매니저", label: "프로덕트 매니저" },
];

const EXPERIENCE_OPTIONS = [
  { value: "주니어 (3년 이하)", label: "주니어 (3년 이하)" },
  { value: "미들 (3년 이상 10년 이하)", label: "미들 (3년 이상 10년 이하)" },
  { value: "시니어 (10년 이상)", label: "시니어 (10년 이상)" },
];

const ProjectPositionsCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectPositionsCardProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 초기 포지션이 없을 때 하나 추가
  const positions = value.length > 0 ? value : [];

  // 포지션 추가
  const addPosition = (): void => {
    const newPosition: Positions = {
      position: "" as UserRole,
      count: 1,
      experience: "",
      applicants: [],
    };
    onChange([...value, newPosition]);
  };

  // 포지션 삭제
  const removePosition = (index: number): void => {
    const newPositions = value.filter((_, i) => i !== index);
    onChange(newPositions);
  };

  // 포지션 수정 - 타입 안전성 개선
  const updatePosition = (
    index: number,
    field: keyof Positions,
    newValue: string | number
  ): void => {
    const newPositions = [...value];
    if (index < newPositions.length) {
      newPositions[index] = { ...newPositions[index], [field]: newValue };
      onChange(newPositions);
    }
  };

  // 최소 하나의 포지션이 없으면 추가
  if (positions.length === 0) {
    setTimeout(() => addPosition(), 0);
    return <div>Loading...</div>;
  }

  return (
    <SimpleFormCard
      title="모집 포지션"
      description="어떤 역할의 팀원이 필요한가요?"
      helpText="최소 1개 이상의 포지션을 추가해주세요"
      large={large}
      style={style}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {/* 포지션 목록 */}
        {positions.map((position, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1.5fr auto",
              gap: 2,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            {/* 포지션 선택 */}
            <FormControl size="small" fullWidth>
              <InputLabel>포지션</InputLabel>
              <Select
                value={position.position || ""}
                onChange={(e: SelectChangeEvent<string>) =>
                  updatePosition(index, "position", e.target.value)
                }
                label="포지션"
              >
                <MenuItem value="" disabled>
                  포지션을 선택하세요
                </MenuItem>
                {USER_ROLES.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 인원 수 */}
            <FormControl size="small" fullWidth>
              <InputLabel>인원</InputLabel>
              <Select
                value={position.count.toString()}
                onChange={(e: SelectChangeEvent<string>) =>
                  updatePosition(index, "count", parseInt(e.target.value))
                }
                label="인원"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num.toString()}>
                    {num}명
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 경력 요구사항 */}
            <FormControl size="small" fullWidth>
              <InputLabel>경력</InputLabel>
              <Select
                value={position.experience || ""}
                onChange={(e: SelectChangeEvent<string>) =>
                  updatePosition(index, "experience", e.target.value)
                }
                label="경력"
              >
                <MenuItem value="" disabled>
                  경력을 선택하세요
                </MenuItem>
                {EXPERIENCE_OPTIONS.map((exp) => (
                  <MenuItem key={exp.value} value={exp.value}>
                    {exp.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 삭제 버튼 */}
            <IconButton
              onClick={() => removePosition(index)}
              color="error"
              size="small"
              disabled={positions.length <= 1}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Box>
        ))}

        {/* 포지션 추가 버튼 */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="text"
            startIcon={<AddIcon />}
            onClick={addPosition}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 3,
              border: `2px dashed ${theme.palette.primary.main}40`,
              color: theme.palette.primary.main,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}08`,
                border: `2px dashed ${theme.palette.primary.main}`,
                transform: "scale(1.02)",
              },
            }}
          >
            새 포지션 추가
          </Button>
        </Box>
      </Box>
    </SimpleFormCard>
  );
};

export default ProjectPositionsCard;
