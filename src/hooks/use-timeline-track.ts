import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";

type Station = { x: number; y: number; bottom: number };
type Point = { x: number; y: number };

export function buildTrack(stations: readonly Station[]): Point[][] {
  return stations.slice(0, -1).map((station, index) => {
    const next = stations[index + 1];
    const outward = station.x < next.x ? -12 : 12;
    const gap = next.y - station.bottom;
    return [
      { x: station.x, y: station.y },
      { x: station.x + outward, y: station.y + 24 },
      { x: station.x + outward, y: station.bottom + gap * 0.3 },
      { x: next.x - outward, y: station.bottom + gap * 0.75 },
      { x: next.x, y: next.y },
    ];
  });
}

const stops = [
  { station: 12, left: 20, width: 74, angle: -2.4, gap: 4, color: "#f4bc35" },
  { station: 82, left: 10, width: 64, angle: 2.1, gap: 3, color: "#a9ce3a" },
  { station: 22, left: 30, width: 65, angle: -1.8, gap: 4.5, color: "#56c7c7" },
  { station: 76, left: 4, width: 64, angle: 2.5, gap: 3.5, color: "#db6aab" },
  { station: 14, left: 22, width: 68, angle: -2, gap: 4, color: "#d5d9dc" },
  { station: 80, left: 8, width: 64, angle: 1.3, gap: 0, color: "#f4bc35" },
];

type StopStyle = CSSProperties &
  Record<
    | "--track-color"
    | "--station"
    | "--card-left"
    | "--card-width"
    | "--card-angle"
    | "--stop-gap"
    | "--connector-left"
    | "--connector-width",
    string
  >;

const pointsToString = (points: readonly Point[]) =>
  points.map((point) => `${point.x},${point.y}`).join(" ");

export function buildTrackView(legs: readonly Point[][]) {
  return {
    edge: pointsToString(legs.flatMap((leg, index) => (index === 0 ? leg : leg.slice(1)))),
    legs: legs.map((leg, index) => ({
      points: pointsToString(leg),
      color: stops[index % stops.length].color,
    })),
  };
}

export function buildStopStyles(
  values: readonly {
    station: number;
    left: number;
    width: number;
    angle: number;
    gap: number;
    color: string;
  }[],
): StopStyle[] {
  return values.map((stop) => {
    const edge = stop.station < stop.left ? stop.left : stop.left + stop.width;
    return {
      "--track-color": stop.color,
      "--station": `${stop.station}%`,
      "--card-left": `${stop.left}%`,
      "--card-width": `${stop.width}%`,
      "--card-angle": `${stop.angle}deg`,
      "--stop-gap": `${stop.gap}rem`,
      "--connector-left": `${Math.min(stop.station, edge)}%`,
      "--connector-width": `${Math.abs(stop.station - edge)}%`,
    };
  });
}

const stopStyles = buildStopStyles(stops);

export function useTimelineTrack() {
  const timeline = useRef<HTMLOListElement>(null);
  const [track, setTrack] = useState<{ width: number; height: number; legs: Point[][] }>({
    width: 0,
    height: 0,
    legs: [],
  });

  useLayoutEffect(() => {
    const element = timeline.current;
    if (!element) return;
    const items = Array.from(element.querySelectorAll<HTMLElement>(".timeline-item"));
    const measure = () => {
      if (!timeline.current) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;
      const stations = items.flatMap((item) => {
        const node = item.querySelector(".timeline-node");
        if (!node) return [];
        const station = node.getBoundingClientRect();
        return [
          {
            x: station.left + station.width / 2 - bounds.left,
            y: station.top + station.height / 2 - bounds.top,
            bottom: item.getBoundingClientRect().bottom - bounds.top,
          },
        ];
      });
      setTrack({ width: bounds.width, height: bounds.height, legs: buildTrack(stations) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return {
    timeline,
    viewBox: `0 0 ${track.width} ${track.height}`,
    hasTrack: track.legs.length > 0,
    ...buildTrackView(track.legs),
    stopStyles,
  };
}
