import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { sendEmailApi } from "@features/email/api/emailApi";
import type {
  SendEmailRequest,
  SendEmailResponse,
} from "@features/email/types/email";

import { useSnackbarStore } from "@shared/stores/snackbarStore";

const useSendEmail = (): UseMutationResult<
  SendEmailResponse,
  Error,
  SendEmailRequest
> => {
  const { showSuccess, showError } = useSnackbarStore();

  return useMutation<SendEmailResponse, Error, SendEmailRequest>({
    mutationFn: sendEmailApi,
    onSuccess: (data) => {
      if (data.success) {
        showSuccess("이메일이 성공적으로 전송되었습니다.");
      } else {
        showError(data.message);
      }
    },
    onError: (error) => {
      showError(error.message || "이메일 전송 중 오류가 발생했습니다.");
    },
  });
};

export default useSendEmail;
