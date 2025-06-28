import type { CSSObject } from "@emotion/react";
import { Button, Container } from "@mui/material";
import type { ContainerProps } from "@mui/material/Container";
import type { Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import type { JSX } from "react";

import HoneyTipBox from "@pages/project-insert/ui/HoneyTipBox";
import StepBox from "@pages/project-insert/ui/StepBox";
import TopTitle from "@pages/project-insert/ui/TopTitle";

import useProjectInsert from "@features/projects/hooks/useProjectInsertForm";
import Step1 from "@features/projects/ui/project-insert/Step1";
import Step2 from "@features/projects/ui/project-insert/Step2";
import Step3 from "@features/projects/ui/project-insert/Step3";
import Step4 from "@features/projects/ui/project-insert/Step4";

const ProjectInsertPage = (): JSX.Element => {
  const { currentStep, updateForm, goPrevPageforTest } = useProjectInsert();

  return (
    <MainContainer>
      <TopTitle />
      <StepBox currentStep={currentStep} />

      {currentStep === 1 && <Step1 updateForm={updateForm} />}
      {currentStep === 2 && <Step2 updateForm={updateForm} />}
      {currentStep === 3 && <Step3 updateForm={updateForm} />}
      {currentStep === 4 && <Step4 updateForm={updateForm} />}

      <Button variant="contained" color="inherit" onClick={goPrevPageforTest}>
        이것은 테스트용 뒤로가기 버튼입니다. 배포시에는 해당 버튼을 삭제해주세요
      </Button>

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
