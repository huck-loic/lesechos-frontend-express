export function getApiUrl(path: string) {
  const base = process.env.PUBLIC_API_URL ?? "/api";
  // const base = "/api";
  return base + path;
}
