import type { JSX } from "@emotion/react/jsx-runtime";
import { Box, styled } from "@mui/material";
import { useParams } from "react-router-dom";

import useLike from "@features/projects/hook/useLike";

import { getStatusClassname } from "@shared/libs/utils/projectDetail";
import type { ProjectListRes } from "@shared/types/project";
import {
  FavoriteBorderIcon,
  FavoriteOutlinedIcon,
  ShareIcon,
} from "@shared/ui/icons/CommonIcons";

type ProjectLikeType = Pick<ProjectListRes, "status" | "likedUsers">;

const ProjectLike = ({ values }: { values: ProjectLikeType }): JSX.Element => {
  const { id } = useParams();
  const { like, unlike, isLike } = useLike({
    projectID: id || "",
    likedUsers: values.likedUsers,
  });

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <StatusBox className={getStatusClassname(values.status)}>
        {values.status}
      </StatusBox>

      <Box display="flex">
        <HeadIconBox>
          {isLike ? (
            <FavoriteOutlinedIcon color="error" onClick={unlike} />
          ) : (
            <FavoriteBorderIcon onClick={like} />
          )}
        </HeadIconBox>
        <HeadIconBox>
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
  color: white;
  border-radius: 50px;

  &.ing {
    background-color: black;
  }
  &.done {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
