import { useNavigate } from "react-router-dom";

import { saveUser } from "@features/user/api/userApi";

import { useAuthStore } from "@shared/stores/authStore";
import type { UserInput } from "@shared/types/user";

export const useSignUp = (): {
  signUp: (userInput: UserInput) => Promise<void>;
} => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const signUp = async (userInput: UserInput): Promise<void> => {
    if (!user) return;

    const { name, userRole, experience, introduceMyself } = userInput;

    const finalIntroduceMyself =
      (introduceMyself ?? "").trim() !== ""
        ? introduceMyself
        : "코딩하고 싶은 밤이에요~😘";

    await saveUser(user.uid, {
      id: user.uid,
      name,
      userRole,
      experience,
      email: user.email ?? "",
      avatar: user.photoURL || "",
      likeProjects: [],
      appliedProjects: [],
      introduceMyself: finalIntroduceMyself,
    });

    navigate("/");
  };

  return { signUp };
};
