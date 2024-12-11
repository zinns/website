import { DeploymentPayload } from './deployment';
import { WorkflowCompletedPayload } from './workflow-completed';
import { WorkflowRunPayload } from './workflow-run';

export type GitHubBodyPayload = DeploymentPayload | WorkflowCompletedPayload | WorkflowRunPayload;
