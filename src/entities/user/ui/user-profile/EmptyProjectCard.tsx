import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  styled,
} from "@mui/material";
import type { JSX } from "react";

import NavigateButton from "@shared/ui/NavigateButton";

interface EmptyProjectCardProps {
  message: string;
}

const EmptyProjectCard = ({ message }: EmptyProjectCardProps): JSX.Element => (
  <StyledCard>
    <StyledCardContent>
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight={60}
      >
        <Typography variant="body1" color="text.secondary" align="center">
          {message}
        </Typography>
      </Box>
      <StyledDivider />
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight={80}
        gap={2}
      >
        <NavigateButton to="/project">프로젝트 찾기</NavigateButton>
        <NavigateButton to="/project/insert">프로젝트 등록</NavigateButton>
      </Box>
    </StyledCardContent>
  </StyledCard>
);

export default EmptyProjectCard;

const StyledCard = styled(Card)(({ theme }) => ({
  height: "auto",
  minHeight: 180,
  maxWidth: 320,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5, 1.5, 1.5, 1.5),

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
}));

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

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(0.8)} 0`,
  backgroundColor: theme.palette.divider,
}));
