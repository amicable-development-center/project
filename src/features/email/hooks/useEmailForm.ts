import { useState, useCallback, type ChangeEvent } from "react";

import { sendEmailApi } from "@features/email/api/emailApi";
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
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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

    setIsLoading(true);

    try {
      const result = await sendEmailApi({
        actualSenderEmail: senderEmail,
        receiverEmail,
        projectId,
        projectTitle,
        emailData: {
          subject,
          message,
        },
      });

      if (result.success) {
        alert(result.message);
        resetForm();
        closeModal();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("이메일 전송 중 오류 발생:", error);
      alert("이메일 전송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = useCallback((): void => {
    resetForm();
    closeModal();
  }, [resetForm, closeModal]);

  return {
    isOpen,
    isLoading,
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
