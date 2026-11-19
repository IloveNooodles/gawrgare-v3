import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePageEntrance } from "../hooks/use-page-entrance";
import { useSite } from "../components/site-layout";
import { GITHUB_PROJECTS, searchProjects } from "../data/projects";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({ meta: [{ title: "Projects — Gare" }] }),
});

export function Projects() {
  const { t } = useSite();
  const entrance = usePageEntrance("projects");
  const [query, setQuery] = useState("");
  const projects = query.trim()
    ? searchProjects(query)
    : GITHUB_PROJECTS.filter(
        (project) => !project.private && ["CTFs", "dotfiles", "raft-python"].includes(project.name),
      );
  return (
    <section ref={entrance} id="projects" className="content-section projects-section route-page">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">IDEAS, TURNED INTO COMMITS</p>
          <h1>
            {t.projects}
            <span>.</span>
          </h1>
        </div>
        <span className="section-stamp">BUILT TO EXPLORE</span>
      </div>
      <label className="search-field">
        <span>{t.search}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Python, infrastructure, CTF…"
        />
      </label>
      <p className="result-count" role="status">
        {projects.length} / {GITHUB_PROJECTS.filter((project) => !project.private).length}{" "}
        {query.trim() ? "matching repositories" : "featured · search all repositories"}
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
              <span className="project-language">{project.language || "Repository"}</span>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </div>
            <span className="project-stars" aria-label={`${project.stargazers_count} GitHub stars`}>
              ☆ {project.stargazers_count}
            </span>
          </a>
        ))}
      </div>
      {projects.length === 0 && <p className="empty-state">{t.empty}</p>}
    </section>
  );
}
