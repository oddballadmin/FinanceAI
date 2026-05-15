# FinanceAI Agent Guide

## Purpose
This file is the first-stop context for agents working in this repository. Use it to get productive quickly, then read the deeper instruction files when a task touches their area.

Read detailed docs in this order:

1. `instructions/instructions.md` - workflow, roles, delivery rules, MVP sequence
2. `instructions/techstack.md` - approved technologies and dependency policy
3. `instructions/structure.md` - repository layout and ownership boundaries
4. `instructions/infra.md` - Supabase, auth, storage, RLS, backend services

## Project Identity
- Product name: FinanceAI
- Product type: AI-assisted personal finance tracker
- Backend: Supabase
- Primary app: Expo with React Native and TypeScript
- Targets: iOS, Android, web, and later desktop packaging

Do not infer CRM, sales, or unrelated business requirements from folder names or old context. FinanceAI is a personal finance app.

## MVP Scope
The first usable version should support:

- Sign up, sign in, sign out, and password recovery
- Supabase-backed user data protected by RLS
- Accounts, categories, and transactions
- Dashboard summaries for balance, income, expenses, and recent activity
- Mortgage calculator and amortization view
- Basic reporting by month and category
- CSV export

Later features may include bank linking, AI transaction categorization, PDF reports, scheduled reminders, and shared household accounts.

## Current Architecture
- Expo Router routes live in `app/`.
- Reusable UI lives in `components/`.
- Business domains live in `features/`.
- Shared clients, constants, types, and utilities live in `lib/`.
- Shared hooks live in `hooks/`.
- CSS lives in `styles/`; theme tokens live in `styles/themes.css`.
- Zustand client-only stores live in `store/`.
- Supabase schema, migrations, functions, and seed data live in `supabase/`.
- Web-specific deployment notes live in `web/`; the web app still uses shared `app/` routes.
- Desktop packaging notes/code live in `desktop/`; the desktop app should consume the Expo web build when that shell is chosen.
- Tests live in `__tests__/`, with component tests allowed beside components.

Config files that tools expect at the root should stay at the root. Do not reintroduce root config files that only point into a separate config folder.

## Coding Style
- Use TypeScript in strict mode.
- Prefer arrow functions for React components and applicable local functions:

```tsx
const SignupRoute = () => {
  return null;
};

export default SignupRoute;
```

- Keep route files thin; put business logic in `features/`.
- Use the `@/` alias for app imports.
- Use NativeWind for styling.
- Use semantic theme classes such as `bg-app-background`, `bg-app-surface`, `text-app-foreground`, and `bg-app-primary` instead of hard-coded palette colors.
- Use `lucide-react-native` for icons unless a platform-specific icon is required.
- Prefer Expo-managed libraries when adding native functionality.
- Keep code explicit and boring over clever abstractions.

## State, Data, And Forms
- Server state: TanStack Query
- Local UI/preferences state: Zustand
- Forms: React Hook Form
- Validation: Zod
- Dates: `date-fns`
- Money: store integer minor units in the database, such as cents. Do not store money as JS/database floating-point values.

## Supabase Rules
- Do not build custom auth. Use Supabase Auth.
- Never put service-role keys in the app or public client code.
- Only `EXPO_PUBLIC_` variables may be exposed to the Expo client.
- RLS is mandatory for every user-owned table before app reads/writes.
- Every schema change should be a migration under `supabase/migrations/`.
- `lib/supabase/client.ts` should be the only app-side Supabase client setup.
- `lib/supabase/database.types.ts` should be generated, not hand-written.
- Store backend-only API keys as Supabase function secrets or deployment secrets.

Expected client env vars:

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Current local Supabase URL used during setup:

```text
http://10.0.0.179:8000
```

Respect the current repository ignore policy for env files. Real secrets must not be committed.

## Web And Desktop
- Web should use Expo Router web from the shared route tree.
- Do not fork business logic, data access, or UI just for web.
- Desktop should be a packaging shell around the Expo web build when ready.
- Do not duplicate app routes, features, or Supabase access in `desktop/`.
- Decide later between Tauri and Electron based on actual native integration needs.

## Theme System
- Theme variables are defined in `styles/themes.css`.
- Global Tailwind setup lives in `styles/global.css`.
- Theme metadata for settings UI lives in `lib/constants/themes.ts`.
- Runtime theme selection uses `store/useThemeStore.ts`.
- Add new palettes by updating both `styles/themes.css` and `lib/constants/themes.ts`.
- Keep app components on semantic tokens; do not bind feature UI directly to one palette.

## Source Of Truth
- If code and docs disagree, inspect the code first, then update code or docs in the same task.
- If instruction files disagree, follow this order:
  1. `instructions/instructions.md`
  2. `instructions/techstack.md`
  3. `instructions/structure.md`
  4. `instructions/infra.md`
- If adding a library, update `instructions/techstack.md`.
- If adding a folder pattern, update `instructions/structure.md`.
- If adding backend services, env vars, tables, policies, buckets, or functions, update `instructions/infra.md`.

## Validation
Run the narrowest useful validation for each task. Common commands:

```bash
npm run typecheck
npx expo config --type public
```

When tests/lint scripts are added, use them for relevant changes:

```bash
npm run lint
npm test
```

Do not run `npm audit fix --force` without explicit approval; it may introduce breaking dependency changes.

## Delivery Rules
- Make the smallest coherent change that satisfies the task.
- Do not change unrelated files.
- Do not commit secrets.
- Do not use the Supabase service-role key in the app.
- Add or update tests when behavior changes.
- Build loading, empty, error, and success states for user-facing flows.
- Update docs when architecture changes.
- Summarize changed files, validation, and remaining follow-up work.
- The user decides whether a task is complete.

## Useful Task Ownership
- App work: `app/`, `components/`, `hooks/`, `store/`, `lib/context/`
- Feature work: `features/<feature>/` plus thin route composition in `app/`
- Data work: `supabase/migrations/`, `supabase/seed.sql`, `lib/supabase/`
- Backend work: `supabase/functions/`
- DevOps/docs: root config, scripts, CI, `instructions/`, `README.md`
