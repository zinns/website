import { describe, expect, it } from 'vitest';

import { extractMarkdownSection, renderProductionReleaseBody } from './release-body.mjs';

describe('release body helpers', () => {
  it('extracts the release notes draft without copying the full PR template', () => {
    const body = `# Release Candidate PR

## Validation

- [x] pnpm validate

## Release notes draft

<!-- Human-readable summary for the production release PR. -->

Release automation hotfix.

## Extra

This should not be copied.`;

    expect(extractMarkdownSection(body, 'Release notes draft')).toBe('Release automation hotfix.');
  });

  it('renders a focused production release body', () => {
    const template = `# Production Release PR

## Release

- Version: \`v0.0.0\`
- Source release candidate PR:
- Version label used:

## Merge strategy

- [ ] Squash commit title is \`Release 📦 v0.0.0\`

## Release notes

<!-- Final release notes copied from the release candidate PR and automation output. -->`;

    const body = renderProductionReleaseBody({
      branch: 'production-release/v1.2.3',
      sourcePullRequest: {
        number: 42,
        body: `## Release notes draft

Clean release notes only.

## Validation

- [x] CI`,
      },
      template,
      title: 'Release 📦 v1.2.3',
      version: '1.2.3',
      versionLabel: 'version:minor',
    });

    expect(body).toContain('- Version: `v1.2.3`');
    expect(body).toContain('- Source release candidate PR: #42');
    expect(body).toContain('`Release 📦 v1.2.3`');
    expect(body).toContain('Clean release notes only.');
    expect(body).not.toContain('## Validation');
  });
});
