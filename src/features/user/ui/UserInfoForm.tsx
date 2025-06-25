import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, type JSX } from "react";

import { useSignUp } from "@features/user/hooks/userSignUp";
import SubmitButton from "@features/user/ui/SubmitButton";

import type { UserExperience, UserRole } from "@shared/types/user";

const UserInfoForm = (): JSX.Element => {
  const { signUp } = useSignUp();

  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [experience, setExperience] = useState("");
  const [introduceMyself, setIntroduceMyself] = useState("");

  // 에러 상태
  const [errors, setErrors] = useState({
    name: false,
    userRole: false,
    experience: false,
  });

  const handleSubmit = () => {
    if (name === "" || userRole === "" || experience === "") {
      setErrors({
        name: name === "",
        userRole: userRole === "",
        experience: experience === "",
      });
      return;
    }

    signUp({
      name,
      userRole: userRole as UserRole,
      experience: experience as UserExperience,
      introduceMyself,
    });
  };

  return (
    <FormContainer>
      <Title variant="h5">회원 정보 입력</Title>
      {/* 이름 입력 */}

      <FormControl error={errors.name}>
        <StyledTextField
          label="이름"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: false }));
            }
          }}
          error={errors.name}
          onFocus={() => {
            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: false }));
            }
          }}
        />
        {errors.name && <ErrorText>이름을 입력해주세요.</ErrorText>}
      </FormControl>
      {/* 직무 선택 */}
      <FormControl error={errors.userRole}>
        <StyledSelect
          value={userRole}
          onChange={(e) => {
            setUserRole(e.target.value as string);
            if (errors.userRole) {
              setErrors((prev) => ({ ...prev, userRole: false }));
            }
          }}
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
      <FormControl error={errors.experience}>
        <StyledSelect
          value={experience}
          onChange={(e) => {
            setExperience(e.target.value as string);
            if (errors.experience) {
              setErrors((prev) => ({ ...prev, experience: false }));
            }
          }}
          displayEmpty
        >
          <MenuItem value="">경력 선택</MenuItem>
          <MenuItem value="junior">주니어 (3년 이하)</MenuItem>
          <MenuItem value="mid">미들 (3년 이상 10년 이하)</MenuItem>
          <MenuItem value="senior">시니어 (10년 이상)</MenuItem>
        </StyledSelect>
        {errors.experience && <ErrorText>경력을 선택해주세요.</ErrorText>}
      </FormControl>

      <StyledTextField
        label="자기소개"
        variant="outlined"
        value={introduceMyself}
        onChange={(e) => setIntroduceMyself(e.target.value)}
        placeholder="코딩하고 싶은 밤이에요~😘"
        multiline
        rows={4}
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
