import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@shared/types/project";
import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

type ProjectPositionsType = Pick<ProjectListRes, "positions">;

const ProjectPositions = ({ positions }: ProjectPositionsType): JSX.Element => {
  return (
    <>
      <TitleWithIcon Icon={WorkOutlineIcon} title="모집 포지션" />

      {positions.map((item, i) => (
        <PositionBox key={i}>
          <Box display="flex" alignItems="center" gap={1}>
            <PermIdentityIcon fontSize="large" color="disabled" />
            <div>
              <Typography variant="h6">{item.position}</Typography>
              <Typography variant="body2" color="#2d2d2d">
                {item.experience}
              </Typography>
            </div>
          </Box>
          <Box fontSize={14} color="#858585">
            {item.count}명
          </Box>
        </PositionBox>
      ))}
    </>
  );
};

export default ProjectPositions;

const PositionBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  margin-top: 1rem;
  background-color: #fafafa;
  border: 1px solid #eeeeee;
  border-radius: 8px;
`;
