export const ISSUE_REFERENCE_PATTERN =
  /(^|[\s([{:])(?:#\d+|GH-\d+|[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+#\d+)(?=$|[\s)\],.;:])/i;

export function hasIssueReference(message = '') {
  return ISSUE_REFERENCE_PATTERN.test(message.trim());
}

export function getCommitHeader(message = '') {
  return message.trimStart().split(/\r?\n/, 1)[0]?.trim() ?? '';
}

export function commitHeaderHasIssueReference(parsed = {}) {
  const header =
    typeof parsed.header === 'string' && parsed.header.length > 0
      ? parsed.header
      : getCommitHeader(parsed.raw);

  return hasIssueReference(header);
}

export function getIssueReferenceHelpText() {
  return 'add a GitHub issue reference in the first line, like "feat(repo): update hooks (#123)"';
}
