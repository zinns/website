# Zinns Website

The company website for Zinns, a founder-led creative technology lab that builds customized digital
tools and helps people increase their technical abilities.

The current implementation is a small bilingual landing site on `/` with in-progress project
summaries and visible placeholder content for reviews and people until real company information is
approved.

## Quick Start

```bash
corepack pnpm install
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js `16.2.6`
- React `19.2.6`
- Tailwind CSS `4.3.0`
- TypeScript `6.0.3`
- pnpm `11.1.3`

## Main Scripts

```bash
corepack pnpm dev
corepack pnpm validate
corepack pnpm test
corepack pnpm build
```

## Documentation

- [Project Overview](docs/project-overview.md)
- [Development](docs/development.md)
- [Content Guide](docs/content-guide.md)
- [Contact Email](docs/contact-email.md)
- [Assets](docs/assets.md)
- [GitHub Workflow](docs/github-workflow.md)
- [Design System](docs/design-system.md)

## Current Scope

- Public bilingual `/` page only
- Local English and Spanish content dictionaries
- Contact form endpoint prepared for Resend email delivery
- GitHub templates, labels, local hooks, and release workflow automation
- No authentication, database, dashboard, CMS, or automation backend yet
