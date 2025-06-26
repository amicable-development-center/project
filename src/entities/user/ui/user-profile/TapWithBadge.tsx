import { Badge } from "@mui/material";
import type { JSX } from "react";

interface TabWithBadgeProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  ProfileTabChip: any;
}

const TabWithBadge = ({
  label,
  count,
  active,
  onClick,
  ProfileTabChip,
}: TabWithBadgeProps): JSX.Element => (
  <Badge
    badgeContent={count}
    color={active ? "primary" : "secondary"}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    overlap="rectangular"
    sx={{
      "& .MuiBadge-badge": {
        fontSize: "1.1rem",
        fontWeight: 700,
        minWidth: 24,
        height: 24,
      },
    }}
  >
    <ProfileTabChip label={label} active={active} clickable onClick={onClick} />
  </Badge>
);

export default TabWithBadge;
