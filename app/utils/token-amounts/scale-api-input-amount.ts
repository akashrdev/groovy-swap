export const scaleApiInputAmount = (amount: number, decimals: number) => {
  return Math.floor(amount * Math.pow(10, decimals));
};
