import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getPublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function createSupabaseBrowserClient() {
  const env = getPublicEnv();

  if (!env) {
    return null;
  }

  return createBrowserClient(env.url, env.anonKey);
}

export async function createSupabaseServerClient() {
  const env = getPublicEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      // Cookie writes are intentionally deferred until auth flows are implemented.
      set(_name: string, _value: string, _options: Record<string, unknown>) {
      },
      remove(_name: string, _options: Record<string, unknown>) {
      }
    }
  });
}
