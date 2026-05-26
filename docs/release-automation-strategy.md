# Release Automation Strategy

This document defines the next release automation improvements after the initial migration release.

## Current Problems

### Branch Protection Drift

Production PR `#39` reports pending required checks named `build` and `linter`, but those checks are
not produced by the current workflows.

Current workflow check names are:

- `Branch Policy`
- `Quality Gate`
- `Workflow Lint`
- `Version Label`
- `Release Shape`

The pending `build` and `linter` checks are stale branch protection requirements from the previous
workflow setup. They should not be expected from the current workflow set.

### Release Candidate Context

The automated release-candidate PR uses a template, but it should also include a generated list of
changes included in the release candidate.

The release manager should be able to answer these questions from the PR body:

- Which commits or PRs entered this release?
- Which issue IDs are covered?
- Which labels or areas are represented?
- Which items are release blockers or need manual review?

## Strategy

### 1. Align Required Checks With Current Workflow Names

Repository branch protection should be updated so required checks match the active workflow jobs.

Recommended required checks:

- `develop`: `Branch Policy`, `Quality Gate`, `Workflow Lint`
- `release`: `Branch Policy`, `Quality Gate`, `Workflow Lint`, `Version Label`
- `main`: `Branch Policy`, `Release Shape`

Do not require stale contexts such as `build` or `linter` unless compatibility workflows are added
to emit those exact job names.

Short-term unblock:

- Remove `build` and `linter` from required checks in GitHub branch protection.
- Require the current check names listed above.

Fallback if branch protection cannot be changed immediately:

- Add temporary compatibility jobs named `build` and `linter`.
- Make `build` run `pnpm build`.
- Make `linter` run `pnpm lint`.
- Remove those compatibility jobs once branch protection is corrected.

Preferred approach: update GitHub branch protection instead of keeping duplicate workflow jobs.

### 2. Generate Included Changes For Release Candidates

The release-candidate automation should generate an `Included changes` section when it creates or
updates the generated PR from `release-candidate/develop` to `release`.

Source of truth:

- Compare `release...develop`.
- Collect commit titles included in the diff.
- Extract PR numbers and issue references from commit titles and messages.
- Fetch GitHub PR metadata when possible: title, URL, labels, author, merge commit, linked issues.
- Group changes by label where possible.

Minimum useful output:

```md
## Included changes

| Type  | Reference | Summary                                                   | Labels                   |
| ----- | --------- | --------------------------------------------------------- | ------------------------ |
| PR    | #29       | Codex/migration plan next16 tailwind4                     | type:release, area:infra |
| Issue | #35       | Resolve release candidate conflicts after migration merge | type:task, type:release  |
```

If PR metadata cannot be fetched, the automation should fall back to commit titles:

```md
## Included changes

- `8b8a6ba` Codex/migration plan next16 tailwind4 (#29)
- `a3739a2` fix(release): allow manual release candidate branches (#123)
```

### 3. Keep Production PR Body Focused

The production PR to `main` should not duplicate the full release-candidate template.

It should include:

- Version.
- Source release-candidate PR.
- Version label used.
- Required labels.
- Clean release notes draft.
- Automation metadata.

It should not include:

- Release-candidate checklist content.
- Duplicate validation sections.
- Internal template comments.

### 4. Enforce Required Labels Before Merge

Release-candidate PRs must have:

- `type:release`
- `status:in-review`
- Exactly one `version:*` label

Production release PRs must have:

- `type:release`
- `status:in-review`
- Exactly one `version:*` label copied from the release-candidate PR

The guards should fail when these labels are missing or duplicated.

### 5. Automation Order

The intended release automation sequence is:

1. Work PR merges into `develop`.
2. `release-candidate-pr.yml` creates or updates a generated `release-candidate/develop` branch from
   `release`.
3. The generated branch merges `develop` and resolves expected `package.json` version conflicts
   there, keeping principal branches free of conflict-only commits.
4. The release-candidate PR body includes a generated `Included changes` list.
5. Production release commits and post-release sync commits are ignored when calculating releasable
   changes.
6. If no releasable changes remain, the release-candidate PR is not created, or the stale automated
   PR is closed.
7. Older direct `develop -> release` release-candidate PRs are closed and replaced by the generated
   branch PR.
8. Release labels are applied automatically.
9. Release guards validate branch direction and required labels.
10. Release candidate merges into `release`.
11. `production-release-pr.yml` creates or updates the `production-release/vX.Y.Z` to `main` PR.
12. Production PR receives required labels and a focused release body.
13. Production guards validate title, labels, single release commit, and version.
14. Production PR merges into `main`.
15. Release publishing tags `vX.Y.Z`.
16. Develop sync PR opens from `sync/develop-vX.Y.Z` to `develop`.

## Implementation Plan

### Phase 1: Branch Protection Cleanup

- Update GitHub branch protection required checks for `develop`, `release`, and `main`.
- Remove stale `build` and `linter` required checks.
- Confirm PR `#39` is no longer blocked by expected checks that no workflow emits.

### Phase 2: Release Candidate Change List

- Update `.github/scripts/create-release-candidate-pr.mjs`.
- Add a helper that compares `release...develop`.
- Render the included changes as markdown.
- Add tests for commit fallback and PR metadata rendering.

### Phase 3: Production Metadata Hardening

- Ensure generated production PRs always include required labels.
- Ensure production PR body stays focused.
- Keep `Release 📦 vX.Y.Z` as the required production title format.

## Acceptance Criteria

- PRs are not blocked by stale required checks.
- The generated release-candidate PR contains an accurate `Included changes` section.
- Generated release PRs always include required labels.
- Guards fail clearly when required labels are missing.
- Production PR body contains only production release context and release notes.
