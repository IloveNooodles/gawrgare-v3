import { Link, createFileRoute } from "@tanstack/react-router";
import { usePageEntrance } from "../hooks/use-page-entrance";
import { useSite } from "../components/site-layout";
import { listBlogPosts } from "../data/blog";

export const Route = createFileRoute("/blog/")({
  component: Blog,
});

export function Blog() {
  const { t, locale } = useSite();
  const entrance = usePageEntrance("blog");
  const posts = listBlogPosts(locale);
  return (
    <section ref={entrance} id="blog" className="content-section blog-section route-page">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">{t.blogEyebrow}</p>
          <h1>
            {t.blog}
            <span>.</span>
          </h1>
        </div>
        <span className="section-stamp">{t.blogStamp}</span>
      </div>
      <p className="blog-intro">{t.blogIntro}</p>
      <ol className="blog-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link className="blog-row" to="/blog/$slug" params={{ slug: post.slug }}>
              <time className="blog-date" dateTime={post.dateTime}>
                {post.date}
              </time>
              <div>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                <div className="project-tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="blog-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
