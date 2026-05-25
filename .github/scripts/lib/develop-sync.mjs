function sortValue(value) {
  if (Array.isArray(value)) {
    return value.map(sortValue);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [key, sortValue(nestedValue)]),
    );
  }

  return value;
}

function withoutVersion(packageJson) {
  const clone = { ...packageJson };
  delete clone.version;

  return clone;
}

export function packageJsonDiffersOnlyByVersion(developPackageJson, mainPackageJson) {
  return (
    JSON.stringify(sortValue(withoutVersion(developPackageJson))) ===
    JSON.stringify(sortValue(withoutVersion(mainPackageJson)))
  );
}

export function resolvePackageJsonForDevelopSync(developPackageJson, mainPackageJson) {
  if (!packageJsonDiffersOnlyByVersion(developPackageJson, mainPackageJson)) {
    throw new Error(
      'package.json has conflicts beyond the release version. Resolve this sync manually.',
    );
  }

  return {
    ...developPackageJson,
    version: mainPackageJson.version,
  };
}

export function stringifyPackageJson(packageJson) {
  return `${JSON.stringify(packageJson, null, 2)}\n`;
}
