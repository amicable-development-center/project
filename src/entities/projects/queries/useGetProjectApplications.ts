import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import {
  getMyAppliedProjectsIds,
  getMyAppliedProjectsWithDetails,
  getProjectApplicationStatus,
  getProjectApplicationUsers,
} from "@entities/projects/api/getProjectApplicationsApi";

import queryKeys from "@shared/react-query/queryKey";
import { useAuthStore } from "@shared/stores/authStore";
import type { ProjectListRes } from "@shared/types/project";

/**
 * 현재 사용자의 프로젝트 지원 상태 조회 훅
 * @returns UseQueryResult<boolean, Error> - 지원 여부 상태
 */
export const useGetProjectApplicationStatus = (): UseQueryResult<
  boolean,
  Error
> => {
  const user = useAuthStore((state) => state.user);
  const { id: projectId } = useParams();

  return useQuery({
    queryKey: [queryKeys.projectApply, projectId],
    queryFn: () => getProjectApplicationStatus(user?.uid, projectId),
    enabled: !!user && !!projectId,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * 특정 프로젝트에 지원한 사용자 목록 조회 훅
 * @param projectId - 조회할 프로젝트 ID (옵션, 없으면 URL params에서 가져옴)
 * @returns UseQueryResult<string[], Error> - 지원한 사용자 UID 배열
 */
export const useGetProjectApplicationUsers = (
  projectId?: string
): UseQueryResult<string[], Error> => {
  const { id: paramsId } = useParams();
  const finalProjectId = projectId || paramsId;

  const query = useQuery({
    queryKey: [queryKeys.projectAppliedUser, finalProjectId],
    queryFn: () => getProjectApplicationUsers(finalProjectId as string),
    enabled: !!finalProjectId,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};

/**
 * 현재 사용자가 지원한 프로젝트 ID 목록 조회 훅
 * @returns UseQueryResult<string[], Error> - 지원한 프로젝트 ID 배열
 */
export const useGetMyAppliedProjectsIds = (): UseQueryResult<
  string[],
  Error
> => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: [queryKeys.myAppliedProjects, "ids"],
    queryFn: () => getMyAppliedProjectsIds(user?.uid),
    enabled: !!user,
  });
};

/**
 * 현재 사용자가 지원한 프로젝트 상세 정보 조회 훅
 * @returns UseQueryResult<(ProjectListRes & { applicantsCount: number })[], Error> - 지원한 프로젝트 상세 정보 배열
 */
export const useGetMyAppliedProjectsWithDetails = (): UseQueryResult<
  (ProjectListRes & { applicantsCount: number })[],
  Error
> => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: [queryKeys.myAppliedProjects, "details"],
    queryFn: () => getMyAppliedProjectsWithDetails(user?.uid),
    enabled: !!user,
  });
};
