// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it } from "vite-plus/test";
import { Home } from "./index";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(<Home />));
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

function button(label: string) {
  const element = Array.from(container.querySelectorAll("button")).find(
    (candidate) => candidate.textContent === label,
  );
  if (!element) throw new Error(`Missing button: ${label}`);
  return element;
}

it("starts the intro animation after mounting", async () => {
  await act(async () => new Promise((resolve) => setTimeout(resolve, 60)));
  const title = container.querySelector(".hero h1 > span");
  expect(title?.getAttribute("style")).toContain("transform");
});

it("can replay the visible intro and pause ongoing motion", async () => {
  const firstWipe = container.querySelector(".hero-swipe");
  expect(firstWipe).not.toBeNull();
  await act(async () => button("Replay intro").click());
  expect(container.querySelector(".hero-swipe")).not.toBe(firstWipe);
  await act(async () => button("Pause motion").click());
  expect(container.querySelector(".site-shell")?.getAttribute("data-motion")).toBe("paused");
  expect(button("Replay intro").disabled).toBe(true);
  await act(async () => button("Resume motion").click());
  expect(container.querySelector(".site-shell")?.getAttribute("data-motion")).toBe("playing");
});
