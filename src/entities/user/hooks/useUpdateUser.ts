import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";

import { updateUser } from "@shared/api/userApi";
import type { User } from "@shared/types/user";

export const useUpdateUser = (): UseMutationResult<
  void,
  Error,
  {
    uid: string;
    userInfo: Partial<User>;
  },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uid, userInfo }: { uid: string; userInfo: Partial<User> }) =>
      updateUser(uid, userInfo),
    onSuccess: (_, { uid }) => {
      // 유저 프로필 쿼리 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: ["userProfile", uid] });
    },
  });
};
