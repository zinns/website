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

const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const steps = [
  {
    label: 'Format and lint staged files',
    args: ['exec', 'lint-staged', '--config', 'lint-staged.config.mjs'],
    note: 'ESLint checks staged JS/TS files, and Prettier checks JS/TS/CSS/SCSS plus docs/config files.',
  },
  {
    label: 'TypeScript typecheck',
    args: ['typecheck'],
    note: 'The complete project must still satisfy the TypeScript compiler.',
  },
  {
    label: 'Vitest suite',
    args: ['test'],
    note: 'Local commits must keep the test suite green.',
  },
];

function runCommand(args) {
  return new Promise(resolve => {
    const child = spawn(command, args, { stdio: 'inherit' });

    child.on('exit', code => resolve(code ?? 1));
  });
}

console.log(headline('Pre-commit checks'));
console.log(divider());

for (const [index, step] of steps.entries()) {
  console.log(stepLabel(index + 1, steps.length, step.label));
  console.log(detail(step.note));

  const exitCode = await runCommand(step.args);

  if (exitCode !== 0) {
    console.error(failure(`${step.label} failed.`));
    console.error(warning('Review the output above, restage any fixes, and retry the commit.'));
    process.exit(exitCode);
  }

  console.log(success(`${step.label} passed.`));
  console.log(divider());
}

console.log(success('Staged files and local checks are ready to commit.'));
