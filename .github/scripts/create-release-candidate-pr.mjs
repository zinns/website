import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

import { getRepository, githubRequest, githubRequestOrNull } from './lib/github-api.mjs';
import { stringifyPackageJson } from './lib/develop-sync.mjs';
import {
  filterReleaseCandidateCommits,
  renderIncludedChanges,
  renderReleaseCandidateBody,
} from './lib/release-candidate-body.mjs';
import {
  RELEASE_CANDIDATE_BRANCH,
  resolvePackageJsonForReleaseCandidate,
} from './lib/release-candidate-merge.mjs';
import { REQUIRED_RELEASE_LABELS } from './lib/release-labels.mjs';

const { owner, repo } = getRepository();
const releaseRefPath = `/repos/${owner}/${repo}/git/ref/heads/release`;
const mainRefPath = `/repos/${owner}/${repo}/git/ref/heads/main`;

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

function getIncludedCommits() {
  run('git', ['fetch', 'origin', 'develop', 'release', '--prune']);

  const output = run(
    'git',
    ['log', '--no-merges', '--format=%H%x1f%s', 'origin/release..origin/develop'],
    {
      capture: true,
    },
  );

  if (!output) {
    return [];
  }

  const commits = output.split(/\r?\n/).map(line => {
    const [sha, summary] = line.split('\u001f');

    return {
      sha,
      shortSha: sha.slice(0, 7),
      summary,
    };
  });

  return filterReleaseCandidateCommits(commits);
}

function readPackageJsonFromRelease() {
  const packageJson = run('git', ['show', 'origin/release:package.json'], { capture: true });
  return JSON.parse(packageJson);
}

function readPackageJsonFromDevelop() {
  const packageJson = run('git', ['show', 'origin/develop:package.json'], { capture: true });
  return JSON.parse(packageJson);
}

function getCommitCountSinceRelease() {
  return Number(run('git', ['rev-list', '--count', 'origin/release..HEAD'], { capture: true }));
}

function getUnmergedFiles() {
  const output = run('git', ['diff', '--name-only', '--diff-filter=U'], { capture: true });

  if (!output) {
    return [];
  }

  return output.split(/\r?\n/).filter(Boolean);
}

function hasMergeHead() {
  const result = spawnSync('git', ['rev-parse', '-q', '--verify', 'MERGE_HEAD'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  return result.status === 0;
}

function hasCachedChanges() {
  const result = spawnSync('git', ['diff', '--cached', '--quiet'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status === 0) {
    return false;
  }

  if (result.status === 1) {
    return true;
  }

  const output = [result.stdout, result.stderr].filter(Boolean).join('\n');
  throw new Error(`git diff --cached --quiet failed.\n${output}`);
}

function resolveKnownReleaseCandidateConflicts() {
  const unmergedFiles = getUnmergedFiles();

  if (unmergedFiles.length === 0) {
    return;
  }

  if (unmergedFiles.length !== 1 || unmergedFiles[0] !== 'package.json') {
    throw new Error(`Unsupported release candidate conflicts: ${unmergedFiles.join(', ')}`);
  }

  const resolvedPackageJson = resolvePackageJsonForReleaseCandidate(
    readPackageJsonFromRelease(),
    readPackageJsonFromDevelop(),
  );

  writeFileSync('package.json', stringifyPackageJson(resolvedPackageJson));
  run('git', ['add', 'package.json']);
  console.log(
    `resolved package.json release candidate version conflict as v${resolvedPackageJson.version}.`,
  );
}

function mergeDevelopIntoReleaseCandidate() {
  const result = spawnSync('git', ['merge', '--no-ff', '--no-commit', 'origin/develop'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join('\n');

    if (getUnmergedFiles().length === 0) {
      throw new Error(`git merge --no-ff --no-commit origin/develop failed.\n${output}`);
    }

    resolveKnownReleaseCandidateConflicts();
  }

  if (!hasMergeHead()) {
    return getCommitCountSinceRelease() > 0;
  }

  if (!hasCachedChanges()) {
    run('git', ['merge', '--abort']);
    console.log('no release candidate tree diff remains after resolving expected conflicts.');
    return false;
  }

  run('git', ['commit', '--no-verify', '-m', 'chore(release): prepare release candidate']);
  return true;
}

function prepareReleaseCandidateBranch() {
  run('git', ['switch', '-C', RELEASE_CANDIDATE_BRANCH, 'origin/release']);
  const hasReleaseCandidateDiff = mergeDevelopIntoReleaseCandidate();

  if (!hasReleaseCandidateDiff || getCommitCountSinceRelease() === 0) {
    console.log('release candidate branch was not pushed because no release diff exists.');
    return false;
  }

  run('git', ['push', '--force-with-lease', 'origin', `HEAD:${RELEASE_CANDIDATE_BRANCH}`]);
  return true;
}

function renderBody(includedCommits) {
  const template = readFileSync('.github/PULL_REQUEST_TEMPLATE/release-candidate.md', 'utf8');
  const includedChanges = renderIncludedChanges(includedCommits);

  return renderReleaseCandidateBody({
    includedChanges,
    sourceSha: process.env.GITHUB_SHA,
    template,
    workflow: process.env.GITHUB_WORKFLOW,
  });
}

async function addRequiredLabels(prNumber) {
  await githubRequest(`/repos/${owner}/${repo}/issues/${prNumber}/labels`, {
    method: 'POST',
    body: {
      labels: REQUIRED_RELEASE_LABELS,
    },
  });
}

async function closeStalePullRequest(pullRequest) {
  await githubRequest(`/repos/${owner}/${repo}/pulls/${pullRequest.number}`, {
    method: 'PATCH',
    body: {
      state: 'closed',
    },
  });
  console.log(`closed release candidate PR #${pullRequest.number}; no releasable changes remain.`);
}

async function closeLegacyDevelopPullRequest(existingPr) {
  if (!existingPr) {
    return;
  }

  await githubRequest(`/repos/${owner}/${repo}/pulls/${existingPr.number}`, {
    method: 'PATCH',
    body: {
      state: 'closed',
    },
  });
  console.log(
    `closed legacy develop release candidate PR #${existingPr.number}; generated branch will replace it.`,
  );
}

await ensureReleaseBranch();
run('git', ['config', 'user.name', 'github-actions[bot]']);
run('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);

const title = 'chore(release): prepare release candidate';
const existingGeneratedPrs = await githubRequest(
  `/repos/${owner}/${repo}/pulls?state=open&base=release&head=${owner}:${RELEASE_CANDIDATE_BRANCH}`,
);
const existingGeneratedPr = existingGeneratedPrs[0];
const existingLegacyPrs = await githubRequest(
  `/repos/${owner}/${repo}/pulls?state=open&base=release&head=${owner}:develop`,
);
const existingLegacyPr = existingLegacyPrs[0];
const includedCommits = getIncludedCommits();

if (includedCommits.length === 0) {
  if (existingGeneratedPr) {
    await closeStalePullRequest(existingGeneratedPr);
  }

  if (existingLegacyPr) {
    await closeStalePullRequest(existingLegacyPr);
  } else {
    console.log('no releasable develop changes detected; release candidate PR was not created.');
  }

  process.exit(0);
}

await closeLegacyDevelopPullRequest(existingLegacyPr);
const hasReleaseCandidateDiff = prepareReleaseCandidateBranch();

if (!hasReleaseCandidateDiff) {
  if (existingGeneratedPr) {
    await closeStalePullRequest(existingGeneratedPr);
  }

  console.log('no release candidate PR was created because no release diff exists.');
  process.exit(0);
}

const body = renderBody(includedCommits);

if (existingGeneratedPr) {
  await githubRequest(`/repos/${owner}/${repo}/pulls/${existingGeneratedPr.number}`, {
    method: 'PATCH',
    body: {
      title,
      body,
    },
  });
  await addRequiredLabels(existingGeneratedPr.number);
  console.log(`updated release candidate PR #${existingGeneratedPr.number}.`);
} else {
  const createdPr = await githubRequest(`/repos/${owner}/${repo}/pulls`, {
    method: 'POST',
    body: {
      title,
      head: RELEASE_CANDIDATE_BRANCH,
      base: 'release',
      body,
      maintainer_can_modify: false,
    },
  });
  await addRequiredLabels(createdPr.number);
  console.log(`created release candidate PR #${createdPr.number}.`);
}
