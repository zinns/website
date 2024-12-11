const pingUser = (actor: string): string => {
  if (actor === 'davidTocineta') {
    return '<@1243395519938695205>';
  }

  if (actor === 'eamzea') {
    return '<@756157818691780635>';
  }

  return actor;
};

export default pingUser;
