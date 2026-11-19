import { createMemoryHistory } from "@tanstack/react-router";
import { getRouter } from "../router";
import type { FileRoutesByTo } from "../routeTree.gen";

export async function loadRouter(path: keyof FileRoutesByTo = "/") {
  const router = getRouter();
  router.update({
    history: createMemoryHistory({ initialEntries: [path] }),
    defaultPendingMinMs: 0,
  });
  await router.load();
  return router;
}
