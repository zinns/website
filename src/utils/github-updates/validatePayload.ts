import { GitHubBodyRequest } from 'types/Webhook/githubRequest';
import { WorkflowJobClass } from 'types/Webhook/workflow_job';
import { WorkflowRunClass } from 'types/Webhook/workflow_run';

export const validatePayload = (
  payload: GitHubBodyRequest & { workflow_job: WorkflowJobClass; workflow_run: WorkflowRunClass },
  update: string[],
) => {
  const unusedStatuses = ['in_progress', 'queued'];
  const workflowJobInvalid =
    update.includes('workflow_job') &&
    payload.workflow_job.workflow_name === 'Status Reminder' &&
    payload.workflow_job.conclusion === 'success';
  const workflowRunInvalid =
    update.includes('workflow_run') &&
    payload.workflow_run.name === 'Status Reminder' &&
    payload.workflow_run.conclusion === 'success';
  const projectItemsInvalid = Object.keys(payload).some(key => key === 'projects_v2_item');

  if (workflowJobInvalid || workflowRunInvalid || projectItemsInvalid) {
    return false;
  }

  return Object.keys(payload)
    .map(key => {
      if (
        Object.prototype.toString.call(payload[key as keyof GitHubBodyRequest]) ===
          '[object Object]' &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Object.keys(payload[key]).includes('status')
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return !unusedStatuses.includes(payload[key].status);
      } else {
        if ([key].includes('pusher_type')) {
          return false;
        }
        return true;
      }
    })
    .every(value => value);
};
