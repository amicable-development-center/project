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

  // 관심 프로젝트 삭제
  const deleteLikes = async (
    userUid: string,
    ids: string[],
    myLikedProjectsData?: ProjectListRes[]
  ): Promise<void> => {
    await deleteUserLikes(userUid, ids);

    // 전역 상태 동기화
    removeLikeProjects(ids);
    setLikeProjects(
      myLikedProjectsData?.filter((p: ProjectListRes) => !ids.includes(p.id)) ||
        []
    );

    showSuccess("관심 프로젝트가 삭제되었습니다.");
  };

  // 지원한 프로젝트 삭제
  const deleteApplied = async (
    userUid: string,
    ids: string[],
    appliedProjectsData?: ProjectListRes[]
  ): Promise<void> => {
    // applications 컬렉션에서 제거 (병렬 처리)
    const deletePromises = ids.map((projectId) =>
      deleteApplication(userUid, projectId)
    );
    await Promise.all(deletePromises);

    // 전역 상태 동기화
    setAppliedProjects(
      appliedProjectsData?.filter((p: ProjectListRes) => !ids.includes(p.id)) ||
        []
    );

    showSuccess("지원한 프로젝트가 삭제되었습니다.");
  };

  // 만든 프로젝트 삭제
  const deleteCreated = async (
    userUid: string,
    ids: string[],
    appliedProjectsData?: ProjectListRes[],
    myLikedProjectsData?: ProjectListRes[]
  ): Promise<void> => {
    const res = await deleteProjectsEverywhere(ids, userUid);

    if (!res.success) {
      showError(res.error || ERROR_MSG);
      throw new Error(res.error || ERROR_MSG);
    }

    // 전역 상태 동기화
    setAppliedProjects(
      appliedProjectsData?.filter((p: ProjectListRes) => !ids.includes(p.id)) ||
        []
    );
    setLikeProjects(
      myLikedProjectsData?.filter((p: ProjectListRes) => !ids.includes(p.id)) ||
        []
    );
    removeLikeProjects(ids);

    showSuccess("만든 프로젝트가 삭제되었습니다.");
  };

  // 쿼리 무효화 함수들
  const invalidateLikeQueries = async (): Promise<void> => {
    const queries = [
      [queryKeys.myLikedProjects, "details"],
      [queryKeys.myLikedProjects, "ids"],
      [queryKeys.projectLike],
      [queryKeys.projectLikedUser],
      [queryKeys.projects], // 홈페이지, 프로젝트 찾기 페이지 동기화
    ];

    await Promise.all(
      queries.map((queryKey) => queryClient.invalidateQueries({ queryKey }))
    );
  };

  const invalidateAppliedQueries = async (): Promise<void> => {
    const queries = [
      [queryKeys.myAppliedProjects, "details"],
      [queryKeys.myAppliedProjects, "ids"],
      [queryKeys.projectAppliedUser],
    ];

    await Promise.all(
      queries.map((queryKey) => queryClient.invalidateQueries({ queryKey }))
    );
  };

  const invalidateCreatedQueries = async (userUid: string): Promise<void> => {
    const queries = [
      [queryKeys.myLikedProjects, "details"],
      [queryKeys.myAppliedProjects, "details"],
      [queryKeys.projects],
      ["userProfile", userUid],
      [queryKeys.projectLike],
      [queryKeys.projectLikedUser],
      [queryKeys.projectAppliedUser],
    ];

    await Promise.all(
      queries.map((queryKey) => queryClient.invalidateQueries({ queryKey }))
    );
  };

  // 타입별 쿼리 무효화
  const invalidateQueries = async (
    type: ProjectCollectionTabType,
    user?: { uid: string } | null
  ): Promise<void> => {
    switch (type) {
      case ProjectCollectionTabType.Likes:
        await invalidateLikeQueries();
        break;
      case ProjectCollectionTabType.Applied:
        await invalidateAppliedQueries();
        break;
      case ProjectCollectionTabType.Created:
        if (user) {
          await invalidateCreatedQueries(user.uid);
        }
        break;
    }
  };

  // 메인 삭제 로직
  const handleDelete = async ({
    type,
    ids,
    user,
    appliedProjectsData,
    myLikedProjectsData,
  }: DeleteProjectsParams): Promise<void> => {
    if (!user) {
      throw new Error("로그인이 필요합니다.");
    }

    switch (type) {
      case ProjectCollectionTabType.Likes:
        await deleteLikes(user.uid, ids, myLikedProjectsData);
        break;
      case ProjectCollectionTabType.Applied:
        await deleteApplied(user.uid, ids, appliedProjectsData);
        break;
      case ProjectCollectionTabType.Created:
        await deleteCreated(
          user.uid,
          ids,
          appliedProjectsData,
          myLikedProjectsData
        );
        break;
    }
  };

  return useMutation<void, unknown, DeleteProjectsParams>({
    mutationFn: handleDelete,
    onSuccess: async (_data, variables): Promise<void> => {
      await invalidateQueries(variables.type, variables.user);
    },
    onError: (error: any): void => {
      showError(error?.message || ERROR_MSG);
    },
  });
};
