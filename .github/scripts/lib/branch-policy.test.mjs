import { describe, expect, it } from 'vitest';

import { validatePullRequestBranchPolicy, validatePushBranchPolicy } from './branch-policy.mjs';

function pullRequest(base, head, title = 'feat(repo): example (#123)') {
  return {
    base: { ref: base },
    head: { ref: head },
    title,
  };
}

describe('branch policy helpers', () => {
  it('allows work branches into develop', () => {
    expect(validatePullRequestBranchPolicy(pullRequest('develop', 'feature/homepage'))).toEqual([]);
  });

  it('requires develop to release PRs', () => {
    expect(validatePullRequestBranchPolicy(pullRequest('release', 'feature/homepage'))).toEqual([
      'Release candidate PRs must come from develop or a release-candidate/* branch.',
    ]);
  });

  it('allows manual release candidate branches into release', () => {
    expect(
      validatePullRequestBranchPolicy(pullRequest('release', 'release-candidate/bootstrap-v0.3.0')),
    ).toEqual([]);
  });

  it('requires generated production release PRs into main', () => {
    expect(
      validatePullRequestBranchPolicy(
        pullRequest('main', 'release/main-v1.2.3', 'chore(release): v1.2.3 (#44)'),
      ),
    ).toEqual([]);
  });

  it('requires release commit titles for direct main pushes', () => {
    expect(
      validatePushBranchPolicy({
        ref: 'refs/heads/main',
        head_commit: { message: 'feat(repo): bypass release (#99)' },
      }),
    ).toHaveLength(1);
  });
});
