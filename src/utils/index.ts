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
