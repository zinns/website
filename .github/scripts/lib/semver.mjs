export function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);

  if (!match) {
    throw new Error(`Invalid semantic version: ${version}`);
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

export function incrementVersion(version, releaseType) {
  const parsed = parseVersion(version);

  if (releaseType === 'major') {
    return `${parsed.major + 1}.0.0`;
  }

  if (releaseType === 'minor') {
    return `${parsed.major}.${parsed.minor + 1}.0`;
  }

  if (releaseType === 'patch') {
    return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
  }

  throw new Error(`Unsupported release type: ${releaseType}`);
}

export function getReleaseTitle(version) {
  return `Release 📦 v${version}`;
}

export function getVersionFromReleaseTitle(title) {
  const match = /^Release 📦 v(\d+\.\d+\.\d+)$/u.exec(title);
  return match?.[1] ?? null;
}

export function isReleaseTitle(title) {
  return getVersionFromReleaseTitle(title) !== null;
}
