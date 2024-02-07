import { Assignee } from './assignee';
import { Author } from './author';
import { CheckRunClass } from './check_run';
import { CheckSuiteClass } from './check_suite';
import { CommentClass } from './comment';
import { Commit } from './commit';
import { Deployment, DeploymentStatusClass } from './deploymentStatus';
import { HeadCommit } from './headCommit';
import { IssueClass } from './issue';
import { LabelClass } from './label';
import { MilestoneClass } from './milestone';
import { Organization } from './organization';
import { Hook } from './ping';
import { PullRequestClass } from './pull_request';
import { Repository } from './repository';
import { Sender } from './sender';
import { Branch, StatusCommit } from './status';
import { Workflow } from './workflow';
import { WorkflowJobClass } from './workflow_job';
import { WorkflowRunClass } from './workflow_run';

export type GitHubBodyRequest = {
  action: string;
  after?: string;
  assignee?: Assignee;
  avatar_url?: string;
  base_ref?: string;
  before?: string;
  branches?: Branch[];
  changes?: { [key: string]: string };
  check_run?: CheckRunClass;
  check_suite?: CheckSuiteClass;
  created?: boolean;
  created_at?: string;
  comment?: CommentClass;
  commit?: StatusCommit;
  commits?: Commit[];
  compare?: string;
  context?: string;
  deleted: boolean;
  deployment_status?: DeploymentStatusClass;
  deployment?: Deployment;
  description?: string;
  forced?: boolean;
  head_commit?: HeadCommit;
  hook_id?: number;
  hook?: Hook;
  id?: number;
  issue?: IssueClass;
  label?: LabelClass;
  milestone?: MilestoneClass;
  name?: string;
  number?: number;
  organization: Organization;
  pull_request?: PullRequestClass;
  pusher?: Author;
  pusher_type?: string;
  ref_type?: string;
  ref?: string;
  repository: Repository;
  requested_reviewer?: {
    [key: string]: string;
  };
  sha?: string;
  sender: Sender;
  state?: string;
  target_url?: string;
  updated_at?: string;
  workflow_job?: WorkflowJobClass;
  workflow_run?: WorkflowRunClass;
  workflow?: Workflow;
  zen?: string;
};

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
