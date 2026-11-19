import type { Localized } from "./labels";

export type Project = {
  id: string;
  name: string;
  private: boolean;
  description: Localized<string>;
  svn_url: string;
  language: string;
  license?: string;
  topics: string[];
  stargazers_count: number;
};

export const GITHUB_PROJECTS: Project[] = [
  {
    id: "399337792",
    name: "CTFs",
    private: false,
    description: {
      en: "Archive my journey and writeup on CTF Competition",
      id: "Arsip perjalanan CTF saya dan catatan penyelesaian kompetisi.",
      ja: "CTFへの挑戦の記録と、大会の解説をまとめたアーカイブです。",
    },
    svn_url: "https://github.com/IloveNooodles/CTFs",
    language: "Python",
    topics: ["binary-exploitation", "capture-the-flag", "cryptography"],
    stargazers_count: 12,
  },
  {
    id: "679617983",
    name: "dotfiles",
    private: false,
    description: {
      en: "My desktop configuration for various tools",
      id: "Konfigurasi desktop dan berbagai alat yang saya gunakan.",
      ja: "デスクトップ環境や普段使っているツールの設定です。",
    },
    svn_url: "https://github.com/IloveNooodles/dotfiles",
    language: "Shell",
    topics: [],
    stargazers_count: 0,
  },
  {
    id: "841626295",
    name: "minecraft-server",
    private: false,
    description: {
      en: "⛏️ Minecraft server provisioning in remote server with Ansible.",
      id: "Menyiapkan server Minecraft di server jarak jauh menggunakan Ansible.",
      ja: "AnsibleでリモートサーバーにMinecraftサーバーを構築します。",
    },
    svn_url: "https://github.com/IloveNooodles/minecraft-server",
    language: "",
    license: "MIT",
    topics: [],
    stargazers_count: 0,
  },
  {
    id: "567413873",
    name: "ususbuntu-operating-system",
    private: false,
    description: {
      en: "This project is made to fulfill the 1st, 2nd, and 3rd milestone for the Operating System. It is a simple os that can do simple command like ls, mkdir, cp, cd, cat, and mv. It also implemented by using multiprogramming and message passing",
      id: "Sistem operasi sederhana dengan perintah ls, mkdir, cp, cd, cat, dan mv, serta multiprogramming dan pertukaran pesan.",
      ja: "ls、mkdir、cp、cd、cat、mvを備え、マルチプログラミングとメッセージパッシングに対応したシンプルなOSです。",
    },
    svn_url: "https://github.com/IloveNooodles/ususbuntu-operating-system",
    language: "C",
    topics: ["bcc", "bochs", "operating-system"],
    stargazers_count: 0,
  },
  {
    id: "567415088",
    name: "tcp-over-udp",
    private: false,
    description: {
      en: "This repository contains how to simulate TCP connection over UDP socket. It consist of simple server and client, server can send file to a or multiple client. There  are no non builtin library are used for this implementation.",
      id: "Simulasi koneksi TCP melalui soket UDP. Server dapat mengirim berkas ke satu atau beberapa klien tanpa pustaka eksternal.",
      ja: "UDPソケット上でTCP接続を再現します。外部ライブラリを使わず、サーバーから複数のクライアントへファイルを送信できます。",
    },
    svn_url: "https://github.com/IloveNooodles/tcp-over-udp",
    language: "Python",
    topics: ["socket-programming", "tcp", "udp"],
    stargazers_count: 0,
  },
  {
    id: "568314713",
    name: "concurrency-control",
    private: false,
    description: {
      en: "Database Management II course project (2022).",
      id: "Proyek mata kuliah Manajemen Basis Data II tahun 2022.",
      ja: "2022年のデータベース管理の授業で制作した並行制御のプロジェクトです。",
    },
    svn_url: "https://github.com/IloveNooodles/concurrency-control",
    language: "Python",
    topics: ["concurrency-control", "optimistic-concurrency-control", "simple-locking-protocol"],
    stargazers_count: 0,
  },
  {
    id: "625803504",
    name: "raft-python",
    private: false,
    description: {
      en: "Implemenattion of raft protocol using python",
      id: "Implementasi protokol Raft menggunakan Python.",
      ja: "Pythonで実装したRaftプロトコルです。",
    },
    svn_url: "https://github.com/IloveNooodles/raft-python",
    language: "Python",
    topics: ["python", "raft"],
    stargazers_count: 2,
  },
  {
    id: "475285607",
    name: "15-puzzle-solver",
    private: false,
    description: {
      en: "A 15-puzzle solver for an Algorithm Strategies assignment (2022).",
      id: "Pemecah 15-puzzle untuk tugas Strategi Algoritma tahun 2022.",
      ja: "2022年のアルゴリズムの授業で制作した15パズルのソルバーです。",
    },
    svn_url: "https://github.com/IloveNooodles/15-puzzle-solver",
    language: "Python",
    topics: ["15-puzzle-solver", "branch-and-bound", "python"],
    stargazers_count: 2,
  },
  {
    id: "406685380",
    name: "Matrix-Calculator",
    private: false,
    description: {
      en: "A matrix calculator for a Linear Algebra and Geometry course project.",
      id: "Kalkulator matriks untuk proyek Aljabar Linear dan Geometri.",
      ja: "線形代数と幾何学の授業で制作した行列計算ツールです。",
    },
    svn_url: "https://github.com/IloveNooodles/Matrix-Calculator",
    language: "Java",
    topics: ["java", "matrix-calculator"],
    stargazers_count: 1,
  },
  {
    id: "421736853",
    name: "Image-Compression",
    private: false,
    description: {
      en: "An image compression project for Linear Algebra and Geometry.",
      id: "Proyek kompresi gambar untuk mata kuliah Aljabar Linear dan Geometri.",
      ja: "線形代数と幾何学の授業で制作した画像圧縮のプロジェクトです。",
    },
    svn_url: "https://github.com/IloveNooodles/Image-Compression",
    language: "Python",
    topics: ["image-compression", "numpy", "python", "svd-matrix-factorisation"],
    stargazers_count: 1,
  },
  {
    id: "431822705",
    name: "python-simple-compiler",
    private: false,
    description: {
      en: "A simple compiler for a Formal Languages and Automata course project.",
      id: "Compiler sederhana untuk proyek Teori Bahasa Formal dan Automata.",
      ja: "形式言語とオートマトンの授業で制作したシンプルなコンパイラです。",
    },
    svn_url: "https://github.com/IloveNooodles/python-simple-compiler",
    language: "",
    topics: ["cnf-grammer", "compiler", "python"],
    stargazers_count: 1,
  },
  {
    id: "580113833",
    name: "Terraform-ECS-Nginx-Cluster",
    private: false,
    description: {
      en: "Terraform - Auto Scaling NGINX with ECS Cluster",
      id: "Klaster NGINX dengan penskalaan otomatis di ECS menggunakan Terraform.",
      ja: "Terraformで構築する、自動スケーリング対応のECS上のNGINXクラスターです。",
    },
    svn_url: "https://github.com/IloveNooodles/Terraform-ECS-Nginx-Cluster",
    language: "HCL",
    topics: ["autoscaling", "aws", "ecs-fargate", "terraform"],
    stargazers_count: 1,
  },
  {
    id: "600386764",
    name: "geprek-nim-finder",
    private: false,
    description: {
      en: "🍗🔥  Geprek NIM Finder's public repository (est. 2019)",
      id: "Repositori publik Geprek NIM Finder, dibuat pada 2019.",
      ja: "2019年に制作したGeprek NIM Finderの公開リポジトリです。",
    },
    svn_url: "https://github.com/IloveNooodles/geprek-nim-finder",
    language: "TypeScript",
    topics: [],
    stargazers_count: 1,
  },
  {
    id: "631066219",
    name: "simple-multithreaded-rust-webserver",
    private: false,
    description: {
      en: "Simple rust webserver ",
      id: "Web server sederhana dengan multithreading menggunakan Rust.",
      ja: "Rustで実装したシンプルなマルチスレッドWebサーバーです。",
    },
    svn_url: "https://github.com/IloveNooodles/simple-multithreaded-rust-webserver",
    language: "Rust",
    topics: ["rust", "webserver"],
    stargazers_count: 1,
  },
  {
    id: "631534657",
    name: "SIX-ITB-Scrapper",
    private: false,
    description: {
      en: "This repository aims to get all of available matakuliah and dosen information from all of prodi and facutly in ITB for Dosen Rank Project. Built using python",
      id: "Mengumpulkan informasi mata kuliah dan dosen dari berbagai program studi ITB untuk proyek Dosen Rank, menggunakan Python.",
      ja: "Dosen Rankプロジェクト向けに、PythonでITB各学科の授業と教員の情報を収集します。",
    },
    svn_url: "https://github.com/IloveNooodles/SIX-ITB-Scrapper",
    language: "Python",
    topics: ["itb", "python", "scraper"],
    stargazers_count: 1,
  },
  {
    id: "643078022",
    name: "secure-env",
    private: false,
    description: {
      en: "Secure your .env using ElGamal Eliptic Curve Cryptography",
      id: "Melindungi berkas .env dengan kriptografi kurva eliptik ElGamal.",
      ja: "楕円曲線ElGamal暗号を使って.envファイルを保護します。",
    },
    svn_url: "https://github.com/IloveNooodles/secure-env",
    language: "Python",
    license: "MIT",
    topics: ["elgamal", "elliptic-curve-cryptography", "environment-variables"],
    stargazers_count: 1,
  },
  {
    id: "419756689",
    name: "Pickup-and-Delivery-Game",
    private: false,
    description: {
      en: "A pickup-and-delivery game built as a course project.",
      id: "Gim pengambilan dan pengiriman untuk proyek kuliah.",
      ja: "授業のプロジェクトとして制作した、荷物の集荷と配達を題材にしたゲームです。",
    },
    svn_url: "https://github.com/IloveNooodles/Pickup-and-Delivery-Game",
    language: "C",
    topics: ["cli", "cpp", "game", "pickup-and-delivery"],
    stargazers_count: 0,
  },
  {
    id: "461751288",
    name: "convex-hull-implementation",
    private: false,
    description: {
      en: "Convex Hull Implementation for Linear Separability Dataset Test with Divide and Conquer",
      id: "Implementasi convex hull dengan divide and conquer untuk menguji keterpisahan linear dataset.",
      ja: "分割統治法による凸包の実装を使い、データセットの線形分離可能性を調べます。",
    },
    svn_url: "https://github.com/IloveNooodles/convex-hull-implementation",
    language: "Python",
    topics: ["convex-hull-algorithms", "dataset", "linear-separability", "python"],
    stargazers_count: 0,
  },
  {
    id: "514003471",
    name: "df-vcs",
    private: false,
    description: {
      en: "Version control system created using bash",
      id: "Sistem kontrol versi yang dibuat menggunakan Bash.",
      ja: "Bashで制作したバージョン管理システムです。",
    },
    svn_url: "https://github.com/IloveNooodles/df-vcs",
    language: "Shell",
    topics: ["bash", "version-control"],
    stargazers_count: 0,
  },

  {
    id: "579691824",
    name: "nicscraper",
    private: false,
    description: {
      en: "NIC Scraper using Go and Goroutines.",
      id: "Pengumpul data NIC menggunakan Go dan goroutine.",
      ja: "Goとgoroutineで実装したNICスクレイパーです。",
    },
    svn_url: "https://github.com/IloveNooodles/nicscraper",
    language: "Go",
    topics: [],
    stargazers_count: 0,
  },
  {
    id: "601889952",
    name: "DFT-Parallelization",
    private: false,
    description: {
      en: "Paralellization using open-mpi, open-mp, and Cuda",
      id: "Paralelisasi DFT menggunakan Open MPI, OpenMP, dan CUDA.",
      ja: "Open MPI、OpenMP、CUDAによるDFTの並列化です。",
    },
    svn_url: "https://github.com/IloveNooodles/DFT-Parallelization",
    language: "Jupyter Notebook",
    topics: ["cuda", "open-mp", "open-mpi"],
    stargazers_count: 0,
  },
  {
    id: "613191788",
    name: "Feed-Forward-Neural-Network",
    private: false,
    description: {
      en: "A feed-forward neural network for a machine learning course project.",
      id: "Jaringan saraf feed-forward untuk proyek pembelajaran mesin.",
      ja: "機械学習の授業で制作したフィードフォワードニューラルネットワークです。",
    },
    svn_url: "https://github.com/IloveNooodles/Feed-Forward-Neural-Network",
    language: "Jupyter Notebook",
    topics: ["feed-forward-neural-networks", "ipynb-jupyter-notebook", "machine-learning"],
    stargazers_count: 0,
  },
  {
    id: "620438355",
    name: "Extended-Survival-Shooter",
    private: false,
    description: {
      en: "This repository contains Tugas besar 2 Platform Based development. Extended survival shooter is a single player game which has a lot of main features, such as story mode, quest, pet, weapons, and lot more!! Made with unity",
      id: "Gim survival shooter pemain tunggal dengan mode cerita, misi, peliharaan, dan senjata, dibuat menggunakan Unity.",
      ja: "Unityで制作したシングルプレイのサバイバルシューティングゲームです。ストーリーモード、クエスト、ペット、武器などを備えています。",
    },
    svn_url: "https://github.com/IloveNooodles/Extended-Survival-Shooter",
    language: "C#",
    topics: ["survival-shooter", "unity"],
    stargazers_count: 0,
  },
];

const FEATURED = ["CTFs", "dotfiles", "raft-python"];
const PUBLIC_PROJECTS = GITHUB_PROJECTS.filter((project) => !project.private);

export function visibleProjects(query: string) {
  if (query.trim()) {
    const term = query.toLowerCase().trim();
    return {
      projects: PUBLIC_PROJECTS.filter((project) =>
        `${project.name} ${Object.values(project.description).join(" ")} ${project.language} ${project.topics.join(" ")}`
          .toLowerCase()
          .includes(term),
      ),
      total: PUBLIC_PROJECTS.length,
    };
  }
  const projects = PUBLIC_PROJECTS.filter((project) => FEATURED.includes(project.name));
  return { projects, total: projects.length };
}
