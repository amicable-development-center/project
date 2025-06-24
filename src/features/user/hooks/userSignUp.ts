import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@shared/stores/authStore";
import type { UserInput } from "@shared/user/types/user";

import { saveUser } from "../api/userApi";

export const useSignUp = (): {
  signUp: (userInput: UserInput) => Promise<void>;
} => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const signUp = async (userInput: UserInput): Promise<void> => {
    if (!user) return;

    const { name, userRole, experience, introduceMyself } = userInput;
    console.log("서브밋 데이터:", userInput);
    await saveUser(user.uid, {
      id: user.uid,
      name,
      userRole,
      experience,
      email: user.email ?? "",
      avatar: user.photoURL || "",
      likeProjects: [],
      appliedProjects: [],
      introduceMyself,
    });

    navigate("/");
  };

  return { signUp };
};
