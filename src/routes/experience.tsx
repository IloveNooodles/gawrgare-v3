import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { useTimelineTrack } from "../hooks/use-timeline-track";
import { usePageEntrance } from "../hooks/use-page-entrance";
import { useSite } from "../components/site-layout";
import { experiences } from "../data/experience";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({ meta: [{ title: "Experience — Gare" }] }),
});

const stops = [
  { station: 12, left: 20, width: 74, angle: -2.4, gap: 4, color: "#f4bc35" },
  { station: 82, left: 10, width: 64, angle: 2.1, gap: 3, color: "#a9ce3a" },
  { station: 22, left: 30, width: 65, angle: -1.8, gap: 4.5, color: "#56c7c7" },
  { station: 76, left: 4, width: 64, angle: 2.5, gap: 3.5, color: "#db6aab" },
  { station: 14, left: 22, width: 68, angle: -2, gap: 4, color: "#d5d9dc" },
  { station: 80, left: 8, width: 64, angle: 1.3, gap: 0, color: "#f4bc35" },
];

type StopStyle = CSSProperties &
  Record<
    | "--track-color"
    | "--station"
    | "--card-left"
    | "--card-width"
    | "--card-angle"
    | "--stop-gap"
    | "--connector-left"
    | "--connector-width",
    string
  >;

export function Experience() {
  const { t, locale } = useSite();
  const entrance = usePageEntrance("experience");
  const { timeline, track } = useTimelineTrack();
  const route = track.legs
    .flatMap((leg, index) => (index === 0 ? leg : leg.slice(1)))
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const month = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <section ref={entrance} id="experience" className="content-section route-page experience-map">
      <div className="section-heading">
        <p className="eyebrow">THE JOURNEY SO FAR</p>
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
          Full work history on LinkedIn
        </a>
      </div>
      <ol ref={timeline} className="experience-timeline" aria-label={t.experiences}>
        {track.legs.length > 0 && (
          <svg
            className="timeline-route"
            viewBox={`0 0 ${track.width} ${track.height}`}
            aria-hidden="true"
            focusable="false"
          >
            <polyline
              className="timeline-track-edge"
              points={route}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
            {track.legs.map((leg, index) => (
              <polyline
                key={index}
                points={leg.map((point) => `${point.x},${point.y}`).join(" ")}
                stroke={stops[index % stops.length].color}
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        )}
        {experiences.map((experience, index) => {
          const stop = stops[index % stops.length];
          const edge = stop.station < stop.left ? stop.left : stop.left + stop.width;

          const style: StopStyle = {
            "--track-color": stop.color,
            "--station": `${stop.station}%`,
            "--card-left": `${stop.left}%`,
            "--card-width": `${stop.width}%`,
            "--card-angle": `${stop.angle}deg`,
            "--stop-gap": `${stop.gap}rem`,
            "--connector-left": `${Math.min(stop.station, edge)}%`,
            "--connector-width": `${Math.abs(stop.station - edge)}%`,
          };
          return (
            <li
              className="timeline-item"
              key={experience.name}
              data-current={experience.endDate === null ? true : undefined}
              style={style}
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
                  <p className="role-title">{experience.title}</p>
                  <ul className="experience-points">
                    {experience.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="project-tags">
                    {experience.tag.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
