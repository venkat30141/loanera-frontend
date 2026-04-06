export const calculateEmi = (amount, rate, months) => {
  const r = rate / 12 / 100;
  return Math.round(
    (amount * r * Math.pow(1 + r, months)) /
    (Math.pow(1 + r, months) - 1)
  );
};