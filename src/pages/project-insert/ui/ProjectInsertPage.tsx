import type { CSSObject } from "@emotion/react";
import { Container } from "@mui/material";
import type { ContainerProps } from "@mui/material/Container";
import type { Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import type { JSX } from "react";

import HoneyTipBox from "@pages/project-insert/ui/HoneyTipBox";
import StepBox from "@pages/project-insert/ui/StepBox";
import TopTitle from "@pages/project-insert/ui/TopTitle";

import useProjectInsert from "@features/projects/hook/useProjectInsertForm";
import PageNaviBtn from "@features/projects/ui/project-insert/PageNaviBtn";
import Step1 from "@features/projects/ui/project-insert/Step1";
import Step2 from "@features/projects/ui/project-insert/Step2";
import Step3 from "@features/projects/ui/project-insert/Step3";
import Step4 from "@features/projects/ui/project-insert/Step4";

const ProjectInsertPage = (): JSX.Element => {
  const { page, submit, setForm } = useProjectInsert();

  return (
    <MainContainer>
      {/* 상단 타이틀/설명 */}
      <TopTitle />

      {/* 스텝바 */}
      <StepBox currentStep={page.currentStep} />

      {/* Step별 컴포넌트 */}
      {page.currentStep === 1 && <Step1 setForm={setForm.form1} />}
      {page.currentStep === 2 && <Step2 setForm={setForm.form2} />}
      {page.currentStep === 3 && <Step3 setForm={setForm.form3} />}
      {page.currentStep === 4 && <Step4 setForm={setForm.form4} />}

      <button onClick={submit}>테스트용 submit</button>

      {/* 네비게이션 버튼 */}
      <PageNaviBtn
        currentStep={page.currentStep}
        handlePrev={page.goPrev}
        handleNext={page.goNext}
        handleSubmit={submit}
      />

      {/* 꿀팁 모음집 */}
      <HoneyTipBox />
    </MainContainer>
  );
};

export default ProjectInsertPage;

const MainContainer = styled(Container)<ContainerProps>(
  ({ theme }: { theme: Theme }): CSSObject => ({
    flexGrow: 1,
    minHeight: "100vh",
    padding: "3rem",
    backgroundColor: theme.palette.background.default,
  })
);
