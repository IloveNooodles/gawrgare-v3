// @vitest-environment happy-dom
import { act } from "react";
import type { Window } from "happy-dom";
declare const happyDOM: Window["happyDOM"];
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import { Home } from "./index";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(async () => {
  // Happy DOM eagerly creates finished promises; WAAPI cancellation rejects them.
  const cancel: unknown = Reflect.get(Animation.prototype, "cancel");
  if (typeof cancel !== "function") throw new Error("Missing animation cancellation");
  vi.spyOn(Animation.prototype, "cancel").mockImplementation(function (this: Animation) {
    void this.finished.catch((error: unknown) => {
      if (!(error instanceof DOMException) || error.name !== "AbortError") throw error;
    });
    cancel.call(this);
  });
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(<Home />));
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.restoreAllMocks();
  systemMotion("no-preference");
});

async function click(label: string) {
  await act(async () => button(label).click());
}

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
  await click("Replay intro");
  expect(container.querySelector(".hero-swipe")).not.toBe(firstWipe);
  await click("Pause motion");
  expect(container.querySelector(".site-shell")?.getAttribute("data-motion")).toBe("paused");
  expect(button("Replay intro").disabled).toBe(true);
  await click("Resume motion");
  expect(container.querySelector(".site-shell")?.getAttribute("data-motion")).toBe("playing");
});

function systemMotion(preference: "reduce" | "no-preference") {
  happyDOM.settings.device.prefersReducedMotion = preference;
  window.dispatchEvent(new Event("resize"));
}

it("stops the intro when system reduced motion is enabled", async () => {
  await act(async () => {
    systemMotion("reduce");
    await new Promise((resolve) => setTimeout(resolve, 60));
  });
  for (const selector of [".hero h1 > span", ".hero-art"]) {
    const style = container.querySelector(selector)?.getAttribute("style") ?? "";
    expect(style).not.toMatch(/translate|rotate|scale/);
    expect(style).not.toContain("opacity: 0;");
  }
});

it("shows three points for the main roles and one or two for earlier roles", () => {
  const roles = container.querySelectorAll("#experience article");
  expect(roles).toHaveLength(14);
  for (const role of roles) {
    const name = role.querySelector("h3")?.textContent;
    const points = role.querySelectorAll("ul > li");
    if (name === "Money Forward, Inc." || name === "MatchMade") {
      expect(points).toHaveLength(3);
    } else {
      expect(points.length).toBeGreaterThanOrEqual(1);
      expect(points.length).toBeLessThanOrEqual(2);
    }
  }
});
