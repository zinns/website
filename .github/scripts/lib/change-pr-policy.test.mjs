import { describe, expect, it } from 'vitest';

import { validateChangePullRequest } from './change-pr-policy.mjs';

function pullRequest({
  base = 'develop',
  head = 'issue/44/governance',
  labels = [],
  title = 'docs(repo): document governance (#44)',
  body = 'Closes #44',
} = {}) {
  return {
    base: { ref: base },
    head: { ref: head },
    title,
    body,
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
  it('accepts approved slash issue branches with issue-referenced commits', () => {
    expect(
      validateChangePullRequest(pullRequest({ labels: ['type:task', 'status:approved'] }), [
        commit('docs(repo): document governance (#44)'),
      ]),
    ).toEqual([]);
  });

  it('accepts legacy dash issue branches with issue-referenced commits', () => {
    expect(
      validateChangePullRequest(
        pullRequest({ head: 'issue-44-governance', labels: ['type:task', 'status:approved'] }),
        [commit('docs(repo): document governance (#44)')],
      ),
    ).toEqual([]);
  });

  it('accepts conventional branches when the PR and commits reference an issue', () => {
    expect(
      validateChangePullRequest(
        pullRequest({ head: 'feat/governance', labels: ['type:task', 'status:approved'] }),
        [commit('feat(repo): document governance (#44)')],
      ),
    ).toEqual([]);
  });

  it('requires supported branch names for human work', () => {
    expect(
      validateChangePullRequest(pullRequest({ head: 'feature/governance', labels: ['type:task'] })),
    ).toContain(
      'Human work branches must use issue/123/short-description, issue-123-short-description, or conventional naming like feat/short-description.',
    );
  });

  it('requires human work PRs to reference an issue in the title or body', () => {
    expect(
      validateChangePullRequest(
        pullRequest({
          head: 'feat/governance',
          labels: ['type:task', 'status:approved'],
          title: 'feat(repo): document governance',
          body: '',
        }),
        [commit('feat(repo): document governance (#44)')],
      ),
    ).toContain('Human work PRs must reference a GitHub issue in the PR title or body.');
  });

  it('requires issue branches to reference the branch issue in the PR title or body', () => {
    expect(
      validateChangePullRequest(
        pullRequest({
          labels: ['type:task', 'status:approved'],
          title: 'docs(repo): document governance (#45)',
          body: 'Closes #45',
        }),
        [commit('docs(repo): document governance (#44)')],
      ),
    ).toContain('Human work PRs must reference branch issue #44 in the PR title or body.');
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
        commit('Release v0.2.6 (#21)'),
      ]),
    ).toEqual([]);
  });

  it('requires commits on issue branches to reference the branch issue', () => {
    expect(
      validateChangePullRequest(pullRequest({ labels: ['type:task', 'status:approved'] }), [
        commit('docs(repo): document governance (#45)'),
      ]),
    ).toContain('Commit must reference linked issue #44: docs(repo): document governance (#45)');
  });
});
