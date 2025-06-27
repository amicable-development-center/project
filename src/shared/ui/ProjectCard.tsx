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
import Checkbox from "@mui/material/Checkbox";
import type { JSX } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";

import { type ProjectListRes } from "@shared/types/project";
import DragScrollContainer from "@shared/ui/DragScrollContainer";
import UserProfileAvatar from "@shared/ui/user/UserProfileAvatar";
import UserProfileWithNamePosition from "@shared/ui/user/UserProfileWithNamePosition";

// 여러곳에서 사용될 것 같아서 shared로 빼놓음 (현재 경로 @shared/ui/ProjectCard.tsx)
// 기존 entities/projects/ui/projects-card/ProjectCard.tsx 는 사용하시는 분들 오류가 있을 것 같아 파일 삭제하지 않음
// 해당 경로로 import 하고 계신분들은 확인하시고 경로수정 확인 바래요!

interface ProjectCardProps {
  project: ProjectListRes;
  simple?: boolean;
  sx?: any;
  editMode?: boolean;
  selected?: boolean;
  onSelect?: () => void;
}

const ProjectCard = ({
  project,
  simple = false,
  sx,
  editMode = false,
  selected = false,
  onSelect,
}: ProjectCardProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <StyledCard sx={{ ...(simple && { minHeight: 260 }), ...sx }}>
      <StyledCardContent>
        <ProjectHeader>
          <StatusChip label={project.status} color="primary" size="small" />
          {simple && editMode && (
            <Checkbox checked={selected} onChange={onSelect} sx={{ ml: 1 }} />
          )}
        </ProjectHeader>

        <ContentSection>
          <ProjectTitle variant="h5" fontWeight={700}>
            {project.title}
          </ProjectTitle>
          {!simple && (
            <>
              <OneLineInfo variant="body1" color="primary" fontWeight={600}>
                {project.oneLineInfo}
              </OneLineInfo>
              <SimpleInfo variant="body2" color="text.secondary">
                {project.simpleInfo}
              </SimpleInfo>
            </>
          )}
        </ContentSection>
        <Stack flexDirection={"row"} gap={"0.8rem"} alignItems={"flex-start"}>
          {isMobile ? (
            <UserProfileAvatar
              name={project.projectOwner?.name}
              userRole={project.projectOwner?.userRole}
              avatar={project.projectOwner?.avatar}
              flexDirection="row"
            />
          ) : (
            <UserProfileWithNamePosition
              name={project.projectOwner.name}
              userRole={project.projectOwner.userRole}
              flexDirection="row"
            />
          )}
        </Stack>
        {!simple && (
          <DragScrollContainer>
            {project.techStack.map((stack, index) => (
              <TechChip key={index} label={stack} size="small" />
            ))}
          </DragScrollContainer>
        )}

        {!simple && (
          <ProjectDetails>
            <DetailItem>
              <PeopleAltIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {project.teamSize}명
              </Typography>
            </DetailItem>
            <DetailItem>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {project.expectedPeriod}
              </Typography>
            </DetailItem>
            <DetailItem>
              <LocationPinIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                온라인
              </Typography>
            </DetailItem>
          </ProjectDetails>
        )}

        <StyledDivider />

        <FooterSection>
          <Typography variant="body1" color="textPrimary">
            <TextHighlight>명</TextHighlight> 지원
          </Typography>
          <StyledLink to={`/project/${project.id}`}>
            <ActionButton variant="contained" color="primary" size="medium">
              자세히 보기
            </ActionButton>
          </StyledLink>
        </FooterSection>
      </StyledCardContent>
    </StyledCard>
  );
};

export default memo(ProjectCard);

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  flex: 1,
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
    flex: 1,
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
  justifyContent: "space-between",
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
