import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { type JSX } from "react";

import useAutoFocus from "@features/email/hooks/useAutoFocus";
import useEmailForm from "@features/email/hooks/useEmailForm";
import useFormValidation from "@features/email/hooks/useFormValidation";
import EmailField from "@features/email/ui/EmailField";
import MessageField from "@features/email/ui/MessageField";
import SubjectField from "@features/email/ui/SubjectField";

import type { ProjectListRes } from "@shared/types/project";

interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  senderEmail: string;
  receiverEmail: string;
  project: ProjectListRes | null;
}

const EmailModal = ({
  open,
  onClose,
  senderEmail,
  receiverEmail,
  project,
}: EmailModalProps): JSX.Element => {
  const {
    isLoading,
    subject,
    message,
    handleSubjectChange,
    handleMessageChange,
    handleSend,
    handleCancel,
  } = useEmailForm({
    senderEmail,
    receiverEmail,
    project,
    onClose,
  });

  const { elementRef, handleTransitionEnd } = useAutoFocus({
    isOpen: open,
  });

  const { isFormValid } = useFormValidation({
    subject,
    message,
  });

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      TransitionProps={{
        onEntered: handleTransitionEnd,
      }}
    >
      <DialogTitle>
        <Title>📧 이메일 보내기</Title>
      </DialogTitle>
      <DialogContent>
        <FormContainer>
          <EmailField label="📤 보내는 사람" value={senderEmail} />
          <EmailField label="📥 받는 사람" value={receiverEmail} />
          <SubjectField
            ref={elementRef}
            value={subject}
            onChange={handleSubjectChange}
          />
          <MessageField value={message} onChange={handleMessageChange} />
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <ButtonContainer>
          <CancelButton onClick={handleCancel} disabled={isLoading}>
            취소
          </CancelButton>
          <SendButton onClick={handleSend} disabled={isLoading || !isFormValid}>
            {isLoading ? "전송 중..." : "전송"}
          </SendButton>
        </ButtonContainer>
      </DialogActions>
    </StyledDialog>
  );
};

export default EmailModal;

const StyledDialog = styled(Dialog)({
  zIndex: 8000,
  "& .MuiDialog-paper": {
    width: "600px",
    maxWidth: "90vw",
  },
});

const Title = styled(Typography)({
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: 600,
  marginBottom: "8px",
});

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  paddingTop: "16px",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  width: "100%",
});

const CancelButton = styled(Button)({
  padding: "12px 24px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  color: "#666",
  fontSize: "1.4rem",
  fontWeight: 500,
  borderRadius: "8px",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    borderColor: "#999",
  },
});

const SendButton = styled(Button)({
  padding: "12px 24px",
  border: "1px solid #1976d2",
  backgroundColor: "#1976d2",
  color: "#fff",
  fontSize: "1.4rem",
  fontWeight: 500,
  borderRadius: "8px",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#1565c0",
    borderColor: "#1565c0",
  },
  "&:disabled": {
    backgroundColor: "#e0e0e0",
    borderColor: "#e0e0e0",
    color: "#9e9e9e",
  },
});
