import { getApiUrl } from "../get-api-url";
import { newsletterItemsSchema } from "./schemas";

export async function getNewsletterItems() {
  const res = await fetch(getApiUrl("/newsletters"));
  const json: unknown = await res.json();

  return newsletterItemsSchema.parse(json);
}
