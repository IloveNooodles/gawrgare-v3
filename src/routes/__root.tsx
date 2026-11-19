import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import { labels } from "../data/labels";
import { SiteLayout } from "../components/site-layout";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: labels.en.siteName,
      },
      {
        name: "description",
        content: labels.en.siteDescription,
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
  return (
    <html lang="en">
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
