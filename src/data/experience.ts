import type { Localized } from "./labels";

export type Experience = {
  name: string;
  title: Localized<string>;
  startDate: string;
  endDate: string | null;
  url: string;
  points: Localized<string[]>;
  tag: string[];
};

export const experiences: Experience[] = [
  {
    name: "Money Forward, Inc.",
    title: {
      en: "Software Engineer → Software Engineer III",
      id: "Pengembang Perangkat Lunak → Pengembang Perangkat Lunak III",
      ja: "ソフトウェアエンジニア → ソフトウェアエンジニアIII",
    },
    startDate: "2024-11",
    endDate: null,
    url: "https://www.linkedin.com/company/money-forward/",
    tag: ["Ruby", "Next.js", "Kubernetes"],
    points: {
      en: [
        "I build financial data systems and Japanese compliance features in Tokyo, Japan.",
        "Saved $1,591+ per month through infrastructure improvements.",
        "Cut staging deployment time from about 50 to 25 minutes.",
      ],
      id: [
        "Saya membangun sistem data keuangan dan fitur kepatuhan regulasi Jepang di Tokyo, Jepang.",
        "Menghemat $1.591+ per bulan melalui peningkatan infrastruktur.",
        "Memangkas waktu deployment staging dari sekitar 50 menjadi 25 menit.",
      ],
      ja: [
        "東京で金融データシステムと日本の法令対応機能を開発しています。",
        "インフラの改善で月額1,591米ドル以上を削減しました。",
        "ステージング環境へのデプロイ時間を約50分から25分に短縮しました。",
      ],
    },
  },
  {
    name: "MatchMade",
    title: {
      en: "Software Engineer (part-time → full-time)",
      id: "Pengembang Perangkat Lunak (paruh waktu → penuh waktu)",
      ja: "ソフトウェアエンジニア（パートタイム → フルタイム）",
    },
    startDate: "2023-08",
    endDate: "2024-09",
    tag: ["Go", "Kubernetes", "Terraform"],
    points: {
      en: [
        "I led a seven-person team on the Email Crawler Project.",
        "Saved $1,500 per month by improving deployments and moving to Kubernetes.",
        "Reduced backend Docker images from 2.3 GB to 50 MB.",
      ],
      id: [
        "Saya memimpin tim beranggotakan tujuh engineer dalam proyek Email Crawler.",
        "Menghemat $1.500 per bulan dengan meningkatkan deployment dan beralih ke Kubernetes.",
        "Memperkecil image Docker backend dari 2,3 GB menjadi 50 MB.",
      ],
      ja: [
        "Email Crawlerプロジェクトで7人のエンジニアを率いました。",
        "デプロイの改善とKubernetesへの移行で月額1,500米ドルを削減しました。",
        "バックエンドのDockerイメージを2.3GBから50MBに縮小しました。",
      ],
    },
    url: "https://www.matchmade.io",
  },
  {
    name: "Makmur",
    title: {
      en: "Software Engineer Intern",
      id: "Pengembang Perangkat Lunak Magang",
      ja: "ソフトウェアエンジニア・インターン",
    },
    startDate: "2023-05",
    endDate: "2023-08",
    tag: ["TypeScript", "MongoDB", "Payments"],
    points: {
      en: [
        "I integrated QRIS payments and migrated the payment service to TypeScript.",
        "Resolved a stuck-payment issue and handled database migrations without data loss.",
      ],
      id: [
        "Saya mengintegrasikan pembayaran QRIS dan memigrasikan layanan pembayaran ke TypeScript.",
        "Menyelesaikan masalah pembayaran macet serta melakukan migrasi database tanpa kehilangan data.",
      ],
      ja: [
        "QRIS決済を導入し、決済サービスをTypeScriptへ移行しました。",
        "決済処理が停止する問題を解決し、データを失うことなくデータベースを移行しました。",
      ],
    },
    url: "https://www.makmur.id/id",
  },
  {
    name: "Garena",
    startDate: "2022-08",
    title: {
      en: "Software Engineer (internship)",
      id: "Pengembang Perangkat Lunak (magang)",
      ja: "ソフトウェアエンジニア（インターン）",
    },
    endDate: "2022-11",
    tag: ["Python", "Django", "Redis"],
    points: {
      en: [
        "I built game events and ecommerce backends for Call of Duty Mobile and Arena of Valor.",
        "Worked on Mystery Shop, serving 400,000+ users and handling up to 3,000 queries per second.",
      ],
      id: [
        "Saya membangun event gim dan backend ecommerce untuk Call of Duty Mobile dan Arena of Valor.",
        "Mengerjakan Mystery Shop yang melayani 400.000+ pengguna dan menangani hingga 3.000 kueri per detik.",
      ],
      ja: [
        "Call of Duty MobileとArena of ValorのゲームイベントやECのバックエンドを開発しました。",
        "40万人以上が利用し、毎秒最大3,000クエリに対応するMystery Shopを担当しました。",
      ],
    },
    url: "https://garena.co.id/",
  },
  {
    name: "Sayurbox",
    title: {
      en: "Software Development Engineer (internship)",
      id: "Engineer Pengembangan Perangkat Lunak (magang)",
      ja: "ソフトウェア開発エンジニア（インターン）",
    },
    startDate: "2021-11",
    endDate: "2022-07",
    tag: ["React Native", "TypeScript", "Spring Boot"],
    points: {
      en: [
        "I maintained location and voucher APIs using Spring Boot and MySQL.",
        "Built mobile app features for promotions, loyalty, and accounts with React Native.",
      ],
      id: [
        "Saya memelihara API lokasi dan voucher menggunakan Spring Boot dan MySQL.",
        "Membangun fitur promosi, loyalitas, dan akun di aplikasi seluler menggunakan React Native.",
      ],
      ja: [
        "Spring BootとMySQLで位置情報とクーポンのAPIを保守しました。",
        "React Nativeでプロモーション、ロイヤルティ、アカウント関連のモバイル機能を開発しました。",
      ],
    },
    url: "https://www.sayurbox.com/",
  },
  {
    name: "Internnet Indonesia",
    title: {
      en: "Back End Developer → Lead Software Engineer",
      id: "Pengembang Backend → Pemimpin Tim Pengembang",
      ja: "バックエンド開発者 → リードエンジニア",
    },
    startDate: "2021-10",
    endDate: "2023-10",
    url: "https://www.linkedin.com/company/68618843/",
    tag: ["Go", "PostgreSQL", "Leadership"],
    points: {
      en: [
        "I grew from backend developer to lead engineer.",
        "Built an internal consumer management system with Go and PostgreSQL.",
      ],
      id: [
        "Saya berkembang dari pengembang backend menjadi pemimpin tim engineer.",
        "Membangun sistem internal pengelolaan pelanggan menggunakan Go dan PostgreSQL.",
      ],
      ja: [
        "バックエンド開発者からリードエンジニアへと役割を広げました。",
        "GoとPostgreSQLで社内向けの顧客管理システムを構築しました。",
      ],
    },
  },
];
