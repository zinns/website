export const validatePayload = (payload: any, update: string[]) => {
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
        Object.prototype.toString.call(payload[key]) === '[object Object]' &&
        Object.keys(payload[key]).includes('status')
      ) {
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
