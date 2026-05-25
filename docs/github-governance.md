# GitHub Governance

This document is the repository source of truth for GitHub issue tracking, branch naming, PR review,
labels, milestones, projects, and branch protection.

## Issue Lifecycle

Issues are the unit of planned work. Every non-trivial change should start with an issue before code
is written.

Lifecycle:

1. Create an issue with a clear objective, scope, validation plan, and risk notes.
2. Add labels for type, area, priority, and status.
3. Assign the issue to the person doing the work.
4. Create a branch from the latest `develop`.
5. Use an accepted human branch name.
6. Commit using conventional commit format with the issue reference in the first line.
7. Open a PR back to `develop`.
8. Keep the PR in `status:in-review` until the reviewer approves the change.
9. Add `status:approved` only after review approval.
10. Merge the PR into `develop`.
11. Close the issue automatically from the PR by using a closing keyword.

Recommended issue close timing:

- Close issues when their PR merges into `develop`.
- Do not wait for `develop` to merge into `release`.
- Do not wait for the production PR to merge into `main`.

Reasoning: `develop` is the default integration branch. Once a PR is approved and merged there, the
work is accepted into the product backlog state. Release PRs should document what is included, but
they should not own issue closure for normal work.

Use release-blocker issues for problems found during release review.

## Branch Naming

Human work branches must be created from `develop` and use one of the accepted formats.

Preferred explicit issue format:

```text
issue/123/short-description
```

Compatible explicit issue format:

```text
issue-123-short-description
```

Conventional work format:

```text
type/short-description
```

Accepted conventional prefixes:

- `feat`
- `fix`
- `chore`
- `docs`
- `style`
- `refactor`
- `perf`
- `test`
- `ci`
- `build`
- `design`
- `content`

Examples:

```text
issue/44/post-release-governance
issue-52-course-card-design
feat/homepage-showcase
chore/update-release-docs
```

Automation branches are exceptions:

- `release-candidate/*`: release fixes targeting `release`.
- `production-release/vX.Y.Z`: generated release PR branches targeting `main`.
- `sync/develop-vX.Y.Z`: generated post-release sync branches targeting `develop`.
- `dependabot/*`: dependency automation.

## Commit Messages

Commits must use conventional commit format and include the issue ID in the first line.

Format:

```text
type(scope): short summary (#123)
```

Examples:

```text
feat(site): add education plans section (#52)
fix(contact): validate empty email submissions (#71)
docs(repo): document GitHub governance (#44)
```

Release commits generated for production are exceptions and use:

```text
Release 📦 vX.Y.Z
```

## Pull Requests

### PRs To `develop`

PRs to `develop` represent approved product or repository changes.

Requirements:

- Source branch uses `issue/123/short-description`, `issue-123-short-description`, or a conventional
  branch like `feat/short-description`, unless it is an automation branch.
- PR title or body references the issue.
- PR uses a closing keyword when it should close the issue on merge to `develop`.
- PR has at least one `type:*` label.
- PR has `status:approved` before merge.
- Commits reference a linked issue unless they are merge commits or generated release commits.
- Required checks pass.

Recommended PR body:

```md
Closes #123

## Summary

- Explain the change.

## Validation

- pnpm validate
```

### PRs To `release`

PRs to `release` represent release-candidate updates.

Requirements:

- Source branch is `develop` or `release-candidate/*`.
- Labels include `type:release`.
- Labels include `status:in-review`.
- Exactly one `version:*` label is present.
- The PR body includes generated included changes from `release..develop` when the source is
  `develop`.
- The PR uses a merge commit into `release`.

### PRs To `main`

PRs to `main` represent production releases.

Requirements:

- Source branch is `production-release/vX.Y.Z`.
- Title is `Release 📦 vX.Y.Z`.
- Labels include `type:release`.
- Labels include `status:in-review`.
- Exactly one `version:*` label is present.
- The PR contains exactly one release commit.
- `package.json` version matches the release title.
- The PR is squash merged into `main`.

## Labels

Use labels to make issues and PRs queryable and automatable.

Required issue labels:

- `type:*`: nature of the work.
- `area:*`: affected product/repository area.
- `priority:*`: urgency.
- `status:*`: current workflow state.

Required PR labels:

- PRs to `develop`: at least one `type:*` and `status:approved` before merge.
- PRs to `release`: `type:release`, `status:in-review`, and exactly one `version:*`.
- PRs to `main`: `type:release`, `status:in-review`, and exactly one `version:*`.

Status labels:

- `status:triage`: needs owner review.
- `status:ready`: ready to start.
- `status:in-review`: implementation is under review.
- `status:approved`: reviewed and approved for merge.
- `status:blocked`: blocked by a decision or dependency.
- `status:needs-info`: waiting for missing information.

## Milestones

Use milestones for release buckets.

Recommended milestone naming:

```text
v0.3.0
v0.4.0
v1.0.0
```

Milestones should contain issues planned for a release. They should not replace labels.

Use milestones to answer:

- What is planned for this version?
- What remains before the release can ship?
- Which issues slipped into the next release?

## Projects

Use GitHub Projects for cross-issue planning.

Recommended project fields:

- `Status`: Triage, Ready, In progress, In review, Approved, Done.
- `Priority`: P0, P1, P2, P3.
- `Area`: Web, Courses, Projects, Auth, Dashboard, Automation, Infra, Content.
- `Type`: Feature, Bug, Task, Docs, Refactor, Design, Release.
- `Target version`: version or milestone.

Recommended automations:

- Add new issues to the project.
- Move issues with `status:ready` to Ready.
- Move issues with an open PR to In review.
- Move issues with `status:approved` to Approved.
- Move closed issues to Done.

Projects are for planning and visibility. Labels remain the source used by CI guards.

## Branch Protection Requirements

Branch protection was removed directly in GitHub. It should be recreated using the rules below.

### `develop`

Purpose: default integration branch.

Recommended protection:

- Require a pull request before merging.
- Require at least one approval.
- Dismiss stale approvals when new commits are pushed.
- Require conversation resolution before merge.
- Require branches to be up to date before merging when GitHub can do so without excessive churn.
- Block force pushes.
- Block branch deletion.
- Require status checks:
  - `Branch Policy`
  - `Change Policy`
  - `Quality Gate`
  - `Workflow Lint`

Do not require stale checks named `build` or `linter`.

### `release`

Purpose: accepted release-candidate branch.

Recommended protection:

- Require a pull request before merging.
- Require at least one approval.
- Require conversation resolution before merge.
- Block force pushes.
- Block branch deletion.
- Require status checks:
  - `Branch Policy`
  - `Quality Gate`
  - `Workflow Lint`
  - `Version Label`

### `main`

Purpose: production branch.

Recommended protection:

- Require a pull request before merging.
- Require at least one approval.
- Require conversation resolution before merge.
- Block force pushes.
- Block branch deletion.
- Require status checks:
  - `Branch Policy`
  - `Release Shape`
  - `Quality Gate`
  - `Workflow Lint`

The `main` PR should be a generated production release PR. Direct product work must not target
`main`.

## Post-Release Develop Sync

After a production release is published, `develop` must receive release-only changes from `main`.

Automation should:

1. Trigger after `Publish Release` succeeds or after a GitHub Release is published.
2. Create `sync/develop-vX.Y.Z` from `develop`.
3. Merge `origin/main` into that sync branch.
4. Open a PR to `develop`.
5. Let repository checks and review validate the sync.
6. Merge the sync PR into `develop`.

The automation must not push directly to `develop`.

While a `sync/develop-vX.Y.Z` PR is open, normal PRs to `develop` are blocked. The sync automation
removes `status:approved` and adds `status:blocked` to other open `develop` PRs, and the `Change
Policy` guard fails non-sync PRs until the sync PR is merged or closed. This prevents newly merged
feature work from making the release sync stale or conflicting.

If `package.json` conflicts only because `main` has the new release version, the sync automation can
resolve that conflict automatically by preserving the `develop` package metadata and adopting the
released `main` version. Any package conflict beyond the version field must fail and be handled by a
manual sync PR.

For the current `v0.3.0` release, the sync is handled by issue `#44` because the workflow was not yet
available on the default branch when the release was published.
