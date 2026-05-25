# Change PR

## Target

- Base branch: `develop`
- Source branch: `issue/123/short-description`, `issue-123-short-description`, or a conventional
  branch like `feat/short-description`, created from latest `develop`
- Required issue reference: `#123` in the PR title or description and first commit line

## Summary

<!-- Explain the change in plain language. -->

## Linked issue

<!-- Use a closing keyword because develop is the default branch. Example: Closes #123 -->

## Type

- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Design or content
- [ ] Tooling or infrastructure
- [ ] Documentation

## Merge strategy

- [ ] Squash merge into `develop`
- [ ] `status:approved` label was added after review approval
- [ ] Squash commit title uses conventional commit format with the issue reference in the first line
- [ ] Suggested squash commit title: `feat(site): add course index (#123)`

## Validation

- [ ] `pnpm validate`
- [ ] Browser or visual check completed when UI changed
- [ ] Vercel deployment is handled by the connected Vercel project when applicable

## Notes

<!-- Risks, rollout notes, screenshots, or follow-up work. -->
