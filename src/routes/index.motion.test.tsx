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
  vi.unstubAllGlobals();
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

it("plays the hero again when returning home without replay controls", async () => {
  const firstHero = container.querySelector(".hero");
  await act(async () => {
    await router.navigate({ to: "/projects" });
  });
  expect(container.querySelector(".hero")).toBeNull();
  await act(async () => {
    await router.navigate({ to: "/" });
  });
  await act(async () => new Promise((resolve) => setTimeout(resolve, 60)));
  expect(container.querySelector(".hero")).not.toBe(firstHero);
  const frames = container
    .querySelector(".hero h1 > span")
    ?.getAnimations()
    .flatMap((animation) =>
      animation.effect instanceof KeyframeEffect ? animation.effect.getKeyframes() : [],
    );
  expect(JSON.stringify(frames)).toContain("translateX");
  expect(
    Array.from(container.querySelectorAll("button")).some((element) =>
      /replay intro|pause motion|resume motion/i.test(element.textContent ?? ""),
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

it("starts the career timeline with Now and follows with earlier roles", async () => {
  await act(async () => {
    await router.navigate({ to: "/experience" });
  });
  const roles = Array.from(container.querySelectorAll("#experience article"));
  expect(roles.map((role) => role.querySelector("h2")?.textContent)).toEqual([
    "Money Forward, Inc.",
    "MatchMade",
    "Makmur",
    "Garena",
    "Sayurbox",
    "Internnet Indonesia",
  ]);
  expect(roles[0]?.querySelector("time")?.dateTime).toBe("2024-11");
  expect(roles.at(-1)?.querySelector("time")?.dateTime).toBe("2021-10");
  expect(roles[0]?.textContent).toContain("Now");
  expect(roles.slice(1).some((role) => role.textContent?.includes("Now"))).toBe(false);
});

it("draws one shared track through the stations and updates it after resizing", async () => {
  let width = 800;
  const resize = vi.fn();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: () => void) {
        resize.mockImplementation(callback);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
    this: HTMLElement,
  ) {
    if (this.classList.contains("experience-timeline")) return new DOMRect(100, 200, width, 1800);
    const item = this.closest(".timeline-item");
    const index = Array.from(container.querySelectorAll(".timeline-item")).indexOf(item ?? this);
    if (this.classList.contains("timeline-item"))
      return new DOMRect(100, 200 + index * 300, width, 240);
    if (this.classList.contains("timeline-node")) {
      const x = [0.15, 0.75, 0.25, 0.8, 0.2, 0.7][index] * width;
      return new DOMRect(100 + x - 10, 200 + index * 300 + 22, 20, 20);
    }
    return new DOMRect();
  });
  await act(async () => {
    await router.navigate({ to: "/experience" });
  });
  expect(container.querySelectorAll(".timeline-route")).toHaveLength(1);
  expect(container.querySelector(".timeline-route")?.getAttribute("viewBox")).toBe("0 0 800 1800");
  const points = container.querySelector(".timeline-track-edge")?.getAttribute("points");
  expect(points).toMatch(/^120,32 /);
  expect(points).toMatch(/560,1532$/);
  await act(async () => {
    width = 1000;
    resize();
  });
  expect(container.querySelector(".timeline-route")?.getAttribute("viewBox")).toBe("0 0 1000 1800");
  expect(container.querySelector(".timeline-track-edge")?.getAttribute("points")).toMatch(
    /^150,32 /,
  );
});

it("starts the hero text and artwork without an initial wait", async () => {
  await act(async () => new Promise((resolve) => setTimeout(resolve, 60)));
  for (const selector of [".hero-copy > .eyebrow", ".hero-art"]) {
    const animations = container.querySelector(selector)?.getAnimations() ?? [];
    expect(animations.length).toBeGreaterThan(0);
    expect(animations.every((animation) => animation.effect?.getTiming().delay === 0)).toBe(true);
  }
});
