export function getApiUrl(path: string) {
  const base = process.env.PUBLIC_API_URL ?? "http://localhost:3000/api";
  return base + path;
}
