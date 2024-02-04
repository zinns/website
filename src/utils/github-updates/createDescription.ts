import { GitHubBodyRequest } from 'types/Webhook/githubRequest';
import {
  buildCommentMessage,
  buildIssueMessage,
  buildLabelMessage,
  buildMilestoneMessage,
  buildPullRequestMessage,
  buildPushMessage,
} from './buildMessage';
import { CheckRun } from 'types/Webhook/check_run';
import { CheckSuite } from 'types/Webhook/check_suite';
import { Issue } from 'types/Webhook/issue';
import { Label } from 'types/Webhook/label';
import { Milestone } from 'types/Webhook/milestone';
import { PullRequest } from 'types/Webhook/pull_request';
import { Push } from 'types/Webhook/push';
import { WorkflowJob } from 'types/Webhook/workflow_job';
import { WorkflowRun } from 'types/Webhook/workflow_run';
import { Comment } from 'types/Webhook/comment';

export const createDescription = (payload: GitHubBodyRequest, update: string[]): string => {
  switch (update[0] ?? '') {
    case 'check_run':
      return ` check run: *${(payload as CheckRun).check_run.name}* was completed with a *${
        (payload as CheckRun).check_run.conclusion
      }* status`;
    case 'check_suite':
      return ` check suite on *${
        (payload as CheckSuite).check_suite.head_branch
      }* was completed with a *${(payload as CheckSuite).check_suite.conclusion}* status`;
    case 'comment':
      return buildCommentMessage(payload as Comment);
    case 'issue':
      return buildIssueMessage(payload as Issue);
    case 'label':
      return buildLabelMessage(payload as Label);
    case 'milestone':
      return buildMilestoneMessage(payload as Milestone);
    case 'pull_request':
      return buildPullRequestMessage(payload as PullRequest);
    case 'pusher':
      return buildPushMessage(payload as Push);
    case 'workflow_job':
      return ` workflow job on *${
        (payload as WorkflowJob).workflow_job.head_branch
      }* was completed with *${(payload as WorkflowJob).workflow_job.conclusion}* status`;
    case 'workflow_run':
      return ` workflow run on *${
        (payload as WorkflowRun).workflow_run.head_branch
      }* was completed with *${(payload as WorkflowRun).workflow_run.conclusion}* status`;
    default:
      return update.join(' - ');
  }
};
