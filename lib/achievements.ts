import { totalKarma } from "@/lib/scoring";
import { getCurrentStreak } from "@/lib/streaks";
import type { Achievement, ActionLog, DailySnapshot } from "@/types";

export function evaluateAchievements(logs: ActionLog[], daily: DailySnapshot[]): Achievement[] {
  const score = totalKarma(logs);
  const streak = getCurrentStreak(daily);
  const repairCount = logs.filter((log) => log.type === "repair").length;
  const communityCount = logs.filter((log) => log.category === "community").length;

  return [
    {
      id: "first-light",
      label: "First Light",
      description: "Log your first positive action.",
      unlocked: logs.some((log) => log.type === "good")
    },
    {
      id: "repair-loop",
      label: "Repair Loop",
      description: "Log 3 repair actions.",
      unlocked: repairCount >= 3
    },
    {
      id: "seven-up",
      label: "Seven Up",
      description: "Keep a positive streak for 7 days.",
      unlocked: streak >= 7
    },
    {
      id: "social-proof",
      label: "Social Proof",
      description: "Log 4 community actions.",
      unlocked: communityCount >= 4
    },
    {
      id: "catalyst-tier",
      label: "Catalyst Tier",
      description: "Reach 220 total karma.",
      unlocked: score >= 220
    }
  ];
}
