import {
  Card,
  CardContent,
  Skeleton,
  Stack,
  Box,
  Divider,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { JSX } from "react";
import { memo } from "react";

interface ProjectCardSkeletonProps {
  simple?: boolean;
  sx?: any;
}

const ProjectCardSkeleton = ({
  simple = false,
  sx,
}: ProjectCardSkeletonProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <StyledCard sx={{ ...(simple && { minHeight: 260 }), ...sx }}>
      <StyledCardContent>
        <ProjectHeader>
          <Skeleton variant="rounded" width={80} height={24} />
        </ProjectHeader>

        <ContentSection>
          <Skeleton variant="text" width="85%" height={32} />

          {!simple && (
            <>
              <Skeleton variant="text" width="70%" height={24} />
              <Stack gap={0.5}>
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Stack>
            </>
          )}
        </ContentSection>

        <Stack flexDirection="row" gap="0.8rem" alignItems="flex-start">
          {isMobile ? (
            <Stack flexDirection="row" gap={1} alignItems="center">
              <Skeleton variant="circular" width={40} height={40} />
              <Stack>
                <Skeleton variant="text" width={80} height={16} />
                <Skeleton variant="text" width={60} height={14} />
              </Stack>
            </Stack>
          ) : (
            <Stack>
              <Skeleton variant="text" width={80} height={16} />
              <Skeleton variant="text" width={60} height={14} />
            </Stack>
          )}
        </Stack>

        {!simple && (
          <TechStackContainer>
            <Stack flexDirection="row" gap={1} overflow="hidden">
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="rounded" width={70} height={24} />
              <Skeleton variant="rounded" width={90} height={24} />
            </Stack>
          </TechStackContainer>
        )}

        {!simple && (
          <ProjectDetails>
            <DetailItem>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width={40} height={16} />
            </DetailItem>
            <DetailItem>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width={50} height={16} />
            </DetailItem>
            <DetailItem>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width={45} height={16} />
            </DetailItem>
          </ProjectDetails>
        )}

        <StyledDivider />

        <FooterSection>
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="rounded" width={100} height={36} />
        </FooterSection>
      </StyledCardContent>
    </StyledCard>
  );
};

export default memo(ProjectCardSkeleton);

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  flex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${theme.palette.divider}`,

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

const ContentSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.8),
}));

const TechStackContainer = styled(Box)(() => ({
  overflow: "hidden",
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
