import { useState, useCallback, type ChangeEvent } from "react";

import useSendEmail from "@features/email/queries/useSendEmail";
import type {
  UseEmailFormProps,
  UseEmailFormReturn,
} from "@features/email/types/email";

const useEmailForm = ({
  senderEmail,
  receiverEmail,
  project,
  onClose,
}: UseEmailFormProps): UseEmailFormReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmailMutation = useSendEmail();

  const projectId = project?.id || "";
  const projectTitle = project?.title || "";

  const openModal = useCallback((): void => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback((): void => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleSubjectChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSubject(e.target.value);
    },
    []
  );

  const handleMessageChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => {
      setMessage(e.target.value);
    },
    []
  );

  const resetForm = useCallback((): void => {
    setSubject("");
    setMessage("");
  }, []);

  const handleSend = async (): Promise<void> => {
    if (!subject.trim() || !message.trim()) {
      alert("제목과 메시지를 입력해주세요.");
      return;
    }

    sendEmailMutation.mutate(
      {
        actualSenderEmail: senderEmail,
        receiverEmail,
        projectId,
        projectTitle,
        emailData: {
          subject,
          message,
        },
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            resetForm();
            closeModal();
          }
        },
      }
    );
  };

  const handleCancel = useCallback((): void => {
    resetForm();
    closeModal();
  }, [resetForm, closeModal]);

  return {
    isOpen,
    isLoading: sendEmailMutation.isPending,
    subject,
    message,
    openModal,
    closeModal,
    handleSubjectChange,
    handleMessageChange,
    handleSend,
    handleCancel,
    resetForm,
  };
};

export default useEmailForm;
