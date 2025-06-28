import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { deleteApplication } from "@entities/projects/api/getProjectApplicationsApi";
import { deleteUserLikes } from "@entities/projects/api/getProjectLikeApi";
import { deleteProjectsEverywhere } from "@entities/projects/api/projectsApi";

import queryKeys from "@shared/react-query/queryKey";
import { useLikeStore } from "@shared/stores/likeStore";
import { useProjectStore } from "@shared/stores/projectStore";
import { useSnackbarStore } from "@shared/stores/snackbarStore";
import { ProjectCollectionTabType } from "@shared/types/project";
import type { ProjectListRes } from "@shared/types/project";

interface DeleteProjectsParams {
  type: ProjectCollectionTabType;
  ids: string[];
  user: { uid: string } | null;
  appliedProjectsData?: ProjectListRes[];
  myLikedProjectsData?: ProjectListRes[];
}

const ERROR_MSG = "프로젝트 삭제에 실패했습니다.";

export const useDeleteProjectsMutation = (): UseMutationResult<
  void,
  unknown,
  DeleteProjectsParams
> => {
  const queryClient = useQueryClient();
  const { removeLikeProjects } = useLikeStore();
  const { setAppliedProjects, setLikeProjects } = useProjectStore();
  const { showSuccess, showError } = useSnackbarStore();

  // type별 삭제 로직 분리
  const deleteLikes = async (userUid: string, ids: string[]): Promise<void> => {
    await deleteUserLikes(userUid, ids);
    removeLikeProjects(ids);
    showSuccess("관심 프로젝트가 삭제되었습니다.");
  };

  const deleteApplied = async (
    userUid: string,
    ids: string[]
  ): Promise<void> => {
    for (const projectId of ids) {
      await deleteApplication(userUid, projectId);
    }
    showSuccess("지원한 프로젝트가 삭제되었습니다.");
  };

  const deleteCreated = async (
    userUid: string,
    ids: string[],
    appliedProjectsData?: ProjectListRes[],
    myLikedProjectsData?: ProjectListRes[]
  ): Promise<void> => {
    const res = await deleteProjectsEverywhere(ids, userUid);
    if (res.success) {
      setAppliedProjects(
        appliedProjectsData
          ? appliedProjectsData.filter((p) => !ids.includes(p.id))
          : []
      );
      setLikeProjects(
        myLikedProjectsData
          ? myLikedProjectsData.filter((p) => !ids.includes(p.id))
          : []
      );
      showSuccess("만든 프로젝트가 삭제되었습니다.");
    } else {
      showError(res.error || ERROR_MSG);
      throw new Error(res.error || ERROR_MSG);
    }
  };

  // type별 invalidate 분리
  const invalidateQueries = async (
    type: ProjectCollectionTabType,
    user?: { uid: string } | null
  ): Promise<void> => {
    if (type === ProjectCollectionTabType.Likes) {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.myLikedProjects, "details"],
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.myLikedProjects, "ids"],
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.projectLike],
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.projectLikedUser],
      });
    }
    if (type === ProjectCollectionTabType.Applied) {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.myAppliedProjects, "details"],
      });
    }
    if (type === ProjectCollectionTabType.Created && user) {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.myLikedProjects, "details"],
      });
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.myAppliedProjects, "details"],
      });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.projects] });
      await queryClient.invalidateQueries({
        queryKey: ["userProfile", user.uid],
      });
    }
  };

  return useMutation<void, unknown, DeleteProjectsParams>({
    mutationFn: async ({
      type,
      ids,
      user,
      appliedProjectsData,
      myLikedProjectsData,
    }: DeleteProjectsParams): Promise<void> => {
      if (!user) throw new Error("로그인이 필요합니다.");
      if (type === ProjectCollectionTabType.Likes) {
        await deleteLikes(user.uid, ids);
      } else if (type === ProjectCollectionTabType.Applied) {
        await deleteApplied(user.uid, ids);
      } else if (type === ProjectCollectionTabType.Created) {
        await deleteCreated(
          user.uid,
          ids,
          appliedProjectsData,
          myLikedProjectsData
        );
      }
    },
    onSuccess: async (_data, variables): Promise<void> => {
      await invalidateQueries(variables.type, variables.user);
    },
    onError: (error: any): void => {
      showError(error?.message || ERROR_MSG);
    },
  });
};
