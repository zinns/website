import { Comment } from 'types/Webhook/comment';
import { Issue } from 'types/Webhook/issue';
import { Label } from 'types/Webhook/label';
import { Milestone } from 'types/Webhook/milestone';
import { PullRequest } from 'types/Webhook/pull_request';
import { Push } from 'types/Webhook/push';

export const buildCommentMessage = ({ comment, pull_request }: Comment): string => {
  return `comment added by *${comment.user.login.toUpperCase()}* into PR *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}*`;
};

export const buildIssueMessage = ({ action, issue, label }: Issue): string => {
  switch (action) {
    case 'assigned':
      return `issue: *${issue.title.toUpperCase()}* was assigned to *${issue.assignee}*`;
    case 'closed':
      return `issue: *${issue.title.toUpperCase()}* was closed with a *${
        issue.state_reason
      }* status`;
    case 'created':
      return `issue: *${issue.title.toUpperCase()}* was commented`;
    case 'deleted':
      return `issue: *${issue.title.toUpperCase()}* was deleted`;
    case 'demilestoned':
      return `issue: *${issue.title.toUpperCase()}* was removed from milestone: *${issue.milestone.title.toUpperCase()}*`;
    case 'edited':
      return `issue: *${issue.title.toUpperCase()}* was edited`;
    case 'labeled':
      return `issue: *${issue.title.toUpperCase()}* has been labeled with: *${issue.labels
        .map(label => label.name)
        .join(' / ')}*`;
    case 'milestoned':
      return `issue: *${issue.title.toUpperCase()}* was added to milestone: *${issue.milestone.title.toUpperCase()}*`;
    case 'opened':
      return `issue: *${issue.title.toUpperCase()}* was opened`;
    case 'unlabeled':
      return `issue: *${issue.title.toUpperCase()}* has been unlabeled with: *${label.name}*`;
    default:
      return 'There was an issue update but it is not handle, yet';
  }
};

export const buildLabelMessage = ({ action, label }: Label): string => {
  switch (action) {
    case 'created':
      return `label: *${label.name}* was created`;
    case 'deleted':
      return `label: *${label.name}* was deleted`;
    case 'edited':
      return `label: *${label.name}* was edited`;
    default:
      return 'There was a label update but it is not handle, yet';
  }
};

export const buildMilestoneMessage = (payload: Milestone): string => {
  switch (payload.action) {
    case 'closed':
      return `milestone: *${payload.milestone.title.toUpperCase()}* was closed`;
    case 'created':
      return `milestone: *${payload.milestone.title.toUpperCase()}* was created`;
    case 'deleted':
      return `milestone: *${payload.milestone.title.toUpperCase()}* was deleted`;
    case 'edited':
      return `milestone: *${payload.milestone.title.toUpperCase()}* was edited`;
    default:
      return 'There was a milestone update but it is not handle, yet';
  }
};

export const buildPullRequestMessage = ({
  action,
  pull_request,
  changes,
  requested_reviewer,
}: PullRequest): string => {
  switch (action) {
    case 'assigned':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* was assigned to *${pull_request.assignee.login.toUpperCase()}*'
      }`;
    case 'closed':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* was closed with ${pull_request.merged ? '*merge*' : '*without merge*'}`;
    case 'edited':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* had edits on  ${Object.keys(changes).join('/').toUpperCase()}`;
    case 'demilestoned':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* was unassigned to *${pull_request.milestone.title.toUpperCase()}* milestone`;
    case 'labeled':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* was labeled with: *${pull_request.labels.map(label => label.name).join(' / ')}*`;
    case 'milestoned':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* was assigned to *${pull_request.milestone.title.toUpperCase()}* milestone`;
    case 'opened':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* was *opened* with *${pull_request.requested_reviewers.length} reviewers, ${
        pull_request.labels.length
      } labels and ${pull_request.commits} commits*`;
    case 'reopened':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* was *reopened*`;
    case 'resolved':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* *resolved* some conversations`;
    case 'review_requested':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user?.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* has requested review from *${requested_reviewer.login.toUpperCase()}*`;
    case 'synchronize':
      return `pull request: *${pull_request.title.toUpperCase()}* opened by *${pull_request.user.login.toUpperCase()}* assigned to *${
        pull_request.assignee?.login.toUpperCase() ?? 'unassigned'
      }* was *synchronized*`;
    default:
      return 'There was a pull request update but it is not handle, yet';
  }
};

export const buildPushMessage = ({ created, deleted, ref, commits, forced }: Push): string => {
  if (created) {
    return ` branch: *${ref.replace('refs/heads/', '')}* was created`;
  }

  if (deleted) {
    return ` branch: *${ref.replace('refs/heads/', '')}* was deleted`;
  }

  if (commits.length) {
    return ` *${commits.length}* commit(s) were ${forced ? '*forced*' : ''} pushed to *${ref
      .replace('refs/heads/', '')
      .toUpperCase()}*`;
  }

  return 'There was a push update but it is not handle, yet';
};
