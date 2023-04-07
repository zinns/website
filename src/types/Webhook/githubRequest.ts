import { CheckRun } from './check_run';
import { CheckSuite } from './check_suite';
import { Comment } from './comment';
import { Delete } from './delete';
import { DeploymentStatus } from './deploymentStatus';
import { Issue } from './issue';
import { Label } from './label';
import { Milestone } from './milestone';
import { Ping } from './ping';
import { PullRequest } from './pull_request';
import { Push } from './push';
import { Status } from './status';
import { WorkflowJob } from './workflow_job';
import { WorkflowRun } from './workflow_run';

export type GitHubBodyRequest =
  | CheckRun
  | CheckSuite
  | Comment
  | Delete
  | DeploymentStatus
  | Issue
  | Label
  | Milestone
  | Ping
  | PullRequest
  | Push
  | Status
  | WorkflowJob
  | WorkflowRun;

export const IMPORTANT_KEYS = [
  'check_run',
  'check_suite',
  'comment',
  'issue',
  'label',
  'milestone',
  'pull_request',
  'pusher_type',
  'pusher',
  'workflow_job',
  'workflow_run',
];
