import { App } from './app';
import { HeadCommit } from './headCommit';
import { Organization } from './organization';
import { Repository } from './repository';
import { Sender } from './sender';

export interface CheckSuite {
  action: string;
  check_suite: CheckSuiteClass;
  repository: Repository;
  organization: Organization;
  sender: Sender;
}

export interface CheckSuiteClass {
  id: number;
  node_id: string;
  head_branch: string;
  head_sha: string;
  status: string;
  conclusion: string;
  url: string;
  before: string;
  after: string;
  pull_requests: unknown[];
  app: App;
  created_at: string;
  updated_at: string;
  rerequestable: boolean;
  runs_rerequestable: boolean;
  latest_check_runs_count: number;
  check_runs_url: string;
  head_commit: HeadCommit;
}
