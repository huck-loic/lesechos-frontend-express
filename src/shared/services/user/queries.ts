import { getApiUrl } from "../get-api-url";
import { userSchema } from "./schemas";

export async function getUser(userType?: string) {
  const path = userType ? `/user/${userType}` : "/user";
  const res = await fetch(getApiUrl(path));
  const json: unknown = await res.json();

  return userSchema.parse(json);
}
