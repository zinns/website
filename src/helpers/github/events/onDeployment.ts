import { DeploymentPayload } from '@/types';

const onDeployment = (payload: DeploymentPayload): string => {
  const {
    deployment_status: {
      description,
      environment,
      environment_url: environmentUrl,
      repository_url: repositoryUrl,
      state,
    },
  } = payload;

  const repository = repositoryUrl.split('zinns/')[1];

  if (state !== 'success') {
    return `Deployment failed on ${environment} with description ${description}`;
  }

  return `
---
Something happened in **${repository}**

**Deployment**

**${description}** with a status: **${state}**

Environment URL: [link](${environmentUrl})
---
  `;
};

export { onDeployment };
