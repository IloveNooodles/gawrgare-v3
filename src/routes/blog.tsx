import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "../data/locale";

export const Route = createFileRoute("/blog")({
  head: ({ match }) => ({
    meta: [{ title: pageTitle(match.search, "blog") }],
  }),
});
