# GitHub Workflow

This document defines the repository workflow before release automations are implemented.

## Branches

- `develop` is the integration branch for active work.
- `release` is the accepted release candidate branch.
- `main` is production and should only receive release commits.
- Work branches must be created from the latest `develop`.

## Change Flow

1. Create a work branch from `develop`.
2. Open a PR back to `develop` using the change PR template.
3. Squash merge the PR into `develop` after review and validation.
4. Vercel handles the staging deployment from `develop`.
5. Release automation creates or updates the `develop` to `release` PR after every push to `develop`.

## Release Candidate Flow

The release candidate PR has `release` as the base branch and `develop` as the source branch. It must
have exactly one version label:

- `version:patch`
- `version:minor`
- `version:major`

The selected version label determines the next semantic version. The release candidate PR should only
be merged after the Vercel staging deployment for `develop` has been reviewed.

## Production Flow

After the release candidate PR is merged into `release`, automation should:

1. Read the selected `version:*` label from the merged release candidate PR.
2. Calculate the next version.
3. Create a branch from `main`, for example `release/main-vX.Y.Z`.
4. Apply the accepted diff from `release` as a single release commit.
5. Update release metadata such as `package.json` and release notes.
6. Open a production release PR directly to `main`.

The production release PR must contain only release commits. The merge method for `main` is squash
merge, with a commit title like:

```text
chore(release): vX.Y.Z (#123)
```

After the production PR is merged, automation should create the matching Git tag and GitHub Release.

## Merge Strategies

- Work PRs into `develop`: squash merge.
- Release candidate PR from `develop` to `release`: create a merge commit once staging is approved
  and one `version:*` label is selected.
- Production release PR into `main`: squash merge so production history contains only release
  commits.

## Required Local Checks

The local hooks are guardrails before GitHub branch protection exists:

- `commit-msg` requires a conventional commit with a first-line GitHub issue reference.
- `pre-commit` formats and lints staged files, then runs TypeScript and Vitest.
- `pre-push` blocks direct pushes to `main` and `develop`, then runs the full validation gate.

Server-side GitHub branch protection should still be configured for `main`, `develop`, and `release`
because local hooks can be skipped.

## Automation Backlog

These workflows now define the automation contract:

- `ci.yml`: validates formatting, linting, TypeScript, tests, build, dependency review, and workflow
  syntax.
- `branch-protection-check.yml`: verifies PR branch direction and production release commit shape.
- `release-candidate-pr.yml`: creates or updates the `develop` to `release` PR after every push to
  `develop`.
- `release-label-guard.yml`: requires exactly one `version:*` label before the release candidate PR
  can merge.
- `production-release-pr.yml`: creates the production release PR after the release candidate PR
  merges.
- `production-release-guard.yml`: verifies the production PR targets `main`, uses one release commit,
  and updates `package.json` to the release version.
- `publish-release.yml`: tags the production merge as `vX.Y.Z` and creates the GitHub Release.
- `labels-sync.yml`: applies `.github/labels.yml` to repository labels.
