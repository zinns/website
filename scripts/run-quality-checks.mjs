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
    label: 'Prettier format check',
    script: 'format:check',
    note: 'All supported source, config, style, and documentation files must be formatted.',
  },
  {
    label: 'ESLint for TS and JS',
    script: 'lint',
    note: 'Static analysis must pass without warnings.',
  },
  {
    label: 'TypeScript typecheck',
    script: 'typecheck',
    note: 'The repository stays strict even when files are JavaScript-compatible.',
  },
  {
    label: 'Vitest suite',
    script: 'test',
    note: 'Commit and workflow rules stay covered by tests.',
  },
  {
    label: 'Production build',
    script: 'build',
    note: 'The app must still compile as a deployable Next.js build.',
  },
];

function runScript(script) {
  return new Promise(resolve => {
    const child = spawn(command, [script], { stdio: 'inherit' });
    child.on('exit', code => resolve(code ?? 1));
  });
}

console.log(headline('Repository quality checks'));
console.log(divider());

for (const [index, step] of steps.entries()) {
  console.log(stepLabel(index + 1, steps.length, step.label));
  console.log(detail(step.note));

  const exitCode = await runScript(step.script);

  if (exitCode !== 0) {
    console.error(failure(`${step.label} did not pass.`));
    console.error(warning('Fix the reported issue before pushing new commits.'));
    process.exit(exitCode);
  }

  console.log(success(`${step.label} passed.`));
  console.log(divider());
}

console.log(success('All repository quality checks passed.'));
