import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { pageTitle, resolveLocale } from "../data/locale";
import { useSite } from "../components/site-layout";
import { getBlogPost } from "../data/blog";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params, search }) => {
    if (!getBlogPost(params.slug, resolveLocale(search))) throw notFound();
  },
  component: BlogPostPage,
  notFoundComponent: BlogPostNotFound,
  head: ({ params, match }) => {
    const post = getBlogPost(params.slug, resolveLocale(match.search));
    return {
      meta: [{ title: pageTitle(match.search, "blog", post?.title) }],
    };
  },
});

export function BlogPostPage() {
  const { slug } = Route.useParams();
  const { t, locale } = useSite();
  const post = getBlogPost(slug, locale);

  if (!post) throw notFound();

  return (
    <section className="content-section blog-post route-page">
      <Link className="experience-details" to="/blog">
        ← {t.backToBlog}
      </Link>
      <div className="section-heading">
        <p className="eyebrow">
          <time dateTime={post.dateTime}>{post.date}</time>
          <span aria-hidden="true"> · </span>
          {post.tags.join(" / ")}
          {post.readingTime && (
            <>
              <span aria-hidden="true"> · </span>
              <span>{t.readingTime.replace("{count}", String(post.readingTime))}</span>
            </>
          )}
        </p>
        <h1>{post.title}</h1>
      </div>
      <article className="blog-article">
        <p className="blog-lead">{post.summary}</p>
        {post.takeaways.length > 0 && (
          <>
            <h2>{t.inThisPost}</h2>
            <ul className="experience-points">
              {post.takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </>
        )}
        {post.body && <div className="prose" dangerouslySetInnerHTML={{ __html: post.body }} />}
        {!post.hasBody && (
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
