import { HeadContent, Scripts, createRootRoute, retainSearchParams } from "@tanstack/react-router";

import { type Locale } from "../data/labels";
import { labelsFor, parseLocale, resolveLocale } from "../data/locale";
import { SiteLayout } from "../components/site-layout";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  validateSearch: (search: Record<string, unknown>): { lang?: Locale } => {
    return { lang: parseLocale(search.lang) };
  },
  search: { middlewares: [retainSearchParams(["lang"])] },
  head: ({ match }) => {
    const copy = labelsFor(resolveLocale(match.search));
    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: copy.siteName,
        },
        {
          name: "description",
          content: copy.siteDescription,
        },
        { name: "theme-color", content: "#e81932" },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
      ],
    };
  },
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
