import { getLabelNames } from './release-labels.mjs';
import { isReleaseTitle } from './semver.mjs';

const ISSUE_BRANCH_PATTERN = /^issue-(\d+)(?:[-_/].*)?$/;
const AUTOMATION_BRANCH_PREFIXES = ['sync/', 'dependabot/'];

function getCommitHeader(message = '') {
  return message.trimStart().split(/\r?\n/, 1)[0]?.trim() ?? '';
}

function getIssueIdFromBranch(branch = '') {
  return ISSUE_BRANCH_PATTERN.exec(branch)?.[1] ?? null;
}

function isAutomationBranch(branch = '') {
  return AUTOMATION_BRANCH_PREFIXES.some(prefix => branch.startsWith(prefix));
}

function commitHeaderReferencesIssue(header, issueId) {
  const escapedIssueId = issueId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `(^|[\\s([{:])(?:#${escapedIssueId}|GH-${escapedIssueId}|[A-Za-z0-9_.-]+\\/[A-Za-z0-9_.-]+#${escapedIssueId})(?=$|[\\s)\\],.;:])`,
    'i',
  );

  return pattern.test(header);
}

function shouldSkipCommitIssueCheck(header) {
  return (
    header.startsWith('Merge ') || isReleaseTitle(header) || /^Release v\d+\.\d+\.\d+/.test(header)
  );
}

export function validateChangePullRequest(pullRequest, commits = []) {
  const errors = [];
  const base = pullRequest.base.ref;
  const head = pullRequest.head.ref;
  const labels = getLabelNames(pullRequest.labels);
  const isAutomation = isAutomationBranch(head);
  const issueId = getIssueIdFromBranch(head);

  if (base !== 'develop') {
    errors.push('Change PR guard must target develop.');
  }

  if (!labels.some(label => label.startsWith('type:'))) {
    errors.push('PRs to develop must include at least one type:* label.');
  }

  if (!labels.includes('status:approved')) {
    errors.push('PRs to develop must include status:approved before merge.');
  }

  if (!isAutomation && !issueId) {
    errors.push('Human work branches must use issue-123-short-description naming.');
  }

  if (issueId) {
    const invalidCommit = commits.find(commit => {
      const header = getCommitHeader(commit.commit?.message ?? commit.message ?? '');

      return (
        header &&
        !shouldSkipCommitIssueCheck(header) &&
        !commitHeaderReferencesIssue(header, issueId)
      );
    });

    if (invalidCommit) {
      const header = getCommitHeader(invalidCommit.commit?.message ?? invalidCommit.message ?? '');
      errors.push(`Commit must reference issue #${issueId}: ${header}`);
    }
  }

  return errors;
}
