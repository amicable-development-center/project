import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { type JSX } from "react";
import { useState } from "react";

import { useUpdateUserForm } from "@entities/user/hooks/useUpdateUserForm";

import type { User, UserInput } from "@shared/types/user";
import { UserExperience } from "@shared/types/user";

interface UpdateUserFormProps {
  defaultUser: User;
  onSubmit: (userInfo: UserInput) => void;
  onCancel: () => void;
}

const UpdateUserForm = ({
  defaultUser,
  onSubmit,
  onCancel,
}: UpdateUserFormProps): JSX.Element => {
  const {
    name,
    userRole,
    experience,
    introduceMyself,
    errors,
    handleChange,
    handleSubmit,
  } = useUpdateUserForm({ defaultUser });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleFormSubmit = (): void => {
    const result = handleSubmit();
    if (result) {
      setShowConfirmDialog(true);
    }
  };

  const handleConfirmSubmit = (): void => {
    const result = handleSubmit();
    if (result) {
      onSubmit(result);
      setShowConfirmDialog(false);
    }
  };

  const handleCancelConfirm = (): void => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <FormContainer>
        <Title variant="h5">프로필 수정</Title>
        {/* 이름 입력 */}
        <FormControl error={errors.name} variant="outlined" fullWidth>
          <StyledTextField
            label="🙋 닉네임 *"
            variant="outlined"
            value={name}
            onChange={(e) => handleChange("name")(e.target.value)}
            error={errors.name}
            onFocus={() => errors.name && handleChange("name")(name)}
            InputLabelProps={{ shrink: true }}
          />
          {errors.name && <ErrorText>이름을 입력해주세요.</ErrorText>}
        </FormControl>
        {/* 이메일 입력 (disabled) */}
        <FormControl variant="outlined" fullWidth>
          <StyledTextField
            label="📧 이메일"
            variant="outlined"
            value={defaultUser.email}
            disabled
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        {/* 직무 선택 */}
        <FormControl error={errors.userRole} variant="outlined" fullWidth>
          <InputLabel shrink>👔 직무 *</InputLabel>
          <StyledSelect
            label="👔 직무 *"
            value={userRole}
            onChange={(e) => handleChange("userRole")(e.target.value as string)}
            displayEmpty
          >
            <MenuItem value="">직무 선택</MenuItem>
            <MenuItem value="frontend">프론트엔드</MenuItem>
            <MenuItem value="backend">백엔드</MenuItem>
            <MenuItem value="fullstack">풀스택</MenuItem>
            <MenuItem value="designer">디자이너</MenuItem>
            <MenuItem value="pm">PM</MenuItem>
          </StyledSelect>
          {errors.userRole && <ErrorText>직무를 선택해주세요.</ErrorText>}
        </FormControl>
        {/* 경력 선택 */}
        <FormControl error={errors.experience} variant="outlined" fullWidth>
          <InputLabel shrink>💼 경력 *</InputLabel>
          <StyledSelect
            label="💼 경력 *"
            value={experience}
            onChange={(e) =>
              handleChange("experience")(e.target.value as string)
            }
            displayEmpty
          >
            <MenuItem value="">경력 선택</MenuItem>
            <MenuItem value={UserExperience.junior}>주니어 (3년 이하)</MenuItem>
            <MenuItem value={UserExperience.mid}>
              미들 (3년 이상 10년 이하)
            </MenuItem>
            <MenuItem value={UserExperience.senior}>
              시니어 (10년 이상)
            </MenuItem>
          </StyledSelect>
          {errors.experience && <ErrorText>경력을 선택해주세요.</ErrorText>}
        </FormControl>
        <StyledTextField
          label="💬 자기소개"
          variant="outlined"
          value={introduceMyself}
          onChange={(e) => handleChange("introduceMyself")(e.target.value)}
          placeholder="코딩하고 싶은 밤이에요~😘"
          multiline
          rows={4}
          InputLabelProps={{ shrink: true }}
        />
        <ButtonContainer>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <SubmitButtonStyled onClick={handleFormSubmit}>
            저장
          </SubmitButtonStyled>
        </ButtonContainer>
      </FormContainer>

      {/* 확인 다이얼로그 */}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelConfirm}
        maxWidth="xs"
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          저장하시겠습니까?
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            입력하신 정보로 프로필이 업데이트됩니다.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2, px: 3 }}>
          <Button onClick={handleCancelConfirm} variant="outlined">
            취소
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            variant="contained"
            color="primary"
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateUserForm;

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
  padding: "2rem 1rem",
});

const Title = styled(Typography)({
  textAlign: "center",
  marginBottom: "16px",
});

const StyledTextField = styled(TextField)({
  width: "100%",
});

const StyledSelect = styled(Select)({
  width: "100%",
});

const ErrorText = styled(FormHelperText)({
  fontSize: "1.3rem",
  color: "#f44336", // MUI 기본 error color
  marginLeft: "14px",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  marginTop: "8px",
  gap: "2rem",
  justifyContent: "space-between",
});

const CancelButton = styled("button")({
  flex: 1,
  padding: "12px 24px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: "#666",
  fontSize: "1.4rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    borderColor: "#999",
  },
});

const SubmitButtonStyled = styled("button")({
  flex: 1,
  padding: "12px 24px",
  border: "1px solid #1976d2",
  borderRadius: "8px",
  backgroundColor: "#1976d2",
  color: "#fff",
  fontSize: "1.4rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#1565c0",
    borderColor: "#1565c0",
  },
});
