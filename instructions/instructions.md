# Agent Operating Guide

## Purpose
This file is the entry point for agents working on this project. It defines how agents should plan, divide work, make decisions, and validate changes.

Read these files in this order before implementation:

1. `instructions/instructions.md` - agent workflow, roles, scope, and delivery rules
2. `instructions/techstack.md` - approved frameworks, libraries, and version policy
3. `instructions/structure.md` - expected repository layout and ownership boundaries
4. `instructions/infra.md` - Supabase, auth, storage, security, and backend services

## Project Identity
Product and workspace name: FinanceAI.

Product category: AI-assisted personal finance tracker.

Agents should treat FinanceAI as the canonical project name. Do not infer CRM, sales, or client outreach requirements from older folder names, editor history, or stale references.

## Product Goal
Build FinanceAI as an Expo application backed by Supabase that helps a user track personal finances across accounts, transactions, budgets, mortgage details, and reports.

The first usable version should support:

- Sign up, sign in, sign out, and password recovery
- User-owned financial data protected by Row Level Security
- Accounts, categories, and transactions
- Dashboard summaries for balance, income, expenses, and recent activity
- Mortgage calculator and amortization view
- Basic reporting by month and category
- CSV export

Later versions may add:

- Bank-linking integrations
- AI-assisted transaction categorization
- PDF report generation
- Scheduled reminders
- Shared household accounts

## Agent Roles

### Orchestrator Agent
Owns planning, sequencing, and integration.

Responsibilities:

- Break work into small deliverable tasks
- Keep implementation aligned with these instruction files
- Resolve conflicts between agents
- Maintain the MVP boundary
- Make sure each merged change has validation steps

### App Agent
Owns the Expo app, navigation, UI components, client state, and screen flows.

Responsibilities:

- Build screens under `app/`
- Build reusable components under `components/`
- Use feature modules from `features/`
- Keep forms validated with Zod and React Hook Form
- Keep server state in TanStack Query
- Keep client-only UI state in Zustand

### Data Agent
Owns Supabase schema, migrations, policies, seed data, generated types, and database access patterns.

Responsibilities:

- Create database migrations under `supabase/migrations/`
- Enable RLS on user-owned tables
- Write policies before exposing tables to the app
- Generate and commit database types
- Keep money values stored as integer minor units, not floating point

### Backend Agent
Owns Supabase Edge Functions and backend-only integrations.

Responsibilities:

- Build functions under `supabase/functions/`
- Keep service-role keys server-side only
- Handle PDF generation, AI categorization, scheduled jobs, and webhooks
- Validate input at function boundaries
- Return typed, predictable responses to the app

### Feature Agent
Owns a single product domain at a time, such as transactions, mortgage, reports, auth, or settings.

Responsibilities:

- Work inside the matching `features/<feature>/` folder
- Keep feature-specific components, hooks, schemas, queries, and utilities together
- Add or update tests for changed behavior
- Avoid leaking feature-specific logic into shared folders

### QA Agent
Owns quality, regression checks, accessibility, and test coverage.

Responsibilities:

- Review acceptance criteria before testing
- Run lint, typecheck, unit tests, and focused integration tests
- Add regression tests for bugs
- Check loading, empty, error, and offline-ish states
- Verify mobile screen sizes and basic accessibility labels

### DevOps Agent
Owns local setup, CI, build configuration, environment files, and release hygiene.

Responsibilities:

- Maintain package scripts
- Maintain GitHub Actions or equivalent CI
- Keep `.env.example` accurate
- Keep secrets out of Git
- Configure EAS only when the app is ready for device builds

### Docs Agent
Owns developer-facing documentation.

Responsibilities:

- Keep these instruction files current when architecture changes
- Update README setup steps
- Document commands and environment variables
- Record known limitations and future work

## Source Of Truth Rules

- If implementation and docs disagree, inspect the code first, then update the docs or code in the same task.
- If two instruction files disagree, follow this precedence: `instructions.md`, `techstack.md`, `structure.md`, then `infra.md`.
- If a new library is needed, update `techstack.md` with the reason.
- If a new folder pattern is needed, update `structure.md`.
- If a new backend service, environment variable, table, policy, bucket, or function is needed, update `infra.md`.

## Engineering Rules

- Use TypeScript in strict mode.
- Prefer Expo-managed libraries where possible.
- Do not put secrets in client code or committed files.
- Do not use Supabase service-role keys in the app.
- Do not expose user financial data without RLS.
- Do not store money as JavaScript floating-point values in the database.
- Use migrations for schema changes.
- Keep features small enough to review.
- Build loading, empty, error, and success states for user-facing flows.
- Prefer boring, explicit code over clever abstractions.

## Delivery Workflow

For each task:

1. Restate the goal in one or two sentences.
2. Identify the owning agent role.
3. Check the relevant instruction files.
4. Make the smallest coherent change.
5. Add or update tests when behavior changes.
6. Run the relevant validation commands.
7. Summarize changed files, validation, and follow-up work.

## MVP Build Sequence

### Phase 0: Project Foundation
- Confirm the product identity.
- Scaffold the Expo TypeScript app.
- Add formatting, linting, typecheck, and test scripts.
- Add environment examples.

### Phase 1: App Shell
- Add Expo Router layouts.
- Add auth and app route groups.
- Add base UI primitives and screen layout components.
- Add app providers for Supabase, TanStack Query, and theme.

### Phase 2: Supabase Foundation
- Initialize Supabase.
- Add initial schema migrations.
- Add RLS policies.
- Add seed data for local development.
- Generate database types.

### Phase 3: Auth
- Implement signup, login, logout, session restore, and password recovery.
- Protect authenticated routes.
- Add profile creation flow.

### Phase 4: Transactions
- Implement accounts, categories, and transactions.
- Add transaction list, filters, create, edit, and delete.
- Add dashboard summaries.

### Phase 5: Mortgage
- Add mortgage records.
- Add calculator and amortization schedule.
- Add what-if extra payment scenarios.

### Phase 6: Reports And Export
- Add monthly income/expense charts.
- Add category breakdown.
- Add CSV export.

### Phase 7: Hardening
- Add regression tests.
- Tighten error states.
- Review security policies.
- Prepare CI and build pipeline.

## Task Prompt Template

Use this when assigning work to an agent:

```markdown
Role:
Goal:
Relevant docs:
Files or folders owned:
Acceptance criteria:
Validation commands:
Out of scope:
```

## Definition Of Done

A task is done when:

- The code or docs satisfy the stated acceptance criteria. As determined not by AI, meaning I must be asked if a task is complete first
- Relevant tests, lint, and typecheck pass or documented blockers are explained.
- No unrelated files were changed.
- Secrets were not committed.
- Any changed architecture is reflected in the instruction docs.
- No failed tests
