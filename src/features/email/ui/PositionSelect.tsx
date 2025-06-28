import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo, type JSX } from "react";

import { RecruitmentStatus, type Positions } from "@shared/types/project";
import type { UserRole } from "@shared/types/user";

interface PositionSelectProps {
  value: string;
  onChange: (value: string) => void;
  projectPositions: Positions[];
}

// UserRole에 따른 한글 라벨 매핑
const POSITION_LABELS: Record<UserRole, string> = {
  frontend: "프론트엔드 개발자",
  backend: "백엔드 개발자",
  fullstack: "풀스택 개발자",
  designer: "UI/UX 디자이너",
  pm: "프로젝트 매니저",
};

const PositionSelectComponent = ({
  value,
  onChange,
  projectPositions,
}: PositionSelectProps): JSX.Element => {
  // 모집중인 포지션들만 필터링 (status가 undefined이거나 recruiting인 것들)
  const availablePositions = (projectPositions || []).filter(
    (pos) => !pos.status || pos.status === RecruitmentStatus.recruiting
  );

  return (
    <FormControl fullWidth variant="outlined" required>
      <InputLabel>💼 지원 포지션</InputLabel>
      <StyledSelect
        value={value}
        onChange={(e) => onChange(e.target.value as UserRole | "")}
        label="💼 지원 포지션"
        disabled={availablePositions.length === 0}
      >
        {availablePositions.length === 0 ? (
          <MenuItem value="" disabled>
            현재 모집중인 포지션이 없습니다
          </MenuItem>
        ) : (
          availablePositions.map((position, index) => {
            const uniqueValue = `${position.position}-${index}`;
            return (
              <MenuItem key={uniqueValue} value={uniqueValue}>
                {POSITION_LABELS[position.position]} ({position.count}명 모집)
                {position.experience && ` - ${position.experience}`}
              </MenuItem>
            );
          })
        )}
      </StyledSelect>
    </FormControl>
  );
};

const PositionSelect = memo(PositionSelectComponent);

export default PositionSelect;

const StyledSelect = styled(Select)({
  fontSize: "1.4rem",
  fontFamily: "inherit",
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#222",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1976d2",
    borderWidth: "2px",
  },
});
