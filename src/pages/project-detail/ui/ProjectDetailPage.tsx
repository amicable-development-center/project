import { Card, Container, styled } from "@mui/material";
import { useMemo, type JSX } from "react";
import { useParams } from "react-router-dom";

import useProjectsItem from "@entities/projects/queries/useProjectsItem";
import ProjectDetail from "@entities/projects/ui/projects-detail/ProjectDetail";
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

  const detailValues = useMemo(
    () => ({
      description: project?.description || "",
    }),
    [project]
  );

  const positionsValues = useMemo(
    () => ({
      positions: project?.positions || [],
    }),
    [project]
  );

  const schedulesValues = useMemo(
    () => ({
      schedules: project?.schedules || [],
    }),
    [project]
  );

  const requirementsValues = useMemo(
    () => ({
      requirements: project?.requirements || [],
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
        <TechStack {...techStackValues} />
      </CardBox>
      <CardBox>
        <ProjectDetail {...detailValues} />
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
