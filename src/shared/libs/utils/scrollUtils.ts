export type ScrollBehavior = "instant" | "smooth";

export const scrollToTop = (behavior: ScrollBehavior = "instant"): void => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
};

export const scrollToElement = (
  element: HTMLElement,
  behavior: ScrollBehavior = "smooth",
  offset: number = 0
): void => {
  const elementTop = element.offsetTop;
  window.scrollTo({
    top: elementTop - offset,
    behavior,
  });
};

export const scrollToTopInstant = (): void => {
  scrollToTop("instant");
};

export const scrollToTopSafe = (): void => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (window.scrollY > 50) {
        scrollToTop("instant");
      }
    }, 0);
  });
};

export const scrollToTopSmooth = (): void => {
  scrollToTop("smooth");
};
