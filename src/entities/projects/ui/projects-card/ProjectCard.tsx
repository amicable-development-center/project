import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  styled,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { JSX } from "react";
import { Link } from "react-router-dom";

import type { ProjectListRes } from "@entities/projects/types/projects";

import useDraggable from "@shared/hooks/useDraggable";
import UserProfileAvatar from "@shared/user/ui/UserProfileAvatar";
import UserProfileWithNamePosition from "@shared/user/ui/UserProfileWithNamePosition";

const ProjectCard = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const { scrollRef, handleMouseDown } = useDraggable();

  const mock: ProjectListRes = {
    id: "1",
    userId: "1",
    userName: "John Doe",
    status: "모집중",
    title: "Project Title",
    userRole: "frontend",
    avatar: "https://via.placeholder.com/150",
    oneLineInfo: "Project One Line Info",
    simpleInfo: "Project Simple Info",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "TypeScript",
      "JavaScript",
      "Vue.js",
      "Angular",
      "Svelte",
      "Next.js",
      "Nuxt.js",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Chakra UI",
      "Ant Design",
      "Styled Components",
      "Emotion",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Chakra UI",
      "Ant Design",
      "Styled Components",
      "Emotion",
    ],
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
    applicants: ["asdfasdfsf2", "asdzxc1er", "bsdfgh12", "cbvscbatfg"],
  };

  return (
    <StyledCard>
      <StyledCardContent>
        <ProjectHeader>
          <StatusChip label={mock.status} color="primary" size="small" />
        </ProjectHeader>

        <ContentSection>
          <ProjectTitle variant="h5" fontWeight={700}>
            {mock.title}
          </ProjectTitle>
          <OneLineInfo variant="body1" color="primary" fontWeight={600}>
            {mock.oneLineInfo}
          </OneLineInfo>
          <SimpleInfo variant="body2" color="text.secondary">
            {mock.simpleInfo}
          </SimpleInfo>
        </ContentSection>
        <Stack flexDirection={"row"} gap={"0.8rem"} alignItems={"flex-start"}>
          {isMobile ? (
            <UserProfileAvatar
              name={mock.userName}
              userRole={mock.userRole}
              avatar={mock.avatar}
              flexDirection="row"
            />
          ) : (
            <UserProfileWithNamePosition
              name={mock.userName}
              userRole={mock.userRole}
              flexDirection="row"
            />
          )}
        </Stack>

        <TechStackContainer>
          <TechStackSection ref={scrollRef} onMouseDown={handleMouseDown}>
            {mock.techStack.map((stack, index) => (
              <TechChip key={index} label={stack} size="small" />
            ))}
          </TechStackSection>
        </TechStackContainer>

        <ProjectDetails>
          <DetailItem>
            <PeopleAltIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {mock.teamSize}명
            </Typography>
          </DetailItem>
          <DetailItem>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {mock.expectedPeriod}
            </Typography>
          </DetailItem>
          <DetailItem>
            <LocationPinIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              온라인
            </Typography>
          </DetailItem>
        </ProjectDetails>

        <StyledDivider />

        <FooterSection>
          <Typography variant="body1" color="textPrimary">
            <TextHighlight>{mock.applicants.length}명</TextHighlight> 지원
          </Typography>
          <StyledLink to={`/project/${mock.id}`}>
            <ActionButton variant="contained" color="primary" size="medium">
              자세히 보기
            </ActionButton>
          </StyledLink>
        </FooterSection>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ProjectCard;

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  maxWidth: "40rem",
  maxHeight: "50rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  border: `1px solid ${theme.palette.divider}`,

  "&:hover": {
    transform: "translateY(-0.4rem)",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    borderColor: theme.palette.primary.light,
  },

  [theme.breakpoints.up("sm")]: {
    maxWidth: "44rem",
    maxHeight: "52rem",
    "&:hover": {
      transform: "translateY(-0.6rem)",
    },
  },

  [theme.breakpoints.up("md")]: {
    maxWidth: "48rem",
    maxHeight: "54rem",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),

  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(2),
  },
}));

const ProjectHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.025em",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.8),
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.3,
  letterSpacing: "-0.015em",
  color: theme.palette.text.primary,
}));

const OneLineInfo = styled(Typography)(() => ({
  lineHeight: 1.4,
  fontWeight: 600,
}));

const SimpleInfo = styled(Typography)(() => ({
  lineHeight: 1.5,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

const TechStackContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  marginTop: theme.spacing(0.4),

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "2rem",
    height: "100%",
    background: `linear-gradient(to right, transparent, ${theme.palette.background.paper})`,
    pointerEvents: "none",
    zIndex: 1,
  },
}));

const TechStackSection = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(0.8),
  overflowX: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  paddingBottom: theme.spacing(0.4),
  paddingRight: theme.spacing(2),
  cursor: "grab",

  "&::-webkit-scrollbar": {
    display: "none",
  },

  "&:active": {
    cursor: "grabbing",
  },

  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch",

  minHeight: "3.2rem",
  alignItems: "center",
}));

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  fontWeight: 500,
  fontSize: "1.1rem",
  flexShrink: 0,
  whiteSpace: "nowrap",

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.2rem",
  },
}));

const ProjectDetails = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing(1.6),
  marginTop: theme.spacing(0.8),

  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(2),
  },
}));

const DetailItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(0.6),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(0.8)} 0`,
  backgroundColor: theme.palette.divider,
}));

const FooterSection = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
  gap: theme.spacing(1.2),
}));

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  flexShrink: 0,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.025em",
  borderRadius: theme.spacing(0.8),
  boxShadow: "none",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    transform: "translateY(-0.1rem)",
    boxShadow: "0 4px 8px -2px rgba(37, 99, 235, 0.3)",
  },

  "&:active": {
    transform: "translateY(0)",
  },
}));

const TextHighlight = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
}));
