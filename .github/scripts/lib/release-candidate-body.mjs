function getReferences(summary = '') {
  return [...summary.matchAll(/(?:#\d+|GH-\d+|[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+#\d+)/g)].map(
    match => match[0],
  );
}

export function renderIncludedChanges(commits = []) {
  if (commits.length === 0) {
    return 'No changes detected between `release` and `develop`.';
  }

  const rows = commits.map(commit => {
    const references = getReferences(commit.summary);
    const referenceText = references.length > 0 ? references.join(', ') : '-';

    return `| \`${commit.shortSha}\` | ${commit.summary} | ${referenceText} |`;
  });

  return ['| Commit | Summary | References |', '| --- | --- | --- |', ...rows].join('\n');
}

export function renderReleaseCandidateBody({ includedChanges, sourceSha, template, workflow }) {
  return `${template.replace(
    '<!-- Summarize what has changed since the last release branch update. -->',
    includedChanges,
  )}

---

Automation metadata:

- Source: \`develop\`
- Target: \`release\`
- Updated by: \`${workflow}\`
- Source SHA: \`${sourceSha}\`
`;
}
