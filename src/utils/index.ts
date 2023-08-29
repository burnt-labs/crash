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

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}

export const linear = (x: number): number => x;

export const scrollTo = (
  scrollY: number,
  duration = 600,
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

export function shuffleArray(
  array: Array<{
    x: number;
    y: number;
  }>,
) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function fillScreenWithSquares(
  width: number,
  height: number,
  squareSize: number,
) {
  const squares = [];

  const cols = Math.floor(width / squareSize);
  const rows = Math.floor(height / squareSize);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      squares.push({
        x: j * squareSize,
        y: i * squareSize,
      });
    }
  }

  return shuffleArray(squares);
}
