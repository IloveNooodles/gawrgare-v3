import { expect, it } from "vite-plus/test";
import { visibleProjects } from "./projects";

it("shows the curated projects by default", () => {
  const { projects, total } = visibleProjects("");
  expect(projects.map((project) => project.name)).toEqual(["CTFs", "dotfiles", "raft-python"]);
  expect(total).toBe(projects.length);
});

it("matches names, descriptions, languages and topics without case or surrounding whitespace", () => {
  for (const query of ["  CTFS  ", "Python", "cryptography", "journey"]) {
    expect(visibleProjects(query).projects.some((project) => project.name === "CTFs")).toBe(true);
  }
  expect(visibleProjects("Python").total).toBeGreaterThan(
    visibleProjects("Python").projects.length,
  );
});

it("returns an empty result when nothing matches", () => {
  expect(visibleProjects("no-such-project-12345").projects).toEqual([]);
});

it("searches translated descriptions in Indonesian and Japanese", () => {
  for (const query of ["protokol", "プロトコル"]) {
    expect(visibleProjects(query).projects.some((project) => project.name === "raft-python")).toBe(
      true,
    );
  }
});
