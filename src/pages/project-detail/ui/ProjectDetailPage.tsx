import { Box, Card, Container, styled } from "@mui/material";
import { useEffect, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useEmailForm from "@features/email/hooks/useEmailForm";
import EmailModal from "@features/email/ui/EmailModal";
import ProjectApplyForm from "@features/projects/ui/ProjectApplyForm";
import { ProjectDone, ProjectDones } from "@features/projects/ui/ProjectDelete";
import ProjectLike from "@features/projects/ui/ProjectLike";

import useProjectsItem from "@entities/projects/queries/useProjectsItem";
import ProjectApply from "@entities/projects/ui/post-info/ProjectApply";
import ProjectLeader from "@entities/projects/ui/post-info/ProjectLeader";
import ProjectPostInfo from "@entities/projects/ui/post-info/ProjectPostInfo";
import ProjectDescription from "@entities/projects/ui/projects-detail/ProjectDescription";
import DetailHeader from "@entities/projects/ui/projects-detail/ProjectHeader";
import ProjectInfo from "@entities/projects/ui/projects-detail/ProjectInfo";
import ProjectPositions from "@entities/projects/ui/projects-detail/ProjectPositions";
import ProjectRequirements from "@entities/projects/ui/projects-detail/ProjectRequirements";
import ProjectSchedule from "@entities/projects/ui/projects-detail/ProjectSchedule";
import TechStack from "@entities/projects/ui/projects-detail/TechStack";

import { useAuthStore } from "@shared/stores/authStore";
import type { RecruitmentStatus } from "@shared/types/project";
import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";

const ProjectDetailPage = (): JSX.Element | null => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectsItem({ id: id || null });

  const { isOpen, openModal, closeModal } = useEmailForm({
    senderEmail: user?.email || "",
    receiverEmail: project?.projectOwner.email || "",
    project: project || null,
    onClose: () => {},
  });

  useEffect(() => {
    if (project) {
      console.log(project);
    }
  }, [project]);

  const projectInfoValues = !project
    ? null
    : {
        title: project.title,
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

  const projectLikeValues = {
    status: (project?.status as RecruitmentStatus) || "모집중",
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

  const postInfoValues = !project
    ? null
    : {
        createdAt: project.createdAt,
        applicants: project.applicants,
        likedUsers: project.likedUsers,
      };

  if (isLoading) {
    return (
      <Box display={"flex"} justifyContent={"center"} height={"100vh"}>
        <LoadingSpinner />
      </Box>
    );
  }
  if (!project || isError) {
    Navigate("/error");
    return null;
  }
  return (
    <MainContainer>
      {project && (
        <EmailModal
          open={isOpen}
          onClose={closeModal}
          senderEmail={"tkyoun0421@naver.com"}
          receiverEmail={"tkyoun0421@naver.com"}
          project={project}
        />
      )}
      <DetailHeader title={project?.title || ""} />

      <CardContainer>
        <Box flex={3}>
          <CardBox>
            <ProjectLike values={projectLikeValues} />
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
        </Box>

        <Box flex={1.5}>
          <CardBox>
            <ProjectLeader
              projectOwner={project?.projectOwner}
              onEmailClick={openModal}
            />
          </CardBox>
          <CardBox>
            <ProjectApply />

            {project.status === "모집완료" ? (
              <ProjectDone />
            ) : user?.uid === project.projectOwner.id ? (
              <ProjectDones projectOwnerID={project?.projectOwner.id} />
            ) : (
              <ProjectApplyForm />
            )}
          </CardBox>
          <CardBox>
            <ProjectPostInfo values={postInfoValues} />
          </CardBox>
        </Box>
      </CardContainer>
    </MainContainer>
  );
};

export default ProjectDetailPage;

const MainContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "2rem",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const CardBox = styled(Card)`
  padding: 2rem;
  margin-bottom: 2rem;
`;
