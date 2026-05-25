import { readFileSync } from 'node:fs';

import { getRepository, githubPaginate } from './lib/github-api.mjs';
import { validateChangePullRequest } from './lib/change-pr-policy.mjs';

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const pullRequest = event.pull_request;
const { owner, repo } = getRepository();

if (!pullRequest) {
  throw new Error('This workflow must run from a pull_request event.');
}

const commits = await githubPaginate(`/repos/${owner}/${repo}/pulls/${pullRequest.number}/commits`);
const errors = validateChangePullRequest(pullRequest, commits);

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`FAILED ${error}`);
  }

  process.exit(1);
}

console.log('change PR guard passed.');
