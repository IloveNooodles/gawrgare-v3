import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vite-plus/test";
import { Home } from "./index";

it("renders the portfolio visibly on the server before animation or JavaScript runs", () => {
  const html = renderToStaticMarkup(<Home />);

  for (const content of [
    "ONE THING",
    "AT A TIME.",
    "CTFs",
    "MatchMade",
    "Cyber Jawara",
    "Search projects",
  ]) {
    expect(html).toContain(content);
  }
  expect(html).not.toMatch(
    /style="[^"]*(opacity:\s*0(?:;|")|visibility:\s*hidden|display:\s*none)/,
  );
});

it("renders the current LinkedIn role as ongoing and includes the earlier roles", () => {
  const html = renderToStaticMarkup(<Home />);
  for (const content of [
    "Money Forward, Inc.",
    "$1,591+ per month",
    "$1,500 per month",
    "Software Engineer III",
    "Present",
    "Tokyo, Japan",
    "Internnet Indonesia",
    "Bangkit Academy",
    "Institut Teknologi Bandung",
  ]) {
    expect(html).toContain(content);
  }
});

it("keeps the career history and key results with a link to the full experience", () => {
  const html = renderToStaticMarkup(<Home />);
  for (const content of [
    "Stealth Startup",
    "Himpunan Mahasiswa Informatika (HMIF) ITB",
    "ARKAVIDIA",
    "Developer Student Club ITB",
    "Mile Zero Project",
    "Comlabs-USDI ITB",
    "400,000+ users",
    "3,000 queries per second",
    "Full work history on LinkedIn",
  ]) {
    expect(html).toContain(content);
  }
});
