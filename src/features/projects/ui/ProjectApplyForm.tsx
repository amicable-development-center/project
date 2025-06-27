import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Box, styled, Typography } from "@mui/material";
import type { User } from "firebase/auth";
import { type JSX } from "react";
import { useParams } from "react-router-dom";

import useApplyFrom from "@features/projects/hook/useApplyFrom";
import { useCancelProjectApplication } from "@features/projects/queries/useCancelProjectApplication";
import { useCreateProjectApplications } from "@features/projects/queries/useCreateProjcetApplications";

import { useGetProjectApplicationStatus } from "@entities/projects/queries/useGetProjectApplications";

import { useAuthStore } from "@shared/stores/authStore";

const ProjectApplyForm = (): JSX.Element => {
  const { id: projectId } = useParams();
  const user = useAuthStore((state) => state.user);

  const { openForm, message } = useApplyFrom(projectId || "");

  const { mutate: createProjectApplication, isPending: createPending } =
    useCreateProjectApplications();

  const { data: isApplied } = useGetProjectApplicationStatus();
  const { mutate: cancelProjectApplication, isPending: cancelPending } =
    useCancelProjectApplication();

  const handleApplySubmit = (): void => {
    if (!projectId || !message.value.trim()) {
      alert("메시지를 입력해주세요.");
      return;
    }

    createProjectApplication(
      {
        userId: user?.uid as User["uid"],
        projectId,
        message: message.value.trim(),
      },
      {
        onSuccess: () => {
          alert("지원이 완료되었습니다! 🎉");
          openForm.close();
        },
        onError: (error) => {
          alert(`지원 실패: ${error.message}`);
        },
      }
    );
  };

  // 이미 지원한 경우
  if (isApplied) {
    return (
      <MessageBtn
        className="cancel"
        onClick={() => cancelProjectApplication(projectId || "")}
        disabled={cancelPending}
      >
        <Typography>지원 취소</Typography>
      </MessageBtn>
    );
  }

  /* 지원하기 폼 닫혀있을 때 */
  if (!openForm.isOpen) {
    return (
      <MessageBtn
        className="apply"
        onClick={openForm.open}
        disabled={createPending}
      >
        <RocketLaunchIcon />
        <Typography>지원하기 🚀</Typography>
      </MessageBtn>
    );
  }

  /* 지원하기 폼 열려 있을 때 */
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

      <Box display={"flex"} gap={1}>
        <MessageBtn onClick={openForm.close} disabled={createPending}>
          <Typography>취소</Typography>
        </MessageBtn>
        <MessageBtn
          className="apply"
          onClick={handleApplySubmit}
          disabled={createPending || !message.value.trim()}
        >
          <Typography>{createPending ? "지원 중..." : "지원하기"}</Typography>
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

  &.done {
    cursor: default;
    color: #858585;
    background-color: #f0f0f0;
  }
`;
