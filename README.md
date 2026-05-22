# Zinns Website

This repository is the blank baseline for the Zinns website.

The current state is intentionally small:

- latest stable Next.js stack
- `pnpm` package migration
- no automations
- no GitHub workflows
- minimal placeholder UI until the design direction is defined

## Stack

- Next.js `16.2.6`
- React `19.2.6`
- Tailwind CSS `4.3.0`
- TypeScript `6.0.3`
- pnpm `11.1.3`

## Getting Started

Install dependencies:

```bash
corepack pnpm install
```

Start the development server:

```bash
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
corepack pnpm dev
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm validate
corepack pnpm check
```

## Commit Rules

Commits must follow conventional commit format and include a GitHub issue reference in the first
line.

Example:

```text
feat(site): define homepage direction (#123)
```

Accepted issue references:

- `#123`
- `GH-123`
- `owner/repo#123`
- closing keywords in the first line, such as `fixes #123` or `closes #123`

## Local Hooks

- `pre-commit`: formats and lints staged JS, TS, CSS, and SCSS files, then runs TypeScript and Vitest
- `commit-msg`: validates the conventional header and required GitHub issue reference
- `pre-push`: blocks direct pushes to `main` and `develop`, then runs ESLint, TypeScript, Vitest, and
  the production build

The hook output is intentionally step-based and colorized so failures are easy to spot.

## GitHub Workflow

Branching, PR templates, issue templates, labels, and the planned release automation contract are
defined in [docs/github-workflow.md](docs/github-workflow.md).

## Notes

- The app is intentionally blank.
- Design, palette, routes, auth, database, and automations will be added later.
