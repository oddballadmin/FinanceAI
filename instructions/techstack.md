# Technology Stack

## Purpose
This file defines the approved technology choices for the project. Agents should treat this as the dependency boundary unless a task explicitly updates the stack.

## Version Policy
- Prefer the current stable Expo SDK at the time the project is scaffolded.
- Pin exact dependency versions in `package.json` after installation.
- Do not rely on stale version numbers in docs. If a library has compatibility requirements, verify them before installing.
- Use Node LTS for local development and CI.
- Use npm unless the project intentionally switches package managers.

## Core App
- Framework: Expo with React Native and TypeScript
- Navigation: Expo Router
- Platforms: iOS, Android, web, and desktop packaging where practical
- Language: TypeScript in strict mode
- Styling: NativeWind with a small shared design token layer
- Icons: `lucide-react-native` unless a platform-specific icon is required

## Web And Desktop
- Web: Expo Router web through the shared `app/` route tree
- Desktop: package the Expo web build with a desktop shell when the app shell is stable
- Desktop shell choice: decide later between Tauri and Electron based on native integration needs
- Rule: do not fork business logic, data access, or feature UI for desktop unless a platform-specific requirement forces it

## State And Data
- Server state: TanStack Query
- Local UI/preferences state: Zustand
- Forms: React Hook Form
- Validation: Zod
- Dates: `date-fns`
- Money: store integer minor units in the database; format with shared currency helpers

## Backend
- Backend platform: Supabase
- Database: Supabase PostgreSQL
- Auth: Supabase Auth
- File storage: Supabase Storage
- Realtime: Supabase Realtime only for flows that truly need live updates
- Serverless: Supabase Edge Functions with Deno and TypeScript

## Local Persistence
- Supabase auth storage: use the recommended React Native storage adapter for the installed Supabase version.
- Secure values: Expo SecureStore when needed.
- Non-sensitive app cache/preferences: MMKV or Zustand persistence.

## UI And Visualization
- Base components: local components in `components/ui`
- Charts: use a React Native charting library verified against the installed Expo SDK before adoption
- Animations: React Native Reanimated where animation improves comprehension
- Camera and file picking: Expo Camera and Expo Image Picker
- Files: Expo FileSystem
- Notifications: Expo Notifications

## Testing
- Unit tests: Jest
- Component tests: React Native Testing Library
- Integration tests: focused tests around auth, Supabase calls, and feature flows
- E2E tests: Maestro or another mobile-friendly runner once the app shell is stable

## Tooling
- Formatting: Prettier
- Linting: ESLint
- Git hooks: Husky with lint-staged, only after baseline scripts are stable
- CI: GitHub Actions or equivalent
- Supabase CLI: local database, migrations, functions, and generated types

## AI Integration
AI features are optional and must stay backend-mediated.

Rules:

- Do not call AI APIs directly from the mobile app.
- Store API keys only in Supabase function secrets or deployment secrets.
- Validate and log AI outputs defensively.
- AI categorization must be user-confirmable before it mutates financial records.

## Dependency Decision Rules
- Add a dependency only when it removes real complexity or provides platform functionality.
- Prefer Expo-supported packages for native functionality.
- Avoid adding overlapping libraries for the same job.
- Update this file when introducing a new major dependency.
