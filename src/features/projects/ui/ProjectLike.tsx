import { Box, styled } from "@mui/material";
import type { JSX } from "react";

import { useOptimisticProjectLike } from "@features/projects/hooks/useOptimisticProjectLike";

import {
  getStatusClassname,
  shareProjectUrl,
} from "@shared/libs/utils/projectDetail";
import type { ProjectListRes } from "@shared/types/project";
import {
  FavoriteBorderIcon,
  FavoriteOutlinedIcon,
  ShareIcon,
} from "@shared/ui/icons/CommonIcons";

type ProjectLikeType = Pick<ProjectListRes, "status">;

interface ProjectLikeProps {
  values: ProjectLikeType;
}

const ProjectLike = ({ values }: ProjectLikeProps): JSX.Element => {
  const { isLiked, toggleLike } = useOptimisticProjectLike();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <StatusBox className={getStatusClassname(values.status)}>
        {values.status}
      </StatusBox>

      <Box display="flex">
        <HeadIconBox onClick={toggleLike}>
          {isLiked ? (
            <FavoriteOutlinedIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </HeadIconBox>
        <HeadIconBox onClick={shareProjectUrl}>
          <ShareIcon />
        </HeadIconBox>
      </Box>
    </Box>
  );
};

export default ProjectLike;

const HeadIconBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  margin-left: 10px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const StatusBox = styled("div")`
  padding: 0.5rem 1.2rem;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.025em;
  border-radius: 4px;

  &.ing {
    color: white;
    background-color: black;
  }
  &.done {
    color: #303030;
    background-color: #f0f0f0;
  }
`;
