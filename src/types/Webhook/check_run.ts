import { App } from './app';
import { CheckSuiteClass } from './check_suite';
import { Organization } from './organization';
import { Output } from './output';
import { Repository } from './repository';
import { Sender } from './sender';

export interface CheckRun {
  action: string;
  check_run: CheckRunClass;
  repository: Repository;
  organization: Organization;
  sender: Sender;
}

export interface CheckRunClass {
  id: number;
  name: string;
  node_id: string;
  head_sha: string;
  external_id: string;
  url: string;
  html_url: string;
  details_url: string;
  status: string;
  conclusion: string;
  started_at: string;
  completed_at: string;
  output: Output;
  check_suite: CheckSuiteClass;
  app: App;
  pull_requests: unknown[];
}
