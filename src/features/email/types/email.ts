import type { ChangeEvent } from "react";

import type { ProjectListRes } from "@shared/types/project";

export interface EmailData {
  subject: string;
  message: string;
}

export interface UseEmailFormProps {
  senderEmail: string;
  receiverEmail: string;
  project: ProjectListRes | null;
  onClose?: () => void;
}

export interface UseEmailFormReturn {
  isOpen: boolean;
  isLoading: boolean;
  subject: string;
  message: string;
  openModal: () => void;
  closeModal: () => void;
  handleSubjectChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSend: () => Promise<void>;
  handleCancel: () => void;
  resetForm: () => void;
}
