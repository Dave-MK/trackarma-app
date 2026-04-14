export type ActionType = "good" | "bad" | "repair";

export type ActionCategory =
  | "health"
  | "focus"
  | "community"
  | "environment"
  | "finance"
  | "mindset";

export interface ActionLog {
  id: string;
  title: string;
  category: ActionCategory;
  type: ActionType;
  impact: 1 | 2 | 3 | 4 | 5;
  karmaDelta: number;
  notes?: string;
  createdAt: string;
}

export interface DailySnapshot {
  date: string;
  score: number;
  actions: number;
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  unlocked: boolean;
}
