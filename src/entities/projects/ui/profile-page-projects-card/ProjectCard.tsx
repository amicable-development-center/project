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
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { JSX } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";

import { getProjectApplicantsCount } from "@entities/projects/api/getProjectApplicationsApi";

import { RecruitmentStatus, type ProjectListRes } from "@shared/types/project";
import DragScrollContainer from "@shared/ui/DragScrollContainer";
import UserProfileAvatar from "@shared/ui/user/UserProfileAvatar";

interface ProjectCardProps {
  project: ProjectListRes;
  simple?: boolean;
  sx?: any;
  editMode?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  applicantsCount?: number;
}

// 지원자 수 fetch 훅
function useProjectApplicantsCount(
  projectId: string,
  enabled: boolean = true
): UseQueryResult<number> {
  return useQuery({
    queryKey: ["projectApplicantsCount", projectId],
    queryFn: () => getProjectApplicantsCount(projectId),
    enabled,
  });
}

const ProjectCard = ({
  project,
  simple = false,
  sx,
  editMode = false,
  selected = false,
  onSelect,
  applicantsCount: applicantsCountProp,
}: ProjectCardProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isRecruiting = project.status === RecruitmentStatus.recruiting;

  // applicantsCountProp이 없을 때만 훅 실행
  const { data: applicantsCountQuery = 0, isLoading: applicantsLoading } =
    useProjectApplicantsCount(
      project.id,
      typeof applicantsCountProp !== "number"
    );

  // 프롭이 있으면 우선 사용, 없으면 쿼리 fallback
  const applicantsCount =
    typeof applicantsCountProp === "number"
      ? applicantsCountProp
      : applicantsCountQuery;

  return (
    <StyledCard sx={{ ...(simple && { minHeight: 260 }), ...sx }}>
      <StyledCardContent>
        <ProjectHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <StatusChip
              label={project.status}
              className={isRecruiting ? "black" : ""}
              size="small"
            />
            {isMobile && simple && (
              <Typography variant="body1" color="textPrimary">
                <TextHighlight>
                  {applicantsLoading ? "-" : applicantsCount}{" "}
                </TextHighlight>
                명 지원
              </Typography>
            )}
          </Box>
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
        <Stack
          flexDirection={"row"}
          gap={"0.8rem"}
          alignItems={isMobile && simple ? "center" : "flex-start"}
          justifyContent="space-between"
        >
          <UserProfileAvatar
            name={project.projectOwner?.name}
            userRole={project.projectOwner?.userRole}
            avatar={project.projectOwner?.avatar}
            flexDirection="row"
          />
          {isMobile && simple && (
            <StyledLink to={`/project/${project.id}`}>
              <ActionButton
                variant="contained"
                color="primary"
                size="small"
                sx={{ fontSize: "1.1rem" }}
              >
                자세히 보기
              </ActionButton>
            </StyledLink>
          )}
        </Stack>
        {!simple && (
          <>
            <DragScrollContainer>
              {project.techStack.map((stack, index) => (
                <TechChip key={index} label={stack} size="small" />
              ))}
            </DragScrollContainer>
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
          </>
        )}

        {(!isMobile || !simple) && <StyledDivider />}

        {(!isMobile || !simple) && (
          <FooterSection>
            <Typography variant="body1" color="textPrimary">
              <TextHighlight>
                {applicantsLoading ? "-" : applicantsCount}{" "}
              </TextHighlight>
              명 지원
            </Typography>
            <StyledLink to={`/project/${project.id}`}>
              <ActionButton variant="contained" color="primary" size="medium">
                자세히 보기
              </ActionButton>
            </StyledLink>
          </FooterSection>
        )}
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

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    maxWidth: "100%",
    minHeight: "auto",
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

  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(0.5),
    padding: theme.spacing(1.5),
  },

  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(2),
  },
}));

const ProjectHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StatusChip = styled(Chip)`
  font-weight: 600;
  letter-spacing: 0.025em;

  &.black {
    color: white;
    background-color: #1d1d1d;
  }
  &.red {
    margin-left: 0.5rem;
    color: white;
    background: linear-gradient(to bottom right, #ff8b5d, #ff2c25);
  }
`;

const ContentSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.8),
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.3,
  letterSpacing: "-0.015em",
  color: theme.palette.text.primary,

  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
    fontSize: "1.8rem",
  },
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
