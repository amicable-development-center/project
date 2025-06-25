import CodeIcon from "@mui/icons-material/Code";
import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@shared/types/project";
import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

type TechStackType = Pick<ProjectListRes, "techStack">;

const TechStack = ({ techStack }: TechStackType): JSX.Element => {
  return (
    <>
      <TitleWithIcon Icon={CodeIcon} title="기술 스택" />

      <Box display={"flex"} marginTop={1} flexWrap={"wrap"}>
        {techStack.map((item, i) => (
          <Tag key={i} variant="h6">
            {item}
          </Tag>
        ))}
      </Box>
    </>
  );
};

export default TechStack;

const Tag = styled(Typography)`
  padding: 0.5rem 1.5rem;
  margin: 1rem 1rem 0 0;
  background-color: #f4f4f4;
  border-radius: 50px;
`;
