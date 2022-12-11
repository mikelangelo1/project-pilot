export default function ConvertToLowerDenominator(val: number | string) {
  const value = Number(Number(val).toFixed(2));
  return (Math.round(value * 100));
}
