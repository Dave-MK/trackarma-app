import { ActionLogForm } from "@/components/action-log-form";
import { SectionCard } from "@/components/section-card";
import { evaluateAchievements } from "@/lib/achievements";
import { demoDaily, demoLogs } from "@/lib/mock-data";

export default function HomePage() {
  const achievements = evaluateAchievements(demoLogs, demoDaily);

  return (
    <main className="noise-overlay min-h-screen">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
        <section className="overflow-hidden rounded-[44px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.18),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(217,70,239,0.16),_transparent_22%),linear-gradient(180deg,_rgba(10,13,20,0.96),_rgba(7,10,16,0.92))] p-8 shadow-2xl shadow-black/30 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] items-center">
            <div className="space-y-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-[26px] bg-gradient-to-br from-teal-400 to-fuchsia-500 shadow-[0_0_35px_rgba(20,184,166,0.24)]">
                  <span className="text-2xl font-semibold text-slate-950">✓</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-teal-300">Trackarma</p>
                  <h1 className="mt-3 max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
                    Build momentum with every choice.
                  </h1>
                </div>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Track better habits, repair mistakes, and watch your karma score rise in a clean, mobile-first dashboard.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#14BBA6]" />
                  #14BBA6
                </span>
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#D946EF]" />
                  #D946EF
                </span>
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <span className="h-3.5 w-3.5 rounded-full bg-slate-500" />
                  Slate
                </span>
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#0B0F14]" />
                  #0B0F14
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-[40px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="flex items-center justify-between rounded-[26px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  <span className="font-medium text-slate-100">Trackarma</span>
                  <span className="rounded-full bg-slate-800/90 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                    Live
                  </span>
                </div>

                <div className="mt-6 rounded-[36px] bg-slate-950/90 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                  <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 via-fuchsia-500/10 to-slate-800/80">
                    <div className="absolute inset-4 rounded-full border border-white/10" />
                    <div className="absolute inset-10 rounded-full bg-slate-950/90" />
                    <div className="relative flex h-full w-full flex-col items-center justify-center text-center">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Karma score</p>
                      <p className="mt-3 text-6xl font-[family-name:var(--font-display)] font-semibold text-white">128</p>
                      <p className="mt-2 text-sm text-teal-300">Good job</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-[24px] bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">5-day streak</p>
                      <div className="mt-3 space-y-2">
                        {demoDaily.slice(0, 5).map((day) => (
                          <div key={day.date} className="flex items-center justify-between text-sm text-slate-300">
                            <span>{new Date(day.date).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}</span>
                            <span className="text-teal-300">+{day.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="w-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                      Add entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <SectionCard title="Log an action" description="Update your karma from one place with an action log built for daily use.">
            <ActionLogForm />
          </SectionCard>

          <SectionCard title="Recent activity" description="A summary of your latest actions and karma changes.">
            <div className="space-y-4">
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
                    <span className={`font-[family-name:var(--font-display)] text-xl font-semibold ${log.karmaDelta >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
                      {log.karmaDelta >= 0 ? "+" : ""}
                      {log.karmaDelta}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Achievement radar" description="Track progress with streaks, status, and unlockable milestones.">
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-[24px] border p-4 ${achievement.unlocked ? "border-emerald-400/30 bg-emerald-400/10" : "border-white/10 bg-white/5"}`}
              >
                <p className="font-medium text-slate-100">{achievement.label}</p>
                <p className="mt-2 text-sm text-slate-400">{achievement.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {achievement.unlocked ? "Unlocked" : "In Progress"}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
