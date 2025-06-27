import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getUser } from "@entities/user/api/userApi";

import type { User } from "@shared/types/user";

export function useUserProfile(uid: string): UseQueryResult<User | null> {
  return useQuery<User | null>({
    queryKey: ["userProfile", uid],
    queryFn: () => getUser(uid),
    enabled: !!uid, // uid가 있을 때만 쿼리 실행
  });
}
