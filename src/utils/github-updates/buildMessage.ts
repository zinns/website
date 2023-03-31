import { Issue } from 'types/Webhook/issue';
import { Label } from 'types/Webhook/label';
import { Milestone } from 'types/Webhook/milestone';
import { PullRequest } from 'types/Webhook/pull_request';
import { Push } from 'types/Webhook/push';

export const buildIssueMessage = ({ action, issue, label }: Issue): string => {
  switch (action) {
    case 'assigned':
      return ` issue \\-\\> : *${issue.title}* was assigned to *${issue.assignee}*`;
    case 'created':
      return ` issue \\-\\> : *${issue.title}* was commented`;
    case 'deleted':
      return ` issue \\-\\> : *${issue.title}* was deleted`;
    case 'demilestoned':
      return ` issue \\-\\> : *${issue.title}* was removed from milestone: *${issue.milestone.title}*`;
    case 'edited':
      return ` issue \\-\\> : *${issue.title}* was edited`;
    case 'labeled':
      return ` issue \\-\\> : *${issue.title}* has been labeled with: *${issue.labels
        .map(label => label.name)
        .join(' / ')}*`;
    case 'milestoned':
      return ` issue \\-\\> : *${issue.title}* was added to milestone: *${issue.milestone.title}*`;
    case 'opened':
      return ` issue \\-\\> : *${issue.title}* was opened`;
    case 'unlabeled':
      return ` issue \\-\\> : *${issue.title}* has been unlabeled with: *${label.name}*`;
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
      return `milestone: *${payload.milestone.title}* was closed`;
    case 'created':
      return `milestone: *${payload.milestone.title}* was created`;
    case 'deleted':
      return `milestone: *${payload.milestone.title}* was deleted`;
    case 'edited':
      return `milestone: *${payload.milestone.title}* was edited`;
    default:
      return 'There was a milestone update but it is not handle, yet';
  }
};

export const buildPullRequestMessage = ({ action, pull_request }: PullRequest): string => {
  switch (action) {
    case 'assigned':
      return `pull request: *${pull_request.title}* opened by *${pull_request.user.login}* was assigned to *${pull_request.assignee.login}*'
      }`;
    case 'closed':
      return `pull request: *${pull_request.title}* opened by *${
        pull_request.user.login
      }* assigned to *${pull_request.assignee?.login ?? 'unassigned'}* was closed with ${
        pull_request.merged ? '*merge*' : '*without merge*'
      }`;
    case 'demilestoned':
      return `pull request: *${pull_request.title}* opened by *${
        pull_request.user.login
      }* assigned to *${pull_request.assignee?.login ?? 'unassigned'}* was unassigned to *${
        pull_request.milestone.title
      }* milestone`;
    case 'labeled':
      return `pull request: *${pull_request.title}* opened by *${
        pull_request.user.login
      }* assigned to *${
        pull_request.assignee?.login ?? 'unassigned'
      }* was labeled with: *${pull_request.labels.map(label => label.name).join(' / ')}*`;
    case 'milestoned':
      return `pull request: *${pull_request.title}* opened by *${
        pull_request.user.login
      }* assigned to *${pull_request.assignee?.login ?? 'unassigned'}* was assigned to *${
        pull_request.milestone.title
      }* milestone`;
    case 'opened':
      return `pull request: *${pull_request.title}* opened by *${
        pull_request.user.login
      }* assigned to *${pull_request.assignee?.login ?? 'unassigned'}* was *opened* with *${
        pull_request.requested_reviewers.length
      } reviewers, ${pull_request.labels.length} labels and ${pull_request.commits} commits*`;
    case 'reopened':
      return `pull request: *${pull_request.title}* opened by *${
        pull_request.user.login
      }* assigned to *${pull_request.assignee?.login ?? 'unassigned'}* was *reopened*`;
    case 'synchronize':
      return `pull request: *${pull_request.title}* opened by *${
        pull_request.user.login
      }* assigned to *${pull_request.assignee?.login ?? 'unassigned'}* was *synchronized*`;
    default:
      return 'There was a pull request update but it is not handle, yet';
  }
};

export const buildPushMessage = ({ created, ref, commits, forced }: Push): string => {
  if (created) {
    return ` branch: *${ref.replace('refs/heads/', '')}* was created`;
  }

  if (commits.length) {
    return ` *${commits.length}* commit(s) were ${
      forced ? '*forced*' : ''
    } pushed to *${ref.replace('refs/heads/', '')}*`;
  }

  return 'There was a push update but it is not handle, yet';
};
