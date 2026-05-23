export const PROTECTED_BRANCHES = ['main', 'develop'];

export function getBranchNameFromRef(ref = '') {
  return ref.startsWith('refs/heads/') ? ref.slice('refs/heads/'.length) : null;
}

export function parsePushUpdates(input = '') {
  return input
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [localRef, localSha, remoteRef, remoteSha] = line.split(/\s+/);

      return {
        localRef,
        localSha,
        remoteRef,
        remoteSha,
        remoteBranch: getBranchNameFromRef(remoteRef),
      };
    });
}

export function getProtectedPushes(input = '', protectedBranches = PROTECTED_BRANCHES) {
  const protectedBranchSet = new Set(protectedBranches);

  return parsePushUpdates(input).filter(({ remoteBranch }) =>
    remoteBranch ? protectedBranchSet.has(remoteBranch) : false,
  );
}

export function isProtectedBranchBypassEnabled(env = process.env) {
  return env.ALLOW_PROTECTED_BRANCH_PUSH === '1' || env.ALLOW_PROTECTED_BRANCH_PUSH === 'true';
}
