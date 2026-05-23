import { describe, expect, it } from 'vitest';

import {
  ISSUE_REFERENCE_PATTERN,
  commitHeaderHasIssueReference,
  getCommitHeader,
  getIssueReferenceHelpText,
  hasIssueReference,
} from './commit-message-rules.mjs';

describe('commit message issue reference rules', () => {
  it('accepts a first-line issue reference', () => {
    expect(
      hasIssueReference(`
feat(site): add neutral homepage (#123)
`),
    ).toBe(true);
  });

  it('accepts a first-line closing keyword reference', () => {
    expect(
      hasIssueReference(`
fix(content): adjust placeholder copy fixes #12
`),
    ).toBe(true);
  });

  it('rejects messages without a GitHub issue reference in the header', () => {
    expect(
      commitHeaderHasIssueReference({
        raw: `
chore(repo): add quality scripts
`,
      }),
    ).toBe(false);
  });

  it('rejects issue references that only exist after the first line', () => {
    expect(
      commitHeaderHasIssueReference({
        raw: `
docs(readme): explain commit rules

Refs #77
`,
      }),
    ).toBe(false);
  });

  it('validates parsed commit objects', () => {
    expect(
      commitHeaderHasIssueReference({
        raw: `
docs(readme): explain commit rules GH-77
`,
      }),
    ).toBe(true);
  });

  it('keeps the first-line parser, pattern, and help text in sync', () => {
    expect(getCommitHeader('feat(repo): update hooks (#501)\n\nBody')).toBe(
      'feat(repo): update hooks (#501)',
    );
    expect(ISSUE_REFERENCE_PATTERN.test('feat(repo): update hooks octo-org/octo-repo#501')).toBe(
      true,
    );
    expect(getIssueReferenceHelpText()).toContain('first line');
  });
});
