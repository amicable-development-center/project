import CodeIcon from "@mui/icons-material/Code";
import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@entities/projects/types/projects";

type TechStackType = Pick<ProjectListRes, "techStack">;

const TechStack = ({ techStack }: TechStackType): JSX.Element => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={1} marginBottom={2}>
        <CodeIcon fontSize="large" color="primary" />
        <Typography variant="h3">기술 스택</Typography>
      </Box>

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
