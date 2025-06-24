import { Box, Stack, styled } from "@mui/material";
import type { JSX, ReactNode } from "react";

import useDraggable from "@shared/hooks/useDraggable";

const DragScrollContainer = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { scrollRef, handleMouseDown } = useDraggable();

  return (
    <Container>
      <DragScrollSection ref={scrollRef} onMouseDown={handleMouseDown}>
        {children}
      </DragScrollSection>
    </Container>
  );
};

export default DragScrollContainer;

const Container = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  marginTop: theme.spacing(0.4),

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "2rem",
    height: "100%",
    background: `linear-gradient(to right, transparent, ${theme.palette.background.paper})`,
    pointerEvents: "none",
    zIndex: 1,
  },
}));

const DragScrollSection = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(0.8),
  overflowX: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  paddingBottom: theme.spacing(0.4),
  paddingRight: theme.spacing(2),
  cursor: "grab",

  "&::-webkit-scrollbar": {
    display: "none",
  },

  "&:active": {
    cursor: "grabbing",
  },

  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch",

  minHeight: "3.2rem",
  alignItems: "center",
}));
