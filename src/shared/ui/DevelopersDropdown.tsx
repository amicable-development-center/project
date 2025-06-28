import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Link,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { JSX } from "react";
import { useState } from "react";

import GradientGitHubIcon from "@shared/ui/icons/GradientGitHubIcon";

const developers = [
  { name: "윤다빈", url: "https://github.com/czmcm5" },
  { name: "윤태관", url: "https://github.com/tkyoun0421" },
  { name: "석민영", url: "https://github.com/MINYOUNG-SEOK" },
  { name: "한사라", url: "https://github.com/namee-h" },
];

export default function DevelopersDropdown(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isActive = open || hover;

  return (
    <DropdownContainer>
      {/* 타이틀 박스 */}
      <DropdownTitle
        $active={isActive}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <DropdownTitleCenter>
          <GradientGitHubIcon
            size={isMobile ? 22 : 32}
            color={isActive ? undefined : "#888"}
          />
          <DropdownTitleText $active={isActive}>개발자들</DropdownTitleText>
        </DropdownTitleCenter>
        <IconButton
          size="small"
          sx={{
            transition: "transform 0.2s, color 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: isActive ? "#2563eb" : "#23294a",
          }}
          disableRipple
          disableFocusRipple
        >
          <ExpandMoreIcon />
        </IconButton>
      </DropdownTitle>
      {/* 리스트 */}
      <Collapse in={open}>
        <DropdownList>
          {developers.map((dev) => (
            <DropdownItem key={dev.name}>
              <NameText>{dev.name}</NameText>
              <GithubLink
                href={dev.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                {dev.url}
              </GithubLink>
            </DropdownItem>
          ))}
        </DropdownList>
      </Collapse>
    </DropdownContainer>
  );
}

const DropdownContainer = styled(Box)({
  width: 380,
  maxWidth: "100%",
});

const DropdownTitle = styled(Box)<{ $active?: boolean }>(
  ({ $active, theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "16px 24px",
    borderRadius: 8,
    background: $active ? "#f5f5f5" : "transparent",
    boxShadow: "none",
    cursor: "pointer",
    transition:
      "box-shadow 0.2s, background 0.2s, transform 0.18s cubic-bezier(0.4,0,0.2,1)",
    fontWeight: 600,
    fontSize: 18,
    color: "#23294a",
    marginBottom: 8,
    transform: $active ? "scale(1.04)" : "scale(1)",
    [theme.breakpoints.down("sm")]: {
      padding: "12px 8px",
      gap: 8,
    },
  })
);

const DropdownTitleCenter = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    gap: 4,
  },
}));

const DropdownTitleText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$active",
})<{ $active: boolean }>(({ $active, theme }) => ({
  fontWeight: 600,
  fontSize: 18,
  color: $active ? "#2563eb" : "#888",
  letterSpacing: "0.2rem",
  transition: "color 0.2s",
  [theme.breakpoints.down("sm")]: {
    fontSize: 15,
  },
}));

const DropdownList = styled(Box)({
  background: "transparent",
  borderRadius: 0,
  padding: "4px 12px",
  boxShadow: "none",
});

const DropdownItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "4px 8px",
  borderRadius: 0,
  transition: "background 0.15s",
  margin: "2px 0",
  overflow: "hidden",
  cursor: "pointer",
  "&:hover": {
    background: "#f5f5f5",
    border: "none",
    borderRadius: 0,
    boxShadow: "none",
  },
});

const NameText = styled(Typography)({
  fontWeight: 500,
  color: "#888",
  minWidth: 70,
  fontSize: 10,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const GithubLink = styled(Link)({
  marginLeft: 8,
  color: "#bbb",
  fontSize: 12,
  textDecoration: "none",
  wordBreak: "break-all",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 220,
  transition: "color 0.18s cubic-bezier(0.4,0,0.2,1)",
  "&:hover": {
    color: "#2563eb",
    textDecoration: "none",
  },
});
