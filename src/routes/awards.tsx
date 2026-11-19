import { labels } from "../data/labels";
import { createFileRoute } from "@tanstack/react-router";
import { usePageEntrance } from "../hooks/use-page-entrance";
import { useSite } from "../components/site-layout";
import { awards } from "../data/awards";

export const Route = createFileRoute("/awards")({
  component: Awards,
  head: ({ match }) => ({
    meta: [
      {
        title: `${labels[match.search.lang ?? "en"].awards} — ${labels[match.search.lang ?? "en"].siteName}`,
      },
    ],
  }),
});

export function Awards() {
  const { t, locale } = useSite();
  const entrance = usePageEntrance("awards");
  return (
    <section ref={entrance} id="awards" className="content-section awards-section route-page">
      <div className="section-heading">
        <p className="eyebrow">{t.awardsEyebrow}</p>
        <h1>
          {t.awards}
          <span>.</span>
        </h1>
      </div>
      <div className="award-list">
        {awards.map((award) => (
          <a
            href={award.url}
            className="award-row"
            key={award.name}
            target="_blank"
            rel="noreferrer"
          >
            <span
              className="award-place"
              aria-label={t.place.replace(
                "{count}",
                new Intl.NumberFormat(locale).format(award.place),
              )}
            >
              #{award.place}
            </span>
            <div>
              <h2>{award.name}</h2>
              <p>
                {award.organizer} · {t.awardScope[award.scope]}
              </p>
            </div>
            <span className="award-year">{award.year}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
