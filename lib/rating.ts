import { totalKarma } from "@/lib/scoring";
import type { ActionLog } from "@/types";

export function getKarmaRating(logs: ActionLog[]) {
  const score = totalKarma(logs);

  if (score >= 220) {
    return { label: "Catalyst", tone: "text-emerald-300" };
  }

  if (score >= 120) {
    return { label: "Momentum", tone: "text-cyan-300" };
  }

  if (score >= 40) {
    return { label: "Balanced", tone: "text-slate-200" };
  }

  if (score >= 0) {
    return { label: "Recovering", tone: "text-amber-300" };
  }

  return { label: "Reset Mode", tone: "text-rose-300" };
}
