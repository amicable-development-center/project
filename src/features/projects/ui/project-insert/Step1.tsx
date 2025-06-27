import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import type { JSX } from "react";

import ProjectCategoryCard from "@entities/projects/ui/project-insert/ProjectCategoryCard";
import ProjectDeadlineCard from "@entities/projects/ui/project-insert/ProjectDeadlineCard";
import ProjectOneLineCard from "@entities/projects/ui/project-insert/ProjectOneLineCard";
import ProjectSimpleDescCard from "@entities/projects/ui/project-insert/ProjectSimpleDescCard";
import ProjectTitleCard from "@entities/projects/ui/project-insert/ProjectTitleCard";

import { formatDate } from "@shared/libs/utils/projectDetail";
import type { ProjectItemInsertReq } from "@shared/types/project";

type SetpType = Pick<
  ProjectItemInsertReq,
  "title" | "oneLineInfo" | "category" | "closedDate" | "simpleInfo"
>;

interface Step1Props {
  form: SetpType;
  onChangeForm: {
    title: (e: React.ChangeEvent<HTMLInputElement>) => void;
    oneLineInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
    simpleInfo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    category: (category: string) => void;
    closedDate: (date: string) => void;
  };
}

const Step1 = ({ form, onChangeForm }: Step1Props): JSX.Element => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StepBox>
      <ProjectTitleCard
        value={form.title}
        onChange={onChangeForm.title}
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectOneLineCard
        value={form.oneLineInfo}
        onChange={onChangeForm.oneLineInfo}
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectCategoryCard
        value={form.category}
        onChange={onChangeForm.category}
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectDeadlineCard
        value={formatDate(form.closedDate)}
        onChange={onChangeForm.closedDate}
        large
        style={{ gridColumn: "span 1" }}
      />
      <ProjectSimpleDescCard
        value={form.simpleInfo}
        onChange={onChangeForm.simpleInfo}
        large
        style={{ gridColumn: isMdDown ? "span 1" : "1 / -1" }}
      />
    </StepBox>
  );
};

export default Step1;

export const StepBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr", // 기본값(xs)

  gap: theme.spacing(2), // 기본값(sm 이하)

  marginBottom: 0,

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(4),
  },
}));
