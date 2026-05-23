import { isReleaseTitle } from './semver.mjs';
import { isProductionReleaseBranch } from './release-branches.mjs';

const PROTECTED_PR_BRANCHES = ['develop', 'release', 'main'];

export function validatePullRequestBranchPolicy(pullRequest) {
  const base = pullRequest.base.ref;
  const head = pullRequest.head.ref;
  const title = pullRequest.title;

  if (base === 'develop' && PROTECTED_PR_BRANCHES.includes(head)) {
    return [`PRs to develop must come from a work branch, not ${head}.`];
  }

  if (base === 'release' && head !== 'develop' && !head.startsWith('release-candidate/')) {
    return ['Release candidate PRs must come from develop or a release-candidate/* branch.'];
  }

  if (base === 'main') {
    const errors = [];

    if (!isProductionReleaseBranch(head)) {
      errors.push('Production PRs to main must come from a production-release/vX.Y.Z branch.');
    }

    if (!isReleaseTitle(title)) {
      errors.push('Production PR titles must match Release 📦 vX.Y.Z.');
    }

    return errors;
  }

  return [];
}

export function validatePushBranchPolicy(event) {
  const branch = event.ref?.replace('refs/heads/', '');
  const message = event.head_commit?.message?.split(/\r?\n/, 1)[0] ?? '';

  if (branch === 'main' && !isReleaseTitle(message)) {
    return ['Pushes to main must contain a release commit titled Release 📦 vX.Y.Z.'];
  }

  return [];
}
