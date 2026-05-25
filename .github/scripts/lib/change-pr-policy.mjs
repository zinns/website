import { getLabelNames } from './release-labels.mjs';
import { isReleaseTitle } from './semver.mjs';

const ISSUE_BRANCH_PATTERNS = [/^issue\/(\d+)(?:[-_/].*)?$/, /^issue-(\d+)(?:[-_/].*)?$/];
const CONVENTIONAL_BRANCH_PATTERN =
  /^(?:feat|fix|chore|docs|style|refactor|perf|test|ci|build|design|content)\/[a-z0-9][a-z0-9._/-]*$/i;
const AUTOMATION_BRANCH_PREFIXES = ['sync/', 'dependabot/'];
const DEVELOP_SYNC_BRANCH_PATTERN = /^sync\/develop-v\d+\.\d+\.\d+$/;
const ISSUE_REFERENCE_PATTERN =
  /(^|[\s([{:])(?:#(\d+)|GH-(\d+)|[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+#(\d+))(?=$|[\s)\],.;:])/gi;

function getCommitHeader(message = '') {
  return message.trimStart().split(/\r?\n/, 1)[0]?.trim() ?? '';
}

function getIssueIdFromBranch(branch = '') {
  for (const pattern of ISSUE_BRANCH_PATTERNS) {
    const match = pattern.exec(branch);

    if (match) {
      return match[1];
    }
  }

  return null;
}

function isConventionalBranch(branch = '') {
  return CONVENTIONAL_BRANCH_PATTERN.test(branch);
}

function isAutomationBranch(branch = '') {
  return AUTOMATION_BRANCH_PREFIXES.some(prefix => branch.startsWith(prefix));
}

function isDevelopSyncBranch(branch = '') {
  return DEVELOP_SYNC_BRANCH_PATTERN.test(branch);
}

function getBlockingSyncPullRequests(pullRequest, openPullRequests = []) {
  return openPullRequests.filter(openPullRequest => {
    const isCurrentPullRequest =
      pullRequest.number && openPullRequest.number && pullRequest.number === openPullRequest.number;

    return (
      !isCurrentPullRequest &&
      openPullRequest.base?.ref === 'develop' &&
      isDevelopSyncBranch(openPullRequest.head?.ref)
    );
  });
}

function getIssueIdsFromText(text = '') {
  const issueIds = new Set();

  for (const match of text.matchAll(ISSUE_REFERENCE_PATTERN)) {
    const issueId = match[2] ?? match[3] ?? match[4];

    if (issueId) {
      issueIds.add(issueId);
    }
  }

  return issueIds;
}

function hasExpectedIssueReference(text, expectedIssueIds) {
  const issueIds = getIssueIdsFromText(text);

  if (expectedIssueIds.size === 0) {
    return issueIds.size > 0;
  }

  return [...issueIds].some(issueId => expectedIssueIds.has(issueId));
}

function shouldSkipCommitIssueCheck(header) {
  return (
    header.startsWith('Merge ') || isReleaseTitle(header) || /^Release v\d+\.\d+\.\d+/.test(header)
  );
}

export function validateChangePullRequest(pullRequest, commits = [], openPullRequests = []) {
  const errors = [];
  const base = pullRequest.base.ref;
  const head = pullRequest.head.ref;
  const labels = getLabelNames(pullRequest.labels);
  const isAutomation = isAutomationBranch(head);
  const isDevelopSync = isDevelopSyncBranch(head);
  const issueId = getIssueIdFromBranch(head);
  const prIssueIds = getIssueIdsFromText(`${pullRequest.title ?? ''}\n${pullRequest.body ?? ''}`);
  const expectedIssueIds = issueId ? new Set([issueId]) : prIssueIds;

  if (base !== 'develop') {
    errors.push('Change PR guard must target develop.');
  }

  if (!labels.some(label => label.startsWith('type:'))) {
    errors.push('PRs to develop must include at least one type:* label.');
  }

  if (!labels.includes('status:approved')) {
    errors.push('PRs to develop must include status:approved before merge.');
  }

  const blockingSyncPullRequests = isDevelopSync
    ? []
    : getBlockingSyncPullRequests(pullRequest, openPullRequests);

  if (blockingSyncPullRequests.length > 0) {
    const blockingRefs = blockingSyncPullRequests
      .map(
        blockingPullRequest => `#${blockingPullRequest.number} (${blockingPullRequest.head.ref})`,
      )
      .join(', ');

    errors.push(
      `PRs to develop are blocked while post-release sync PRs are open: ${blockingRefs}. Merge or close the sync PR first.`,
    );
  }

  if (!isAutomation && !issueId && !isConventionalBranch(head)) {
    errors.push(
      'Human work branches must use issue/123/short-description, issue-123-short-description, or conventional naming like feat/short-description.',
    );
  }

  if (!isAutomation && issueId && !prIssueIds.has(issueId)) {
    errors.push(`Human work PRs must reference branch issue #${issueId} in the PR title or body.`);
  }

  if (!isAutomation && !issueId && expectedIssueIds.size === 0) {
    errors.push('Human work PRs must reference a GitHub issue in the PR title or body.');
  }

  if (!isAutomation && expectedIssueIds.size > 0) {
    const invalidCommit = commits.find(commit => {
      const header = getCommitHeader(commit.commit?.message ?? commit.message ?? '');

      return (
        header &&
        !shouldSkipCommitIssueCheck(header) &&
        !hasExpectedIssueReference(header, expectedIssueIds)
      );
    });

    if (invalidCommit) {
      const header = getCommitHeader(invalidCommit.commit?.message ?? invalidCommit.message ?? '');
      const issueList = [...expectedIssueIds].map(id => `#${id}`).join(', ');

      errors.push(`Commit must reference linked issue ${issueList}: ${header}`);
    }
  }

  return errors;
}
