export const PRODUCTION_RELEASE_BRANCH_PREFIX = 'production-release/v';

export function getProductionReleaseBranch(version) {
  return `${PRODUCTION_RELEASE_BRANCH_PREFIX}${version}`;
}

export function isProductionReleaseBranch(branch = '') {
  return branch.startsWith(PRODUCTION_RELEASE_BRANCH_PREFIX);
}
