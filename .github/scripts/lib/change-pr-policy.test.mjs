import { describe, expect, it } from 'vitest';

import { validateChangePullRequest } from './change-pr-policy.mjs';

function pullRequest({ base = 'develop', head = 'issue-44-governance', labels = [] } = {}) {
  return {
    base: { ref: base },
    head: { ref: head },
    labels: labels.map(name => ({ name })),
  };
}

function commit(message) {
  return {
    commit: {
      message,
    },
  };
}

describe('change PR policy', () => {
  it('accepts approved issue branches with issue-referenced commits', () => {
    expect(
      validateChangePullRequest(pullRequest({ labels: ['type:task', 'status:approved'] }), [
        commit('docs(repo): document governance (#44)'),
      ]),
    ).toEqual([]);
  });

  it('requires issue branch names for human work', () => {
    expect(
      validateChangePullRequest(pullRequest({ head: 'feature/governance', labels: ['type:task'] })),
    ).toContain('Human work branches must use issue-123-short-description naming.');
  });

  it('requires approved status before merge', () => {
    expect(validateChangePullRequest(pullRequest({ labels: ['type:task'] }))).toContain(
      'PRs to develop must include status:approved before merge.',
    );
  });

  it('allows sync branches without an issue ID but still requires approval labels', () => {
    expect(
      validateChangePullRequest(
        pullRequest({ head: 'sync/develop-v1.2.3', labels: ['type:release'] }),
      ),
    ).toContain('PRs to develop must include status:approved before merge.');
  });

  it('skips release commits when validating issue references', () => {
    expect(
      validateChangePullRequest(pullRequest({ labels: ['type:task', 'status:approved'] }), [
        commit('Release 📦 v1.2.3'),
      ]),
    ).toEqual([]);
  });
});
