import { useEffect, useState } from "react";

import useProjectInsert from "@features/projects/queries/useProjectInsert";
import type {
  AllFormType,
  Step1Type,
  Step2Type,
  Step3Type,
  Step4Type,
  UpdateAllFormType,
} from "@features/projects/types/project-update";

import { scrollToTop } from "@shared/libs/utils/pagination";
import { projectOwnerData } from "@shared/libs/utils/projectInsert";
import { useUserProfile } from "@shared/queries/useUserProfile";
import { useAuthStore } from "@shared/stores/authStore";
import {
  RecruitmentStatus,
  type ProjectItemInsertReq,
} from "@shared/types/project";

interface InsertFormResult {
  currentStep: number;
  updateForm: UpdateAllFormType;
  goPrevPageforTest: () => void;
}

const useProjectInsertForm = (): InsertFormResult => {
  const user = useAuthStore((state) => state.user);
  const { data: userProfile } = useUserProfile(user?.uid || "");
  const { mutate: insertProject, isPending } = useProjectInsert();

  const [currentStep, setCurrentStep] = useState(1);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const [allForm, setAllForm] = useState<AllFormType>({
    form1: {} as Step1Type,
    form2: {} as Step2Type,
    form3: {} as Step3Type,
    form4: {} as Step4Type,
  });

  // useEffect로 제출 감지
  useEffect(() => {
    if (shouldSubmit && currentStep === 4) {
      submit();
      setShouldSubmit(false);
    }
  }, [allForm, shouldSubmit, currentStep]);

  /** allForm에 알맞은 form에 데이터 넣기 */
  const updateCorrectForm: UpdateAllFormType = (formKey, data): void => {
    setAllForm((prev) => ({ ...prev, [formKey]: data }));
  };

  /** allForm업데이트 후 next페이지 이동 */
  const updateForm: UpdateAllFormType = (formKey, data): void => {
    updateCorrectForm(formKey, data);
    handleNext();
  };

  /** allForm에 알맞은 form에 데이터 넣기 */
  const handleNext = async (): Promise<void> => {
    if (currentStep !== 4) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
      return;
    }

    // step4에서는 제출 플래그만 설정
    setShouldSubmit(true);
  };

  const submit = async (): Promise<void> => {
    if (!userProfile) {
      console.log("비로그인");
      return;
    }

    if (isPending) {
      console.log("로딩중");
      return;
    }

    const isRealInsert = window.confirm("등록을 완료 하시겠습니까?");
    if (!isRealInsert) {
      setShouldSubmit(false);
      return;
    }

    const finalData: ProjectItemInsertReq = {
      ...projectOwnerData(userProfile),
      ...allForm.form1,
      ...allForm.form2,
      ...allForm.form3,
      ...allForm.form4,
      status: RecruitmentStatus.recruiting,
      applicants: [], // 추후 삭제
      likedUsers: [], // 추후 삭제
    };

    // projects에 insert
    insertProject(finalData); // 삭제
  };

  return {
    currentStep,
    updateForm,
    goPrevPageforTest: () => {
      if (currentStep !== 1) {
        setCurrentStep((prev) => prev - 1);
      }
    },
  };
};

export default useProjectInsertForm;
