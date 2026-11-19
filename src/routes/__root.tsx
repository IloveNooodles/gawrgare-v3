import { HeadContent, Scripts, createRootRoute, retainSearchParams } from "@tanstack/react-router";

import { labels, type Locale } from "../data/labels";
import { SiteLayout } from "../components/site-layout";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  validateSearch: (search: Record<string, unknown>): { lang?: Locale } => {
    return { lang: search.lang === "id" || search.lang === "ja" ? search.lang : undefined };
  },
  search: { middlewares: [retainSearchParams(["lang"])] },
  head: ({ match }) => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: labels[match.search.lang ?? "en"].siteName,
      },
      {
        name: "description",
        content: labels[match.search.lang ?? "en"].siteDescription,
      },
      { name: "theme-color", content: "#e81932" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: SiteLayout,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { lang } = Route.useSearch();
  return (
    <html lang={lang ?? "en"}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
