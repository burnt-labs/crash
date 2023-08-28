export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function shortenAddress(
  address: string,
  charsBefore = 4,
  charsAfter = 4,
  delimiter = '...',
): string {
  if (!address) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return `${address.substring(0, charsBefore)}${delimiter}${address.substring(
    address.length - charsAfter,
  )}`;
}

export function mapFrom<T>(length: number, fn: (index: number) => T): T[] {
  return Array.from({ length }).map((_, index) => fn(index));
}

export const easeOutQuad = (x: number): number => {
  return 1 - (1 - x) * (1 - x);
};

export const linear = (x: number): number => x;

export const scrollTo = (
  scrollY: number,
  duration = 600,
  onStep?: (progress: number) => void,
  easing: (x: number) => number = linear,
): Promise<void> => {
  return new Promise((resolve) => {
    const startY = window.scrollY;
    const difference = scrollY - startY;
    const startTime = performance.now();

    const step = () => {
      let progress = (performance.now() - startTime) / duration;

      progress = Math.min(progress, 1);

      const amount = easing(progress);

      onStep?.(progress);
      window.scrollTo({ top: startY + amount * difference });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    step();
  });
};

export const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};
