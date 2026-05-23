import { readFileSync } from 'node:fs';

import { getRepository, githubPaginate } from './lib/github-api.mjs';
import { isProductionReleaseBranch } from './lib/release-branches.mjs';
import {
  getMissingLabels,
  getSingleVersionLabel,
  REQUIRED_PRODUCTION_RELEASE_LABELS,
  VERSION_LABELS,
} from './lib/release-labels.mjs';
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
  errors.push('Production PR title must match Release 📦 vX.Y.Z.');
}

if (!isProductionReleaseBranch(pullRequest.head.ref)) {
  errors.push('Production PR source branch must match production-release/vX.Y.Z.');
}

const missingLabels = getMissingLabels(pullRequest.labels, REQUIRED_PRODUCTION_RELEASE_LABELS);

if (missingLabels.length > 0) {
  errors.push(`Production PR is missing required labels: ${missingLabels.join(', ')}.`);
}

try {
  const label = getSingleVersionLabel(pullRequest.labels);
  console.log(`approved production version label: ${label}`);
} catch (error) {
  errors.push(`${error.message} Add exactly one of: ${VERSION_LABELS.join(', ')}.`);
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
