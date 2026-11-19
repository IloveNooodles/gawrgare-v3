// @vitest-environment happy-dom
import { act } from "react";
import type { Window } from "happy-dom";
declare const happyDOM: Window["happyDOM"];
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import { RouterProvider } from "@tanstack/react-router";
import { loadRouter } from "../test/router";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
let router: Awaited<ReturnType<typeof loadRouter>>;

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
  router = await loadRouter();
  await act(async () => root.render(<RouterProvider router={router} />));
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
  const frames = title
    ?.getAnimations()
    .flatMap((animation) =>
      animation.effect instanceof KeyframeEffect ? animation.effect.getKeyframes() : [],
    );
  expect(JSON.stringify(frames)).toContain("translateX");
});

it("can replay the intro without a pause button", async () => {
  const firstWipe = container.querySelector(".hero-swipe");
  expect(firstWipe).not.toBeNull();
  await click("Replay intro");
  expect(container.querySelector(".hero-swipe")).not.toBe(firstWipe);
  expect(
    Array.from(container.querySelectorAll("button")).some((element) =>
      /pause|resume/i.test(element.textContent ?? ""),
    ),
  ).toBe(false);
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

it("shows three points for the main roles and one or two for earlier roles", async () => {
  await act(async () => {
    await router.navigate({ to: "/experience" });
  });
  const roles = container.querySelectorAll("#experience article");
  expect(roles).toHaveLength(6);
  for (const role of roles) {
    const name = role.querySelector("h2")?.textContent;
    const points = role.querySelectorAll("ul > li");
    if (name === "Money Forward, Inc." || name === "MatchMade") {
      expect(points).toHaveLength(3);
    } else {
      expect(points.length).toBeGreaterThanOrEqual(1);
      expect(points.length).toBeLessThanOrEqual(2);
    }
  }
});

it("keeps the language while navigating between pages", async () => {
  await click("JA");
  await act(async () => {
    await router.navigate({ to: "/projects" });
  });
  expect(container.querySelector(".site-shell")?.getAttribute("lang")).toBe("ja");
  expect(container.querySelector('nav a[href="/projects"]')?.getAttribute("aria-current")).toBe(
    "page",
  );
  expect(container.querySelector("h1")?.textContent).toBe("プロジェクト.");
  expect(document.activeElement?.id).toBe("main");
});

it("opens the mobile menu and closes it after following a page link", async () => {
  await click("Menu");
  expect(button("Close menu").getAttribute("aria-expanded")).toBe("true");
  const link = container.querySelector<HTMLAnchorElement>('nav a[href="/experience"]');
  if (!link) throw new Error("Missing experience navigation link");
  await act(async () => {
    link.click();
    await new Promise((resolve) => setTimeout(resolve, 60));
  });
  expect(button("Menu").getAttribute("aria-expanded")).toBe("false");
  expect(container.querySelector("h1")?.textContent).toBe("Experience.");
});

it("shows featured projects by default and searches the full repository collection", async () => {
  await act(async () => {
    await router.navigate({ to: "/projects" });
  });
  expect(container.querySelectorAll(".project-row")).toHaveLength(3);
  const input = container.querySelector("input");
  if (!input) throw new Error("Missing project search");
  const valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  if (!valueDescriptor?.set) throw new Error("Missing native input value setter");
  await act(async () => {
    valueDescriptor.set?.call(input, "tcp-over-udp");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  expect(container.querySelectorAll(".project-row")).toHaveLength(1);
  expect(container.querySelector(".project-row h2")?.textContent).toBe("tcp-over-udp");
  await act(async () => {
    valueDescriptor.set?.call(input, "no-such-project-12345");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  expect(container.querySelector(".empty-state")?.textContent).toContain("No projects found");
});

it.each([
  { to: "/experience", selector: ".experience-row", transform: /translateX/ },
  { to: "/projects", selector: ".project-row", transform: /scale/ },
  { to: "/awards", selector: ".award-row", transform: /rotate/ },
] satisfies { to: "/experience" | "/projects" | "/awards"; selector: string; transform: RegExp }[])(
  "animates $to with its own entrance",
  async ({ to, selector, transform }) => {
    await act(async () => {
      await router.navigate({ to });
    });
    await act(async () => new Promise((resolve) => setTimeout(resolve, 60)));
    const animations = container.querySelector(selector)?.getAnimations() ?? [];
    const frames = animations.flatMap((animation) =>
      animation.effect instanceof KeyframeEffect ? animation.effect.getKeyframes() : [],
    );
    expect(JSON.stringify(frames)).toMatch(transform);
  },
);

it("disables page entrances under system reduced motion", async () => {
  await act(async () => {
    systemMotion("reduce");
    await router.navigate({ to: "/experience" });
    await new Promise((resolve) => setTimeout(resolve, 60));
  });
  expect(container.querySelector(".experience-row")?.getAttribute("style") ?? "").not.toMatch(
    /translate|rotate|scale/,
  );
});
