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

const onIssue = (payload: {
  action: string;
  issue: { title: string; user: { login: string } };
}): string => {
  const { action, issue } = payload;

  if (action === 'opened') {
    return `An issue was opened with this title ${issue.title}`;
  }

  if (action === 'closed') {
    return `An issue was closed by ${issue.user.login}`;
  }

  return `Unhandled action for the issue event ${action}`;
};

export { onIssue, onStar };
