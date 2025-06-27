import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Typography,
  Box,
  Card,
  CardContent,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { JSX } from "react";

import { ProjectCollectionTabType } from "@shared/types/project";
import NavigateButton from "@shared/ui/NavigateButton";

interface EmptyProjectCardProps {
  type: ProjectCollectionTabType;
  message?: string;
}

const typeConfig = {
  [ProjectCollectionTabType.Likes]: {
    icon: <FavoriteIcon sx={{ fontSize: 64, color: "text.disabled" }} />,
    message:
      "아직 좋아요한 프로젝트가 없습니다.\n마음에 드는 프로젝트에 좋아요를 눌러보세요!",
    buttons: [
      <NavigateButton key="find" to="/project">
        프로젝트 찾기
      </NavigateButton>,
    ],
  },
  [ProjectCollectionTabType.Applied]: {
    icon: (
      <AssignmentTurnedInIcon sx={{ fontSize: 64, color: "text.disabled" }} />
    ),
    message:
      "아직 지원한 프로젝트가 없습니다.\n다양한 프로젝트에 지원해보세요!",
    buttons: [
      <NavigateButton key="find" to="/project">
        프로젝트 찾기
      </NavigateButton>,
    ],
  },
  [ProjectCollectionTabType.Created]: {
    icon: <CreateNewFolderIcon sx={{ fontSize: 64, color: "text.disabled" }} />,
    message:
      "아직 등록한 프로젝트가 없습니다.\n새로운 프로젝트를 등록해보세요!",
    buttons: [
      <NavigateButton key="find" to="/project">
        프로젝트 찾기
      </NavigateButton>,
      <NavigateButton key="create" to="/project/insert">
        프로젝트 등록
      </NavigateButton>,
    ],
  },
};

const EmptyProjectCard = ({
  type,
  message,
}: EmptyProjectCardProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const config = typeConfig[type];
  return (
    <StyledCard isMobile={isMobile}>
      <StyledCardContent>
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight={60}
        >
          {config.icon}
        </Box>
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight={60}
        >
          <Typography
            variant="body1"
            align="center"
            sx={(theme) => ({
              whiteSpace: "pre-line",
              color: theme.palette.text.disabled,
            })}
          >
            {message ?? config.message}
          </Typography>
        </Box>
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight={80}
          gap={2}
        >
          {config.buttons}
        </Box>
      </StyledCardContent>
    </StyledCard>
  );
};

export default EmptyProjectCard;

const StyledCard = styled(Card)<{ isMobile: boolean }>(
  ({ theme, isMobile }) => ({
    height: "auto",
    minHeight: 180,
    maxWidth: 320,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2.5, 1.5, 0, 1.5),
    ...(isMobile && {
      margin: "0 auto",
    }),

    "&:hover": {
      transform: "translateY(-0.4rem)",
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      borderColor: theme.palette.primary.light,
    },

    [theme.breakpoints.up("sm")]: {
      flex: 1,
      maxWidth: 340,
      "&:hover": {
        transform: "translateY(-0.6rem)",
      },
    },

    [theme.breakpoints.up("md")]: {
      maxWidth: 360,
      maxHeight: 320,
    },
  })
);

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(2),
    padding: theme.spacing(2.5),
  },
}));
