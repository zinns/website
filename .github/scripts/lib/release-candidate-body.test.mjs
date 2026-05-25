import { describe, expect, it } from 'vitest';

import { renderIncludedChanges, renderReleaseCandidateBody } from './release-candidate-body.mjs';

describe('release candidate body helpers', () => {
  it('renders included changes from commit summaries', () => {
    expect(
      renderIncludedChanges([
        {
          shortSha: 'abc1234',
          summary: 'feat(site): add homepage (#44)',
        },
      ]),
    ).toContain('| `abc1234` | feat(site): add homepage (#44) | #44 |');
  });

  it('renders an empty-state message when no changes are found', () => {
    expect(renderIncludedChanges([])).toBe('No changes detected between `release` and `develop`.');
  });

  it('injects included changes into the release candidate template', () => {
    const body = renderReleaseCandidateBody({
      includedChanges: '- change one',
      sourceSha: 'abc123',
      template: `# Release Candidate PR

## Release scope

<!-- Summarize what has changed since the last release branch update. -->`,
      workflow: 'Release Candidate PR',
    });

    expect(body).toContain('- change one');
    expect(body).toContain('Source SHA: `abc123`');
  });
});
