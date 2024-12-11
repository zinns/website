import { PRPayload } from '@/types';
import pingUser from '../pingUser';

const onPullRequest = (payload: PRPayload): string => {
  const {
    action,
    pull_request: PR,
    repository: { name: repositoryName },
  } = payload;

  switch (action) {
    case 'closed':
      return `
---
Something happened in **${repositoryName}**

Pull Request **${PR.title.toUpperCase()}** opened by **${pingUser(PR.user.login)}** was closed with ${PR.merged ? 'a **merge**' : '**without merge**'}
---
`;

    case 'edited':
      return `
---
Something happened in **${repositoryName}**

Pull Request **${PR.title.toUpperCase()}** opened by **${pingUser(PR.user.login)}** had edits
---
`;

    case 'opened':
      return `
---
Something happened in **${repositoryName}**

A Pull Request **${PR.title.toUpperCase()}** was opened by **${pingUser(PR.user.login)}** with ${PR.commits} commits
---
`;

    case 'reopened':
      return `
---
Something happened in **${repositoryName}**

The Pull Request **${PR.title.toUpperCase()}** opened by **${pingUser(PR.user.login)}**  was *reopened*
---
`;

    case 'review_requested':
      return `
---
Something happened in **${repositoryName}**

The Pull Request: **${PR.title.toUpperCase()}** has requested review of *${PR.requested_reviewers.map(reviewer => reviewer.login)}*
---
`;
    default:
      return 'There was a pull request update but it is not handle, yet';
  }
};

export { onPullRequest };
