export type Experience = {
  name: string;
  title: string;
  year_start: number;
  year_end: number | null;
  url: string;
  points: string[];
  tag: string[];
};

export const experiences: Experience[] = [
  {
    name: "Money Forward, Inc.",
    title: "Software Engineer → Software Engineer III",
    year_start: 2024,
    year_end: null,
    url: "https://www.linkedin.com/company/money-forward/",
    tag: ["Ruby", "Next.js", "Kubernetes"],
    points: [
      "I build financial data systems and Japanese compliance features in Tokyo, Japan.",
      "Saved $1,591+ per month through infrastructure improvements.",
      "Cut staging deployment time from about 50 to 25 minutes.",
    ],
  },
  {
    name: "MatchMade",
    title: "Software Engineer (part-time → full-time)",
    year_start: 2023,
    year_end: 2024,
    tag: ["Go", "Kubernetes", "Terraform"],
    points: [
      "I led a seven-person team on the Email Crawler Project.",
      "Saved $1,500 per month by improving deployments and moving to Kubernetes.",
      "Reduced backend Docker images from 2.3 GB to 50 MB.",
    ],
    url: "https://www.matchmade.io",
  },
  {
    name: "Internnet Indonesia",
    title: "Back End Developer → Lead Software Engineer",
    year_start: 2021,
    year_end: 2023,
    url: "https://www.linkedin.com/company/68618843/",
    tag: ["Go", "PostgreSQL", "Leadership"],
    points: [
      "I grew from backend developer to lead engineer.",
      "Built an internal consumer management system with Go and PostgreSQL.",
    ],
  },
  {
    name: "Makmur",
    title: "Software Engineer Intern",
    year_start: 2023,
    year_end: 2023,
    tag: ["TypeScript", "MongoDB", "Payments"],
    points: [
      "I integrated QRIS payments and migrated the payment service to TypeScript.",
      "Resolved a stuck-payment issue and handled database migrations without data loss.",
    ],
    url: "https://www.makmur.id/id",
  },
  {
    name: "Garena",
    year_start: 2022,
    title: "Software Engineer (internship)",
    year_end: 2022,
    tag: ["Python", "Django", "Redis"],
    points: [
      "I built game events and ecommerce backends for Call of Duty Mobile and Arena of Valor.",
      "Worked on Mystery Shop, serving 400,000+ users and handling up to 3,000 queries per second.",
    ],
    url: "https://garena.co.id/",
  },
  {
    name: "Sayurbox",
    title: "Software Development Engineer (internship)",
    year_start: 2021,
    year_end: 2022,
    tag: ["React Native", "TypeScript", "Spring Boot"],
    points: [
      "I maintained location and voucher APIs using Spring Boot and MySQL.",
      "Built mobile app features for promotions, loyalty, and accounts with React Native.",
    ],
    url: "https://www.sayurbox.com/",
  },
];
