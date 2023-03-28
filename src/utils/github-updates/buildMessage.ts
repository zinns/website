import { GitHubBodyRequest } from 'types/Webhook/githubRequest';

export const buildIssueMessage = (payload: GitHubBodyRequest): string => {
  console.log(payload);
  return '';
};
