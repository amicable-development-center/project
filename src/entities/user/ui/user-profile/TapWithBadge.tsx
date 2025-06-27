import { Badge, styled } from "@mui/material";
import type { JSX, ComponentType } from "react";

interface TabWithBadgeProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  ProfileTabChip: ComponentType<any>;
}

const TabWithBadge = ({
  label,
  count,
  active,
  onClick,
  ProfileTabChip,
}: TabWithBadgeProps): JSX.Element => (
  <StyledBadge
    badgeContent={count}
    color={active ? "primary" : "secondary"}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    overlap="rectangular"
  >
    <ProfileTabChip label={label} active={active} clickable onClick={onClick} />
  </StyledBadge>
);

export default TabWithBadge;

const StyledBadge = styled(Badge)((_theme) => ({
  "& .MuiBadge-badge": {
    fontSize: "1.1rem",
    fontWeight: 700,
    minWidth: 24,
    height: 24,
  },
}));
