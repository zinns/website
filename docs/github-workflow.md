# GitHub Workflow

This document defines the repository workflow and release automation contract.

## Branches

- `develop` is the integration branch for active work.
- `release` is the accepted release candidate branch.
- `main` is production and should only receive release commits.
- Work branches must be created from the latest `develop`.

## Change Flow

1. Create a work branch from `develop`.
2. Use either an explicit issue branch such as `issue/123/homepage-content` or a conventional
   branch such as `feat/homepage-content`.
3. Open a PR back to `develop` using the change PR template.
4. Add `status:approved` only after review approval.
5. Squash merge the PR into `develop` after review and validation.
6. Vercel deployments are handled by the connected Vercel project when its Git integration is
   enabled. Temporary release automation branches are excluded from Vercel auto-deployments through
   `vercel.json`.
7. Release automation creates or updates the `develop` to `release` PR after every push to
   `develop`.

## Release Candidate Flow

The release candidate PR has `release` as the base branch and `develop` as the source branch. It must
have `type:release`, `status:in-review`, and exactly one version label:

- `version:patch`
- `version:minor`
- `version:major`

The selected version label determines the next semantic version. The release candidate PR should only
be merged after repository checks pass and known release blockers are resolved.

The release candidate PR body must include a generated included-change list from `release..develop`.
Production release commits and post-release sync commits are filtered out. If no releasable commits
remain after filtering, the automation must not create a release candidate PR.

## Production Flow

After the release candidate PR is merged into `release`, automation should:

1. Read the selected `version:*` label from the merged release candidate PR.
2. Calculate the next version.
3. Create a branch from `main`, for example `production-release/vX.Y.Z`.
4. Apply the accepted diff from `release` as a single release commit.
5. Update release metadata such as `package.json` and release notes.
6. Open a production release PR directly to `main` with `type:release`, `status:in-review`, and the
   selected `version:*` label.
7. After the production release is published, create a sync PR from `sync/develop-vX.Y.Z` to
   `develop`.

The production release PR must contain only release commits. The merge method for `main` is squash
merge, with a commit title like:

```text
Release 📦 vX.Y.Z
```

After the production PR is merged, automation should create the matching Git tag and GitHub Release.

## Merge Strategies

- Work PRs into `develop`: squash merge.
- Release candidate PR from `develop` or `release-candidate/*` to `release`: create a merge commit
  once repository checks pass, blockers are resolved, and one `version:*` label is selected.
- Production release PR into `main`: squash merge so production history contains only release
  commits.
- Post-release sync PR into `develop`: merge commit so `develop` keeps release ancestry from `main`.
- While a post-release sync PR is open, non-sync PRs into `develop` are blocked by `Change Policy`
  until the sync PR merges or closes.

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
- `change-pr-guard.yml`: verifies PRs to `develop` use accepted branch names, required labels, and
  issue-referenced PRs and commits.
- `release-candidate-pr.yml`: creates or updates the `develop` to `release` PR after every push to
  `develop`.
- `release-label-guard.yml`: requires release metadata labels and exactly one `version:*` label
  before the release candidate PR can merge.
- `production-release-pr.yml`: creates the production release PR after the release candidate PR
  merges.
- `production-release-guard.yml`: verifies production PR labels, target branch, release title, single
  release commit, and `package.json` version.
- `publish-release.yml`: tags the production merge as `vX.Y.Z` and creates the GitHub Release.
- `develop-sync-pr.yml`: creates a PR to sync production release changes from `main` back into
  `develop`.
- `labels-sync.yml`: applies `.github/labels.yml` to repository labels.
