import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import {
  getMyLikedProjects,
  getProjectLikedUsers,
  getProjectLikeStatus,
} from "@entities/projects/api/getProjectLikeApi";

import queryKeys from "@shared/react-query/queryKey";
import { useAuthStore } from "@shared/stores/authStore";

export const useGetProjectLike = (): UseQueryResult<boolean, Error> => {
  const user = useAuthStore((state) => state.user);
  const { id: projectId } = useParams();

  return useQuery({
    queryKey: [queryKeys.projectLike, projectId],
    queryFn: () => getProjectLikeStatus(user?.uid, projectId),
    enabled: !!user && !!projectId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetProjectLikedUsers = (
  projectId?: string
): UseQueryResult<string[], Error> => {
  const { id: paramsId } = useParams();
  const finalProjectId = projectId || paramsId;

  const query = useQuery({
    queryKey: [queryKeys.projectLikedUser, finalProjectId],
    queryFn: () => getProjectLikedUsers(finalProjectId as string),
    enabled: !!finalProjectId,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};

export const useGetMyLikedProjects = (): UseQueryResult<string[], Error> => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: [queryKeys.myLikedProjects],
    queryFn: () => getMyLikedProjects(user?.uid),
    enabled: !!user,
  });
};
