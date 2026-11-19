import { describe, expect, it } from "vite-plus/test";
import { GITHUB_PROJECTS, searchProjects } from "./projects";

describe("project search", () => {
  it("shows every public v2 project for an empty search", () => {
    expect(searchProjects("")).toEqual(GITHUB_PROJECTS.filter((project) => !project.private));
  });
  it("matches names, descriptions, languages and topics without case or surrounding whitespace", () => {
    for (const query of ["  CTFS  ", "Python", "cryptography", "journey"]) {
      expect(searchProjects(query).some((project) => project.name === "CTFs")).toBe(true);
    }
  });
  it("returns an empty result when nothing matches", () => {
    expect(searchProjects("no-such-project-12345")).toEqual([]);
  });
});

it("searches translated descriptions in Indonesian and Japanese", () => {
  for (const query of ["protokol", "プロトコル"]) {
    expect(searchProjects(query).some((project) => project.name === "raft-python")).toBe(true);
  }
});
