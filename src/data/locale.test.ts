import { expect, it } from "vite-plus/test";
import { labels } from "./labels";
import { locales, pageTitle, parseLocale, resolveLocale, searchFor } from "./locale";

it("accepts only configured locale codes", () => {
  expect(locales).toEqual(["en", "id", "ja"]);
  expect(parseLocale("ja")).toBe("ja");
  expect(parseLocale("nope")).toBeUndefined();
});

it("uses English when no locale is present", () => {
  expect(resolveLocale({})).toBe("en");
  expect(resolveLocale({ lang: "id" })).toBe("id");
});

it("omits English from the canonical search params", () => {
  expect(searchFor("en")).toEqual({ lang: undefined });
  expect(searchFor("ja")).toEqual({ lang: "ja" });
});

it("builds localized page titles through one interface", () => {
  expect(pageTitle({}, "projects")).toBe(`${labels.en.projects} — ${labels.en.siteName}`);
  expect(pageTitle({ lang: "id" }, "projects")).toBe(
    `${labels.id.projects} — ${labels.id.siteName}`,
  );
  expect(pageTitle({ lang: "ja" }, "blog", "A post")).toBe(`A post — ${labels.ja.siteName}`);
});
