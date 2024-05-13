import type { Newsletter } from "../newsletters/schemas";

export function groupNewslettersBySite<T extends Newsletter>(list: T[]) {
  const groups = new Map<string, { name: string; items: T[] }>();

  for (const item of list) {
    let currentGroup = groups.get(item.site);
    if (!currentGroup) {
      currentGroup = {
        name: item.site,
        items: [],
      };

      groups.set(item.site, currentGroup);
    }

    currentGroup.items.push(item);
  }

  return Array.from(groups.values());
}
