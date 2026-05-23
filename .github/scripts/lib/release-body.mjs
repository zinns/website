function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cleanMarkdownSection(value = '') {
  return value.replace(/<!--[\s\S]*?-->/g, '').trim();
}

export function extractMarkdownSection(markdown = '', heading) {
  const lines = markdown.split(/\r?\n/);
  const headingPattern = new RegExp(`^##\\s+${escapeRegExp(heading)}\\s*$`, 'i');
  const start = lines.findIndex(line => headingPattern.test(line.trim()));

  if (start === -1) {
    return '';
  }

  const section = [];

  for (const line of lines.slice(start + 1)) {
    if (/^##\s+/.test(line.trim())) {
      break;
    }

    section.push(line);
  }

  return cleanMarkdownSection(section.join('\n'));
}

export function renderProductionReleaseBody({
  branch,
  sourcePullRequest,
  template,
  title,
  version,
  versionLabel,
}) {
  const releaseNotes =
    extractMarkdownSection(sourcePullRequest.body, 'Release notes draft') ||
    'No release notes draft was provided.';

  return template
    .replace('- Version: `v0.0.0`', `- Version: \`v${version}\``)
    .replace(
      '- Source release candidate PR:',
      `- Source release candidate PR: #${sourcePullRequest.number}`,
    )
    .replace('- Version label used:', `- Version label used: \`${versionLabel}\``)
    .replace('`Release 📦 v0.0.0`', `\`${title}\``)
    .replace(
      '<!-- Final release notes copied from the release candidate PR and automation output. -->',
      `Generated from release candidate PR #${sourcePullRequest.number}.\n\nSource branch: \`${branch}\`\n\n${releaseNotes}`,
    );
}
