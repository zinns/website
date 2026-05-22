# Pull request

Use the template that matches the target branch:

- Change PR to `develop`: `.github/PULL_REQUEST_TEMPLATE/change.md`
- Release candidate PR to `release`: `.github/PULL_REQUEST_TEMPLATE/release-candidate.md`
- Production release PR to `main`: `.github/PULL_REQUEST_TEMPLATE/production-release.md`

## Summary

<!-- What changed and why? -->

## Linked issue

<!-- Use #123 for normal references. Use fixes #123, closes #123, or resolves #123 only when this PR targets the default branch and should close the issue. -->

## Merge strategy

<!-- Select the strategy that matches the base branch. -->

- [ ] `develop`: squash merge with a conventional commit title and issue reference, for example `feat(site): add project index (#123)`
- [ ] `release`: create a merge commit after staging approval and exactly one `version:*` label
- [ ] `main`: squash merge the automated production release PR so `main` receives only a release commit

## Validation

- [ ] `pnpm validate`
- [ ] Vercel preview or staging deployment reviewed when applicable
