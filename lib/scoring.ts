import type { ActionCategory, ActionLog, ActionType } from "@/types";

const typeMultiplier: Record<ActionType, number> = {
  good: 1,
  bad: -1,
  repair: 0.75
};

const categoryBonus: Record<ActionCategory, number> = {
  health: 1.2,
  focus: 1.1,
  community: 1.35,
  environment: 1.15,
  finance: 1,
  mindset: 1.05
};

export function calculateKarmaDelta(input: {
  type: ActionType;
  impact: 1 | 2 | 3 | 4 | 5;
  category: ActionCategory;
}) {
  const base = input.impact * 10;
  const weighted = base * typeMultiplier[input.type] * categoryBonus[input.category];

  return Math.round(weighted);
}

export function totalKarma(logs: ActionLog[]) {
  return logs.reduce((sum, log) => sum + log.karmaDelta, 0);
}

export function categoryBreakdown(logs: ActionLog[]) {
  return logs.reduce<Record<ActionCategory, number>>(
    (acc, log) => {
      acc[log.category] += log.karmaDelta;
      return acc;
    },
    {
      health: 0,
      focus: 0,
      community: 0,
      environment: 0,
      finance: 0,
      mindset: 0
    }
  );
}
