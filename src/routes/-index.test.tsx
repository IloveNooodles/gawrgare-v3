import { renderToStaticMarkup } from "react-dom/server";
import { RouterProvider } from "@tanstack/react-router";
import { expect, it } from "vite-plus/test";
import { loadRouter } from "../test/router";
import { getBlogPost, listBlogPosts } from "../data/blog";

it("renders a short home page visibly on the server", async () => {
  const html = renderToStaticMarkup(<RouterProvider router={await loadRouter()} />);
  for (const content of [
    "ONE THING",
    "AT A TIME.",
    "Things I make, things I learn, and a few side quests.",
    "digital garden",
  ]) {
    expect(html).toContain(content);
  }
  for (const section of ['id="experience"', 'id="projects"', 'id="awards"', 'class="ticker"']) {
    expect(html).not.toContain(section);
  }
  for (const removed of [
    "Money Forward",
    "Software Engineer III",
    "A WORK IN PROGRESS.",
    "JUST LIKE EVERYTHING GOOD.",
  ]) {
    expect(html).not.toContain(removed);
  }
  expect(html).not.toMatch(
    /style="[^"]*(opacity:\s*0(?:;|")|visibility:\s*hidden|display:\s*none)/,
  );
});

it("renders the six selected roles and retains the key results", async () => {
  const html = renderToStaticMarkup(<RouterProvider router={await loadRouter("/experience")} />);
  for (const content of [
    "Money Forward, Inc.",
    "MatchMade",
    "Internnet Indonesia",
    "Makmur",
    "Garena",
    "Sayurbox",
    "$1,591+ per month",
    "$1,500 per month",
    "Now",
    "400,000+ users",
    "Full work history on LinkedIn",
  ]) {
    expect(html).toContain(content);
  }
  for (const omitted of [
    "Comlabs-USDI",
    "Bangkit Academy",
    "Stealth Startup",
    "ARKAVIDIA",
    "Mile Zero",
    "Developer Student Club",
    "HMIF",
  ]) {
    expect(html).not.toContain(omitted);
  }
});

it("renders projects and awards at their own URLs", async () => {
  const projects = renderToStaticMarkup(<RouterProvider router={await loadRouter("/projects")} />);
  expect(projects).toContain("CTFs");
  expect(projects).toContain("dotfiles");
  expect(projects).toContain("raft-python");
  expect(projects).toContain("Search projects");
  const awards = renderToStaticMarkup(<RouterProvider router={await loadRouter("/awards")} />);
  expect(awards).toContain("Cyber Jawara");
  expect(awards).not.toContain('id="experience"');
});

it("renders the blog index with all six posts", async () => {
  const html = renderToStaticMarkup(<RouterProvider router={await loadRouter("/blog")} />);
  for (const content of [
    "NOTES FROM THE FIELD",
    "Supercharge Kubernetes with eBPF and Cilium",
    "Build Our Own Kubernetes Cluster",
    "Utilizing Neovim API in Cursor",
  ]) {
    expect(html).toContain(content);
  }
  expect(html).toContain('href="/blog/kubernetes-ebpf-and-cilium"');
  expect(html).toContain('href="/blog/introduction-to-binary-exploitation"');
  expect(listBlogPosts("en").map((post) => post.slug)).toEqual([
    "kubernetes-ebpf-and-cilium",
    "build-your-own-kubernetes-cluster",
    "neovim-api-in-cursor",
    "introduction-to-binary-exploitation",
    "optimize-docker-using-multistage-docker-build",
    "hello-world",
  ]);
});

it("resolves post data through the blog interface", () => {
  const newest = listBlogPosts("en")[0];
  expect(newest?.dateTime).toBe("2025-12-19");
  expect(newest?.date).toContain("2025");
  expect(newest?.summary).toContain("Kubernetes");

  const ported = getBlogPost("hello-world", "en");
  expect(ported?.hasBody).toBe(true);
  expect(ported?.body).toContain('class="katex"');
  expect(ported?.readingTime).toBeGreaterThan(0);
  expect(ported?.dateTime).toBe("2023-06-04");

  const summary = getBlogPost("neovim-api-in-cursor", "ja");
  expect(summary?.hasBody).toBe(false);
  expect(summary?.summary).toContain("Vim");
  expect(getBlogPost("nope", "en")).toBeUndefined();
});

it("renders a ported v1 post as full Markdown", async () => {
  const html = renderToStaticMarkup(
    <RouterProvider router={await loadRouter("/blog/introduction-to-binary-exploitation")} />,
  );
  for (const content of [
    "Classic Buffer Overflow",
    '<div class="code-title">example1.c</div>',
    '<pre class="code-block language-c"><code class="code-highlight language-c">',
    '<span class="token keyword">',
  ]) {
    expect(html).toContain(content);
  }
  expect(html).not.toContain("Read the original on Money Forward Developers Blog");
  expect(html).toContain('<nav class="post-toc"');
  expect(html).toContain('href="#classic-buffer-overflow"');
  expect(html).toContain("min read");
});

it("renders LaTeX, heading anchors and a table of contents", async () => {
  const html = renderToStaticMarkup(
    <RouterProvider router={await loadRouter("/blog/hello-world")} />,
  );
  for (const content of [
    'class="katex"',
    'id="table-of-contents"',
    'class="post-toc"',
    'id="here-are-some-cool-math-equation"',
  ]) {
    expect(html).toContain(content);
  }
});

it("falls back to English markdown when a locale has no translation", async () => {
  const html = renderToStaticMarkup(
    <RouterProvider router={await loadRouter("/blog/hello-world", "id")} />,
  );
  expect(html).toContain('class="katex"');
  expect(html).toContain("menit baca");
});

it("renders a blog post with its original source link", async () => {
  const html = renderToStaticMarkup(
    <RouterProvider router={await loadRouter("/blog/neovim-api-in-cursor")} />,
  );
  for (const content of [
    "Utilizing Neovim API in Cursor",
    "In this post",
    "Read the original on Money Forward Developers Blog",
    "https://global.moneyforward-dev.jp/2025/05/09/utilizing-neovim-api-in-cursor/",
  ]) {
    expect(html).toContain(content);
  }
  const missing = renderToStaticMarkup(<RouterProvider router={await loadRouter("/blog/nope")} />);
  expect(missing).toContain("That post is not in the archive.");
});
