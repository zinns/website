import { CheckRun } from './check_run';
import { CheckSuite } from './check_suite';
import { DeploymentStatus } from './deploymentStatus';
import { Issue } from './issue';
import { Label } from './label';
import { Ping } from './ping';
import { Push } from './push';
import { Status } from './status';
import { WorkflowJob } from './workflow_job';
import { WorkflowRun } from './workflow_run';

export type GitHubBodyRequest =
  | CheckRun
  | DeploymentStatus
  | Issue
  | Label
  | Ping
  | Push
  | WorkflowJob
  | WorkflowRun
  | CheckSuite
  | Status;

export const IMPORTANT_KEYS = [
  'check_run',
  'check_suite',
  'comment',
  'delete',
  'issue',
  'label',
  'milestone',
  'pull_request',
  'workflow_job',
  'workflow_run',
];
