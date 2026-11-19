import type { Localized } from "./labels";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  url: string;
  summary: Localized<string>;
  takeaways: Localized<string[]>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "kubernetes-ebpf-and-cilium",
    title: "Supercharge Kubernetes with eBPF and Cilium",
    date: "2025-12-19",
    tags: ["Kubernetes", "eBPF", "Cilium"],
    url: "https://global.moneyforward-dev.jp/2025/12/19/1497/",
    summary: {
      en: "What changes when Kubernetes moves from iptables rules to eBPF programs? I walk through pod-to-pod networking, kube-proxy's O(N) bottleneck, how Cilium replaces rule evaluation with hash maps, and what Network Policies and Hubble look like in practice.",
      id: "Apa yang berubah ketika Kubernetes beralih dari aturan iptables ke program eBPF? Saya membahas jaringan pod-ke-pod, bottleneck O(N) kube-proxy, bagaimana Cilium mengganti evaluasi aturan dengan hash map, dan seperti apa Network Policies serta Hubble di lapangan.",
      ja: "Kubernetes が iptables のルールから eBPF プログラムへ移ると何が変わるのか。Pod 間通信、kube-proxy の O(N) ボトルネック、Cilium がハッシュマップでルール評価を置き換える仕組み、Network Policy と Hubble の実践例を解説します。",
    },
    takeaways: {
      en: [
        "How pod-to-pod traffic reaches a Service IP",
        "Why kube-proxy rule updates get expensive at scale",
        "How Cilium uses eBPF maps for O(1) lookups",
        "Applying network policies and observing traffic with Hubble",
      ],
      id: [
        "Bagaimana trafik pod-ke-pod mencapai IP Service",
        "Mengapa pembaruan aturan kube-proxy mahal saat skala besar",
        "Bagaimana Cilium memakai peta eBPF untuk pencarian O(1)",
        "Menerapkan network policy dan mengamati trafik dengan Hubble",
      ],
      ja: [
        "Pod 間トラフィックが Service IP に届く仕組み",
        "大規模クラスターで kube-proxy のルール更新が重くなる理由",
        "Cilium が eBPF マップで O(1) 参照を行う方法",
        "Network Policy の適用と Hubble によるトラフィック監視",
      ],
    },
  },
  {
    slug: "build-your-own-kubernetes-cluster",
    title: "Let's Build Our Own Kubernetes Cluster",
    date: "2025-10-01",
    tags: ["Kubernetes", "Homelab", "Infrastructure"],
    url: "https://global.moneyforward-dev.jp/2025/10/01/lets-build-our-own-kubernetes-cluster/",
    summary: {
      en: "I built a Kubernetes cluster at home to learn what a managed control plane hides. This is the setup, the decisions behind it, and what broke along the way — from nodes and networking to the tooling I used to keep it running.",
      id: "Saya membangun cluster Kubernetes di rumah untuk mempelajari apa yang disembunyikan control plane terkelola. Ini tentang perangkat yang dipakai, keputusan di baliknya, dan apa yang rusak di sepanjang jalan — dari node dan jaringan sampai alat yang menjaga cluster tetap berjalan.",
      ja: "管理されたコントロールプレーンが隠している部分を学ぶため、自宅に Kubernetes クラスターを構築しました。必要なもの、設計判断、そして進む途中で起きた障害を、ノードやネットワークから運用ツールまでまとめています。",
    },
    takeaways: {
      en: [
        "What hardware and tooling the home cluster needs",
        "How the nodes and networking are planned",
        "Common questions that came up while building it",
        "What I would change in a second build",
      ],
      id: [
        "Perangkat keras dan alat yang dibutuhkan cluster rumahan",
        "Bagaimana node dan jaringannya direncanakan",
        "Pertanyaan yang muncul selama proses build",
        "Hal yang akan saya ubah jika membangun ulang",
      ],
      ja: [
        "自宅クラスターに必要なハードウェアとツール",
        "ノードとネットワークの設計方針",
        "構築中に浮かんだよくある疑問",
        "作り直すなら変えたいこと",
      ],
    },
  },
  {
    slug: "neovim-api-in-cursor",
    title: "Utilizing Neovim API in Cursor",
    date: "2025-05-09",
    tags: ["Neovim", "Cursor", "Tooling"],
    url: "https://global.moneyforward-dev.jp/2025/05/09/utilizing-neovim-api-in-cursor/",
    summary: {
      en: "After a year in Vim, I wanted my editor to feel like an extension of my workflow instead of a separate app. Here's how I used the Neovim API inside Cursor to bridge keybindings, commands, and editor state.",
      id: "Setelah setahun memakai Vim, saya ingin editor terasa seperti bagian dari alur kerja, bukan aplikasi terpisah. Ini kisah saya memakai Neovim API di dalam Cursor untuk menyatukan keybindings, perintah, dan state editor.",
      ja: "Vim を使い始めて一年、エディターを別アプリではなく工作流の一部にしたかった。Cursor 内で Neovim API を使い、キーバインド、コマンド、エディターの状態をつなげた話です。",
    },
    takeaways: {
      en: [
        "Why pure Neovim did not fit my workflow",
        "How Cursor became the middle ground",
        "Wiring Neovim keybindings and commands into Cursor",
        "Customizing the combined setup",
      ],
      id: [
        "Mengapa Neovim murni tidak cocok dengan alur kerja saya",
        "Bagaimana Cursor menjadi jalan tengah",
        "Menghubungkan keybinding dan perintah Neovim ke Cursor",
        "Menyesuaikan pengaturan gabungan tersebut",
      ],
      ja: [
        "Neovim 単体では工作流に合わなかった理由",
        "Cursor が妥協点になった経緯",
        "Neovim のキーバインドとコマンドを Cursor に接続する方法",
        "組み合わせた環境のカスタマイズ",
      ],
    },
  },
];

export function findBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
