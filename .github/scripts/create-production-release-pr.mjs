import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

import { getRepository, githubRequest } from './lib/github-api.mjs';
import { renderProductionReleaseBody } from './lib/release-body.mjs';
import { getProductionReleaseBranch } from './lib/release-branches.mjs';
import {
  getReleaseTypeFromVersionLabel,
  getSingleVersionLabel,
  REQUIRED_PRODUCTION_RELEASE_LABELS,
} from './lib/release-labels.mjs';
import { getReleaseTitle, incrementVersion } from './lib/semver.mjs';

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const pullRequest = event.pull_request;
const { owner, repo } = getRepository();

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join('\n');
    throw new Error(`${command} ${args.join(' ')} failed.\n${output}`);
  }

  return result.stdout?.trim() ?? '';
}

function readPackageJsonFromMain() {
  const packageJson = run('git', ['show', 'origin/main:package.json'], { capture: true });
  return JSON.parse(packageJson);
}

function updatePackageVersion(version) {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  packageJson.version = version;
  writeFileSync('package.json', `${JSON.stringify(packageJson, null, 2)}\n`);
}

function renderBody(version, versionLabel, branch, title) {
  const template = readFileSync('.github/PULL_REQUEST_TEMPLATE/production-release.md', 'utf8');

  return renderProductionReleaseBody({
    branch,
    sourcePullRequest: pullRequest,
    template,
    title,
    version,
    versionLabel,
  });
}

async function addRequiredLabels(prNumber, versionLabel) {
  await githubRequest(`/repos/${owner}/${repo}/issues/${prNumber}/labels`, {
    method: 'POST',
    body: {
      labels: [...REQUIRED_PRODUCTION_RELEASE_LABELS, versionLabel],
    },
  });
}

if (!pullRequest?.merged || pullRequest.base.ref !== 'release') {
  console.log('No merged release candidate PR found. Nothing to do.');
  process.exit(0);
}

const versionLabel = getSingleVersionLabel(pullRequest.labels);
const releaseType = getReleaseTypeFromVersionLabel(versionLabel);

run('git', ['config', 'user.name', 'github-actions[bot]']);
run('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
run('git', ['fetch', 'origin', 'main', 'release', '--prune', '--tags']);

const currentPackage = readPackageJsonFromMain();
const nextVersion = incrementVersion(currentPackage.version, releaseType);
const releaseBranch = getProductionReleaseBranch(nextVersion);
const title = getReleaseTitle(nextVersion);

run('git', ['switch', '-C', releaseBranch, 'origin/main']);
run('git', ['read-tree', '--reset', '-u', 'origin/release']);
updatePackageVersion(nextVersion);
run('git', ['add', '-A']);

const hasChanges = spawnSync('git', ['diff', '--cached', '--quiet']).status !== 0;

if (!hasChanges) {
  throw new Error('No release diff exists between release and main.');
}

run('git', ['commit', '-m', title]);
run('git', ['push', '--force-with-lease', 'origin', `HEAD:${releaseBranch}`]);

const body = renderBody(nextVersion, versionLabel, releaseBranch, title);
const existingPrs = await githubRequest(
  `/repos/${owner}/${repo}/pulls?state=open&base=main&head=${owner}:${releaseBranch}`,
);
const existingPr = existingPrs[0];

if (existingPr) {
  await addRequiredLabels(existingPr.number, versionLabel);
  await githubRequest(`/repos/${owner}/${repo}/pulls/${existingPr.number}`, {
    method: 'PATCH',
    body: {
      title,
      body,
    },
  });
  console.log(`updated production release PR #${existingPr.number}.`);
} else {
  const createdPr = await githubRequest(`/repos/${owner}/${repo}/pulls`, {
    method: 'POST',
    body: {
      title,
      head: releaseBranch,
      base: 'main',
      body,
      maintainer_can_modify: false,
    },
  });
  await addRequiredLabels(createdPr.number, versionLabel);
  console.log(`created production release PR #${createdPr.number}.`);
}
