import type { DailySnapshot } from "@/types";

export function getCurrentStreak(days: DailySnapshot[]) {
  let streak = 0;

  for (const day of [...days].sort((a, b) => b.date.localeCompare(a.date))) {
    if (day.score > 0) {
      streak += 1;
      continue;
    }

    break;
  }

  return streak;
}

export function getBestDay(days: DailySnapshot[]) {
  return days.reduce((best, day) => {
    if (!best || day.score > best.score) {
      return day;
    }

    return best;
  }, days[0]);
}
