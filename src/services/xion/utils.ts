export const praseExpectedSequence = (message: string): number | null => {
  const regex = /expected (\d+)/;
  const match = message.match(regex);

  if (match && match[1]) {
    return parseInt(match[1]);
  }

  return null;
};
