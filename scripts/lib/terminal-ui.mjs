const RESET = '\x1b[0m';

function color(code, value) {
  if (!process.stdout.isTTY) {
    return value;
  }

  return `${code}${value}${RESET}`;
}

export function headline(value) {
  return color('\x1b[1;36m', value);
}

export function stepLabel(index, total, value) {
  return color('\x1b[1;34m', `Step ${index}/${total}`) + ` ${value}`;
}

export function success(value) {
  return color('\x1b[1;32m', `APPROVED ${value}`);
}

export function warning(value) {
  return color('\x1b[1;33m', `WARNING  ${value}`);
}

export function failure(value) {
  return color('\x1b[1;31m', `FAILED   ${value}`);
}

export function detail(value) {
  return color('\x1b[2m', value);
}

export function divider() {
  return color('\x1b[2m', '------------------------------------------------------------');
}
