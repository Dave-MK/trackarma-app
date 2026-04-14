import { cn } from "@/lib/utils";

interface MetricCardProps {
  eyebrow: string;
  value: string;
  hint: string;
  accent?: "teal" | "magenta" | "slate";
}

export function MetricCard({ eyebrow, value, hint, accent = "slate" }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur",
        accent === "teal" && "shadow-halo",
        accent === "magenta" && "bg-gradient-to-br from-fuchsia-500/10 via-white/5 to-transparent"
      )}
    >
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{eyebrow}</p>
      <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{hint}</p>
    </div>
  );
}
