import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vite-plus/test";
import { Home } from "./index";

it("renders the portfolio visibly on the server before animation or JavaScript runs", () => {
  const html = renderToStaticMarkup(<Home />);

  for (const content of ["TAKE YOUR", "CTFs", "Matchmade", "Cyber Jawara", "Search projects"]) {
    expect(html).toContain(content);
  }
  expect(html).not.toMatch(
    /style="[^"]*(opacity:\s*0(?:;|")|visibility:\s*hidden|display:\s*none)/,
  );
});
