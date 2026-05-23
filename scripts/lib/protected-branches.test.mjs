import { describe, expect, it } from 'vitest';

import {
  getBranchNameFromRef,
  getProtectedPushes,
  isProtectedBranchBypassEnabled,
  parsePushUpdates,
} from './protected-branches.mjs';

describe('protected branch push rules', () => {
  it('extracts branch names from git refs', () => {
    expect(getBranchNameFromRef('refs/heads/main')).toBe('main');
    expect(getBranchNameFromRef('refs/tags/v1.0.0')).toBeNull();
  });

  it('parses pre-push input lines', () => {
    expect(parsePushUpdates('refs/heads/feature abc123 refs/heads/develop def456\n')).toMatchObject(
      [
        {
          localRef: 'refs/heads/feature',
          remoteRef: 'refs/heads/develop',
          remoteBranch: 'develop',
        },
      ],
    );
  });

  it('flags pushes to protected branches', () => {
    expect(
      getProtectedPushes(`
refs/heads/feature abc123 refs/heads/main def456
refs/heads/feature abc123 refs/heads/release def456
`),
    ).toHaveLength(1);
  });

  it('allows explicit local bypasses', () => {
    expect(isProtectedBranchBypassEnabled({ ALLOW_PROTECTED_BRANCH_PUSH: '1' })).toBe(true);
    expect(isProtectedBranchBypassEnabled({ ALLOW_PROTECTED_BRANCH_PUSH: 'true' })).toBe(true);
    expect(isProtectedBranchBypassEnabled({})).toBe(false);
  });
});
