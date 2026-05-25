import { readFileSync } from 'node:fs';

import { getRepository, githubRequest, githubRequestOrNull } from './lib/github-api.mjs';
import { getVersionFromReleaseTitle } from './lib/semver.mjs';

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const pullRequest = event.pull_request;
const { owner, repo } = getRepository();

if (!pullRequest?.merged || pullRequest.base.ref !== 'main') {
  console.log('No merged production PR found. Nothing to publish.');
  process.exit(0);
}

const version = getVersionFromReleaseTitle(pullRequest.title);

if (!version) {
  throw new Error('Merged production PR title must match Release 📦 vX.Y.Z.');
}

const tagName = `v${version}`;
const targetSha = pullRequest.merge_commit_sha;
const existingTag = await githubRequestOrNull(`/repos/${owner}/${repo}/git/ref/tags/${tagName}`);

if (existingTag) {
  if (existingTag.object.sha !== targetSha) {
    throw new Error(`${tagName} already exists and points to a different commit.`);
  }

  console.log(`${tagName} already exists at the production merge commit.`);
} else {
  await githubRequest(`/repos/${owner}/${repo}/git/refs`, {
    method: 'POST',
    body: {
      ref: `refs/tags/${tagName}`,
      sha: targetSha,
    },
  });
  console.log(`created tag ${tagName}.`);
}

const existingRelease = await githubRequestOrNull(
  `/repos/${owner}/${repo}/releases/tags/${tagName}`,
);

if (existingRelease) {
  console.log(`GitHub Release ${tagName} already exists.`);
  process.exit(0);
}

await githubRequest(`/repos/${owner}/${repo}/releases`, {
  method: 'POST',
  body: {
    tag_name: tagName,
    target_commitish: targetSha,
    name: tagName,
    body: pullRequest.body ?? `Release ${tagName}`,
    draft: false,
    prerelease: false,
  },
});

console.log(`published GitHub Release ${tagName}.`);
