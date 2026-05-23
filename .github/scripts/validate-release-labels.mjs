import { readFileSync } from 'node:fs';

import { getSingleVersionLabel, VERSION_LABELS } from './lib/release-labels.mjs';

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const pullRequest = event.pull_request;

if (!pullRequest) {
  throw new Error('This workflow must run from a pull_request event.');
}

const errors = [];

if (pullRequest.base.ref !== 'release') {
  errors.push('Release label guard must target the release branch.');
}

if (pullRequest.head.ref !== 'develop' && !pullRequest.head.ref.startsWith('release-candidate/')) {
  errors.push(
    'Release candidate PRs must use develop or a release-candidate/* branch as the source.',
  );
}

try {
  const label = getSingleVersionLabel(pullRequest.labels);
  console.log(`approved version label: ${label}`);
} catch (error) {
  errors.push(`${error.message} Add exactly one of: ${VERSION_LABELS.join(', ')}.`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`FAILED ${error}`);
  }

  process.exit(1);
}

console.log('release label guard passed.');
