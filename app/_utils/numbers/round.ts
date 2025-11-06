export const round = (value: number | string): number => {
  if (value === 0) return 0;

  if (typeof value === "string") {
    value = Number(value);
  }

  const str = value.toString();

  if (!str.includes(".")) return value;

  const match = str.match(/^-?\d+\.(0*)(\d)(\d)/);
  if (!match) return value;
  const precision = match[1].length + 2;

  return Number(value.toFixed(precision));
};
