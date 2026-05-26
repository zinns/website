import { describe, expect, it } from 'vitest';

import {
  filterReleaseCandidateCommits,
  isReleaseCandidateChange,
  renderIncludedChanges,
  renderReleaseCandidateBody,
} from './release-candidate-body.mjs';

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

  it('filters production release commits from release-candidate changes', () => {
    expect(isReleaseCandidateChange({ summary: 'Release 📦 v0.4.0' })).toBe(false);
  });

  it('filters post-release sync commits from release-candidate changes', () => {
    expect(
      isReleaseCandidateChange({
        summary: 'chore(sync): merge v0.4.0 into develop (#58) (#59)',
      }),
    ).toBe(false);
  });

  it('keeps real develop changes in release-candidate scope', () => {
    expect(
      filterReleaseCandidateCommits([
        {
          shortSha: 'aaa1111',
          summary: 'Release 📦 v0.4.0',
        },
        {
          shortSha: 'bbb2222',
          summary: 'fix(release): skip sync-only candidate PRs (#61)',
        },
      ]),
    ).toEqual([
      {
        shortSha: 'bbb2222',
        summary: 'fix(release): skip sync-only candidate PRs (#61)',
      },
    ]);
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
