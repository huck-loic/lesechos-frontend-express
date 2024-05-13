import { z } from "zod";

export const newsletterSchema = z.object({
  id: z.string(),
  image: z.string(),
  description: z.string(),
  title: z.string(),
  site: z.string(),
  subscriptions: z.array(z.string()),
});

export const newsletterItemsSchema = z.array(newsletterSchema);

export type Newsletter = z.infer<typeof newsletterSchema>;
export type NewsletterItems = z.infer<typeof newsletterSchema>;
