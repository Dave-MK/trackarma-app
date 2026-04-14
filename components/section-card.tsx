import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[color:var(--bg-elevated)]/90 p-6 shadow-2xl shadow-black/20">
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  );
}
