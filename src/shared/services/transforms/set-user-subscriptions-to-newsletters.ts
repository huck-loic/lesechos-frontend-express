import type { Newsletter } from "../newsletters/schemas";
import type { User } from "../user/schemas";

export function setUserSubscriptionsToNewsletters(user: User, newsletters: Newsletter[]) {
  const userSubscriptions = new Set(user.subscriptions);
  const userHasSubscriptionRights = (subscription: string) => userSubscriptions.has(subscription);
  return newsletters.map((newsletter) => ({
    ...newsletter,
    hasSubscriptionRights: newsletter.subscriptions.length === 0 || newsletter.subscriptions.some(userHasSubscriptionRights),
  }));
}
