import { Box, Chip, styled } from "@mui/material";
import type { JSX } from "react";

import { useOptimisticProjectLike } from "@features/projects/hooks/useOptimisticProjectLike";

import { useGetProjectApplicationUsers } from "@entities/projects/queries/useGetProjectApplications";
import { useGetProjectLikedUsers } from "@entities/projects/queries/useGetProjectLike";

import {
  getStatusClassname,
  shareProjectUrl,
} from "@shared/libs/utils/projectDetail";
import { useSnackbarStore } from "@shared/stores/snackbarStore";
import type { ProjectListRes } from "@shared/types/project";
import {
  FavoriteBorderIcon,
  FavoriteOutlinedIcon,
  ShareIcon,
} from "@shared/ui/icons/CommonIcons";

type ProjectLikeType = Pick<ProjectListRes, "status">;

interface ProjectLikeProps {
  values: ProjectLikeType;
  projectId: string;
}

const ProjectLike = ({ values, projectId }: ProjectLikeProps): JSX.Element => {
  const { isLiked, toggleLike } = useOptimisticProjectLike();
  const { showError, showSuccess } = useSnackbarStore();
  const { data: likedUsers } = useGetProjectLikedUsers(projectId);
  const { data: appliedUsers } = useGetProjectApplicationUsers(projectId);

  const likedUserCnt = likedUsers?.length || 0;
  const appliedUsersCnt = appliedUsers?.length || 0;

  const sharelink = (): void => {
    shareProjectUrl()
      .then(() => showSuccess("UPL이 복사되었습니다."))
      .catch(() => showError("복사 실패"));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <StatusChip
          label={values.status}
          className={getStatusClassname(values.status)}
          size="small"
        />

        {likedUserCnt + appliedUsersCnt > 3 && (
          <StatusChip label={"🔥HOT"} className="red" size="small" />
        )}
      </Box>

      <Box display="flex">
        <HeadIconBox onClick={toggleLike}>
          {isLiked ? (
            <FavoriteOutlinedIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </HeadIconBox>
        <HeadIconBox onClick={sharelink}>
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

const StatusChip = styled(Chip)`
  font-weight: 600;
  letter-spacing: 0.025em;

  &.ing {
    color: white;
    background-color: black;
  }
  &.done {
    color: #303030;
    background-color: #f0f0f0;
  }
  &.black {
    color: white;
    background-color: #1d1d1d;
  }
  &.red {
    color: white;
    background: linear-gradient(to bottom right, #ff8b5d, #ff2c25);
  }
`;
