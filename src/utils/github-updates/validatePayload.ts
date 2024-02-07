import { CheckRunClass } from 'types/Webhook/check_run';
import { CheckSuiteClass } from 'types/Webhook/check_suite';
import { GitHubBodyRequest } from 'types/Webhook/githubRequest';
import { WorkflowJobClass } from 'types/Webhook/workflow_job';
import { WorkflowRunClass } from 'types/Webhook/workflow_run';

export const validatePayload = (payload: GitHubBodyRequest, update: string[]) => {
  const unusedStatuses = ['in_progress', 'queued'];
  const invalidUpdates = ['workflow_job', 'workflow_run', 'check_run', 'check_suite'];

  const hasInvalidUpdate = [];

  for (const invalidUpdate of invalidUpdates) {
    if (
      update.includes(invalidUpdate) &&
      (
        payload?.[invalidUpdate as keyof typeof payload] as
          | CheckRunClass
          | CheckSuiteClass
          | WorkflowJobClass
          | WorkflowRunClass
      )?.conclusion === 'success'
    ) {
      hasInvalidUpdate.push(true);
    }
  }
  const projectItemsInvalid = Object.keys(payload).some(key => key === 'projects_v2_item');

  if (hasInvalidUpdate.some(invUpd => invUpd) || projectItemsInvalid) {
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
