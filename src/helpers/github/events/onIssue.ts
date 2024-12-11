import pingUser from '../pingUser';

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

export { onIssue };
