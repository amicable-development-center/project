import {
  Card,
  CardContent,
  Chip,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import type { JSX } from "react";

import type { ProjectListRes } from "@entities/projects/types/projects";

const ProjectCard = (): JSX.Element => {
  const mock: ProjectListRes = {
    id: "1",
    userId: "1",
    userName: "John Doe",
    status: "모집중",
    title: "Project Title",
    oneLineInfo: "Project One Line Info",
    simpleInfo: "Project Simple Info",
    techStack: ["React", "Node.js", "MongoDB"],
    teamSize: 4,
    expectedPeriod: "1개월",
    description: "Project Description",
    workflow: "Project Workflow",
    requirements: ["React", "Node.js", "MongoDB"],
    preferentialTreatment: ["React", "Node.js", "MongoDB"],
    positions: [
      {
        position: "Frontend",
        count: 2,
        experience: "1년 이상",
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <ProjectStatus>
          <ProjectChips>
            <Chip label={mock.status} color="primary" />
          </ProjectChips>
        </ProjectStatus>
        <Typography variant="h6">Project Title</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

const ProjectStatus = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.8rem",
  marginBottom: "1.6rem",
}));

const ProjectChips = styled(Stack)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "0.8rem",
}));
