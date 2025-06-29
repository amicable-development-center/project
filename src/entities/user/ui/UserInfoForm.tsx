import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { type JSX } from "react";

import { useSignUpForm } from "@entities/user/hooks/useSignUpForm";
import SubmitButton from "@entities/user/ui/SubmitButton";

import { UserExperience } from "@shared/types/user";

// import { useAuthStore } from "@shared/stores/authStore";

const UserInfoForm = (): JSX.Element => {
  const {
    name,
    userRole,
    experience,
    introduceMyself,
    errors,
    handleChange,
    handleSubmit,
  } = useSignUpForm();

  return (
    <FormContainer>
      <Title variant="h5">회원 정보 입력</Title>
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
          onChange={(e) => handleChange("experience")(e.target.value as string)}
          displayEmpty
        >
          <MenuItem value="">경력 선택</MenuItem>
          <MenuItem value={UserExperience.junior}>
            {UserExperience.junior}
          </MenuItem>
          <MenuItem value={UserExperience.mid}>{UserExperience.mid}</MenuItem>
          <MenuItem value={UserExperience.senior}>
            {UserExperience.senior}
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
      <SubmitButton onClick={handleSubmit} />
    </FormContainer>
  );
};

export default UserInfoForm;

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "300px",
  margin: "0 auto",
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

// 🔥 에러 메시지 커스텀
const ErrorText = styled(FormHelperText)({
  fontSize: "1.3rem",
  color: "#f44336", // MUI 기본 error color
  marginLeft: "14px",
});
