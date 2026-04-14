import { ActionLogForm } from "@/components/action-log-form";
import { MetricCard } from "@/components/metric-card";
import { SectionCard } from "@/components/section-card";
import { evaluateAchievements } from "@/lib/achievements";
import { demoDaily, demoLogs } from "@/lib/mock-data";
import { getKarmaRating } from "@/lib/rating";
import { categoryBreakdown, totalKarma } from "@/lib/scoring";
import { getBestDay, getCurrentStreak } from "@/lib/streaks";

export default function HomePage() {
  const total = totalKarma(demoLogs);
  const rating = getKarmaRating(demoLogs);
  const streak = getCurrentStreak(demoDaily);
  const bestDay = getBestDay(demoDaily);
  const achievements = evaluateAchievements(demoLogs, demoDaily);
  const breakdown = categoryBreakdown(demoLogs);

  return (
    <main className="noise-overlay min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.24),_transparent_30%),linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/25 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-teal-200">
                Trackarma MVP
              </div>
              <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight sm:text-6xl">
                Track the choices that shape your momentum.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Log good actions, repair moments, and setbacks in one place. Trackarma turns
                daily behavior into visible momentum instead of vague intention.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <MetricCard eyebrow="Total Karma" value={`${total}`} hint="Weighted by impact and category." accent="teal" />
                <MetricCard eyebrow="Current Streak" value={`${streak} days`} hint="Positive-score days in a row." />
                <MetricCard eyebrow="Best Day" value={`${bestDay.score}`} hint={`${bestDay.date} across ${bestDay.actions} actions.`} accent="magenta" />
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-slate-950/50 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Current Rating</p>
              <p className={`mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold ${rating.tone}`}>
                {rating.label}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                The rating system gives users an at-a-glance sense of trajectory without hiding
                the underlying numbers.
              </p>

              <div className="mt-8 space-y-4">
                {Object.entries(breakdown).map(([category, score]) => (
                  <div key={category}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="capitalize text-slate-300">{category}</span>
                      <span className="text-slate-400">{score}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-teal-400 via-cyan-300 to-fuchsia-400"
                        style={{ width: `${Math.min(100, Math.max(10, Math.abs(score))) }%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <SectionCard
            title="Log an action"
            description="This form is already wired to a server action with Zod validation. It returns a preview success state until Supabase is configured."
          >
            <ActionLogForm />
          </SectionCard>

          <SectionCard
            title="Achievement radar"
            description="Early achievement hooks are implemented in shared business logic so they can be reused by the dashboard, notifications, or mobile clients."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-[24px] border p-4 ${
                    achievement.unlocked
                      ? "border-emerald-400/30 bg-emerald-400/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <p className="font-medium">{achievement.label}</p>
                  <p className="mt-2 text-sm text-slate-400">{achievement.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {achievement.unlocked ? "Unlocked" : "In Progress"}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard
          title="Recent activity"
          description="The starter ships with demo data so the layout feels alive before the database is connected."
        >
          <div className="grid gap-4">
            {demoLogs.map((log) => (
              <article
                key={log.id}
                className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-slate-100">{log.title}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {log.category} · {log.type} · impact {log.impact}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {new Date(log.createdAt).toLocaleDateString("en-GB", {
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                  <span
                    className={`font-[family-name:var(--font-display)] text-xl font-semibold ${
                      log.karmaDelta >= 0 ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {log.karmaDelta >= 0 ? "+" : ""}
                    {log.karmaDelta}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
