import { expect, it } from "vite-plus/test";
import { buildTrack } from "./use-timeline-track";

it("joins every route segment at the next station", () => {
  const stations = [
    { x: 90, y: 32, bottom: 280 },
    { x: 620, y: 410, bottom: 690 },
    { x: 160, y: 835, bottom: 1100 },
  ];
  const legs = buildTrack(stations);
  expect(legs).toHaveLength(2);
  expect(legs[0][0]).toEqual({ x: 90, y: 32 });
  expect(legs[0].at(-1)).toEqual(legs[1][0]);
  expect(legs[1].at(-1)).toEqual({ x: 160, y: 835 });
  expect(legs[0][2].y).toBeGreaterThan(stations[0].bottom);
  expect(legs[1][2].y).toBeGreaterThan(stations[1].bottom);
});

it("connects a narrow layout without dividing by horizontal distance", () => {
  const legs = buildTrack([
    { x: 16, y: 32, bottom: 330 },
    { x: 16, y: 395, bottom: 700 },
  ]);
  expect(legs[0][0]).toEqual({ x: 16, y: 32 });
  expect(legs[0].at(-1)).toEqual({ x: 16, y: 395 });
  expect(legs.flat().every((point) => Number.isFinite(point.x) && Number.isFinite(point.y))).toBe(
    true,
  );
  expect(buildTrack([])).toEqual([]);
  expect(buildTrack([{ x: 16, y: 32, bottom: 330 }])).toEqual([]);
});
