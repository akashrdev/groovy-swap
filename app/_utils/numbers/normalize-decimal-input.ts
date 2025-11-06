export const normalizeDecimalInput = (value: string): string => {
  if (value.startsWith(".")) {
    return "0" + value;
  }
  return value;
};
