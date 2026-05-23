import { describe, expect, it } from 'vitest';

import {
  getVersionFromReleaseTitle,
  incrementVersion,
  isReleaseTitle,
  parseVersion,
} from './semver.mjs';

describe('release version helpers', () => {
  it('parses semantic versions', () => {
    expect(parseVersion('1.2.3')).toEqual({ major: 1, minor: 2, patch: 3 });
  });

  it('increments patch, minor, and major versions', () => {
    expect(incrementVersion('1.2.3', 'patch')).toBe('1.2.4');
    expect(incrementVersion('1.2.3', 'minor')).toBe('1.3.0');
    expect(incrementVersion('1.2.3', 'major')).toBe('2.0.0');
  });

  it('extracts versions from production release titles', () => {
    expect(getVersionFromReleaseTitle('chore(release): v1.2.3 (#99)')).toBe('1.2.3');
    expect(isReleaseTitle('feat(repo): add workflow (#99)')).toBe(false);
  });
});
