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

export { onStar };
