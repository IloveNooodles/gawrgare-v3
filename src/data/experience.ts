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
    name: "Institut Teknologi Bandung",
    title: "Distributed System Laboratory & Programming Fundamentals Assistant",
    year_start: 2022,
    year_end: 2024,
    url: "https://www.linkedin.com/school/14702/",
    tag: ["Distributed Systems", "Programming Fundamentals"],
    points: [
      "I helped students with distributed systems and programming fundamentals as a laboratory assistant.",
    ],
  },
  {
    name: "Bangkit Academy",
    title: "Cloud Computing Cohort",
    year_start: 2023,
    year_end: 2023,
    url: "https://www.linkedin.com/company/31509534/",
    tag: ["Terraform", "Google Cloud Platform"],
    points: [
      "I studied cloud computing through a remote apprenticeship, working with Terraform and Google Cloud.",
    ],
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
    name: "Stealth Startup",
    title: "Software Engineer (contract)",
    year_start: 2023,
    year_end: 2023,
    url: "https://www.linkedin.com/company/18583501/",
    tag: ["Go", "MongoDB", "Supabase Auth"],
    points: [
      "I designed the product data model and API contracts.",
      "Added authentication with Supabase and stored product data in MongoDB.",
    ],
  },
  {
    name: "Himpunan Mahasiswa Informatika (HMIF) ITB",
    title: "Staff → Deputy Head of Competition and Community",
    year_start: 2021,
    year_end: 2023,
    url: "https://www.linkedin.com/company/13736048/",
    tag: ["Leadership", "Capture The Flag"],
    points: [
      "I led about 36 people across five tech communities.",
      "Organized competition training and created CTF learning materials.",
    ],
  },
  {
    name: "ARKAVIDIA",
    title: "Vice Head of Arkalogica",
    year_start: 2022,
    year_end: 2023,
    url: "https://www.linkedin.com/company/14464437/",
    tag: ["Leadership", "Moodle", "Google Cloud Platform"],
    points: [
      "I led an 18-person team to organize a high-school logic and maths competition.",
      "Built the competition’s Moodle platform and deployed it on Google Cloud.",
    ],
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
    name: "Developer Student Club ITB",
    title: "Member → Curriculum Core Team & Head of Curriculum",
    year_start: 2020,
    year_end: 2022,
    url: "https://www.linkedin.com/company/68063121/",
    tag: ["Leadership", "Firebase", "Google Cloud Platform"],
    points: ["I helped create workshops on Google technologies and led the curriculum team."],
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
  {
    name: "Mile Zero Project",
    title: "Hackathon Officer",
    year_start: 2021,
    year_end: 2022,
    url: "https://www.linkedin.com/company/69612946/",
    tag: ["Event Planning", "Communication"],
    points: ["I helped organize hackathons and moderated training for 70+ participants."],
  },
  {
    name: "Comlabs-USDI ITB",
    title: "Computer Lab Assistant",
    year_start: 2021,
    year_end: 2022,
    url: "https://www.linkedin.com/company/354854/",
    tag: ["Python", "Algorithms"],
    points: [
      "I guided 70+ participants through Python practicums after being selected from 200+ applicants.",
    ],
  },
];
