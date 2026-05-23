import { spawnSync } from 'node:child_process';

import { getRepository, githubRequest } from './lib/github-api.mjs';

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

function getCommitCountSinceDevelop() {
  return Number(run('git', ['rev-list', '--count', 'origin/develop..HEAD'], { capture: true }));
}

async function findProductionPr(version) {
  const pullRequests = await githubRequest(
    `/repos/${owner}/${repo}/pulls?state=closed&base=main&sort=updated&direction=desc&per_page=25`,
  );
  const titlePattern = new RegExp(
    `^chore\\(release\\): v${version.replaceAll('.', '\\.')} \\(#\\d+\\)$`,
  );

  return pullRequests.find(
    pullRequest => pullRequest.merged_at && titlePattern.test(pullRequest.title),
  );
}

function renderBody(version, productionPr) {
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
- [ ] Do not squash unless the release ancestry is intentionally being flattened
- [ ] Delete the sync branch after merge

## Validation

- [ ] CI passes
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
run('git', ['merge', '--no-ff', 'origin/main', '-m', title]);

if (getCommitCountSinceDevelop() === 0) {
  console.log(`develop is already aligned with v${version}. Nothing to sync.`);
  process.exit(0);
}

run('git', ['push', '--force-with-lease', 'origin', `HEAD:${syncBranch}`]);

const body = renderBody(version, productionPr);
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
  console.log(`created develop sync PR #${createdPr.number}.`);
}
