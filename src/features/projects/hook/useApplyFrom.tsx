import { useState, type ChangeEvent } from "react";

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

const useApplyFrom = (): ApplyFormResult => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");

  const openForm = (): void => setIsFormOpen(true);
  const closeForm = (): void => setIsFormOpen(false);

  const updateApplyMessage = (e: ChangeEvent<HTMLTextAreaElement>): void =>
    setApplyMessage(e.target.value);

  const submit = (): void => {
    if (!applyMessage.trim()) {
      alert("메세지를 적어주세요");
      return;
    }
    alert("api가 없어요");
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
