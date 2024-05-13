import { getNewsletterItems } from "./newsletters/queries";
import { setUserSubscriptionsToNewsletters } from "./transforms/set-user-subscriptions-to-newsletters";
import { getUser } from "./user/queries";

export async function getNewslettersForUser(userType?: string) {
  const [newsletters, user] = await Promise.all([getNewsletterItems(), getUser(userType)]);

  return setUserSubscriptionsToNewsletters(user, newsletters);
}
