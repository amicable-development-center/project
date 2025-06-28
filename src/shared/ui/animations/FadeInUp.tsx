import { Box, styled, keyframes } from "@mui/material";

const ANIMATION_DELAY_MS = 1000;

interface FadeInUpProps {
  delay?: number;
  duration?: number;
  distance?: number;
}

const fadeInUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(var(--distance, 20px));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FadeInUp = styled(Box)<FadeInUpProps>(
  ({ delay = 0, duration = 0.6, distance = 20 }) => ({
    animation: `${fadeInUpAnimation} ${duration}s ease-out forwards`,
    animationDelay: `${delay * ANIMATION_DELAY_MS}ms`,
    opacity: 0,
    "--distance": `${distance}px`,
  })
);

export default FadeInUp;
