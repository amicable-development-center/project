import { Card, Container, styled } from "@mui/material";
import { useMemo, type JSX } from "react";
import { useParams } from "react-router-dom";

import DetailHeader from "@pages/project-detail/ui/ProjectHeader";
import ProjectInfo from "@pages/project-detail/ui/ProjectInfo";
import ProjectPositions from "@pages/project-detail/ui/ProjectPositions";
import ProjectRequirements from "@pages/project-detail/ui/ProjectRequirements";
import ProjectSchedule from "@pages/project-detail/ui/ProjectSchedule";
import TechStack from "@pages/project-detail/ui/TechStack";

import useProjectsItem from "@entities/projects/queries/useProjectsItem";

const ProjectDetailPage = (): JSX.Element => {
  const { id } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectsItem({ id: id || null });
  // const { mutate: deleteProject } = useProjectDelete();

  // const hadleDeleteProject = (): void => {
  //   if (!id) return;
  //   deleteProject(id);
  // };

  const HeaderValues = useMemo(() => {
    return project?.title || "";
  }, [project]);

  const projectInfoValues = useMemo(() => {
    if (!project) return null;

    return {
      title: project.title,
      status: project.status,
      teamSize: project.teamSize,
      workflow: project.workflow,
      simpleInfo: project.simpleInfo,
      closedDate: project.closedDate,
      oneLineInfo: project.oneLineInfo,
      expectedPeriod: project.expectedPeriod,
    };
  }, [project]);

  const techStackValues = useMemo(
    () => ({
      techStack: project?.techStack || [],
    }),
    [project]
  );

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
        <TechStack values={techStackValues} />
      </CardBox>
      <CardBox>
        <ProjectSchedule />
      </CardBox>
      <CardBox>
        <ProjectPositions />
      </CardBox>
      <CardBox>
        <ProjectRequirements />
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
