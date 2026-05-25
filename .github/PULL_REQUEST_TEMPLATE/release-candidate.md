# Release Candidate PR

## Target

- Base branch: `release`
- Source branch: `develop`
- Created and updated by automation after every push to `develop`

## Release scope

<!-- Summarize what has changed since the last release branch update. -->

## Version label

Exactly one version label is required before merge:

- [ ] `version:patch`
- [ ] `version:minor`
- [ ] `version:major`

Required labels: `type:release`, `status:in-review`, and exactly one `version:*`.

## Merge strategy

- [ ] Merge after repository checks pass and release blockers are resolved
- [ ] Create a merge commit into `release`
- [ ] Suggested merge commit title: `chore(release): merge release candidate (#123)`
- [ ] Do not squash this PR unless the release automation is changed to preserve the required release scope another way
- [ ] After merge, automation creates the production release PR to `main`

## Validation

- [ ] `pnpm validate`
- [ ] Vercel deployment is handled by the connected Vercel project
- [ ] Known release blockers are resolved or explicitly accepted

## Release notes draft

<!-- Human-readable summary for the production release PR. -->
