import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, type JSX } from "react";

import { useSignUp } from "@features/user/hooks/userSignUp";
import SubmitButton from "@features/user/ui/SubmitButton";

import type { UserRole } from "@shared/user/types/user";

const UserInfoForm = (): JSX.Element => {
  const { signUp } = useSignUp();

  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState<
    "frontend" | "backend" | "fullstack" | "designer" | "pm"
  >("frontend");
  const [experience, setExperience] = useState("");
  const [introduceMyself, setIntroduceMyself] = useState("");

  return (
    <FormContainer>
      <Title variant="h5">회원 정보 입력</Title>

      <StyledTextField
        label="이름"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <StyledSelect
        value={userRole}
        onChange={(e) => setUserRole(e.target.value as UserRole)}
        displayEmpty
      >
        <MenuItem value="frontend">프론트엔드</MenuItem>
        <MenuItem value="backend">백엔드</MenuItem>
        <MenuItem value="fullstack">풀스택</MenuItem>
        <MenuItem value="designer">디자이너</MenuItem>
        <MenuItem value="pm">PM</MenuItem>
      </StyledSelect>

      <StyledTextField
        label="경력"
        variant="outlined"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <StyledTextField
        label="자기소개"
        variant="outlined"
        value={introduceMyself}
        onChange={(e) => setIntroduceMyself(e.target.value)}
        placeholder="코딩하고 싶은 밤이에요~😘"
        multiline
        rows={4}
      />

      <SubmitButton
        onClick={() => signUp({ name, userRole, experience, introduceMyself })}
      />
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
