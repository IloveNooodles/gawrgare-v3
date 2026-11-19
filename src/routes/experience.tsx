import { createFileRoute } from "@tanstack/react-router";
import { usePageEntrance } from "../hooks/use-page-entrance";
import { useSite } from "../components/site-layout";
import { experiences } from "../data/experience";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({ meta: [{ title: "Experience — Gare" }] }),
});

export function Experience() {
  const { t } = useSite();
  const entrance = usePageEntrance("experience");
  return (
    <section ref={entrance} id="experience" className="content-section route-page">
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
      <div className="experience-list">
        {experiences.map((experience) => (
          <article className="experience-row" key={experience.name}>
            <p className="experience-date">
              {experience.year_start} — {experience.year_end ?? t.present}
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
        ))}
      </div>
    </section>
  );
}
