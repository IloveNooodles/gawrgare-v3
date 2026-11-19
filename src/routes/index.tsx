import { Link, createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { animate, stagger, useScopeMotion } from "motion/react";
import { useSite } from "../components/site-layout";
import { navIcons } from "../data/nav";

export const Route = createFileRoute("/")({ component: Home });

export function Home() {
  const animationRoot = useRef<HTMLDivElement>(null);
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
        { delay: stagger(0.05), duration: 0.45 },
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
        { duration: 0.7 },
      );
    },
    {
      matchMedia: "(prefers-reduced-motion: no-preference)",
      transition: { ease: [0.16, 1, 0.3, 1] },
    },
  );

  return (
    <div className="route-page home-page" ref={animationRoot}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-swipe" aria-hidden="true" />
        <div className="hero-dots" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-star">✦</span> {t.identity}
            </p>
            <h1 id="hero-title">
              <span>{t.oneThing}</span>
              <span className="cutout">
                {t.atATime}
                <span className="title-star" aria-hidden="true">
                  ★
                </span>
              </span>
            </h1>
            <p className="hero-intro">
              <strong>{t.greeting}</strong>
              <br />
              {t.intro}
            </p>
            <p className="hero-note">{t.heroNote}</p>
            <Link className="action-link" to="/projects">
              {t.explore} <span aria-hidden="true">✦</span>
            </Link>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="art-star star-back">★</span>
            <span className="art-star star-front">★</span>
            <div className="calling-card">
              <span>{t.cardTitle}</span>
              <strong>GARE</strong>
              <div className="mask">
                <i />
                <i />
              </div>
              <span>{t.cardMotto}</span>
            </div>
            <span className="art-spark spark-one">✦</span>
            <span className="art-spark spark-two">✦</span>
          </div>
        </div>
      </section>
      <section className="home-about" aria-labelledby="about-title">
        <p className="eyebrow">{t.homeEyebrow}</p>
        <h2 id="about-title">
          {t.dossier}
          <span>.</span>
        </h2>
        <p>{t.aboutMe}</p>
        <p>
          {t.aboutInterests}
          <a href="https://garden.mgarebaldhie.com">{t.garden}</a>
          {t.afterGarden}
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
