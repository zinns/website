module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'never'],
    'type-empty': [2, 'never'],
  },
};
