import AdjustIcon from "@mui/icons-material/Adjust";
import { Box } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@shared/types/project";
import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

type ProjectDescriptionType = Pick<ProjectListRes, "description">;

const ProjectDescription = ({
  description,
}: ProjectDescriptionType): JSX.Element => {
  return (
    <>
      <TitleWithIcon Icon={AdjustIcon} title="프로젝트 상세" />
      <Box marginY={2} whiteSpace="pre-wrap">
        {description}
      </Box>
    </>
  );
};

export default ProjectDescription;
