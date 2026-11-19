import { Link, createFileRoute } from "@tanstack/react-router";
import { labels } from "../data/labels";
import { useSite } from "../components/site-layout";
import { findBlogPost } from "../data/blog";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  head: ({ params, match }) => {
    const post = findBlogPost(params.slug);
    const t = labels[match.search.lang ?? "en"];
    return {
      meta: [{ title: `${post?.title ?? t.blog} — ${t.siteName}` }],
    };
  },
});

export function BlogPostPage() {
  const { slug } = Route.useParams();
  const { t, locale } = useSite();
  const post = findBlogPost(slug);
  const date = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  if (!post) {
    return (
      <section className="content-section blog-post route-page">
        <h1>{t.blog}</h1>
        <p className="empty-state">{t.postNotFound}</p>
        <Link className="experience-details" to="/blog">
          {t.backToBlog}
        </Link>
      </section>
    );
  }

  return (
    <section className="content-section blog-post route-page">
      <Link className="experience-details" to="/blog">
        ← {t.backToBlog}
      </Link>
      <div className="section-heading">
        <p className="eyebrow">
          <time dateTime={post.date}>{date.format(new Date(`${post.date}T00:00:00Z`))}</time>
          <span aria-hidden="true"> · </span>
          {post.tags.join(" / ")}
        </p>
        <h1>{post.title}</h1>
      </div>
      <article className="blog-article">
        <p className="blog-lead">{post.summary[locale]}</p>
        <h2>{t.inThisPost}</h2>
        <ul className="experience-points">
          {post.takeaways[locale].map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
        <a className="action-link" href={post.url} target="_blank" rel="noreferrer">
          {t.originalPost} <span aria-hidden="true">↗</span>
        </a>
      </article>
    </section>
  );
}
