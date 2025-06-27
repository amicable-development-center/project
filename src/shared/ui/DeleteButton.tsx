import DeleteIcon from "@mui/icons-material/Delete";
import { Button, styled } from "@mui/material";
import type { JSX } from "react";

interface DeleteButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  sx?: any;
  disabled?: boolean;
}

const DeleteButton = ({
  onClick,
  children = "삭제",
  sx,
  disabled = false,
}: DeleteButtonProps): JSX.Element => (
  <StyledButton
    variant="outlined"
    startIcon={<DeleteIcon />}
    onClick={onClick}
    sx={sx}
    disabled={disabled}
  >
    {children}
  </StyledButton>
);

export default DeleteButton;

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  borderRadius: theme.spacing(0.8),
  boxShadow: "none",
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
  "&:hover": {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
}));
