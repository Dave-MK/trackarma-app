# Trackarma

Trackarma is a Next.js App Router starter for a karma-tracking app focused on daily actions, streaks, achievements, and lightweight accountability.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Zod

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template and add your Supabase keys:

```bash
copy .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

## Suggested Supabase tables

This starter assumes an `action_logs` table shaped roughly like this:

```sql
create table public.action_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null,
  type text not null check (type in ('good', 'bad', 'repair')),
  impact integer not null check (impact between 1 and 5),
  notes text,
  karma_delta integer not null,
  created_at timestamptz not null default now()
);
```

## Project structure

- `app/`: routes, layout, server actions
- `components/`: dashboard and interaction components
- `lib/`: domain logic and Supabase helpers
- `types/`: shared types

## Next steps

- Add Supabase auth flows
- Persist streak snapshots and achievements
- Connect charts to real user history
- Add mobile-specific shell when you are ready for Expo
