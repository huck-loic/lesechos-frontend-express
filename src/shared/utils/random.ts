export function randomBetween(min: number, max: number): number {
  const t = Math.random();
  return min * (1 - t) + max * t;
}
