import { Assignee } from './assignee';
import { Changes } from './changes';
import { CheckRun } from './check_run';
import { CheckSuite } from './check_suite';
import { Comment } from './comment';
import { Commit } from './commit';
import { Delete } from './delete';
import { Issue } from './issue';
import { Label } from './label';
import { Milestone } from './milestone';
import { Organization } from './organization';
import { PullRequest } from './pull_request';
import { Push } from './push';
import { Repo } from './repo';
import { Repository } from './repository';
import { Sender } from './sender';
import { Workflow } from './workflow';
import { WorkflowJob } from './workflow_job';
import { WorkflowRun } from './workflow_run';
import { Ping } from './ping';

export type GitHubBodyRequest = Ping | Issue | Push | WorkflowRun;

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
