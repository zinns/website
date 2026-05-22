import {
  commitHeaderHasIssueReference,
  getIssueReferenceHelpText,
} from './scripts/lib/commit-message-rules.mjs';

const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  helpUrl: 'https://www.conventionalcommits.org/en/v1.0.0/',
  rules: {
    'header-max-length': [2, 'always', 100],
    'github-issue-reference-in-header': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'github-issue-reference-in-header': parsed => [
          commitHeaderHasIssueReference(parsed),
          getIssueReferenceHelpText(),
        ],
      },
    },
  ],
};

export default commitlintConfig;
