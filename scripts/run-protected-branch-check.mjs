import {
  detail,
  divider,
  failure,
  headline,
  stepLabel,
  success,
  warning,
} from './lib/terminal-ui.mjs';
import {
  getProtectedPushes,
  isProtectedBranchBypassEnabled,
  PROTECTED_BRANCHES,
} from './lib/protected-branches.mjs';

async function readStdin() {
  if (process.stdin.isTTY) {
    return '';
  }

  let input = '';

  for await (const chunk of process.stdin) {
    input += chunk;
  }

  return input;
}

console.log(headline('Protected branch push check'));
console.log(divider());
console.log(stepLabel(1, 1, `Block direct pushes to ${PROTECTED_BRANCHES.join(' and ')}`));
console.log(
  detail(
    'Use pull requests for protected branches. Server-side GitHub protection is still required.',
  ),
);
console.log(divider());

if (isProtectedBranchBypassEnabled()) {
  console.log(warning('Protected branch push check bypassed by ALLOW_PROTECTED_BRANCH_PUSH.'));
  process.exit(0);
}

const input = await readStdin();
const protectedPushes = getProtectedPushes(input);

if (protectedPushes.length === 0) {
  console.log(success('Push target is allowed locally.'));
  process.exit(0);
}

const branchList = [...new Set(protectedPushes.map(({ remoteBranch }) => remoteBranch))].join(', ');

console.error(failure(`Direct push blocked for protected branch: ${branchList}.`));
console.error(warning('Create a pull request instead of pushing directly to main or develop.'));
process.exit(1);
