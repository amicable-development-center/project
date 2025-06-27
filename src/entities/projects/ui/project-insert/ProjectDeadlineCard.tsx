import type { ChangeEvent, CSSProperties, JSX } from "react";

import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectDeadlineCardProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectDeadlineCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectDeadlineCardProps): JSX.Element => {
  return (
    <SimpleFormCard
      title="모집 마감일"
      description="언제까지 팀원을 모집할까요?"
      helpText="충분한 시간을 두고 설정하세요!"
      large={large}
      style={style}
    >
      <input
        type="date"
        name="deadline"
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: large ? 18 : 14,
          borderRadius: 8,
          border: "1px solid #e0e0e0",
          fontSize: 16,
          marginBottom: 8,
          fontFamily: "inherit",
          height: 40,
          boxSizing: "border-box",
          background: "inherit",
        }}
        required
      />
    </SimpleFormCard>
  );
};

export default ProjectDeadlineCard;
