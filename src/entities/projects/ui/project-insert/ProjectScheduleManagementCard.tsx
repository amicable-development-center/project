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
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { CSSProperties, JSX, ChangeEvent } from "react";

import type { ProjectSchedule } from "@shared/types/schedule";
import { ExpectedPeriod } from "@shared/types/schedule";
import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectScheduleManagementCardProps {
  value: ProjectSchedule[];
  onChange: (value: ProjectSchedule[]) => void;
  large?: boolean;
  style?: CSSProperties;
}

const PERIOD_OPTIONS = [
  { value: ExpectedPeriod.oneMonth, label: "1개월" },
  { value: ExpectedPeriod.twoMonths, label: "2개월" },
  { value: ExpectedPeriod.threeMonths, label: "3개월" },
  { value: ExpectedPeriod.fourMonths, label: "4개월" },
  { value: ExpectedPeriod.sixMonths, label: "6개월" },
  { value: ExpectedPeriod.moreThanSixMonths, label: "6개월 이상" },
];

const INIT_SCHEDULE: ProjectSchedule = {
  stageName: "",
  period: ExpectedPeriod.oneMonth,
  description: "",
};

const ProjectScheduleManagementCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectScheduleManagementCardProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 비어있을 때 기본 일정 1개 추가
  const schedules = value.length === 0 ? [INIT_SCHEDULE] : value;

  // 일정 추가
  const addSchedule = (): void => {
    const newSchedule: ProjectSchedule = { ...INIT_SCHEDULE };
    onChange([...value, newSchedule]);
  };

  // 일정 삭제
  const removeSchedule = (index: number): void => {
    const currentSchedules = value.length === 0 ? [INIT_SCHEDULE] : value;
    const newSchedules = currentSchedules.filter((_, i) => i !== index);
    onChange(newSchedules);
  };

  // 일정 수정
  const updateSchedule = (
    index: number,
    field: keyof ProjectSchedule,
    newValue: string | ExpectedPeriod
  ): void => {
    const currentSchedules = value.length === 0 ? [INIT_SCHEDULE] : value;
    const newSchedules = [...currentSchedules];

    if (index < newSchedules.length) {
      newSchedules[index] = { ...newSchedules[index], [field]: newValue };
      onChange(newSchedules);
    }
  };

  return (
    <SimpleFormCard
      title="프로젝트 일정"
      description="프로젝트를 어떤 단계로 나누어 진행할 예정인가요?"
      helpText="단계별로 나누어 계획하면 팀원들이 더 잘 이해할 수 있어요"
      large={large}
      style={style}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {/* 일정 목록 */}
        <Box display="flex" flexDirection="column" gap={2}>
          {schedules.map((schedule, index) => (
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
              {/* 단계명 */}
              <TextField
                size="small"
                label="단계명"
                placeholder="기획 및 설계"
                value={schedule.stageName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateSchedule(index, "stageName", e.target.value)
                }
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.text.primary,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: "2px",
                    },
                  },
                }}
              />

              {/* 기간 선택 */}
              <FormControl size="small" fullWidth>
                <InputLabel>기간</InputLabel>
                <Select<ExpectedPeriod>
                  value={schedule.period}
                  onChange={(e: SelectChangeEvent<ExpectedPeriod>) =>
                    updateSchedule(
                      index,
                      "period",
                      e.target.value as ExpectedPeriod
                    )
                  }
                  label="기간"
                >
                  {PERIOD_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* 설명 */}
              <TextField
                size="small"
                label="설명"
                placeholder="요구사항 분석 및 기술 스택 선정"
                value={schedule.description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateSchedule(index, "description", e.target.value)
                }
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.text.primary,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                      borderWidth: "2px",
                    },
                  },
                }}
              />

              {/* 삭제 버튼 */}
              <IconButton
                onClick={() => removeSchedule(index)}
                color="error"
                size="small"
                disabled={schedules.length <= 1}
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
        </Box>

        {/* 일정 추가 버튼 */}
        <Box display="flex" justifyContent="center" mt={1}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addSchedule}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 3,
              borderStyle: "dashed",
              borderWidth: "2px",
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}08`,
                borderStyle: "dashed",
                borderWidth: "2px",
                borderColor: theme.palette.primary.main,
                transform: "scale(1.02)",
              },
            }}
          >
            새 일정 단계 추가
          </Button>
        </Box>
      </Box>
    </SimpleFormCard>
  );
};

export default ProjectScheduleManagementCard;
