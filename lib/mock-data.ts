import { calculateKarmaDelta } from "@/lib/scoring";
import type { ActionLog, DailySnapshot } from "@/types";

const seeds: Array<Pick<ActionLog, "title" | "category" | "type" | "impact" | "createdAt">> = [
  {
    title: "Cooked a healthy lunch",
    category: "health",
    type: "good",
    impact: 3,
    createdAt: "2026-04-14T08:10:00.000Z"
  },
  {
    title: "Missed a workout",
    category: "health",
    type: "bad",
    impact: 2,
    createdAt: "2026-04-13T18:30:00.000Z"
  },
  {
    title: "Helped a teammate finish a task",
    category: "community",
    type: "good",
    impact: 4,
    createdAt: "2026-04-13T14:15:00.000Z"
  },
  {
    title: "Made amends after snapping at a friend",
    category: "community",
    type: "repair",
    impact: 5,
    createdAt: "2026-04-12T19:10:00.000Z"
  },
  {
    title: "Skipped doomscrolling for a focused hour",
    category: "focus",
    type: "good",
    impact: 3,
    createdAt: "2026-04-12T10:00:00.000Z"
  },
  {
    title: "Recycled old electronics",
    category: "environment",
    type: "good",
    impact: 4,
    createdAt: "2026-04-11T16:45:00.000Z"
  }
];

export const demoLogs: ActionLog[] = seeds.map((seed, index) => ({
  id: `demo-${index + 1}`,
  ...seed,
  karmaDelta: calculateKarmaDelta(seed)
}));

export const demoDaily: DailySnapshot[] = [
  { date: "2026-04-14", score: 36, actions: 1 },
  { date: "2026-04-13", score: 34, actions: 2 },
  { date: "2026-04-12", score: 70, actions: 2 },
  { date: "2026-04-11", score: 46, actions: 1 },
  { date: "2026-04-10", score: 22, actions: 1 },
  { date: "2026-04-09", score: 12, actions: 1 },
  { date: "2026-04-08", score: 8, actions: 1 }
];
