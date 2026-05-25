import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

import { getRepository, githubRequest } from './lib/github-api.mjs';
import { resolvePackageJsonForDevelopSync, stringifyPackageJson } from './lib/develop-sync.mjs';
import { getReleaseTitle } from './lib/semver.mjs';

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

function readPackageJsonFromDevelop() {
  const packageJson = run('git', ['show', 'origin/develop:package.json'], { capture: true });
  return JSON.parse(packageJson);
}

function getCommitCountSinceDevelop() {
  return Number(run('git', ['rev-list', '--count', 'origin/develop..HEAD'], { capture: true }));
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

function resolveKnownSyncConflicts(mainPackageJson) {
  const unmergedFiles = getUnmergedFiles();

  if (unmergedFiles.length === 0) {
    return;
  }

  if (unmergedFiles.length !== 1 || unmergedFiles[0] !== 'package.json') {
    throw new Error(`Unsupported develop sync conflicts: ${unmergedFiles.join(', ')}`);
  }

  const resolvedPackageJson = resolvePackageJsonForDevelopSync(
    readPackageJsonFromDevelop(),
    mainPackageJson,
  );

  writeFileSync('package.json', stringifyPackageJson(resolvedPackageJson));
  run('git', ['add', 'package.json']);
  console.log(`resolved package.json release version conflict as v${mainPackageJson.version}.`);
}

function mergeMainIntoDevelopSync(title, mainPackageJson) {
  const result = spawnSync('git', ['merge', '--no-ff', '--no-commit', 'origin/main'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join('\n');

    if (getUnmergedFiles().length === 0) {
      throw new Error(`git merge --no-ff --no-commit origin/main failed.\n${output}`);
    }

    resolveKnownSyncConflicts(mainPackageJson);
  }

  if (!hasMergeHead()) {
    return;
  }

  run('git', ['commit', '-m', title]);
}

async function findProductionPr(version) {
  const pullRequests = await githubRequest(
    `/repos/${owner}/${repo}/pulls?state=closed&base=main&sort=updated&direction=desc&per_page=25`,
  );
  const title = getReleaseTitle(version);

  return pullRequests.find(pullRequest => pullRequest.merged_at && pullRequest.title === title);
}

function renderBody(version, productionPr, title) {
  const productionReference = productionPr ? `#${productionPr.number}` : `v${version}`;

  return `# Develop Sync PR

## Target

- Base branch: \`develop\`
- Source branch: \`sync/develop-v${version}\`
- Production release: \`v${version}\`
- Production PR: ${productionReference}

## Scope

- Sync release-only changes from \`main\` back into \`develop\`.
- Preserve release metadata, version updates, and any release hotfixes accepted after the original work branch merged.
- Keep \`develop\` aligned with the latest production state before new feature work continues.

## Merge strategy

- [ ] Merge commit into \`develop\`
- [ ] Suggested merge commit title: \`${title}\`
- [ ] Do not squash unless the release ancestry is intentionally being flattened
- [ ] Delete the sync branch after merge

## Validation

- [ ] \`Branch Policy\` passes
- [ ] \`Change Policy\` passes after review approval adds \`status:approved\`
- [ ] \`Quality Gate\` passes (format, lint, typecheck, tests, and build)
- [ ] \`Workflow Lint\` passes
- [ ] Diff contains only release sync changes
`;
}

async function addBestEffortLabels(prNumber) {
  try {
    await githubRequest(`/repos/${owner}/${repo}/issues/${prNumber}/labels`, {
      method: 'POST',
      body: {
        labels: ['type:release', 'status:in-review', 'area:infra'],
      },
    });
  } catch (error) {
    console.warn(`Could not add sync PR labels: ${error.message}`);
  }
}

function isDevelopSyncBranch(branch = '') {
  return /^sync\/develop-v\d+\.\d+\.\d+$/.test(branch);
}

async function removeBestEffortLabel(issueNumber, label) {
  try {
    await githubRequest(
      `/repos/${owner}/${repo}/issues/${issueNumber}/labels/${encodeURIComponent(label)}`,
      {
        method: 'DELETE',
      },
    );
  } catch (error) {
    if (!error.message.includes('404')) {
      console.warn(`Could not remove ${label} from PR #${issueNumber}: ${error.message}`);
    }
  }
}

async function blockOpenDevelopPullRequests(syncPrNumber) {
  const pullRequests = await githubRequest(
    `/repos/${owner}/${repo}/pulls?state=open&base=develop&per_page=100`,
  );
  const blockedPullRequests = pullRequests.filter(pullRequest => {
    return pullRequest.number !== syncPrNumber && !isDevelopSyncBranch(pullRequest.head.ref);
  });

  for (const pullRequest of blockedPullRequests) {
    await removeBestEffortLabel(pullRequest.number, 'status:approved');

    try {
      await githubRequest(`/repos/${owner}/${repo}/issues/${pullRequest.number}/labels`, {
        method: 'POST',
        body: {
          labels: ['status:blocked'],
        },
      });
      console.log(
        `blocked develop PR #${pullRequest.number} until sync PR #${syncPrNumber} lands.`,
      );
    } catch (error) {
      console.warn(`Could not block develop PR #${pullRequest.number}: ${error.message}`);
    }
  }
}

run('git', ['config', 'user.name', 'github-actions[bot]']);
run('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);
run('git', ['fetch', 'origin', 'main', 'develop', '--prune', '--tags']);

const currentPackage = readPackageJsonFromMain();
const version = currentPackage.version;
const syncBranch = `sync/develop-v${version}`;
const productionPr = await findProductionPr(version);
const productionReference = productionPr ? `#${productionPr.number}` : `v${version}`;
const title = `chore(sync): merge v${version} into develop (${productionReference})`;

run('git', ['switch', '-C', syncBranch, 'origin/develop']);
mergeMainIntoDevelopSync(title, currentPackage);

if (getCommitCountSinceDevelop() === 0) {
  console.log(`develop is already aligned with v${version}. Nothing to sync.`);
  process.exit(0);
}

run('git', ['push', '--force-with-lease', 'origin', `HEAD:${syncBranch}`]);

const body = renderBody(version, productionPr, title);
const existingPrs = await githubRequest(
  `/repos/${owner}/${repo}/pulls?state=open&base=develop&head=${owner}:${syncBranch}`,
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
  await addBestEffortLabels(existingPr.number);
  await blockOpenDevelopPullRequests(existingPr.number);
  console.log(`updated develop sync PR #${existingPr.number}.`);
} else {
  const createdPr = await githubRequest(`/repos/${owner}/${repo}/pulls`, {
    method: 'POST',
    body: {
      title,
      head: syncBranch,
      base: 'develop',
      body,
      maintainer_can_modify: false,
    },
  });
  await addBestEffortLabels(createdPr.number);
  await blockOpenDevelopPullRequests(createdPr.number);
  console.log(`created develop sync PR #${createdPr.number}.`);
}
