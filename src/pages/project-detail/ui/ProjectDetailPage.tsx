import { Card, Container, styled } from "@mui/material";
import { type JSX } from "react";
import { useParams } from "react-router-dom";

import useProjectsItem from "@entities/projects/queries/useProjectsItem";
import ProjectDescription from "@entities/projects/ui/projects-detail/ProjectDescription";
import DetailHeader from "@entities/projects/ui/projects-detail/ProjectHeader";
import ProjectInfo from "@entities/projects/ui/projects-detail/ProjectInfo";
import ProjectPositions from "@entities/projects/ui/projects-detail/ProjectPositions";
import ProjectRequirements from "@entities/projects/ui/projects-detail/ProjectRequirements";
import ProjectSchedule from "@entities/projects/ui/projects-detail/ProjectSchedule";
import TechStack from "@entities/projects/ui/projects-detail/TechStack";

const ProjectDetailPage = (): JSX.Element => {
  const { id } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectsItem({ id: id || null });

  const HeaderValues = project?.title || "";

  const projectInfoValues = !project
    ? null
    : {
        title: project.title,
        status: project.status,
        teamSize: project.teamSize,
        workflow: project.workflow,
        simpleInfo: project.simpleInfo,
        closedDate: project.closedDate,
        oneLineInfo: project.oneLineInfo,
        expectedPeriod: project.expectedPeriod,
      };

  const techStackValues = {
    techStack: project?.techStack || [],
  };

  const descriptionlValues = {
    description: project?.description || "",
  };

  const positionsValues = {
    positions: project?.positions || [],
  };

  const schedulesValues = {
    schedules: project?.schedules || [],
  };

  const requirementsValues = {
    requirements: project?.requirements || [],
    preferentialTreatment: project?.preferentialTreatment || [],
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (!project || isError) {
    return <div>404</div>;
  }
  return (
    <MainContainer>
      <DetailHeader title={HeaderValues} />
      <CardBox>
        <ProjectInfo values={projectInfoValues} />
      </CardBox>
      <CardBox>
        <TechStack {...techStackValues} />
      </CardBox>
      <CardBox>
        <ProjectDescription {...descriptionlValues} />
      </CardBox>
      <CardBox>
        <ProjectPositions {...positionsValues} />
      </CardBox>
      <CardBox>
        <ProjectSchedule {...schedulesValues} />
      </CardBox>
      <CardBox>
        <ProjectRequirements {...requirementsValues} />
      </CardBox>
    </MainContainer>
  );
};

export default ProjectDetailPage;

const MainContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const CardBox = styled(Card)`
  padding: 2rem;
  margin-bottom: 2rem;
`;
