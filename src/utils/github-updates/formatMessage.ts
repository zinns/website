import { GitHubBodyRequest } from 'types/Webhook/githubRequest';

export const createDescription = (payload: any, update: string[]): string => {
  switch (update[0] ?? '') {
    case 'check_run':
      return ` \\-\\> ${payload?.check_run.name} \\-\\> status: ${payload?.check_run.status} \\-\\> conclusion: ${payload?.check_run?.conclusion}`;
    case 'check_suite':
      return ` \\-\\> ${payload?.check_suite?.head_branch} \\-\\> status: ${payload?.check_suite?.status} \\-\\> conclusion: ${payload?.check_suite?.conclusion}`;
    case 'issue':
      return ` \\-\\> name: ${payload?.issue?.title} ${
        update?.[1] ? `\\-\\> action: ${update[1]}` : ''
      } `;
    case 'pull_request':
      return ` \\-\\> ${payload?.pull_request?.state} \\-\\> merged: ${
        payload?.pull_request?.merged
      } ${
        payload?.pull_request?.merged
          ? ` \\-\\> merged by: ${payload?.pull_request?.merged_by.login} \\-\\> reviewers: ${
              payload?.pull_request?.requested_reviewers.length > 0
                ? payload?.pull_request?.requested_reviewers.join(', ')
                : payload?.pull_request?.requested_reviewers.length
            } \\-\\> labels: ${
              payload?.pull_request?.labels.length > 0
                ? payload?.pull_request?.labels.join(', ')
                : 0
            }`
          : ''
      }`;
    case 'push':
      return ` \\-\\> ${payload?.commits?.length} ${
        payload?.forced ? 'forced commit(s)' : 'commit(s)'
      } \\-\\> ${payload?.ref?.split('/').splice(2).join('')}`;
    case 'workflow_job':
      return ` \\-\\> ${payload?.workflow_job?.head_branch} \\-\\> job: ${payload?.workflow_job?.name} \\-\\> status: ${payload?.workflow_job?.status} \\-\\> conclusion: ${payload?.workflow_job?.conclusion}`;
    case 'workflow_run':
      return ` \\-\\> ${payload?.workflow_run?.head_branch} \\-\\> status: ${payload?.workflow_run?.status} \\-\\> conclusion: ${payload?.workflow_run?.conclusion}`;
    default:
      return update.join(' - ');
  }
};

export const formatMessage = (
  actor: string,
  description: string,
  location: string,
  update: string[],
) => {
  const updateFormatted =
    update.length > 0
      ? [...(update.length > 1 ? update.join('/') : update[0])]
          .map(char => (char === '_' ? ' ' : char))
          .join('')
      : 'There was an update but it is not handle, yet';
  const message = `*GitHub Changes*
User: *${actor}*
Update: *${updateFormatted}${description ?? ''}*
Repo: *${location}*`;

  return message;
};
