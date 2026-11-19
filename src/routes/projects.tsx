import { pageTitle } from "../data/locale";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePageEntrance } from "../hooks/use-page-entrance";
import { useSite } from "../components/site-layout";
import { visibleProjects } from "../data/projects";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: ({ match }) => ({
    meta: [{ title: pageTitle(match.search, "projects") }],
  }),
});

export function Projects() {
  const { t, locale } = useSite();
  const entrance = usePageEntrance("projects");
  const [query, setQuery] = useState("");
  const { projects, total } = visibleProjects(query);
  return (
    <section ref={entrance} id="projects" className="content-section projects-section route-page">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">{t.projectsEyebrow}</p>
          <h1>
            {t.projects}
            <span>.</span>
          </h1>
        </div>
        <span className="section-stamp">{t.projectsStamp}</span>
      </div>
      <label className="search-field">
        <span>{t.search}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.searchPlaceholder}
        />
      </label>
      <p className="result-count" role="status">
        {projects.length} / {total} {query.trim() ? t.matching : t.featured}
      </p>
      <div className="project-list">
        {projects.map((project) => (
          <a
            className="project-row"
            key={project.id}
            href={project.svn_url}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              {project.language && <span className="project-language">{project.language}</span>}
              <h2>{project.name}</h2>
              <p>{project.description[locale]}</p>
              <div className="project-tags">
                {project.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </div>
            <span
              className="project-stars"
              aria-label={t.stars.replace(
                "{count}",
                new Intl.NumberFormat(locale).format(project.stargazers_count),
              )}
            >
              ☆ {project.stargazers_count}
            </span>
          </a>
        ))}
      </div>
      {projects.length === 0 && <p className="empty-state">{t.empty}</p>}
    </section>
  );
}
