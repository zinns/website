import { GitHubBodyRequest } from 'types/Webhook/githubRequest';
import {
  buildCommentMessage,
  buildIssueMessage,
  buildLabelMessage,
  buildMilestoneMessage,
  buildPullRequestMessage,
  buildPushMessage,
} from './buildMessage';

export const createDescription = (payload: GitHubBodyRequest, update: string[]): string => {
  switch (update[0] ?? '') {
    case 'check_run':
      return ` check run: *${payload?.check_run?.name}* was completed with a *${payload?.check_run?.conclusion}* status`;
    case 'check_suite':
      return ` check suite on *${payload?.check_suite?.head_branch}* was completed with a *${payload?.check_suite?.conclusion}* status`;
    case 'comment':
      return buildCommentMessage(payload);
    case 'issue':
      return buildIssueMessage(payload);
    case 'label':
      return buildLabelMessage(payload);
    case 'milestone':
      return buildMilestoneMessage(payload);
    case 'pull_request':
      return buildPullRequestMessage(payload);
    case 'pusher':
      return buildPushMessage(payload);
    case 'workflow_job':
      return ` workflow job on *${payload?.workflow_job?.head_branch}* was completed with *${payload?.workflow_job?.conclusion}* status`;
    case 'workflow_run':
      return ` workflow run on *${payload?.workflow_run?.head_branch}* was completed with *${payload?.workflow_run?.conclusion}* status`;
    default:
      return update.join(' - ');
  }
};
