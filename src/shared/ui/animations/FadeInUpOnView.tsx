import { styled, keyframes } from "@mui/material";
import { type JSX, type ReactNode } from "react";

import useIntersectionObserver from "@shared/hooks/useIntersectionObserver";

const ANIMATION_DELAY_MS = 500;

interface FadeInUpOnViewProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

interface AnimatedContainerProps {
  $hasIntersected: boolean;
  $delay: number;
  $duration: number;
  $distance: number;
}

const FadeInUpOnView = ({
  children,
  delay = 0,
  duration = 0.6,
  distance = 20,
  threshold = 0.1,
  rootMargin = "0px",
  className,
}: FadeInUpOnViewProps): JSX.Element => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <AnimatedContainer
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      $hasIntersected={hasIntersected}
      $delay={delay}
      $duration={duration}
      $distance={distance}
    >
      {children}
    </AnimatedContainer>
  );
};

export default FadeInUpOnView;

const fadeInUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(var(--distance));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedContainer = styled("div")<AnimatedContainerProps>(
  ({ $hasIntersected, $delay, $duration, $distance }) => ({
    "--distance": `${$distance}px`,
    opacity: 0,
    transform: `translateY(${$distance}px)`,
    animation: $hasIntersected
      ? `${fadeInUpAnimation} ${$duration}s ease-out forwards`
      : "none",
    animationDelay: $hasIntersected
      ? `${$delay * ANIMATION_DELAY_MS}ms`
      : "0ms",
  })
);
