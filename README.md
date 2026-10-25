# Rahat Ye – Quick Meal & Symptom Log

A proof of concept for the "Quick Meal & Symptom Log" module of Rahat Ye, an app that helps users in Turkey track meals and find foods that trigger digestive discomfort. Built with React Native (Expo) and TypeScript, with an offline-first approach.

## Demo

> Add the screen recording or GIF here, for example: `![Demo](docs/demo.gif)`

## Features

- Meal form: meal name, category, trigger tags, symptoms, and severity (1–5)
- Validation: the save button stays disabled until the meal name and severity are valid, with an inline error message
- Offline-first saving: every entry is stored on the device first, then sent to a mock API
- Mock API: 1.5 second latency and 10% random failure, with a loading indicator, success message, and retry
- History screen: entries sorted newest first, with a sync status on each card and a retry button for unsent entries
- Light and dark mode that follows the phone's system setting
- Unit tests for the validation, list, and label helpers

## Setup

Requirements: Node.js (LTS) and the Expo Go app on your phone.

```bash
npm install
npx expo start
```

Scan the QR code with your phone camera (iOS) or the Expo Go app (Android). The phone and the computer must be on the same network.

Other commands:

```bash
npm test             # run unit tests
npx tsc --noEmit     # type check
```

## Project structure

```
src/
  components/   reusable UI parts (Chip, PrimaryButton, EntryCard)
  constants/    option lists shown in the form
  screens/      LogScreen, HistoryScreen
  services/     mock API
  store/        Zustand store with persistence
  theme/        colors and ThemeProvider (light/dark)
  types/        TypeScript models
  utils/        validation, list and label helpers (with tests)
```

## Architecture and library choices

- **Expo + TypeScript:** the fastest way to run the app on a real phone with Expo Go, and TypeScript catches wrong values (for example a severity of 7) before the app runs.
- **Zustand instead of Redux Toolkit:** the app has one small piece of shared state (the list of entries), so Zustand needs far less code. Its `persist` middleware also gives local storage with a few lines. Redux Toolkit would make sense for a larger team and a bigger state.
- **AsyncStorage instead of MMKV:** AsyncStorage works inside Expo Go with no extra setup. MMKV is faster but needs a custom native build, which is more than this proof of concept needs.
- **Offline-first flow:** on save, the entry is written to the store (and therefore to the device) with `syncStatus: 'pending'` before any network call. The mock API result then updates it to `synced` or `failed`, so a failed request never loses the user's input.
- **Validation in `utils/`:** the rule lives in a pure function, separate from the screen, so it is easy to reuse and to unit test.
- **Severity has no default:** severity is the core data of the app, so a wrong default would pollute the log. The user must choose it. Category defaults to "home" because a wrong value there is harmless.
- **One `Chip` component:** category, trigger tags, symptoms, and severity all reuse it, so the look stays consistent.
- **`value` and `label` kept separate:** entries store short values (for example `dairy`), and labels are only used for display, so changing a label never breaks saved data.
- **Theme via React Context:** colors are defined once in `theme/colors.ts` and read through a `useTheme` hook, so light and dark mode need no per-screen logic.

## Known limitations and future improvements

- There is no real backend. The API is simulated and failures are random.
- Failed entries are retried manually. Next step: detect connectivity (for example with NetInfo) and sync automatically.
- Entry ids use `Date.now()`, which is enough for a proof of concept. A UUID would be safer.
- Entries cannot be edited or deleted yet.
- There is no "no discomfort" option, because the scale starts at 1.
- The interface is Turkish only. Next step: add localization.
- Possible next steps: switch to MMKV for speed, add charts that show which trigger tags appear most often, and add component tests.