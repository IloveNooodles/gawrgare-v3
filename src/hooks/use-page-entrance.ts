import { useRef } from "react";
import { animate, stagger, useScopeMotion } from "motion/react";

export function usePageEntrance(page: "experience" | "projects" | "awards") {
  const root = useRef<HTMLElement>(null);
  useScopeMotion(
    root,
    () => {
      animate(
        ".section-heading",
        {
          transform: ["translateY(-24px) rotate(-3deg)", "translateY(0px) rotate(0deg)"],
          opacity: [0, 1],
        },
        { duration: 0.5 },
      );
      if (page === "experience") {
        root.current?.querySelectorAll(".experience-row").forEach((row, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          animate(
            row,
            {
              transform: [
                `translateX(${direction * 48}px)`,
                `translateX(${-direction * 4}px)`,
                "translateX(0px)",
              ],
              opacity: [0, 1, 1],
            },
            { delay: 0.15 + index * 0.08, duration: 0.55 },
          );
        });
      } else if (page === "projects") {
        animate(
          ".project-row",
          {
            transform: [
              "translateY(40px) scale(0.94) rotate(-2deg)",
              "translateY(0px) scale(1.015) rotate(0deg)",
              "translateY(0px) scale(1) rotate(0deg)",
            ],
            opacity: [0, 1, 1],
          },
          {
            delay: stagger(0.1, { startDelay: 0.2 }),
            duration: 0.6,
          },
        );
        animate(
          ".search-field",
          { transform: ["translateX(-40px)", "translateX(0px)"], opacity: [0, 1] },
          { duration: 0.45, delay: 0.1 },
        );
      } else {
        animate(
          ".award-row",
          {
            transform: ["translateX(72px) rotate(3deg)", "translateX(0px) rotate(0deg)"],
            opacity: [0, 1],
          },
          {
            delay: stagger(0.06, { startDelay: 0.15 }),
            duration: 0.5,
          },
        );
      }
    },
    {
      deps: [page],
      matchMedia: "(prefers-reduced-motion: no-preference)",
      transition: { ease: [0.16, 1, 0.3, 1] },
    },
  );
  return root;
}
