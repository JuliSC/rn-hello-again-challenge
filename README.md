# Hello Again Loyalty App

React Native Expo take-home challenge: a loyalty app backed by the [Hello Again demo API](https://api.demo.helloagain.at). See `candidatechallenge-reactnative.md` for the full API spec and acceptance criteria.

## Overview

The app implements the required loyalty flow:

1. **Login** with email and password
2. **Home** showing points (customer relationship), profile details, and available bounties
3. **QR scan** to redeem a coupon code and earn points
4. **Redeem bounties** from the rewards list

Auth tokens are persisted with `expo-secure-store` and sent as `Authorization: Token <token>` on authenticated requests.

## Architecture

```
src/
├── app/              # Expo Router screens (index, home, coupon-qr-scanner, redeem-coupon-result)
├── features/         # Domain modules: auth, profile, customer-relationships, bounties, coupons
│   └── */api         # Endpoint calls
│   └── */hooks       # TanStack Query hooks (queries + mutations)
│   └── */views       # Feature UI components
├── api/              # Shared fetch client, endpoints, types
├── storage/          # Token storage abstraction
├── constants/        # API config, theme tokens
└── hooks/            # Shared hooks (theme, color scheme)
```

- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) file-based navigation with typed routes
- **Data layer:** TanStack React Query for server state; a thin `createApiClient` wrapper around `fetch`
- **UI:** Shared `PrimaryButton` and `TextField` components; light/dark theme via `useTheme`

The home screen loads customer relationship, profile, and bounties in parallel. Coupon redemption is a two-step flow: scan QR → navigate to result screen → POST redeem. Bounty redemption shows a temporary success banner.

## Setup

**Prerequisites:** Node.js, iOS Simulator or Android emulator, and an [Expo development build](https://docs.expo.dev/develop/development-builds/introduction/)

```bash
npm install
```

Create a `.env` file with:

```
EXPO_PUBLIC_API_URL=https://api.demo.helloagain.at
EXPO_PUBLIC_API_CLIENT_ID=753d6b63-dc6b-4b28-83fc-6ead93660958
```

Test credentials: `testUser@dev.null` / `challenge-2026`. QR test code: `YFQY2D`.

```bash
npm start          # Expo dev server
npm run ios        # Run on iOS
npm run android    # Run on Android
npm run lint       # ESLint
npm run prebuild   # Generate native projects (CNG)
```

## Development Process

### Tools Used

**Development:** VS Code (primary IDE), Android Studio (Android emulator), Xcode (iOS simulator), Expo Development Builds

**AI assistance:** ChatGPT, Cursor, GitHub Copilot

**Libraries:** Expo SDK 57, React Native, TypeScript, Expo Router, TanStack Query, Expo Camera, Expo Secure Store

**Workflow:** Git with Conventional Commits for a consistent and reviewable commit history.

### Skills Demonstrated

React Native and Expo development, TypeScript, API integration, feature-based architecture, secure authentication, server-state management with TanStack Query, mobile navigation, QR code scanning, environment configuration, and mobile application design tradeoffs.

### Architectural Decisions

**Feature-based structure** — Chosen over layer-based layout for clarity and easier debugging, refactoring, and extension. Each feature co-locates API calls, hooks, and views; `app/` handles routing only.

**Functional API client** — A factory-based client (`createApiClient`) was chosen over a class-based implementation to align with React's functional style, reduce boilerplate, avoid implicit state, and make dependencies easier to pass and mock.

**Shared API client** — Centralizes authentication header injection and provides a consistent pattern for all endpoint integrations.

**TanStack Query** — Manages server state with caching, loading states, mutations, and refetching. Prior RTK Query experience allowed rapid implementation.

**Expo Router** — File-based routing reduces navigation boilerplate and improves project structure. Being part of the Expo ecosystem reduces integration risk.

**Expo Secure Store** — Provides encrypted token persistence between app launches, with better Expo ecosystem compatibility than alternatives such as AsyncStorage.

**Environment variables** — API URL and Client ID are externalized via `EXPO_PUBLIC_*` variables to avoid hardcoded configuration and support different deployment environments.

**Expo Development Builds** — Used instead of Expo Go for native camera access via Continuous Native Generation (CNG).

**Expo Camera** — Satisfies QR scanning requirements with direct Expo integration. Prior experience with the library reduced implementation risk.

**Prioritization** — UI was intentionally kept simple. Most implementation time was spent on architecture, API integration, feature completeness, and overall code quality rather than visual polish or automated testing.

### Testing Approach

No automated tests were implemented. Manual validation on iOS Simulator and Android Emulator covered authentication, profile and customer relationship retrieval, bounty listing and redemption, QR scanning, and coupon redemption.

### AI Assistance

AI tools were primarily used as a technical sounding board for architecture discussions, library selection, implementation research, documentation assistance, and code scaffolding. Generated code was reviewed before use and adapted to the needs of the project. Final architectural decisions and implementation details were made manually.

Representative prompts:

1. _"You are a React Native + Expo specialist up to date with latest best practices as of 2026... I need to create an API client for this challenge. Keep it simple and do not over-engineer."_
2. _"Can you compare a functional API client versus a class-based API client for this React Native Expo project?"_
3. _"I already have these colors for my scheme. Can you complete the theme by suggesting primary, secondary, tertiary and supporting colors?"_

## Future Improvements

Given additional time, I would focus on:

- Improving the overall UI and visual polish.
- Adding runtime validation of API responses to better protect against unexpected backend changes.
- Expanding error handling and user-facing feedback for network and API failures.
- Extracting additional reusable UI components as patterns emerge.
- Adding automated test coverage for critical user flows.
