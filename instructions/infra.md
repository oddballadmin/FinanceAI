# Infrastructure And Services

## Purpose
This file defines the backend, cloud services, security model, and environment rules for the project.

## Infrastructure Summary
- Backend platform: Supabase
- Database: Supabase-managed PostgreSQL
- Auth: Supabase Auth
- File storage: Supabase Storage
- Serverless functions: Supabase Edge Functions
- Realtime: Supabase Realtime where product value justifies it
- AI integrations: backend-only through Edge Functions

## Supabase Database

### Extensions
Enable only what the project uses.

Recommended starting extensions:

- `pgcrypto` for UUID generation with `gen_random_uuid()`
- `pg_stat_statements` for query performance visibility

Consider later:

- `pg_cron` for scheduled database tasks, if the Supabase plan and project needs support it
- `uuid-ossp` only if a migration specifically needs it

### Core Tables
The initial schema should cover:

- `profiles`
- `accounts`
- `categories`
- `transactions`
- `mortgages`
- `mortgage_payments`
- `budgets`
- `report_exports`

General table rules:

- Use `id uuid primary key default gen_random_uuid()`.
- Use `user_id uuid not null references auth.users(id)`.
- Add `created_at timestamptz not null default now()`.
- Add `updated_at timestamptz not null default now()` where records are editable.
- Store money as integer minor units, such as cents.
- Store currency as an ISO currency code.
- Prefer explicit constraints over app-only validation.

## Authentication

Provider: Supabase Auth.

Supported MVP methods:

- Email and password
- Password recovery
- Email verification if enabled for the project

Possible later methods:

- Magic links
- Google OAuth
- Apple OAuth
- MFA

Rules:

- Do not build custom authentication.
- Do not store Supabase service-role keys in the app.
- Protect app routes based on the Supabase session.
- Create or update a `profiles` row after signup.

## Row Level Security

RLS is mandatory for every user-owned table.

Minimum policy pattern:

```sql
alter table transactions enable row level security;

create policy "Users can view own transactions"
on transactions
for select
using (auth.uid() = user_id);

create policy "Users can insert own transactions"
on transactions
for insert
with check (auth.uid() = user_id);

create policy "Users can update own transactions"
on transactions
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own transactions"
on transactions
for delete
using (auth.uid() = user_id);
```

Rules:

- Enable RLS before the app reads or writes a table.
- Keep policies simple for MVP.
- Shared household accounts require a membership table and explicit permission checks.
- Service-role access is allowed only in backend jobs or Edge Functions.

## Storage

Use Supabase Storage for:

- Receipt images
- Financial statement PDFs
- Generated exports

Recommended buckets:

- `receipts`
- `statements`
- `exports`

Rules:

- Buckets should be private by default.
- Storage paths should include the user id, such as `{user_id}/receipts/{file_id}.jpg`.
- Storage access should be protected with policies.
- Validate file type and size before upload.
- Keep the MVP upload limit at 10 MB unless a specific use case requires more.

## Edge Functions

Use Edge Functions for backend-only work:

- AI transaction categorization
- PDF report generation
- Scheduled reminders
- Webhook handlers
- Heavy calculations that should not run on device

Rules:

- Validate every request body.
- Never trust client-provided `user_id`; derive identity from the authenticated request where possible.
- Keep service-role operations narrow and auditable.
- Return typed JSON responses.
- Store API keys as function secrets.

## Realtime

Use Realtime sparingly.

Good candidates:

- Live balance updates across signed-in devices
- Transaction updates after import jobs
- Shared account updates after household sharing exists

Avoid Realtime for MVP screens that can refresh through TanStack Query invalidation.

## Environment Variables

Client-safe values:

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Server-only values:

```text
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

Rules:

- Put real values in `.env.local` or deployment secrets.
- Commit only `.env.example`.
- Prefix only truly public client values with `EXPO_PUBLIC_`.
- Never expose service-role keys to Expo.

## Local Development

Recommended local flow:

1. Start Supabase locally with the Supabase CLI.
2. Apply migrations.
3. Seed development data.
4. Generate database types.
5. Start the Expo dev server.

Expected scripts once scaffolded:

```json
{
  "scripts": {
    "dev": "expo start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "supabase:start": "supabase start",
    "supabase:types": "supabase gen types typescript --local > lib/supabase/database.types.ts"
  }
}
```

## Backups And Recovery

Production expectations:

- Supabase automatic backups enabled according to plan.
- Point-in-time recovery enabled before storing real financial data, if available.
- Manual export process documented before launch.

## Security Checklist

Before handling real user financial data:

- RLS enabled on every user-owned table.
- Policies tested for cross-user access.
- Storage buckets private.
- No service-role key in app bundle.
- `.env.local` ignored by Git.
- Error messages do not leak secrets or internal SQL details.
- AI and PDF functions validate input and authorization.
