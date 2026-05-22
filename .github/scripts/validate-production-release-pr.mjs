import { readFileSync } from 'node:fs';

import { getRepository, githubPaginate } from './lib/github-api.mjs';
import { getVersionFromReleaseTitle } from './lib/semver.mjs';

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const pullRequest = event.pull_request;
const { owner, repo } = getRepository();

if (!pullRequest) {
  throw new Error('This workflow must run from a pull_request event.');
}

const errors = [];
const version = getVersionFromReleaseTitle(pullRequest.title);

if (pullRequest.base.ref !== 'main') {
  errors.push('Production release PRs must target main.');
}

if (!version) {
  errors.push('Production PR title must match chore(release): vX.Y.Z (#123).');
}

if (!pullRequest.head.ref.startsWith('release/main-v')) {
  errors.push('Production PR source branch must match release/main-vX.Y.Z.');
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

if (version && packageJson.version !== version) {
  errors.push(`package.json version must be ${version}, found ${packageJson.version}.`);
}

const commits = await githubPaginate(`/repos/${owner}/${repo}/pulls/${pullRequest.number}/commits`);

if (commits.length !== 1) {
  errors.push(`Production PR must contain exactly one release commit, found ${commits.length}.`);
} else {
  const commitTitle = commits[0].commit.message.split(/\r?\n/, 1)[0];

  if (commitTitle !== pullRequest.title) {
    errors.push('The single release commit title must match the PR title.');
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`FAILED ${error}`);
  }

  process.exit(1);
}

console.log(`production release PR guard passed for v${version}.`);
