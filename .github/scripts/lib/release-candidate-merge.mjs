export const RELEASE_CANDIDATE_BRANCH = 'release-candidate/develop';

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
