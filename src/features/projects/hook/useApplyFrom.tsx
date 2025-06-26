import { useState, type ChangeEvent } from "react";

import useProjectApply from "@features/projects/queries/useProjectApply";

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
}

const useApplyFrom = (projectID: string): ApplyFormResult => {
  const { mutate: updateApply } = useProjectApply();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");

  const openForm = (): void => setIsFormOpen(true);
  const closeForm = (): void => setIsFormOpen(false);

  const updateApplyMessage = (e: ChangeEvent<HTMLTextAreaElement>): void =>
    setApplyMessage(e.target.value);

  const submit = (): void => {
    if (!projectID) return;
    if (!applyMessage.trim()) {
      alert("메세지를 적어주세요");
      return;
    }
    updateApply(projectID);
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
    submit,
  };
};

export default useApplyFrom;
