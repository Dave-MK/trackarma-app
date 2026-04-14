"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { calculateKarmaDelta } from "@/lib/scoring";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { ActionCategory, ActionType } from "@/types";

const actionSchema = z.object({
  title: z.string().trim().min(3).max(80),
  category: z.enum([
    "health",
    "focus",
    "community",
    "environment",
    "finance",
    "mindset"
  ] satisfies [ActionCategory, ...ActionCategory[]]),
  type: z.enum(["good", "bad", "repair"] satisfies [ActionType, ...ActionType[]]),
  impact: z.coerce.number().int().min(1).max(5),
  notes: z.string().trim().max(240).optional().or(z.literal(""))
});

export interface LogActionState {
  status: "idle" | "success" | "error";
  message: string;
  karmaDelta?: number;
}

export async function logAction(
  _prevState: LogActionState,
  formData: FormData
): Promise<LogActionState> {
  const parsed = actionSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    type: formData.get("type"),
    impact: formData.get("impact"),
    notes: formData.get("notes")
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please complete the form with a valid action, category, and impact."
    };
  }

  const karmaDelta = calculateKarmaDelta({
    type: parsed.data.type,
    impact: parsed.data.impact as 1 | 2 | 3 | 4 | 5,
    category: parsed.data.category
  });

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      status: "success",
      message: "Preview saved locally. Add Supabase keys to persist actions.",
      karmaDelta
    };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      message: "Sign in is required before actions can be saved."
    };
  }

  const { error } = await supabase.from("action_logs").insert({
    user_id: user.id,
    title: parsed.data.title,
    category: parsed.data.category,
    type: parsed.data.type,
    impact: parsed.data.impact,
    notes: parsed.data.notes || null,
    karma_delta: karmaDelta
  });

  if (error) {
    return {
      status: "error",
      message: "The action could not be saved. Check your Supabase table setup."
    };
  }

  revalidatePath("/");

  return {
    status: "success",
    message: "Action logged successfully.",
    karmaDelta
  };
}
