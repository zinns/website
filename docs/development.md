# Development

## Requirements

- Node.js latest active LTS from `.nvmrc` (`lts/*`)
- pnpm `11.1.3`

Use Corepack so the package manager version from `package.json` is respected:

```bash
corepack pnpm install
```

Use the Node version declared in `.nvmrc` before installing dependencies:

```bash
nvm install
nvm use
```

## Local Server

```bash
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm validate
```

`corepack pnpm validate` runs the full local gate:

- Prettier format check
- ESLint with zero warnings
- TypeScript typecheck
- Vitest
- Next.js production build

## Hooks

Husky is configured by the `prepare` script.

- `pre-commit`: formats and lints staged JS, TS, CSS, SCSS, docs, and config files, then runs
  TypeScript and Vitest.
- `commit-msg`: requires a conventional commit header with a GitHub issue reference in the first
  line.
- `pre-push`: blocks direct pushes to `main` and `develop`, then runs the full validation gate.

Valid commit example:

```bash
git commit -m "feat(site): add homepage content (#123)"
```

## Important Paths

- `src/app/page.tsx`: single public homepage
- `src/app/content.ts`: bilingual page content
- `src/app/api/contact/route.ts`: contact form API
- `src/app/globals.css`: Tailwind import and brand tokens
- `public/brand/isologo.png`: brand isologo used by the homepage
