import { Step } from './step';

export interface WorkflowJob {
  id: number;
  run_id: number;
  workflow_name: string;
  head_branch: string;
  run_url: string;
  run_attempt: number;
  node_id: string;
  head_sha: string;
  url: string;
  html_url: string;
  status: string;
  conclusion: string;
  created_at: string;
  started_at: string;
  completed_at: string;
  name: string;
  steps: Step[];
  check_run_url: string;
  labels: string[];
  runner_id: number;
  runner_name: string;
  runner_group_id: number;
  runner_group_name: string;
}
