export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const easeOutQuad = (x: number): number => 1 - (1 - x) * (1 - x);

export const scrollTo = (
  scrollY: number,
  duration = 600,
  easing: (x: number) => number,
): Promise<void> => {
  return new Promise((resolve) => {
    const startY = window.scrollY;
    const difference = scrollY - startY;
    const startTime = performance.now();

    const step = () => {
      const progress = (performance.now() - startTime) / duration;
      const amount = easing(progress);

      window.scrollTo({ top: startY + amount * difference });

      if (progress < 0.99) {
        window.requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    step();
  });
};

export const toggleScroll = (enable: boolean) => {
  if (enable) {
    document.documentElement.style.overflow = 'auto';
  } else {
    document.documentElement.style.overflow = 'hidden';

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }
};
