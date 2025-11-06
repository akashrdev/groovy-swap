export const getFormattedAmount = (amount: number, decimals: number) => {
  return Number(amount) / Math.pow(10, decimals);
};
