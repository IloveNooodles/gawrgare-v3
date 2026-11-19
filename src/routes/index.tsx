import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { animate, inView, stagger, useScopeMotion } from "motion/react";
import { awards } from "../data/awards";
import { experiences } from "../data/experience";
import { navIcons } from "../data/nav";
import { GITHUB_PROJECTS, searchProjects } from "../data/projects";

export const Route = createFileRoute("/")({ component: Home });
const labels = {
  en: {
    about: "About",
    projects: "Projects",
    experiences: "Experience",
    awards: "Awards",
    engineer: "Software engineer",
    present: "Present",
    intro: "A little bit of code. A little bit of chaos.",
    explore: "Explore my work",
    dossier: "Behind the code",
    search: "Search projects",
    empty: "No projects found. Try another search.",
  },
  id: {
    about: "Tentang",
    projects: "Projek",
    experiences: "Pengalaman",
    awards: "Prestasi",
    engineer: "Programmer",
    present: "Sekarang",
    intro: "Sedikit kode. Sedikit kekacauan.",
    explore: "Jelajahi karya saya",
    dossier: "Di balik kode",
    search: "Cari projek",
    empty: "Projek tidak ditemukan. Coba pencarian lain.",
  },
  ja: {
    about: "自己紹介",
    projects: "プロジェクト",
    experiences: "経験",
    awards: "賞",
    engineer: "エンジニア",
    present: "現在",
    intro: "少しのコード。少しのカオス。",
    explore: "作品を見る",
    dossier: "コードの向こう側",
    search: "プロジェクトを検索",
    empty: "プロジェクトが見つかりません。別の検索をお試しください。",
  },
};

export function Home() {
  const animationRoot = useRef<HTMLDivElement>(null);
  const [locale, setLocale] = useState<keyof typeof labels>("en");
  const [query, setQuery] = useState("");
  const [intro, setIntro] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const t = labels[locale];
  const projects = searchProjects(query);

  useScopeMotion(
    animationRoot,
    () => {
      if (motionPaused) return;
      animate(
        ".hero-copy > .eyebrow, .hero h1 > span, .hero-intro, .action-link",
        { x: [-120, 8, 0], opacity: [0, 1, 1] },
        { delay: stagger(0.12, { startDelay: 0.3 }), duration: 0.6 },
      );
      animate(
        ".hero-art",
        { x: [64, 0], rotate: [-12, 3, 0], scale: [0.8, 1.03, 1], opacity: [0, 1] },
        { delay: 0.45, duration: 1 },
      );
      animate(
        ".section-nav a",
        { y: [16, 0], opacity: [0, 1] },
        { delay: stagger(0.08, { startDelay: 0.8 }), duration: 0.4 },
      );
      inView(
        ".section-heading, .about-layout, .experience-row, .award-row",
        (element) => {
          animate(element, { y: [24, 0], opacity: [0, 1] }, { duration: 0.45 });
        },
        { amount: 0.15 },
      );
    },
    {
      matchMedia: "(prefers-reduced-motion: no-preference)",
      deps: [intro, motionPaused],
      transition: { ease: [0.16, 1, 0.3, 1] },
    },
  );

  return (
    <div
      className="site-shell"
      lang={locale}
      ref={animationRoot}
      data-motion={motionPaused ? "paused" : "playing"}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <a className="wordmark" href="#" aria-label="Gare home">
          g<span>★</span>re<span className="wordmark-dot">.</span>
        </a>
        <span className="topbar-note">PERSONAL SPACE / VOL. 03</span>
        <div className="languages" aria-label="Language">
          {(["en", "id", "ja"] satisfies (keyof typeof labels)[]).map((language) => (
            <button
              key={language}
              aria-pressed={locale === language}
              onClick={() => setLocale(language)}
            >
              {language.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-swipe" key={intro} aria-hidden="true" />
          <div className="hero-dots" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="tiny-star">✦</span> {t.engineer} / CTF player
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
              <a className="action-link" href="#projects">
                {t.explore} <span aria-hidden="true">✦</span>
              </a>
              <p className="reduced-motion-note">
                Reduced motion is enabled in your system settings.
              </p>
              <div className="motion-controls">
                <button disabled={motionPaused} onClick={() => setIntro((value) => value + 1)}>
                  Replay intro
                </button>
                <button
                  aria-pressed={motionPaused}
                  onClick={() => setMotionPaused((value) => !value)}
                >
                  {motionPaused ? "Resume motion" : "Pause motion"}
                </button>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <span className="art-star star-back">★</span>
              <span className="art-star star-front">★</span>
              <div className="calling-card">
                <span>THE DEVELOPER</span>
                <strong>GARE</strong>
                <div className="mask">
                  <i />
                  <i />
                </div>
                <span>BUILD. BREAK. LEARN. REPEAT.</span>
              </div>
              <span className="art-spark spark-one">✦</span>
              <span className="art-spark spark-two">✦</span>
              <span className="art-caption">
                A WORK IN PROGRESS.
                <br />
                JUST LIKE EVERYTHING GOOD.
              </span>
            </div>
          </div>
          <nav className="section-nav" aria-label="Main navigation">
            <a href="#about">{t.about}</a>
            <a href="#projects">{t.projects}</a>
            <a href="#experience">{t.experiences}</a>
            <a href="#awards">{t.awards}</a>
            <span aria-hidden="true">SCROLL TO DISCOVER ↓</span>
          </nav>
        </section>
        <div className="ticker" aria-hidden="true">
          <span>
            BACKEND SYSTEMS ✦ INFRASTRUCTURE ✦ CAPTURE THE FLAG ✦ NEVER STOP EXPLORING ✦ BACKEND
            SYSTEMS ✦ INFRASTRUCTURE ✦
          </span>
        </div>
        <section id="about" className="content-section about-section">
          <div className="section-heading">
            <p className="eyebrow">THE PERSON BEHIND THE HANDLE</p>
            <h2>
              {t.dossier}
              <span>.</span>
            </h2>
          </div>
          <div className="about-layout">
            <div className="identity-card">
              <span className="card-label">CONFIDANT FILE</span>
              <span className="identity-star" aria-hidden="true">
                ✦
              </span>
              <h3>
                Muhammad
                <br />
                Garebaldhie
                <br />
                ER Rahman
              </h3>
              <p>
                Software Engineer III
                <br />
                Money Forward · Tokyo, Japan
              </p>
              <div className="identity-tags">
                <span>Backend</span>
                <span>Infrastructure</span>
                <span>Cybersecurity</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="lead">
                I build the systems
                <br />
                behind the experience.
              </p>
              <p>
                I’m a Software Engineer III at Money Forward in Tokyo, Japan. I specialize in
                backend systems, infrastructure, and Kubernetes deployments, and I’m comfortable
                working across the frontend too.
              </p>
              <p>
                My work spans financial data systems and compliance at Money Forward, engineering
                leadership and infrastructure at <a href="https://www.matchmade.io">MatchMade</a>,
                payment integrations at <a href="https://www.makmur.id">Makmur</a>, ecommerce at{" "}
                <a href="https://www.sayurbox.com">Sayurbox</a>, and game backends at{" "}
                <a href="https://garena.com">Garena</a>.
              </p>
              <p>
                I studied computer science at Institut Teknologi Bandung from 2020 to 2024,
                graduating cum laude with a GPA of 3.88/4. I also write about Kubernetes, homelabs,
                and development tools, and collect notes in my{" "}
                <a href="https://garden.mgarebaldhie.com">digital garden</a>.
              </p>
              <p>
                Off the clock? CTF challenges, Pokémon, Monster Hunter, Monogatari, and Steins;Gate.
              </p>
              <div className="social-links">
                {navIcons.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="content-section projects-section">
          <div className="section-heading heading-row">
            <div>
              <p className="eyebrow">IDEAS, TURNED INTO COMMITS</p>
              <h2>
                {t.projects}
                <span>.</span>
              </h2>
            </div>
            <span className="section-stamp">BUILT TO EXPLORE</span>
          </div>
          <label className="search-field">
            <span>{t.search}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Python, infrastructure, CTF…"
            />
          </label>
          <p className="result-count" role="status">
            {projects.length} / {GITHUB_PROJECTS.filter((project) => !project.private).length}{" "}
            projects
          </p>
          <div className="project-list">
            {projects.map((project) => (
              <a
                className="project-row"
                key={project.id}
                href={project.svn_url}
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <span className="project-language">{project.language || "Repository"}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.topics.map((topic) => (
                      <span key={topic}>{topic}</span>
                    ))}
                  </div>
                </div>
                <span
                  className="project-stars"
                  aria-label={`${project.stargazers_count} GitHub stars`}
                >
                  ☆ {project.stargazers_count}
                </span>
              </a>
            ))}
          </div>
          {projects.length === 0 && <p className="empty-state">{t.empty}</p>}
        </section>
        <section id="experience" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">THE JOURNEY SO FAR</p>
            <h2>
              {t.experiences}
              <span>.</span>
            </h2>
            <a
              className="experience-details"
              href="https://www.linkedin.com/in/garebaldhie/"
              target="_blank"
              rel="noreferrer"
            >
              Full work history on LinkedIn
            </a>
          </div>
          <div className="experience-list">
            {experiences.map((experience) => (
              <article className="experience-row" key={experience.name}>
                <p className="experience-date">
                  {experience.year_start} — {experience.year_end ?? t.present}
                </p>
                <div>
                  <h3>
                    <a href={experience.url} target="_blank" rel="noreferrer">
                      {experience.name}
                    </a>
                  </h3>
                  <p className="role-title">{experience.title}</p>
                  <ul className="experience-points">
                    {experience.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="project-tags">
                    {experience.tag.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="awards" className="content-section awards-section">
          <div className="section-heading">
            <p className="eyebrow">A FEW SIDE QUESTS COMPLETED</p>
            <h2>
              {t.awards}
              <span>.</span>
            </h2>
          </div>
          <div className="award-list">
            {awards.map((award) => (
              <a
                href={award.url}
                className="award-row"
                key={award.name}
                target="_blank"
                rel="noreferrer"
              >
                <span className="award-place">#{award.place}</span>
                <div>
                  <h3>{award.name}</h3>
                  <p>
                    {award.organizer} · {award.scope}
                  </p>
                </div>
                <span className="award-year">{award.year}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <a className="wordmark" href="#">
          g<span>★</span>re.
        </a>
        <p>Always learning. Always building.</p>
        <a href="https://github.com/IloveNooodles/gawrgare-v3">View source</a>
        <span className="footer-signoff">ONE THING AT A TIME. ✦</span>
      </footer>
    </div>
  );
}
