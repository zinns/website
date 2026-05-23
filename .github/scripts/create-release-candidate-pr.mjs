import { readFileSync } from 'node:fs';

import { getRepository, githubRequest, githubRequestOrNull } from './lib/github-api.mjs';
import { REQUIRED_RELEASE_LABELS } from './lib/release-labels.mjs';

const { owner, repo } = getRepository();
const releaseRefPath = `/repos/${owner}/${repo}/git/ref/heads/release`;
const mainRefPath = `/repos/${owner}/${repo}/git/ref/heads/main`;

async function ensureReleaseBranch() {
  const releaseRef = await githubRequestOrNull(releaseRefPath);

  if (releaseRef) {
    console.log('release branch already exists.');
    return;
  }

  const mainRef = await githubRequest(mainRefPath);
  await githubRequest(`/repos/${owner}/${repo}/git/refs`, {
    method: 'POST',
    body: {
      ref: 'refs/heads/release',
      sha: mainRef.object.sha,
    },
  });
  console.log('created release branch from main.');
}

function renderBody() {
  const template = readFileSync('.github/PULL_REQUEST_TEMPLATE/release-candidate.md', 'utf8');
  return `${template}

---

Automation metadata:

- Source: \`develop\`
- Target: \`release\`
- Updated by: \`${process.env.GITHUB_WORKFLOW}\`
- Source SHA: \`${process.env.GITHUB_SHA}\`
`;
}

async function addRequiredLabels(prNumber) {
  await githubRequest(`/repos/${owner}/${repo}/issues/${prNumber}/labels`, {
    method: 'POST',
    body: {
      labels: REQUIRED_RELEASE_LABELS,
    },
  });
}

await ensureReleaseBranch();

const body = renderBody();
const title = 'chore(release): prepare release candidate';
const existingPrs = await githubRequest(
  `/repos/${owner}/${repo}/pulls?state=open&base=release&head=${owner}:develop`,
);
const existingPr = existingPrs[0];

if (existingPr) {
  await githubRequest(`/repos/${owner}/${repo}/pulls/${existingPr.number}`, {
    method: 'PATCH',
    body: {
      title,
      body,
    },
  });
  await addRequiredLabels(existingPr.number);
  console.log(`updated release candidate PR #${existingPr.number}.`);
} else {
  const createdPr = await githubRequest(`/repos/${owner}/${repo}/pulls`, {
    method: 'POST',
    body: {
      title,
      head: 'develop',
      base: 'release',
      body,
      maintainer_can_modify: true,
    },
  });
  await addRequiredLabels(createdPr.number);
  console.log(`created release candidate PR #${createdPr.number}.`);
}
