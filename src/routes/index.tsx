import { Link, createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { animate, stagger, useScopeMotion } from "motion/react";
import { useSite } from "../components/site-layout";
import { navIcons } from "../data/nav";

export const Route = createFileRoute("/")({ component: Home });

export function Home() {
  const animationRoot = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState(0);
  const { t } = useSite();
  useScopeMotion(
    animationRoot,
    () => {
      animate(
        ".hero-copy > .eyebrow, .hero h1 > span, .hero-intro, .action-link",
        {
          transform: ["translateX(-120px)", "translateX(8px)", "translateX(0px)"],
          opacity: [0, 1, 1],
        },
        { delay: stagger(0.12, { startDelay: 0.3 }), duration: 0.6 },
      );
      animate(
        ".hero-art",
        {
          transform: [
            "translateX(64px) rotate(-12deg) scale(0.8)",
            "translateX(0px) rotate(3deg) scale(1.03)",
            "translateX(0px) rotate(0deg) scale(1)",
          ],
          opacity: [0, 1, 1],
        },
        { delay: 0.45, duration: 1 },
      );
    },
    {
      matchMedia: "(prefers-reduced-motion: no-preference)",
      deps: [intro],
      transition: { ease: [0.16, 1, 0.3, 1] },
    },
  );

  return (
    <div className="route-page home-page" ref={animationRoot}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-swipe" key={intro} aria-hidden="true" />
        <div className="hero-dots" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-star">✦</span> {t.identity}
            </p>
            <h1 id="hero-title">
              <span>ONE THING</span>
              <span className="cutout">
                AT A TIME.
                <span className="title-star" aria-hidden="true">
                  ★
                </span>
              </span>
            </h1>
            <p className="hero-intro">
              Hey, I’m <strong>Gare.</strong>
              <br />
              {t.intro}
            </p>
            <p className="hero-note">Things I make, things I learn, and a few side quests.</p>
            <Link className="action-link" to="/projects">
              {t.explore} <span aria-hidden="true">✦</span>
            </Link>
            <div className="motion-controls">
              <button onClick={() => setIntro((value) => value + 1)}>Replay intro</button>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="art-star star-back">★</span>
            <span className="art-star star-front">★</span>
            <div className="calling-card">
              <span>THE TINKERER</span>
              <strong>GARE</strong>
              <div className="mask">
                <i />
                <i />
              </div>
              <span>BUILD. BREAK. LEARN. REPEAT.</span>
            </div>
            <span className="art-spark spark-one">✦</span>
            <span className="art-spark spark-two">✦</span>
          </div>
        </div>
      </section>
      <section className="home-about" aria-labelledby="about-title">
        <p className="eyebrow">THE PERSON BEHIND THE HANDLE</p>
        <h2 id="about-title">
          {t.dossier}
          <span>.</span>
        </h2>
        <p>
          I’m Gare. This is my corner of the internet for side projects, things I’m learning, and
          whatever catches my curiosity.
        </p>
        <p>
          I’m usually exploring CTF challenges, tinkering with my homelab, or playing Pokémon and
          Monster Hunter. I collect what I learn in my{" "}
          <a href="https://garden.mgarebaldhie.com">digital garden</a>.
        </p>
        <div className="social-links">
          {navIcons.map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
              {social.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
