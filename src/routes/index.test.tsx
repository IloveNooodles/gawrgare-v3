import { renderToStaticMarkup } from "react-dom/server";
import { RouterProvider } from "@tanstack/react-router";
import { expect, it } from "vite-plus/test";
import { loadRouter } from "../test/router";

it("renders a short home page visibly on the server", async () => {
  const html = renderToStaticMarkup(<RouterProvider router={await loadRouter()} />);
  for (const content of [
    "ONE THING",
    "AT A TIME.",
    "Things I make, things I learn, and a few side quests.",
    "digital garden",
  ]) {
    expect(html).toContain(content);
  }
  for (const section of ['id="experience"', 'id="projects"', 'id="awards"', 'class="ticker"']) {
    expect(html).not.toContain(section);
  }
  for (const removed of [
    "Money Forward",
    "Software Engineer III",
    "A WORK IN PROGRESS.",
    "JUST LIKE EVERYTHING GOOD.",
  ]) {
    expect(html).not.toContain(removed);
  }
  expect(html).not.toMatch(
    /style="[^"]*(opacity:\s*0(?:;|")|visibility:\s*hidden|display:\s*none)/,
  );
});

it("renders the six selected roles and retains the key results", async () => {
  const html = renderToStaticMarkup(<RouterProvider router={await loadRouter("/experience")} />);
  for (const content of [
    "Money Forward, Inc.",
    "MatchMade",
    "Internnet Indonesia",
    "Makmur",
    "Garena",
    "Sayurbox",
    "$1,591+ per month",
    "$1,500 per month",
    "Now",
    "400,000+ users",
    "Full work history on LinkedIn",
  ]) {
    expect(html).toContain(content);
  }
  for (const omitted of [
    "Comlabs-USDI",
    "Bangkit Academy",
    "Stealth Startup",
    "ARKAVIDIA",
    "Mile Zero",
    "Developer Student Club",
    "HMIF",
  ]) {
    expect(html).not.toContain(omitted);
  }
});

it("renders projects and awards at their own URLs", async () => {
  const projects = renderToStaticMarkup(<RouterProvider router={await loadRouter("/projects")} />);
  expect(projects).toContain("CTFs");
  expect(projects).toContain("dotfiles");
  expect(projects).toContain("raft-python");
  expect(projects).toContain("Search projects");
  const awards = renderToStaticMarkup(<RouterProvider router={await loadRouter("/awards")} />);
  expect(awards).toContain("Cyber Jawara");
  expect(awards).not.toContain('id="experience"');
});
