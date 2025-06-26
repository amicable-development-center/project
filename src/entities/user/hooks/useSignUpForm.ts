import { useState } from "react";

import { useSignUp } from "@entities/user/hooks/useSignUp";

import type { UserExperience, UserRole } from "@shared/types/user";

// 반환 타입 정의
interface UseSignUpFormReturn {
  name: string;
  userRole: string;
  experience: string;
  introduceMyself: string;
  errors: { name: boolean; userRole: boolean; experience: boolean };
  handleChange: (
    field: "name" | "userRole" | "experience" | "introduceMyself"
  ) => (value: string) => void;
  handleSubmit: () => void;
}

export function useSignUpForm(defaultName = ""): UseSignUpFormReturn {
  const { signUp } = useSignUp();

  const [name, setName] = useState(defaultName);
  const [userRole, setUserRole] = useState("");
  const [experience, setExperience] = useState("");
  const [introduceMyself, setIntroduceMyself] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    userRole: false,
    experience: false,
  });

  const handleChange =
    (field: "name" | "userRole" | "experience" | "introduceMyself") =>
    (value: string) => {
      switch (field) {
        case "name":
          setName(value);
          if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
          break;
        case "userRole":
          setUserRole(value);
          if (errors.userRole)
            setErrors((prev) => ({ ...prev, userRole: false }));
          break;
        case "experience":
          setExperience(value);
          if (errors.experience)
            setErrors((prev) => ({ ...prev, experience: false }));
          break;
        case "introduceMyself":
          setIntroduceMyself(value);
          break;
      }
    };

  const handleSubmit = (): void => {
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

  return {
    name,
    userRole,
    experience,
    introduceMyself,
    errors,
    handleChange,
    handleSubmit,
  };
}
