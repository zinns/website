# Agent Instructions

## Code Organization

- Keep Next.js `route.ts` files thin. They should parse HTTP requests, select response statuses, and
  delegate route-specific logic.
- Move single-route validation, normalization, environment mapping, and provider payload builders to
  a colocated `*.utils.ts` file beside the route.
- Do not create broad `utils` or `helpers` folders for code with only one consumer.
- Promote helper code to `src/lib/<domain>/` only after it has a second real consumer.

## Documentation

- Update `docs/development.md` when adding or changing project structure conventions.
- Update feature-specific docs when moving code that affects documented behavior.
