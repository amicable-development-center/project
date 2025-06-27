import { useState } from "react";

import type { User, UserInput, UserRole } from "@shared/types/user";
import { UserExperience } from "@shared/types/user";

interface UseUpdateUserFormProps {
  defaultUser: User;
}

interface UseUpdateUserFormReturn {
  name: string;
  userRole: string;
  experience: string;
  introduceMyself: string;
  errors: {
    name: boolean;
    userRole: boolean;
    experience: boolean;
  };
  handleChange: (
    field: "name" | "userRole" | "experience" | "introduceMyself"
  ) => (value: string) => void;
  handleSubmit: () => UserInput | null;
}

export function useUpdateUserForm({
  defaultUser,
}: UseUpdateUserFormProps): UseUpdateUserFormReturn {
  const [name, setName] = useState(defaultUser.name);
  const [userRole, setUserRole] = useState<string>(defaultUser.userRole);
  const [experience, setExperience] = useState<string>(defaultUser.experience);
  const [introduceMyself, setIntroduceMyself] = useState(
    defaultUser.introduceMyself || ""
  );
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

  const handleSubmit = (): UserInput | null => {
    if (name === "" || userRole === "" || experience === "") {
      setErrors({
        name: name === "",
        userRole: userRole === "",
        experience: experience === "",
      });
      return null;
    }

    return {
      name,
      userRole: userRole as UserRole,
      experience: experience as UserExperience,
      introduceMyself: introduceMyself || "",
    };
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
