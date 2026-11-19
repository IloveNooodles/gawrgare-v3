import { renderPosts } from "./render-posts";

const files = import.meta.glob<string>("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const LOCAL_POSTS = renderPosts(files);
