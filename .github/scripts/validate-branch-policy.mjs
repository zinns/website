import { readFileSync } from 'node:fs';

import { validatePullRequestBranchPolicy, validatePushBranchPolicy } from './lib/branch-policy.mjs';

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const eventName = process.env.GITHUB_EVENT_NAME;
const errors =
  eventName === 'pull_request'
    ? validatePullRequestBranchPolicy(event.pull_request)
    : validatePushBranchPolicy(event);

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`FAILED ${error}`);
  }

  process.exit(1);
}

console.log('branch policy check passed.');
