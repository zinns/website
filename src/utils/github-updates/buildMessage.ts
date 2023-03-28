import { GitHubBodyRequest } from 'types/Webhook/githubRequest';

export const buildIssueMessage = (payload: GitHubBodyRequest): string => {
  const { action } = body;
  switch (action) {
    case 'assigned':
      break;

    default:
      return;
  }
};
