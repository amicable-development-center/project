import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Box, styled, Typography } from "@mui/material";
import { type JSX } from "react";

import useApplyFrom from "@features/projects/hook/useApplyFrom";

const ProjectApplyForm = (): JSX.Element => {
  const {
    openForm,
    message,
    submit,
    cancle,
    isApplied,
    isCancling,
    isPending,
  } = useApplyFrom();

  // 지원된 상태
  if (isApplied) {
    return (
      <MessageBtn className="cancel" onClick={cancle} disabled={isPending}>
        <Typography variant="body2" color="secondary">
          {isCancling ? "취소 중..." : "지원 취소"}
        </Typography>
      </MessageBtn>
    );
  }

  // 지원 폼이 닫힌 상태
  if (!openForm.isOpen) {
    return (
      <MessageBtn
        className="apply"
        onClick={openForm.open}
        disabled={isPending}
      >
        <RocketLaunchIcon />
        <Typography>지원하기 🚀</Typography>
      </MessageBtn>
    );
  }

  // 지원 폼이 열린 상태
  return (
    <>
      <Typography variant="body2" fontWeight={500}>
        지원 메세지
      </Typography>

      <ApplyTextarea
        value={message.value}
        onChange={message.update}
        placeholder="자기소개와 프로젝트에 기여할 수 있는 부분을 작성해주세요! 열정적인 메세지를 기다리고 있어요 🔥"
      />

      <Box display="flex" gap={1}>
        <MessageBtn onClick={openForm.close} disabled={isPending}>
          <Typography>취소</Typography>
        </MessageBtn>
        <MessageBtn
          className="apply"
          onClick={submit}
          disabled={isPending || !message.value.trim()}
        >
          <Typography>{isPending ? "지원 중..." : "지원하기"}</Typography>
        </MessageBtn>
      </Box>
    </>
  );
};

export default ProjectApplyForm;

const ApplyTextarea = styled("textarea")`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 14px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  resize: vertical;
  outline: 0;
  border: 1px solid #dddddd;
  border-radius: 4px;

  &:focus {
    border-color: #858585;
  }
`;

const MessageBtn = styled(Box)<{ disabled?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  transition: background-color 0.3s;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "transparent" : "#f4f4f4"};
  }

  &.apply {
    background: linear-gradient(to bottom right, #666df2, #9134ea);
    border: 0;
    color: white;
    &:hover {
      background: ${({ disabled }) =>
        disabled
          ? "linear-gradient(to bottom right, #666df2, #9134ea)"
          : "linear-gradient(to bottom right, #474dc0, #7324bd)"};
    }
  }
`;
