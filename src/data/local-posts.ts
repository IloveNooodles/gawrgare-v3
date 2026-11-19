import { marked } from "marked";
import markedFootnote from "marked-footnote";
import markedKatex from "marked-katex-extension";
import Prism from "prismjs";
import type { BlogPost } from "./blog";
import { labels, type Locale, type Localized } from "./labels";

import bashGrammar from "prismjs/components/prism-bash.js?raw";
import cGrammar from "prismjs/components/prism-c.js?raw";
import dockerGrammar from "prismjs/components/prism-docker.js?raw";
import markdownGrammar from "prismjs/components/prism-markdown.js?raw";
import pythonGrammar from "prismjs/components/prism-python.js?raw";

// Grammar files are plain scripts expecting a global `Prism`; bind it explicitly.
for (const grammar of [bashGrammar, cGrammar, dockerGrammar, markdownGrammar, pythonGrammar]) {
  // oxlint-disable-next-line no-implied-eval -- vendored grammar source, not user input
  new Function("Prism", grammar)(Prism);
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

marked.use(markedFootnote(), markedKatex({ throwOnError: false }), {
  renderer: {
    code({ text, lang }) {
      const [language, title] = (lang ?? "").split(":");
      const grammar = language ? Prism.languages[language] : undefined;
      const highlighted = grammar ? Prism.highlight(text, grammar, language) : escapeHtml(text);
      const classes = language ? ` language-${escapeHtml(language)}` : "";
      const label = title ? `<div class="code-title">${escapeHtml(title)}</div>` : "";
      return `${label}<pre class="code-block${classes}"><code class="code-highlight${classes}">${highlighted}</code></pre>`;
    },
  },
});

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "section"
  );
}

function addHeadingAnchorsAndToc(html: string) {
  const used = new Set<string>();
  const entries: { depth: number; id: string; text: string }[] = [];
  const anchored = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, depth: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      let id = slugify(text);
      let suffix = 2;
      while (used.has(id)) id = `${slugify(text)}-${suffix++}`;
      used.add(id);
      if (text !== "Table of Contents") entries.push({ depth: Number(depth), id, text });
      return `<h${depth} id="${id}">${inner}</h${depth}>`;
    },
  );
  const toc = entries.length
    ? `<nav class="post-toc" aria-label="On this page"><ul>${entries
        .map(
          (entry) =>
            `<li class="toc-depth-${entry.depth}"><a href="#${entry.id}">${entry.text}</a></li>`,
        )
        .join("")}</ul></nav>`
    : "";
  return anchored.replace(/(<h2 id="[^"]+">Table of Contents<\/h2>)/, `$1${toc}`);
}

function parsePost(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Invalid post frontmatter");
  const meta = Object.fromEntries(
    match[1].split(/\r?\n/).map((line) => {
      const separator = line.indexOf(":");
      return [
        line.slice(0, separator),
        line
          .slice(separator + 1)
          .trim()
          .replace(/^['"]|['"]$/g, ""),
      ];
    }),
  );
  return { meta, body: match[2] };
}

function takeawaysFrom(body: string) {
  return [...body.matchAll(/^## (.+)$/gm)]
    .map((heading) => heading[1].trim())
    .filter((heading) => heading !== "Table of Contents");
}

const locales = Object.keys(labels) as Locale[];
const files = import.meta.glob<string>("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// A file named `slug.id.md` is the Indonesian version; an unsuffixed name is English.
const versions = new Map<string, Partial<Record<Locale, string>>>();
for (const [file, source] of Object.entries(files)) {
  const parts = file.split("/").at(-1)!.replace(/\.md$/, "").split(".");
  const locale = locales.find((candidate) => candidate === parts.at(-1));
  if (locale) parts.pop();
  const slug = parts.join(".");
  const entry = versions.get(slug) ?? {};
  entry[locale ?? "en"] = source;
  versions.set(slug, entry);
}

function toPost(slug: string, sources: Partial<Record<Locale, string>>): BlogPost {
  const primarySource = sources.en ?? Object.values(sources)[0];
  if (!primarySource) throw new Error(`Missing markdown source for ${slug}`);
  const primary = parsePost(primarySource);
  const parsed = Object.fromEntries(
    locales.map((locale) => [locale, parsePost(sources[locale] ?? primarySource)]),
  ) as Record<Locale, ReturnType<typeof parsePost>>;

  const summary = Object.fromEntries(
    locales.map((locale) => [locale, parsed[locale].meta.description]),
  ) as Localized<string>;
  const takeaways = Object.fromEntries(
    locales.map((locale) => [locale, takeawaysFrom(parsed[locale].body)]),
  ) as Localized<string[]>;
  const body = Object.fromEntries(
    locales.map((locale) => [
      locale,
      addHeadingAnchorsAndToc(marked.parse(parsed[locale].body) as string),
    ]),
  ) as Localized<string>;
  const readingTime = Object.fromEntries(
    locales.map((locale) => [
      locale,
      Math.max(1, Math.ceil(parsed[locale].body.trim().split(/\s+/).length / 200)),
    ]),
  ) as Localized<number>;

  return {
    slug: primary.meta.slug,
    title: primary.meta.title,
    date: primary.meta.published,
    tags: [primary.meta.category],
    url: `https://v1.mgarebaldhie.com/blog/${primary.meta.slug}`,
    summary,
    takeaways,
    readingTime,
    body,
  };
}

export const LOCAL_POSTS: BlogPost[] = [...versions].map(([slug, sources]) =>
  toPost(slug, sources),
);
