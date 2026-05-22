export const VERSION_LABELS = ['version:patch', 'version:minor', 'version:major'];

export function getLabelNames(labels = []) {
  return labels.map(label => (typeof label === 'string' ? label : label.name)).filter(Boolean);
}

export function getVersionLabels(labels = []) {
  const labelNames = getLabelNames(labels);
  return labelNames.filter(label => VERSION_LABELS.includes(label));
}

export function getReleaseTypeFromVersionLabel(label) {
  if (!VERSION_LABELS.includes(label)) {
    throw new Error(`Unsupported version label: ${label}`);
  }

  return label.replace('version:', '');
}

export function getSingleVersionLabel(labels = []) {
  const versionLabels = getVersionLabels(labels);

  if (versionLabels.length !== 1) {
    throw new Error(
      `Expected exactly one version label (${VERSION_LABELS.join(', ')}), found ${
        versionLabels.length
      }.`,
    );
  }

  return versionLabels[0];
}
