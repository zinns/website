import { WorkflowRunPayload } from '@/types';
import pingUser from '../pingUser';

const onWorkflowRun = (payload: WorkflowRunPayload): string | null => {
  const {
    action,
    repository: { name: repositoryName },
    workflow_run: {
      actor: { login },
      head_branch: branch,
      name: workflowName,
    },
  } = payload;

  const uselessActions = ['completed', 'requested'];

  if (uselessActions.includes(action)) {
    return null;
  }

  if (action !== 'in_progress') {
    return `
---
Something happened in **${repositoryName}**

About this
---
`;
  }

  return `
---
Something happened in **${repositoryName}**

Workflow **${workflowName}** has been triggered on branch **${branch}** by ${pingUser(login)}
---
  `;
};

export { onWorkflowRun };
