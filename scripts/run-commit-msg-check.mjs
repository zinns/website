import { spawn } from 'node:child_process';

import {
  detail,
  divider,
  failure,
  headline,
  stepLabel,
  success,
  warning,
} from './lib/terminal-ui.mjs';

const args = process.argv.slice(2).filter(value => value !== '--');
const commitMessagePath = args[0];

if (!commitMessagePath) {
  console.error(failure('Missing commit message file path.'));
  process.exit(1);
}

function runCommitlint(messageFilePath) {
  const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

  return new Promise(resolve => {
    const child = spawn(
      command,
      ['exec', 'commitlint', '--config', 'commitlint.config.mjs', '--edit', messageFilePath],
      {
        stdio: 'inherit',
      },
    );

    child.on('exit', code => resolve(code ?? 1));
  });
}

console.log(headline('Commit message validation'));
console.log(divider());
console.log(stepLabel(1, 2, 'Conventional commit header'));
console.log(detail('Expected format: type(scope): short summary (#123)'));
console.log(stepLabel(2, 2, 'GitHub issue reference in the first line'));
console.log(detail('Accepted references include #123, GH-123, and owner/repo#123.'));
console.log(divider());

const exitCode = await runCommitlint(commitMessagePath);

if (exitCode === 0) {
  console.log(success('Commit message matches the repository rules.'));
  process.exit(0);
}

console.error(failure('Commit message rejected.'));
console.error(warning('Use a conventional header and include the GitHub issue in the first line.'));
process.exit(exitCode);
