export const scaleApiInputAmount = (
  amount: number | string,
  decimals: number
) => {
  if (typeof amount === "string") {
    amount = Number(amount);
  }
  return Math.floor(amount * Math.pow(10, decimals));
};
