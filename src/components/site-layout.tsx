import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { labels, type Locale } from "../data/labels";

const SiteContext = createContext<{
  t: typeof labels.en;
  locale: Locale;
  setLocale: (locale: Locale) => void;
} | null>(null);

export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("Site pages must render inside SiteLayout");
  return site;
}

const pages: {
  to: "/" | "/experience" | "/projects" | "/awards";
  label: "home" | "experiences" | "projects" | "awards";
}[] = [
  { to: "/", label: "home" },
  { to: "/experience", label: "experiences" },
  { to: "/projects", label: "projects" },
  { to: "/awards", label: "awards" },
];
const languages: Locale[] = ["en", "id", "ja"];

export function SiteLayout() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });
  const previousPath = useRef(pathname);
  const main = useRef<HTMLElement>(null);
  const t = labels[locale];

  useEffect(() => {
    if (previousPath.current !== pathname) {
      main.current?.focus({ preventScroll: true });
      previousPath.current = pathname;
    }
  }, [pathname]);

  return (
    <SiteContext.Provider value={{ t, locale, setLocale }}>
      <div className="site-shell" lang={locale}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <aside className="sidebar" data-open={menuOpen}>
          <div className="sidebar-header">
            <Link className="wordmark" to="/" aria-label="Gare home">
              g<span>★</span>re.
            </Link>
            <button
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close menu" : "Menu"}
            </button>
          </div>
          <p className="sidebar-caption">CHOOSE YOUR NEXT CHAPTER</p>
          <nav id="site-menu" className="persona-menu" aria-label="Main navigation">
            {pages.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                activeOptions={{ exact: true }}
                onClick={() => {
                  setMenuOpen(false);
                  if (menuOpen) main.current?.focus({ preventScroll: true });
                }}
              >
                <span aria-hidden="true">✦</span>
                <svg
                  className="menu-dagger"
                  viewBox="0 0 80 28"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M29 4 77 13 29 24 36 14Z"
                    fill="var(--paper)"
                    stroke="var(--ink)"
                    strokeWidth="2"
                  />
                  <path d="m36 14 35-1-40 9Z" fill="var(--red)" />
                  <path
                    d="m5 10 19-2 5 12-22-1Z"
                    fill="var(--red)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />
                  <path
                    d="m22 3 5-1 8 23-6 1Z"
                    fill="var(--ink)"
                    stroke="var(--paper)"
                    strokeWidth="2"
                  />
                  <path d="m9 12 13-1m-12 5 13-1" stroke="var(--ink)" strokeWidth="2" />
                </svg>
                {t[page.label]}
              </Link>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <p className="sidebar-motto">
              ONE THING
              <br />
              <strong>AT A TIME.</strong>
            </p>
            <p className="reduced-motion-note">
              Reduced motion is enabled in your system settings.
            </p>
          </div>
        </aside>
        <div className="site-content">
          <header className="topbar">
            <span className="topbar-note">PERSONAL SPACE / VOL. 03</span>
            <div className="languages" aria-label="Language">
              {languages.map((language) => (
                <button
                  key={language}
                  aria-pressed={locale === language}
                  onClick={() => setLocale(language)}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
          </header>
          <main id="main" tabIndex={-1} ref={main}>
            <Outlet />
          </main>
          <footer>
            <p>Always learning. Always building.</p>
            <a href="https://github.com/IloveNooodles/gawrgare-v3">View source</a>
            <span className="footer-signoff">ONE THING AT A TIME. ✦</span>
          </footer>
        </div>
      </div>
    </SiteContext.Provider>
  );
}
