import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

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
        title: "Gare — One Thing at a Time",
      },
      {
        name: "description",
        content:
          "Gare’s personal corner of the internet: side projects, CTFs, homelab experiments, games, and notes from the things I’m learning.",
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
