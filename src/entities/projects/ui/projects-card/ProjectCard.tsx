import { Favorite as FavoriteIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import type { JSX } from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useGetProjectApplicationUsers } from "@entities/projects/queries/useGetProjectApplications";
import {
  useGetProjectLikedUsers,
  useGetMyLikedProjectsIds,
} from "@entities/projects/queries/useGetProjectLike";

import { RecruitmentStatus, type ProjectListRes } from "@shared/types/project";
import DragScrollContainer from "@shared/ui/DragScrollContainer";
import {
  AccessTimeIcon,
  FavoriteBorderIcon,
  LocationPinIcon,
  PeopleAltIcon,
} from "@shared/ui/icons/CommonIcons";
import UserProfileAvatar from "@shared/ui/user/UserProfileAvatar";

interface ProjectCardProps {
  project: ProjectListRes;
  simple?: boolean;
}

const ProjectCard = ({
  project,
  simple = false,
}: ProjectCardProps): JSX.Element => {
  const Navigate = useNavigate();
  const isRecruiting = project.status === RecruitmentStatus.recruiting;
  const { data: likedUsers } = useGetProjectLikedUsers(project.id);
  const { data: appliedUsers } = useGetProjectApplicationUsers(project.id);
  const { data: myLikedProjectIds } = useGetMyLikedProjectsIds();

  const likedUserCnt = likedUsers?.length || 0;
  const appliedUsersCnt = appliedUsers?.length || 0;

  const isLikedByCurrentUser = myLikedProjectIds?.includes(project.id) || false;

  return (
    <StyledCard
      simple={simple}
      onClick={() => Navigate(`/project/${project.id}`)}
    >
      <StyledCardContent>
        <ProjectHeader>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <StatusChip
              label={project.status}
              className={isRecruiting ? "black" : ""}
              size="small"
            />
            {likedUserCnt + appliedUsersCnt > 3 && (
              <StatusChip label={"🔥HOT"} className="red" size="small" />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {isLikedByCurrentUser ? (
              <FavoriteIcon fontSize="large" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="large" color="error" />
            )}
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              {likedUserCnt}
            </Typography>
          </Box>
        </ProjectHeader>

        <ContentSection>
          <ProjectTitle variant="h5" fontWeight={700}>
            {project.title}
          </ProjectTitle>

          {!simple && (
            <>
              <OneLineInfo variant="body2" color="primary" fontWeight={600}>
                {project.oneLineInfo}
              </OneLineInfo>
              <SimpleInfo variant="body2" color="text.secondary">
                {project.simpleInfo}
              </SimpleInfo>
            </>
          )}
        </ContentSection>

        <UserProfileContainer>
          <UserProfileAvatar
            name={project.projectOwner.name}
            userRole={project.projectOwner.userRole}
            avatar={project.projectOwner.avatar}
            flexDirection="row"
          />
        </UserProfileContainer>

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

        <StyledDivider />

        <FooterSection>
          <Typography variant="body1" color="textPrimary">
            <TextHighlight>{appliedUsersCnt}명</TextHighlight> 지원
          </Typography>
          <ActionButton variant="contained" color="primary" size="medium">
            자세히 보기
          </ActionButton>
        </FooterSection>
      </StyledCardContent>
    </StyledCard>
  );
};

export default memo(ProjectCard);

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "simple",
})<{ simple?: boolean }>(({ theme, simple }) => ({
  height: "100%",
  maxWidth: "100%",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  border: `1px solid ${theme.palette.divider}`,
  boxSizing: "border-box",
  overflow: "hidden",
  ...(simple && { minHeight: 260 }),

  "&:hover": {
    transform: "translateY(-0.4rem)",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    borderColor: "#1d1d1d",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),

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
  wordBreak: "break-word",
  overflowWrap: "break-word",
}));

const OneLineInfo = styled(Typography)(() => ({
  lineHeight: 1.4,
  fontWeight: 600,
  wordBreak: "break-word",
  overflowWrap: "break-word",
}));

const SimpleInfo = styled(Typography)(() => ({
  lineHeight: 1.5,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  wordBreak: "break-word",
  overflowWrap: "break-word",
}));

const UserProfileContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "flex-start",
}));

const TechChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  fontWeight: 500,
  fontSize: "1rem",
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
  margin: `5px 0`,
  backgroundColor: theme.palette.divider,
}));

const FooterSection = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
  gap: theme.spacing(1.2),
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
