"use client";

import { useActionState } from "react";
import { logAction, type LogActionState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initialState: LogActionState = {
  status: "idle",
  message: ""
};

export function ActionLogForm() {
  const [state, formAction, pending] = useActionState(logAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-slate-300">Action</span>
          <input
            name="title"
            placeholder="Returned a message instead of ghosting"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-teal-400/60 focus:bg-white/10"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-slate-300">Category</span>
          <select
            name="category"
            defaultValue="community"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-teal-400/60 focus:bg-white/10"
          >
            <option value="health">Health</option>
            <option value="focus">Focus</option>
            <option value="community">Community</option>
            <option value="environment">Environment</option>
            <option value="finance">Finance</option>
            <option value="mindset">Mindset</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-slate-300">Type</span>
          <select
            name="type"
            defaultValue="good"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-teal-400/60 focus:bg-white/10"
          >
            <option value="good">Good</option>
            <option value="bad">Bad</option>
            <option value="repair">Repair</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-slate-300">Impact</span>
          <input
            name="impact"
            type="range"
            min="1"
            max="5"
            defaultValue="3"
            className="mt-3 w-full accent-teal-400"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm text-slate-300">Notes</span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Optional context for your future self."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-teal-400/60 focus:bg-white/10"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Logging..." : "Log action"}
        </button>

        <div
          className={cn(
            "min-h-6 text-sm",
            state.status === "error" && "text-rose-300",
            state.status === "success" && "text-emerald-300"
          )}
        >
          {state.message}
          {state.karmaDelta ? ` ${state.karmaDelta > 0 ? "+" : ""}${state.karmaDelta} karma.` : ""}
        </div>
      </div>
    </form>
  );
}
