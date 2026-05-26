import { describe, expect, it } from 'vitest';

import {
  getDevelopSideReleaseCandidateConflictFiles,
  getUnsupportedReleaseCandidateConflictFiles,
  resolvePackageJsonForReleaseCandidate,
} from './release-candidate-merge.mjs';

const releasePackageJson = {
  name: 'website',
  version: '0.4.0',
  private: true,
  dependencies: {
    next: '16.2.6',
    react: '19.2.6',
  },
};

describe('release candidate merge helpers', () => {
  it('keeps the release branch version while adopting develop package changes', () => {
    expect(
      resolvePackageJsonForReleaseCandidate(releasePackageJson, {
        ...releasePackageJson,
        version: '0.4.1',
        dependencies: {
          next: '16.2.6',
          react: '19.2.7',
        },
      }),
    ).toEqual({
      ...releasePackageJson,
      version: '0.4.0',
      dependencies: {
        next: '16.2.6',
        react: '19.2.7',
      },
    });
  });

  it('rejects package.json conflicts without both versions', () => {
    expect(() => resolvePackageJsonForReleaseCandidate({}, releasePackageJson)).toThrow(
      'package.json conflict cannot be resolved',
    );
  });

  it('classifies release-candidate automation conflicts as safe to take from develop', () => {
    expect(
      getDevelopSideReleaseCandidateConflictFiles([
        '.github/scripts/create-release-candidate-pr.mjs',
        'docs/github-workflow.md',
        'docs/release-automation-strategy.md',
        'package.json',
        'src/app/page.tsx',
      ]),
    ).toEqual([
      '.github/scripts/create-release-candidate-pr.mjs',
      'docs/github-workflow.md',
      'docs/release-automation-strategy.md',
    ]);
  });

  it('allows package.json but rejects unrelated release-candidate conflicts', () => {
    expect(
      getUnsupportedReleaseCandidateConflictFiles([
        '.github/scripts/create-release-candidate-pr.mjs',
        'package.json',
        'src/app/page.tsx',
      ]),
    ).toEqual(['src/app/page.tsx']);
  });
});
