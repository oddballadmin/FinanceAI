# Project Structure

## Purpose
This file defines the expected repository layout and ownership boundaries. Agents should use this structure when scaffolding and adding features.

## Root Layout

```text
FinanceAI/
|-- app/
|-- assets/
|-- components/
|-- config/
|-- desktop/
|-- features/
|-- hooks/
|-- instructions/
|-- lib/
|-- scripts/
|-- store/
|-- supabase/
|-- web/
|-- __tests__/
|-- .gitignore
|-- app.config.js
|-- eas.json
|-- eslint.config.js
|-- metro.config.js
|-- nativewind-env.d.ts
|-- package.json
|-- tailwind.config.js
|-- tsconfig.json
`-- README.md
```

## `app/`
Expo Router routes live here for mobile and web. Route files should be thin and should delegate business logic to `features/`.

```text
app/
|-- _layout.tsx
|-- index.tsx
|-- +not-found.tsx
|-- (auth)/
|   |-- _layout.tsx
|   |-- login.tsx
|   |-- signup.tsx
|   `-- forgot-password.tsx
|-- (tabs)/
|   |-- _layout.tsx
|   |-- index.tsx
|   |-- transactions.tsx
|   |-- mortgage.tsx
|   |-- reports.tsx
|   `-- settings.tsx
|-- transaction/
|   |-- new.tsx
|   `-- [id].tsx
|-- mortgage/
|   |-- calculator.tsx
|   `-- [id].tsx
|-- category/
|   |-- manage.tsx
|   `-- [id].tsx
`-- onboarding/
    |-- _layout.tsx
    |-- welcome.tsx
    |-- setup-profile.tsx
    `-- initial-balance.tsx
```

Rules:

- Use route groups for navigation organization.
- Keep route components mostly focused on layout, params, and composition.
- Put feature-specific data fetching, forms, and calculations in `features/`.
- Protect authenticated routes at layout boundaries.
- Keep web behavior in shared routes where practical. Use platform-specific files only when a real platform difference requires it.

## `config/`
Tool configuration bodies live here. Root config files may remain as adapters because Expo, Metro, Babel, Tailwind, TypeScript, and npm discover some files only from the project root.

```text
config/
|-- app.config.js
|-- babel.config.js
|-- global.css
|-- global.d.ts
|-- metro.config.js
|-- tailwind.config.js
`-- tsconfig.json
```

Rules:

- Keep root config files as thin adapters when a tool requires root discovery.
- Put editable config logic in `config/` when the tool allows it.
- `package.json` stays at the root because npm requires it there.
- `nativewind-env.d.ts` stays at the root because NativeWind may generate it there.

## `components/`
Reusable UI components live here. These components should not know about finance-specific business rules.

```text
components/
|-- ui/
|   |-- Button.tsx
|   |-- Input.tsx
|   |-- Select.tsx
|   |-- Card.tsx
|   |-- Modal.tsx
|   |-- BottomSheet.tsx
|   |-- Badge.tsx
|   |-- Skeleton.tsx
|   `-- index.ts
|-- forms/
|   |-- FormField.tsx
|   |-- CurrencyInput.tsx
|   |-- DatePicker.tsx
|   |-- CategoryPicker.tsx
|   `-- index.ts
|-- charts/
|   |-- LineChart.tsx
|   |-- BarChart.tsx
|   |-- PieChart.tsx
|   `-- index.ts
|-- layout/
|   |-- Screen.tsx
|   |-- Header.tsx
|   |-- TabBar.tsx
|   `-- index.ts
`-- feedback/
    |-- Toast.tsx
    |-- LoadingSpinner.tsx
    |-- EmptyState.tsx
    `-- ErrorBoundary.tsx
```

Rules:

- Component files use PascalCase.
- Component tests may live beside components as `ComponentName.test.tsx`.
- Shared components must receive data through props.
- Avoid importing feature modules into `components/`.

## `features/`
Business domains live here. Each feature should be self-contained.

```text
features/
|-- auth/
|   |-- components/
|   |-- hooks/
|   |-- schemas/
|   |-- types.ts
|   `-- index.ts
|-- transactions/
|   |-- components/
|   |-- hooks/
|   |-- queries/
|   |-- schemas/
|   |-- utils/
|   |-- types.ts
|   `-- index.ts
|-- mortgage/
|   |-- components/
|   |-- hooks/
|   |-- schemas/
|   |-- utils/
|   |-- types.ts
|   `-- index.ts
|-- reports/
|   |-- components/
|   |-- hooks/
|   |-- utils/
|   |-- types.ts
|   `-- index.ts
`-- settings/
    |-- components/
    |-- hooks/
    |-- schemas/
    |-- types.ts
    `-- index.ts
```

Rules:

- Keep feature queries in `features/<feature>/queries`.
- Keep feature validation in `features/<feature>/schemas`.
- Keep feature calculations in `features/<feature>/utils`.
- Export the public feature surface from `features/<feature>/index.ts`.
- Move code to `lib/` only when at least two features need it.

## `web/`
Web-specific deployment notes, static hosting adapters, and web-only assets live here. The web application itself should use the shared Expo Router routes in `app/`.

Rules:

- Do not fork business logic for web.
- Prefer shared components and platform-specific files before introducing web-only code.
- Keep deployment/provider configuration here only when it cannot live in root config or CI.

## `desktop/`
Desktop packaging code and notes live here once the desktop shell is selected.

Rules:

- The desktop app should consume the Expo web build.
- Do not duplicate route, feature, data, or UI logic in `desktop/`.
- Keep desktop shell concerns, such as window management and installer packaging, separate from shared app code.

## `lib/`
Shared configuration, clients, types, and utilities live here.

```text
lib/
|-- supabase/
|   |-- client.ts
|   |-- database.types.ts
|   |-- queries.ts
|   `-- storage.ts
|-- constants/
|   |-- colors.ts
|   |-- categories.ts
|   |-- currencies.ts
|   `-- config.ts
|-- context/
|   |-- AppProviders.tsx
|   |-- QueryProvider.tsx
|   `-- ThemeProvider.tsx
|-- types/
|   |-- api.ts
|   |-- models.ts
|   `-- global.d.ts
`-- utils/
    |-- currency.ts
    |-- date.ts
    |-- formatters.ts
    |-- storage.ts
    `-- validation.ts
```

Rules:

- `lib/supabase/client.ts` is the only app-side Supabase client setup.
- `lib/supabase/database.types.ts` should be generated, not hand-written.
- Shared utilities must be domain-neutral or clearly named.

## `hooks/`
Shared React hooks live here.

```text
hooks/
|-- useDebounce.ts
|-- useKeyboard.ts
|-- useNetworkStatus.ts
`-- index.ts
```

Rules:

- Put feature-specific hooks inside `features/<feature>/hooks`.
- Keep shared hooks generic.

## `store/`
Zustand stores for client-only state live here.

```text
store/
|-- useFilterStore.ts
|-- usePreferencesStore.ts
|-- useModalStore.ts
`-- index.ts
```

Rules:

- Do not mirror server state in Zustand.
- Use TanStack Query for Supabase-backed data.
- Persist only non-sensitive values.

## `supabase/`
Database, functions, and local Supabase configuration live here.

```text
supabase/
|-- migrations/
|   |-- 000001_initial_schema.sql
|   |-- 000002_rls_policies.sql
|   `-- 000003_seed_helpers.sql
|-- functions/
|   |-- categorize-transaction/
|   |   `-- index.ts
|   |-- generate-report/
|   |   `-- index.ts
|   `-- send-reminder/
|       `-- index.ts
|-- seed.sql
`-- config.toml
```

Rules:

- Every schema change gets a migration.
- RLS policies should be in migrations.
- Edge Functions should validate request payloads.
- Function secrets must be managed outside Git.

## `assets/`
Static assets live here.

```text
assets/
|-- images/
|-- icons/
|-- fonts/
|-- adaptive-icon.png
`-- splash-icon.png
```

Rules:

- Keep large generated assets out of Git unless needed for the app.
- Prefer optimized images.

## `__tests__/`
Cross-cutting tests live here. Component tests may live beside components.

```text
__tests__/
|-- unit/
|-- integration/
`-- e2e/
```

Rules:

- Unit tests cover calculations and utilities.
- Integration tests cover feature flows and Supabase client behavior.
- E2E tests are added after the app shell is stable.

## Naming Rules
- Components: PascalCase, such as `TransactionCard.tsx`.
- Hooks: camelCase starting with `use`, such as `useTransactions.ts`.
- Schemas: camelCase with `Schema`, such as `transactionSchema.ts`.
- Utilities: camelCase, such as `calculateAmortization.ts`.
- SQL migrations: monotonic numeric prefix plus description.

## Import Rules
- Use the `@/` alias for app imports.
- Avoid deep imports across feature boundaries.
- Avoid circular imports.
- Do not import from `app/` into shared modules or features.
