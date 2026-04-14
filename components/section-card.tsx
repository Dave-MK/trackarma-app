import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <section className="rounded-[36px] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  );
}
