import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { labels } from "../data/labels";
import { useSite } from "../components/site-layout";
import { findBlogPost } from "../data/blog";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    if (!findBlogPost(params.slug)) throw notFound();
  },
  component: BlogPostPage,
  notFoundComponent: BlogPostNotFound,
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
  const body = post?.body?.[locale];
  const readingTime = post?.readingTime?.[locale];
  const date = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  if (!post) throw notFound();

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
          {readingTime && (
            <>
              <span aria-hidden="true"> · </span>
              <span>{t.readingTime.replace("{count}", String(readingTime))}</span>
            </>
          )}
        </p>
        <h1>{post.title}</h1>
      </div>
      <article className="blog-article">
        <p className="blog-lead">{post.summary[locale]}</p>
        {post.takeaways[locale].length > 0 && (
          <>
            <h2>{t.inThisPost}</h2>
            <ul className="experience-points">
              {post.takeaways[locale].map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </>
        )}
        {body && <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />}
        {!body && (
          <a className="action-link" href={post.url} target="_blank" rel="noreferrer">
            {t.originalPost} <span aria-hidden="true">↗</span>
          </a>
        )}
      </article>
    </section>
  );
}

function BlogPostNotFound() {
  const { t } = useSite();
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
