import { useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import { useCancelProjectApplication } from "@features/projects/queries/useCancelProjectApplication";
import { useCreateProjectApplications } from "@features/projects/queries/useCreateProjcetApplications";

import { useGetProjectApplicationStatus } from "@entities/projects/queries/useGetProjectApplications";

import { useSnackbarStore } from "@shared/stores/snackbarStore";

interface ApplyFormResult {
  openForm: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  message: {
    value: string;
    update: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };
  submit: () => void;
  cancle: () => void;
  isPending: boolean;
  isCancling: boolean;
  isApplied: boolean;
}

const useApplyFrom = (): ApplyFormResult => {
  const { id: projectId } = useParams();
  const { showError } = useSnackbarStore();

  const { data: isApplied = false, isLoading: dataLoading } =
    useGetProjectApplicationStatus();
  const { mutate: createProjectApplication, isPending: createPending } =
    useCreateProjectApplications();
  const { mutate: cancelProjectApplication, isPending: cancelPending } =
    useCancelProjectApplication();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");

  const openForm = (): void => {
    if (dataLoading) return;
    setIsFormOpen(true);
  };
  const closeForm = (): void => setIsFormOpen(false);

  const updateApplyMessage = (e: ChangeEvent<HTMLTextAreaElement>): void =>
    setApplyMessage(e.target.value);

  const handleApplySubmit = (): void => {
    if (!projectId) return;
    if (!applyMessage.trim()) {
      showError("메시지를 입력해주세요.");
      return;
    }

    createProjectApplication(applyMessage.trim(), {
      onSuccess: () => closeForm,
    });
  };

  const handleCancelSubmit = (): void => {
    if (!projectId) return;

    const isRealCancle = confirm("정말로 지원을 취소하시겠습니까?");
    if (!isRealCancle) return;

    cancelProjectApplication(projectId);
  };

  return {
    openForm: {
      isOpen: isFormOpen,
      open: openForm,
      close: closeForm,
    },
    message: {
      value: applyMessage,
      update: updateApplyMessage,
    },
    submit: handleApplySubmit,
    cancle: handleCancelSubmit,
    isPending: createPending,
    isCancling: cancelPending,
    isApplied,
  };
};

export default useApplyFrom;
