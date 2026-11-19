import { createFileRoute } from "@tanstack/react-router";
import { labels } from "../data/labels";

export const Route = createFileRoute("/blog")({
  head: ({ match }) => ({
    meta: [
      {
        title: `${labels[match.search.lang ?? "en"].blog} — ${labels[match.search.lang ?? "en"].siteName}`,
      },
    ],
  }),
});
