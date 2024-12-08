import { DeploymentPayload, PRPayload } from '@/types';

const pingUser = (actor: string): string => {
  if (actor === 'davidTocineta') {
    return '<@1243395519938695205>';
  }

  if (actor === 'eamzea') {
    return '<@756157818691780635>';
  }

  return actor;
};

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
  Something happened in **${repository}**

  **Deployment**

  **${description}** with a status: **${state}**

  Environment URL: [link](${environmentUrl})
  `;
};

const onIssue = (payload: {
  action: string;
  issue: { title: string; user: { login: string } };
}): string => {
  const { action, issue } = payload;

  if (action === 'opened') {
    return `An issue was opened with this title ${issue.title}`;
  }

  if (action === 'closed') {
    return `An issue was closed by ${pingUser(issue.user.login)}`;
  }

  return `Unhandled action for the issue event ${action}`;
};

const onPR = (payload: PRPayload): string => {
  const {
    action,
    pull_request: PR,
    repository: { name: repositoryName },
  } = payload;

  switch (action) {
    case 'closed':
      return `
      Something happened in **${repositoryName}**

      Pull Request **${PR.title.toUpperCase()}** opened by **${pingUser(PR.user.login)}** was closed with ${PR.merged ? 'a **merge**' : '**without merge**'}`;

    case 'edited':
      return `
      Something happened in **${repositoryName}**

      Pull Request **${PR.title.toUpperCase()}** opened by **${pingUser(PR.user.login)}** had edits`;

    case 'opened':
      return `
      Something happened in **${repositoryName}**

      A Pull Request **${PR.title.toUpperCase()}** was opened by **${pingUser(PR.user.login)}** with ${PR.commits} commits*`;

    case 'reopened':
      return `
      Something happened in **${repositoryName}**

      The Pull Request **${PR.title.toUpperCase()}** opened by **${pingUser(PR.user.login)}**  was *reopened*`;

    case 'review_requested':
      return `
      Something happened in **${repositoryName}**

      The Pull Request: **${PR.title.toUpperCase()}** has requested review of *${PR.requested_reviewers.map(reviewer => reviewer.login)}*`;
    default:
      return 'There was a pull request update but it is not handle, yet';
  }
};

const onStar = (payload: {
  action: string;
  repository: { full_name: string };
  sender: {
    login: string;
  };
}): string => {
  const { action, sender, repository } = payload;

  return `User ${sender.login} ${action} star on ${repository.full_name}`;
};

export { onDeployment, onIssue, onPR, onStar };
