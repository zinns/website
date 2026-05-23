import { readFileSync } from 'node:fs';

import YAML from 'yaml';

import { getRepository, githubPaginate, githubRequest } from './lib/github-api.mjs';

const { owner, repo } = getRepository();
const labels = YAML.parse(readFileSync('.github/labels.yml', 'utf8'));

if (!Array.isArray(labels)) {
  throw new Error('.github/labels.yml must contain a label array.');
}

const existingLabels = await githubPaginate(`/repos/${owner}/${repo}/labels`);
const existingByName = new Map(existingLabels.map(label => [label.name, label]));

for (const label of labels) {
  const name = label.name;
  const color = String(label.color).replace(/^#/, '');
  const description = label.description ?? '';

  if (!name || !color) {
    throw new Error(`Invalid label entry: ${JSON.stringify(label)}`);
  }

  const existingLabel = existingByName.get(name);
  const payload = { name, color, description };

  if (!existingLabel) {
    await githubRequest(`/repos/${owner}/${repo}/labels`, {
      method: 'POST',
      body: payload,
    });
    console.log(`created label: ${name}`);
    continue;
  }

  const needsUpdate =
    existingLabel.color.toUpperCase() !== color.toUpperCase() ||
    existingLabel.description !== description;

  if (needsUpdate) {
    await githubRequest(`/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`, {
      method: 'PATCH',
      body: payload,
    });
    console.log(`updated label: ${name}`);
  } else {
    console.log(`label already up to date: ${name}`);
  }
}

console.log('label sync completed.');
