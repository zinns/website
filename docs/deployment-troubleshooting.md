# Deployment Troubleshooting

## Dependency Release Age

The workspace requires dependencies to be at least 1440 minutes (one day) old.
pnpm 11 verifies locked dependencies during installation, including transitive packages.

For `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`, read the publication timestamp in the
build log. Retry the same commit after that timestamp plus 24 hours.

If it still fails, inspect Vercel environment configuration for a longer release-age
policy and compare the complete error with workspace settings. Do not disable
lockfile verification or set the release age to zero to bypass this check.

The reported `baseline-browser-mapping@2.11.29` failure is a dependency-age rejection,
not an application compilation failure. The affected Dependabot branch needs its own
deployment retry after cooldown; building another branch does not verify recovery.

Reference: https://pnpm.io/blog/releases/11.0
