import { expect, it } from "vite-plus/test";
import { renderPosts } from "./render-posts";

const source = `---
title: "Test Post"
description: "A short description"
slug: "test-post"
published: "2026-01-01"
category: "misc"
---

## Table of Contents

## First Heading

Some words here with a footnote[^1].

$$x^2$$

\`\`\`c:example.c
int main() { return 0; }
\`\`\`

[^1]: The footnote text.
`;

const [post] = renderPosts({ "test-post.md": source });

it("builds heading anchors and a table of contents", () => {
  expect(post?.body?.en).toContain('id="first-heading"');
  expect(post?.body?.en).toContain('<nav class="post-toc"');
  expect(post?.body?.en).toContain('href="#first-heading"');
  expect(post?.takeaways.en).toContain("First Heading");
  expect(post?.takeaways.en).not.toContain("Table of Contents");
});

it("renders math, code titles and footnotes through marked", () => {
  expect(post?.body?.en).toContain('class="katex"');
  expect(post?.body?.en).toContain('<div class="code-title">example.c</div>');
  expect(post?.body?.en).toContain('<span class="token keyword">');
  expect(post?.body?.en).toContain("footnote-ref");
});

it("falls back to the English source for locales without a markdown file", () => {
  expect(post?.body?.ja).toBe(post?.body?.en);
  expect(post?.summary.ja).toBe(post?.summary.en);
  expect(post?.readingTime?.ja).toBe(post?.readingTime?.en);
});

it("uses a translated source when one is provided", () => {
  const [translated] = renderPosts({
    "test-post.md": source,
    "test-post.ja.md": source.replace("A short description", "説明"),
  });
  expect(translated?.summary.ja).toBe("説明");
  expect(translated?.summary.en).toBe("A short description");
});

it("estimates reading time from the source word count", () => {
  expect(post?.readingTime?.en).toBe(1);
  const longSource = source.replace("Some words here", "word ".repeat(401).trim());
  const [long] = renderPosts({ "test-post.md": longSource });
  expect(long?.readingTime?.en).toBe(3);
});
