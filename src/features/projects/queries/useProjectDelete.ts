import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { deleteProjectItem } from "@features/projects/api/projdectsApi";

import type { ApiResMessage } from "@entities/projects/types/firebase";

const useProjectDelete = (): UseMutationResult<
  ApiResMessage,
  Error,
  string
> => {
  const Navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => {
      return deleteProjectItem(id);
    },
    onSuccess: (data) => {
      if (data.message) {
        alert(data.message);
      }
      if (data.success) {
        Navigate("/");
      }
    },
    onError: (err) => {
      alert("정상적으로 삭제되지 않았습니다.");
      console.log(err);
    },
  });
};
export default useProjectDelete;
