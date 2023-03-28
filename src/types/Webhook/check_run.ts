import { App } from './app';
import { CheckSuite } from './check_suite';
import { Output } from './output';

export interface CheckRun {
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
  check_suite: CheckSuite;
  app: App;
  pull_requests: any[];
}
