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

  return { timeline, track };
}
