import { labels, type Locale } from "./labels";

export const locales = Object.keys(labels) as Locale[];

type LocaleSearch = { lang?: Locale };
type StringLabelKey = {
  [K in keyof typeof labels.en]: (typeof labels.en)[K] extends string ? K : never;
}[keyof typeof labels.en];

export function parseLocale(value: unknown): Locale | undefined {
  return locales.find((locale) => locale === value);
}

export function resolveLocale(search: LocaleSearch): Locale {
  return search.lang ?? "en";
}

export function searchFor(locale: Locale): LocaleSearch {
  return { lang: locale === "en" ? undefined : locale };
}

export function labelsFor(locale: Locale) {
  return labels[locale];
}

export function pageTitle(search: LocaleSearch, key: StringLabelKey, title?: string) {
  const t = labels[resolveLocale(search)];
  return `${title ?? t[key]} — ${t.siteName}`;
}
