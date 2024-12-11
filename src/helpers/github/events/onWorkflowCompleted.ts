import { WorkflowCompletedPayload } from '@/types';
import pingUser from '../pingUser';

const onWorkflowCompleted = (payload: WorkflowCompletedPayload): string | null => {
  const {
    action,
    workflow_job: {
      conclusion: workflowConclusion,
      head_branch: branch,
      status: workflowStatus,
      steps,
      workflow_name: workflowName,
    },
    repository: { name: repositoryName },
    sender: { login },
  } = payload;

  const uselessActions = ['queued', 'in_progress'];

  if (uselessActions.includes(action)) {
    return null;
  }

  const stepsConclussion = steps.map(step => step.conclusion);

  return `
---
Something happened in **${repositoryName}**

Workflow **${workflowName}** triggered on branch **${branch}** is **${workflowStatus}** with a **${workflowConclusion}** status.

These are the steps executed:
${steps.map(step => `**${step.name}: ${step.conclusion}** ${step.conclusion === 'success' ? '✅' : '❌'}`).join('\n')}
${
  stepsConclussion.some(conclusion => conclusion !== 'success')
    ? `
There was a step that failed. Please check the logs for more information.
${pingUser(login)}
`
    : '---'
}
  `;
};

export { onWorkflowCompleted };
