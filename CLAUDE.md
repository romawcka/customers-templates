# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build          # Compile library to dist/ (ES + CJS + type declarations)
npm run dev            # Start Storybook dev server on port 6006
npm run storybook      # Same as dev
npm run lint           # ESLint (TypeScript + react-hooks + react-refresh + prettier)
npm run format         # Prettier write
npm run typecheck      # tsc --noEmit
npm run build-storybook # Build static Storybook to storybook-static/
```

There is no test runner configured; `lint` and `typecheck` are the main correctness checks.

## Architecture

- Feature-Sliced Design: app / pages / widgets / features / entities / shared

- Components functional only, with no class

## Rules

- TypeScript strict: no `any`, use `unknown` or explicit types.

- Naming:
  - Component names use PascalCase.
  - Hooks use `useXxx`.
  - Utilities use camelCase.

- React components must be functional components only. Class components are forbidden.

- React components + all functions must always be declared as `const` arrow functions:

  ```tsx
  const ComponentName = (props: ComponentNameProps) => <div></div>;
  ```
