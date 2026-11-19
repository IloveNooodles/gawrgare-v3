import { createMemoryHistory } from "@tanstack/react-router";
import type { Locale } from "../data/labels";
import { getRouter } from "../router";
import type { FileRoutesByTo } from "../routeTree.gen";

export async function loadRouter(path: keyof FileRoutesByTo = "/", locale?: Locale) {
  const router = getRouter();
  router.update({
    history: createMemoryHistory({ initialEntries: [locale ? `${path}?lang=${locale}` : path] }),
    defaultPendingMinMs: 0,
  });
  await router.load();
  return router;
}
