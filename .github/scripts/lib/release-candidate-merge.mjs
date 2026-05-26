export const RELEASE_CANDIDATE_BRANCH = 'release-candidate/develop';

const PACKAGE_JSON_PATH = 'package.json';

const DEVELOP_SIDE_CONFLICT_FILES = new Set([
  '.github/PULL_REQUEST_TEMPLATE/release-candidate.md',
  '.github/pull_request_template.md',
  '.github/scripts/create-release-candidate-pr.mjs',
  '.github/scripts/lib/branch-policy.mjs',
  '.github/scripts/lib/branch-policy.test.mjs',
  '.github/scripts/lib/release-candidate-body.mjs',
  '.github/scripts/lib/release-candidate-body.test.mjs',
  '.github/scripts/validate-release-labels.mjs',
  '.github/workflows/release-candidate-pr.yml',
  'docs/github-governance.md',
  'docs/github-workflow.md',
  'docs/release-automation-strategy.md',
]);

export function getDevelopSideReleaseCandidateConflictFiles(files) {
  return files.filter(file => DEVELOP_SIDE_CONFLICT_FILES.has(file));
}

export function getUnsupportedReleaseCandidateConflictFiles(files) {
  return files.filter(file => file !== PACKAGE_JSON_PATH && !DEVELOP_SIDE_CONFLICT_FILES.has(file));
}

export function resolvePackageJsonForReleaseCandidate(releasePackageJson, developPackageJson) {
  if (!releasePackageJson?.version || !developPackageJson?.version) {
    throw new Error(
      'package.json conflict cannot be resolved without release and develop versions.',
    );
  }

  return {
    ...developPackageJson,
    version: releasePackageJson.version,
  };
}
