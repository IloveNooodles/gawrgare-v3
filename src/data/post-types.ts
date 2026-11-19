import type { Localized } from "./labels";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  url: string;
  summary: Localized<string>;
  takeaways: Localized<string[]>;
  readingTime?: Localized<number>;
  body?: Localized<string>;
};
