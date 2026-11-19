import { pageTitle } from "../data/locale";
import { createFileRoute } from "@tanstack/react-router";
import { useTimelineTrack } from "../hooks/use-timeline-track";
import { usePageEntrance } from "../hooks/use-page-entrance";
import { useSite } from "../components/site-layout";
import { experiences } from "../data/experience";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: ({ match }) => ({
    meta: [{ title: pageTitle(match.search, "experiences") }],
  }),
});

export function Experience() {
  const { t, locale } = useSite();
  const entrance = usePageEntrance("experience");
  const { timeline, viewBox, edge, legs, stopStyles, hasTrack } = useTimelineTrack();
  const month = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <section ref={entrance} id="experience" className="content-section route-page experience-map">
      <div className="section-heading">
        <p className="eyebrow">{t.experienceEyebrow}</p>
        <h1>
          {t.experiences}
          <span>.</span>
        </h1>
        <a
          className="experience-details"
          href="https://www.linkedin.com/in/garebaldhie/"
          target="_blank"
          rel="noreferrer"
        >
          {t.fullHistory}
        </a>
      </div>
      <div className="timeline-map">
        {hasTrack && (
          <svg className="timeline-route" viewBox={viewBox} aria-hidden="true" focusable="false">
            <polyline
              className="timeline-track-edge"
              points={edge}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
            {legs.map((leg, index) => (
              <polyline
                key={index}
                points={leg.points}
                stroke={leg.color}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        )}
        <ol ref={timeline} className="experience-timeline" aria-label={t.experiences}>
          {experiences.map((experience, index) => (
            <li
              className="timeline-item"
              key={experience.name}
              data-current={experience.endDate === null ? true : undefined}
              style={stopStyles[index % stopStyles.length]}
            >
              <span className="timeline-node" aria-hidden="true" />
              <article className="experience-row">
                <p className="experience-date">
                  <time dateTime={experience.startDate}>
                    {month.format(new Date(`${experience.startDate}-01T00:00:00Z`))}
                  </time>
                  <span aria-hidden="true"> — </span>
                  {experience.endDate ? (
                    <time dateTime={experience.endDate}>
                      {month.format(new Date(`${experience.endDate}-01T00:00:00Z`))}
                    </time>
                  ) : (
                    <span className="timeline-now">{t.now}</span>
                  )}
                </p>
                <div>
                  <h2>
                    <a href={experience.url} target="_blank" rel="noreferrer">
                      {experience.name}
                    </a>
                  </h2>
                  <p className="role-title">{experience.title[locale]}</p>
                  <ul className="experience-points">
                    {experience.points[locale].map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="project-tags">
                    {experience.tag.map((tag) => (
                      <span key={tag}>
                        {tag === "Leadership"
                          ? t.leadership
                          : tag === "Payments"
                            ? t.payments
                            : tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
